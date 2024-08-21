<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="paieForm" @submit="addPaie" :validation-schema="paieSchema">
              <div class="row">
              <div class="col-md-4">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refPaie" class="form-control" type="text"/>
                    <ErrorMessage name="refPaie" class="text-danger" />
            </div>
           
            <div class="col-md-4 mt-3">
                    <label for="datePaie" class="form-label"> Date de Paie<span class="text-danger">*</span></label>
                    <Field name="datePaie"  class="form-control" type="Date"/>
                    <ErrorMessage name="datePaie" class="text-danger" />
            </div>
           
            <div class="col-md-4">
                    <label for="salaireBrut" class="form-label">Salaire Brut<span class="text-danger">*</span></label>
                    <Field name="salaireBrut" class="form-control" type="text"/>
                    <ErrorMessage name="salaireBrut" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="salaireNet" class="form-label">Salaire Net<span class="text-danger">*</span></label>
                    <Field name="salaireNet" class="form-control" type="text"/>
                    <ErrorMessage name="salaireNet" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="totalRetenues" class="form-label">Total des retenues<span class="text-danger">*</span></label>
                    <Field name="totalRetenues" class="form-control" type="number"/>
                    <ErrorMessage name="totalRetenues" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="totalPrimes" class="form-label">Total des primes<span class="text-danger">*</span></label>
                    <Field name="totalPrimes" class="form-control" type="number"/>
                    <ErrorMessage name="totalPrimes" class="text-danger" />
            </div>
            
         <div class="col-md-4 mt-3">
                    <label for="periode" class="form-label"> Période<span class="text-danger">*</span></label>
                    <Field name="periode"  class="form-control" type="Date"/>
                    <ErrorMessage name="periode" class="text-danger" />
         </div>
         
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mode de Paiement <span class="text-danger">*</span>
              </label>
              <Field name="modes" v-model="modes" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="modeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le type"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le mode de paiement est obligatoire</span>
            </div>
          </div>

          <!--<div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Catégorie Paie <span class="text-danger">*</span>
              </label>
              <Field name="categories" v-model="categories" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="categorieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la catégorie"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">La catégorie de paie est obligatoire</span>
            </div>
          </div>-->
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Ajouter un paie
              </button>
              <router-link to="/paies/liste-paies" 
              class=" btn btn-danger"><i
                  class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  
  import { defineComponent, onMounted, ref} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import axios from 'axios';
  import ApiService from '@/services/ApiService';
  import { Paie } from '@/models/Paie';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'


  
  
  export default defineComponent({
      name: "AddPaie",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const paieSchema = Yup.object().shape({
            refPaie: Yup.string().required("La référence est obligatoire."),
            salaireBrut: Yup.string().required("Le nom est obligatoire."),
            totalRetenues: Yup.number().typeError("veuillez entrer des nombres").required("Le cout d'aquisition est obligatoire."),
            datePaie: Yup.date().typeError("veuillez entrer une date valide").required("La date de début est obligatoire."),
            dateFin: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            periodeEssai: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            periodePaie: Yup.date().typeError("veuillez entrer une date valide").required("La date de fin est obligatoire."),
            renouvelable: Yup.string().notRequired(),
            modes: Yup.string().required("Le type est obligatoire."),
      });
  
      onMounted(() => {
        getAllModePaiements()
        //getAllCategoriePaie()
      });
  
      const paieForm =  ref(null);
      const showMErr = ref(false);
      const modes = ref();
      //const categories = ref();
      
      //const permissions = ref(null);
      const modeOptions = ref([]);
      //const categorieOptions = ref([]);
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  

      const addPaie = async (values: any, { resetForm }) => {
      values['modes'] = modes.value.value
     // values['categories'] = categories.value.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/paies", values)
           .then(({ data }) => {
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListePaie" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
       }
    };

      const getAllModePaiements = async () => {
        try{
        const response = await ApiService.get('/modepaiements');
        const modesData = response.data.data;

        modeOptions.value = modesData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      /*const getAllCategoriePaie = async () => {
        try{
        const response = await ApiService.get('/all/categories');
        const categoriesData = response.data.data;

        categorieOptions.value = categoriesData.map((categorie) => ({
          value: categorie.id,
          label: categorie.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } */
  
      return { paieSchema, addPaie, paieForm,modeOptions,showMErr,modes};
    },
  });
  </script>