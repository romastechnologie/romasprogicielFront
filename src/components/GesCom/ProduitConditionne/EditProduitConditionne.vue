<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="produitConditionneForm" @submit="editProduitConditionne" :validation-schema="produitConditionneSchema" :initial-values="produitConditionneForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Quantité de conditionnement <span class="text-danger">*</span>
                </label>
                <Field name="qtiteConditionnement" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la quantité de conditionnement"/>
                <ErrorMessage name="qtiteConditionnement" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Quantité stock <span class="text-danger">*</span>
                </label>
                <Field name="qtiteStockCondi" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la quantité stock"/>
                <ErrorMessage name="qtiteStockCondi" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prix <span class="text-danger">*</span>
                </label>
                <Field name="prix" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prix"/>
                <ErrorMessage name="prix" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Montant <span class="text-danger">*</span>
                </label>
                <Field name="montant" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant"/>
                <ErrorMessage name="montant" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Produit <span class="text-danger">*</span>
                </label>
                <Field  name="produit"  v-slot="{ field }">
                  <Multiselect
                    :options="produitOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le produit"
                  />
                </Field>  
              </div>
              <ErrorMessage name="produit" class="text-danger"/>
            </div>
            
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Conditionnement <span class="text-danger">*</span>
                </label>
                <Field  name="conditionnement"  v-slot="{ field }">
                  <Multiselect
                    :options="conditionnementOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le conditionnement"
                  />
                </Field>  
              </div>
              <ErrorMessage name="famille" class="text-danger"/>
            </div>
        <div class="col-md-12">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier un produitConditionne
            </button>
            <router-link to="/liste-produitConditionnes" 
                class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { ProduitConditionne} from '@/models/ProduitConditionne';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditProduitConditionne",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const produitConditionneSchema = Yup.object().shape({
      produit: Yup.string().required('Le produit est obligatoire'),
      conditionnement: Yup.string().required('Le conditionnement est obligatoire'),
      montant: Yup.number().typeError('Veuillez entrer des chiffres').required('Le montant est obligatoire'),
      prix: Yup.number().typeError('Veuillez entrer des chiffres').required('Le prix est obligatoire'),
      qtiteConditionnement: Yup.number().typeError('Veuillez entrer des chiffres').required('La quantité de conditionnement est obligatoire'),
      qtiteStockCondi: Yup.number().typeError('Veuillez entrer des chiffres').required('La quantité stock est obligatoire'),
    });

    const produitConditionneForm = ref<ProduitConditionne>();
    const router = useRouter();
    const route = useRoute();

    const produitOptions = ref([]);
    const conditionnementOptions = ref([]);

    const fetchProduits = async () => {
      try {
        const response = await ApiService.get('/produits');
        const produitsData = response.data.data.data;
        produitOptions.value = produitsData.map((produit) => ({
          value: produit.id,
          label: `${produit.nom}`,
        }));
      } catch (error) {
        //
      }
    };

    const fetchConditionnements = async () => {
      try {
        const response = await ApiService.get('/conditionnements');
        const conditionnementsData = response.data.data.data;
        conditionnementOptions.value = conditionnementsData.map((conditionnement) => ({
          value: conditionnement.id,
          label: `${conditionnement.nom}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(()=> {
      fetchProduits();
      fetchConditionnements()
    })

    function getProduitConditionne(id:number) {
      ApiService.get("/produitConditionnes/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            produitConditionneForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editProduitConditionne = async (values, {resetForm}) => {
      const data = produitConditionneForm.value;
      ApiService.put("/produits/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeProduitConditionnePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    onMounted(() => {
      if(route.params.id) {
        getProduitConditionne(parseInt(route.params.id as string));
      }
    });

    return { 
      produitConditionneSchema, editProduitConditionne, produitConditionneForm,
      produitOptions, conditionnementOptions
    };
  },
});
</script>