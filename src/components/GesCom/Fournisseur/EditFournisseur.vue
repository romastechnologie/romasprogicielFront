<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="fournisseurForm" @submit="editFournisseur" :validation-schema="fournisseurSchema" :initial-values="fournisseurForm">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Statut<span class="text-danger">*</span>
                </label>
                <Field  name="statut"  v-slot="{ field }">
                  <Multiselect
                    :options="statut"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le statut"
                  />
                </Field>  
              </div>
              <ErrorMessage name="estPublie" class="text-danger"/>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom <span class="text-danger">*</span>
                </label>
                <Field name="nomFournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomFournisseur" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prénom <span class="text-danger">*</span>
                </label>
                <Field name="prenomFournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomFournisseur" class="text-danger"/>
              </div>
            </div> 
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse <span class="text-danger">*</span>
                </label>
                <Field name="adresseFournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresseFournisseur" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Email <span class="text-danger">*</span>
                </label>
                <Field name="email" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="email" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 1 <span class="text-danger">*</span>
                </label>
                <Field name="telFournisseur1" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telFournisseur1" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 2 
                </label>
                <Field name="telFournisseur2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telFournisseur2" class="text-danger"/>
              </div>
            </div>
            <!-- <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSociale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSociale" class="text-danger"/>
              </div>
            </div> -->
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Régistre de commerce <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  IFU <span class="text-danger">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la denomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de création <span class="text-danger">*</span>
                  </label>
                  <Field name="dateCreation" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateCreation" class="text-danger"/>
              </div>
            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un fournisseur
                </button>
                <router-link to="/fournisseurs/liste-fournisseurs" 
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
import { Fournisseur} from '@/models/Fournisseur';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditFournisseur",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const fournisseurSchema = Yup.object().shape({
      nomFournisseur: Yup.string().required('Le nom du fournisseur est obligatoire'),
      prenomFournisseur: Yup.string().required('Le prénom du fournisseur est obligatoire'),
      adresseFournisseur: Yup.string().required('L\' adresse du fournisseur est obligatoire'),
      email: Yup.string().email("Veuillez entrer un mail valide").required('L\'email est obligatoire'),
      telFournisseur1: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone 1 est obligatoire'),
      telFournisseur2: Yup.number().typeError('Veuillez entrer des chiffres').notRequired(),
      //dateNais: Yup.date().required('La date est obligatoire'),
      //raisonSociale: Yup.string().required('La raison sociale est obligatoire'),
      ifu: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'ifu est obligatoire'),
      sigle: Yup.string().notRequired(),
      denomination: Yup.string().required('La dénomination est obligatoire'),
      dateCreation: Yup.date().required('La date de création'),
      statut: Yup.string().required('Le statut est obligatoire'),
      rccm: Yup.string().required('Le rccm est obligatoire'),
    });

    const fournisseurForm = ref<Fournisseur>();
    const router = useRouter();
    const route = useRoute();

    const statut = 
      [
      {
          value: "1" ,
          label: "Personne physique"
      },
      {
          value: "2" ,
          label: "Personne Morale"
      }
    ];

    function getFournisseur(id:number) {
      ApiService.get("/fournisseurs/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            fournisseurForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editFournisseur = async (values, {resetForm}) => {
      const data = fournisseurForm.value;
      ApiService.put("/fournisseurs/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeFournisseurPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    onMounted(() => {
      if(route.params.id) {
        getFournisseur(parseInt(route.params.id as string));
      }
    });

    return { 
      fournisseurSchema, editFournisseur, fournisseurForm, statut,

    };
  },
});
</script>