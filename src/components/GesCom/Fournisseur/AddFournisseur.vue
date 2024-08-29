<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="fournisseurForm" @submit="addFournisseur" :validation-schema="fournisseurSchema">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Statut<span class="text-danger">*</span>
                </label>
                <Field  name="statut" v-model="defaultStatut"  v-slot="{ field }">
                  <Multiselect
                    :options="statut"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le statut"
                    @select="handleObjetInput"
                  />
                </Field>  
              </div>
              <ErrorMessage name="statut" class="text-danger"/>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom du fournisseur<span class="text-danger">*</span>
                </label>
                <Field name="nomfournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomfournisseur" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prénom du fournisseur<span class="text-danger">*</span>
                </label>
                <Field name="prenomfournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomfournisseur" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse 
                </label>
                <Field name="adressefournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adressefournisseur" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Email
                </label>
                <Field name="emailfournisseur" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="emailfournisseur" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sexe <span class="text-danger">*</span>
              </label>
              <Field  name="sexe"  type="text"  v-slot="{ field }">
                <Multiselect
                  :searchable = "true"
                  :options = "['Masculin', 'Féminin']"
                  v-model = "field.value"
                  v-bind = "field"
                  placeholder="Sélectionner le sexe"
                />
              </Field>
                <ErrorMessage name="sexe" class="text-danger"/>
            </div>
          </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 1 <span class="text-danger">*</span>
                </label>
                <Field name="telephone1" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone1" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 2 
                </label>
                <Field name="telephone2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de naissance 
                  </label>
                  <Field name="dateNais" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateNais" class="text-danger"/>
              </div>
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la denomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSociale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSociale" class="text-danger"/>
              </div>
            </div>
           <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  IFU <span class="text-danger">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Régistre de commerce <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
           
            <div class="col-md-4" v-if="!showAdditionalFields">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de création 
                  </label>
                  <Field name="dateCreation" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateCreation" class="text-danger"/>
              </div>
            <div class="col-md-12 mt-3">
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

import { defineComponent, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Fournisseur } from '@/models/Fournisseur';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "AddFournisseur",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const fournisseurSchema = Yup.object().shape({
      nomfournisseur: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le nom du fournisseur est obligatoire")
          : schema
      }),
      prenomfournisseur: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le prénom du fournisseur est obligatoire")
          : schema
      }),
      sexe: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le sexe est obligatoire")
          : schema
      }),
      raisonSociale: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.required("Le nom du fournisseur est obligatoire")
          : schema
      }),
      dateCreation: Yup.date().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.notRequired()
          : schema
      }),
      dateNais: Yup.date().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.notRequired()
          : schema
      }),
      adressefournisseur: Yup.string().notRequired(),
      emailfournisseur: Yup.string().email("Veuillez entrer un mail valide").notRequired(),
      telephone1: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone 1 est obligatoire'),
      telephone2: Yup.number().typeError('Veuillez entrer des chiffres').notRequired(),
      ifu: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'ifu est obligatoire'),
      sigle: Yup.string().notRequired(),
      denomination: Yup.string().required('La dénomination est obligatoire'),
      statut: Yup.string().required('Le statut est obligatoire'),
    });

    const fournisseurForm =  ref<Fournisseur | null>(null);
    const router = useRouter();
    const defaultStatut = ref(1);
    const showAdditionalFields = ref(true);

    const handleObjetInput = (selectedValue) => {
      showAdditionalFields.value = selectedValue === 1;
    }

    const statut = 
      [
      {
          value: 1 ,
          label: "Personne Physique"
      },
      {
          value: 2 ,
          label: "Personne Morale"
      }
    ];

    const addfournisseur= async (values, {resetForm}) => {
      ApiService.post("/fournisseurs",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeFournisseurPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { fournisseurSchema,
       addfournisseur,
        fournisseurForm,statut,
        showAdditionalFields,
        handleObjetInput,
        defaultStatut,
      };
  },
});
</script>