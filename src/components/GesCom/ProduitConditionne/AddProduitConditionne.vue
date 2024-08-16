<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="produitConditionneForm" @submit="addProduitConditionne" :validation-schema="produitConditionneSchema">
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
                    Ajouter un produit conditionné
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

import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { ProduitConditionne } from '@/models/ProduitConditionne';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddProduitConditionne",
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

    const produitConditionneForm =  ref<ProduitConditionne | null>(null);
    const router = useRouter();
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
    
    const addProduitConditionne = async (values, {resetForm}) => {
      ApiService.post("/produitConditionnes",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeProduitConditionnesPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    onMounted(()=> {
      fetchProduits();
      fetchConditionnements()
    })

    return { produitConditionneSchema,
       addProduitConditionne,
        produitConditionneForm,produitOptions,
        conditionnementOptions,
      };
  },
});
</script>