<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="produitForm" @submit="addProduit" :validation-schema="produitSchema">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Référence <span class="text-danger">*</span>
                </label>
                <Field name="refProd" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la référence"/>
                <ErrorMessage name="refProd" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nomProd" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomProd" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Marque <span class="text-danger">*</span>
                </label>
                <Field name="marqProd" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'extension"/>
                <ErrorMessage name="marqProd" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Modèle <span class="text-danger">*</span>
                </label>
                <Field name="modeleProd" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le numéro"/>
                <ErrorMessage name="modeleProd" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description 
                  </label>
                  <Field name="descProd" as="textarea"  cols="30"
                    rows="12" placeholder="Entrer les motifs" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                  <textarea
                  class="form-control shadow-none rounded-0 text-black"
                    v-model="field.value"
                  ></textarea>
                </Field>
                  <ErrorMessage name="descProd" class="text-danger"/>
                </div>
              </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Code QR <span class="text-danger">*</span>
                </label>
                <Field name="codeQR" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le codeQR"/>
                <ErrorMessage name="codeQR" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Code barre <span class="text-danger">*</span>
                </label>
                <Field name="codeBarre" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le codeBarre"/>
                <ErrorMessage name="codeBarre" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Famille <span class="text-danger">*</span>
                </label>
                <Field  name="famille"  v-slot="{ field }">
                  <Multiselect
                    :options="familleOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner la famille"
                  />
                </Field>  
              </div>
              <ErrorMessage name="famille" class="text-danger"/>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Seuil d'approvisionnement <span class="text-danger">*</span>
                </label>
                <Field name="seuilAppro" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le seuilAppro"/>
                <ErrorMessage name="seuilAppro" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Seuil d'alerte <span class="text-danger">*</span>
                </label>
                <Field name="seuilAlerte" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le seuilAlerte"/>
                <ErrorMessage name="seuilAlerte" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un produit
                </button>
                <router-link to="/liste-produits" 
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
import { Produit } from '@/models/Produit';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddProduit",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const produitSchema = Yup.object().shape({
      refProd: Yup.string().required('La reference est obligatoire'),
      nomProd: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'Le nom doit contenir uniquement des lettres alphabétiques')
      .required('Le nom est obligatoire'),
      marqProd: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'La marque des produits doit contenir uniquement des lettres alphabétiques')
      .required('Le marque est obligatoire'),
      modeleProd: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'Le modèle de produit doit contenir uniquement des lettres alphabétiques')
      .required('Le modèle est obligatoire'),
      descProd: Yup.string()
      .matches(/^[A-Za-z ]+$/, 'La description doit contenir uniquement des lettres alphabétiques')
      .required('La description est obligatoire'),
      codeQR: Yup.number().typeError('Veuillez entrer des chiffres').required('Le code QR de la table est obligatoire'),
      codeBarre: Yup.number().typeError('Veuillez entrer des chiffres').required('Le code barre de la table est obligatoire'),
      famille: Yup.string().required('La famille est obligatoire'),
      seuilAppro: Yup.number().typeError('Veuillez entrer des chiffres').required('Le seuil d\'aprovisionnement de la table est obligatoire'),
      seuilAlerte: Yup.number().typeError('Veuillez entrer des chiffres').required('Le seuil d\'alerte de la table est obligatoire'),
    });

    const produitForm =  ref<Produit | null>(null);
    const router = useRouter();
    const familleOptions = ref([]);

    const addProduit = async (values, {resetForm}) => {
      ApiService.post("/produits",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeProduitPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchFamille = async () => {
      try {
        const response = await ApiService.get('all/familles');
        const familleData = response.data.data.data;
        familleOptions.value = familleData.map((famille) => ({
          value: famille.id,
          label: `${famille.codeFamille} - ${famille.libelleFamille}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchFamille();
    });

    return { produitSchema,
       addProduit,
        produitForm,familleOptions,
      };
  },
});
</script>