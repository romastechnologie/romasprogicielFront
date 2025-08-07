<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="societeForm" @submit="editSociete" :validation-schema="societeSchema" :initial-values="societeForm">
          <div class="row">
            <div class="col-md-4 mt-20">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle 
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination<span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la dénomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSocial" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSocial" class="text-danger"/>
              </div>
            </div>
             <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                   Siège social <span class="text-danger">*</span>
                  </label>
                  <Field name="siegeSocial" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le contenu"/>
                  <ErrorMessage name="siegeSocial" class="text-danger"/>
                </div>
              </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  N° RCCM <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
            
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  N° IFU <span class="text-danger">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone <span class="text-danger">*</span>
                </label>
                <Field name="telephone" v-model="telephone"  v-slot="{ field }">
                  <vue-tel-input
                    placeholder="Entrer le numéro de téléphone"
                    v-model = "field.value"
                    v-bind = "field"
                    defaultCountry="BJ"
                    mode="international"
                    @validate="validate"
                    class ="shadow-none fs-md-15 text-black py-2">
                  </vue-tel-input>
                </Field>
                <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                 <ErrorMessage name="telephone" class="text-danger"/>
              </div>
            </div>
            
           
      <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                   Date de création <span class="text-danger">*</span>
                  </label>
                  <Field name="dateCreation" type="date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le contenu"/>
                  <ErrorMessage name="dateCreation" class="text-danger"/>
                </div>
              </div>

              
           <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                   Nom représentant <span class="text-danger">*</span>
                  </label>
                  <Field name="nomRep" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nomRep" class="text-danger"/>
                </div>
              </div>

                   <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                   Prénom représentant <span class="text-danger">*</span>
                  </label>
                  <Field name="prenomRep" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                  <ErrorMessage name="prenomRep" class="text-danger"/>
                </div>
              </div>

               <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                   Fonction représentant <span class="text-danger">*</span>
                  </label>
                  <Field name="fonctionRep" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la fonction"/>
                  <ErrorMessage name="fonctionRep" class="text-danger"/>
                </div>
              </div>

                <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone représentant <span class="text-danger">*</span>
                </label>
                <Field name="telephoneRep" v-model="telephoneRep"  v-slot="{ field }">
                  <vue-tel-input
                    placeholder="Entrer le téléphone de représentant"
                    v-model = "field.value"
                    v-bind = "field"
                    defaultCountry="BJ"
                    mode="international"
                    @validate="validate"
                    class ="shadow-none fs-md-15 text-black py-2">
                  </vue-tel-input>
                </Field>
                <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                <ErrorMessage name="telephoneRep" class="text-danger"/>
              </div>
            </div>
              
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier société
            </button>
            <router-link to="/societes/liste-societes" 
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
import { Societe} from '@/models/Societe';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect';
  import VueMultiselect from 'vue-multiselect';
  import { countries } from '@/utils/countries';
  import 'vue3-tel-input/dist/vue3-tel-input.css';
  import { VueTelInput } from 'vue3-tel-input';

export default defineComponent({
    name: "EditSociete",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueMultiselect,
    VueTelInput
  },
  setup: () => {
    const societeSchema = Yup.object().shape({
        denomination: Yup.string().required('La dénomination est obligatoire'),
      rccm: Yup.string().required('Le registre de commerce est obligatoire'),
      dateCreation: Yup.string().required('Date création est obligatoire'),
      raisonSocial: Yup.string().required('La raison sociale est obligatoire'),
      ifu: Yup.string()
      .matches(/^\d{13}$/, 'La saisie doit avoir exactement 13 chiffres')
      .min(13,"La saisie doit avoir exactement 13 chiffres").max(13, "La saisie doit avoir exactement 13 chiffres")
      .required('L\'ifu est obligatoire'),
        sigle: Yup.string().notRequired(),
        siegeSocial: Yup.string().required("Libellé est obligatoire."),
        nomRep: Yup.string().required("Le nom du représentant est obligatoire."),
        fonctionRep: Yup.string().required("La fonction du représentant est obligatoire."),
        prenomRep: Yup.string().required("Le prenom du représentant est obligatoire."),
        telephone: Yup.number().typeError('Veuillez entrer des chiffres').required('Le téléphone est obligatoire'),
        telephoneRep: Yup.number().typeError('Veuillez entrer des chiffres').required('Le téléphone est obligatoire'),
    });
    const societeForm = ref<Societe>();
    const router = useRouter();
    const route = useRoute();
    const  codepay= ref();
    const  nationalnumlber= ref();
    const  telephone=ref();
    const telephoneRep = ref("");
    const  validPhone=ref<boolean>(false);
    const validPhoneRep = ref(false);
    const  numberPhone=ref();
    const  countriesRef = ref(countries);
    const  numeroNational = ref();
    const  defaultCountriy = 'Bénin';
    function onInput(phone, phoneObject, input) {
      //
    }
    function validate(phoneObject) {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid == true) {
        telephone.value = phoneObject.number;
        codepay.value= phoneObject.countryCallingCode;
        nationalnumlber.value = phoneObject.nationalNumber;
        numberPhone.value = phoneObject.nationalNumber;
      }else{
        telephone.value="";
        codepay.value= "";
        nationalnumlber.value= "";
        numberPhone.value="";
      }
    }
    const validatePhoneRep = (phoneObject) => {
  validPhoneRep.value = phoneObject.valid;
  if (phoneObject.valid) {
    telephoneRep.value = phoneObject.number;
  } else {
    telephoneRep.value = "";
  }
};
    function getSociete(id: number) {
  ApiService.get(`/societes/${id}`)
    .then(({ data }) => {
      console.log("société", data);
      const societeData = data.data;
      for (const key in societeData) {
        let value = societeData[key];
        if (key === 'dateCreation' && value) {
          value = new Date(value).toISOString().slice(0, 10);
        }
         if (typeof value === 'object' && value !== null && 'id' in value) {
          value = value.id;
        }
        societeForm.value?.setFieldValue(key, value);
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
}

const editSociete = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/societes/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeSocietePage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};
    onMounted(() => {
      if(route.params.id) {
        getSociete(parseInt(route.params.id as string));
      }
    });
    return { 
      societeSchema, editSociete,societeForm,
      validPhone,
           countries: countriesRef, 
           defaultCountriy,
           numeroNational,
           telephone,validate,onInput,telephoneRep,validatePhoneRep
    };
  },
});
</script>