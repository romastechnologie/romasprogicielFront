<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="planificationReparationForm" @submit="addPlanificationReparation" :validation-schema="planificationReparationSchema">
              <div class="row">
              <div class="col-md-4 mt-3">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refPlanificationReparation" class="form-control" type="text"/>
                    <ErrorMessage name="refPlanificationReparation" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="dateReparationPrevue" class="form-label">Date Réparation Prévue<span class="text-danger">*</span></label>
                    <Field name="dateReparationPrevue" class="form-control" type="date"/>
                    <ErrorMessage name="dateReparationPrevue" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="libelle" class="form-label">Libelle<span class="text-danger">*</span></label>
                    <Field name="libelle" class="form-control" type="text"/>
                    <ErrorMessage name="libelle" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="dateReparationReel" class="form-label">Date Réparation Réelle<span class="text-danger">*</span></label>
                    <Field name="dateReparationReel" class="form-control" type="date"/>
                    <ErrorMessage name="dateReparationReel" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="lieuReparation" class="form-label"> Lieu de réparation<span class="text-danger">*</span></label>
                    <Field name="lieuReparation"  class="form-control" type="text"/>
                    <ErrorMessage name="lieuReparation" class="text-danger" />
            </div>
  
            <div class="col-md-4 mt-3">
                    <label for="description" class="form-label"> Description<span class="text-danger">*</span></label>
                    <Field name="description"  class="form-control" type="text"/>
                    <ErrorMessage name="description" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="budgetAlloue" class="form-label"> Budget Alloué<span class="text-danger">*</span></label>
                    <Field name="budgetAlloue"  class="form-control" type="number"/>
                    <ErrorMessage name="budgetAlloue" class="text-danger" />
            </div>
            <div class="col-md-4 mt-3">
                    <label for="montantReelDepense" class="form-label"> Montant réel dépensé<span class="text-danger">*</span></label>
                    <Field name="montantReelDepense"  class="form-control" type="number"/>
                    <ErrorMessage name="montantReelDepense" class="text-danger" />
            </div>
        
            <!--<div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                 Personnel<span class="text-danger">*</span>
                </label>
                <Field name="personnel" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                   :multiple="false" :searchable="true" placeholder="Sélectionner le personnel"
                  label="label" track-by="label" />
                </Field>
                <ErrorMessage name="personnel" class="text-danger" />
              </div>
            </div>-->
            <div class="col-md-4 mt-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Panne <span class="text-danger">*</span>
                </label>
                <Field name="pannes" v-model="pannes" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="panneOptions" :preserve-search="true"
                   :multiple="false" :searchable="true" placeholder="Sélectionner la panne"
                  label="label" track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">La panne est obligatoire</span>
              </div>
            </div>
  
            
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Ajouter une planification de Reparation
              </button>
              <router-link to="/planificationReparations/liste-planificationReparations" 
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
  import { PlanificationReparation } from '@/models/PlanificationReparation';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'
  
  
  
  
  export default defineComponent({
      name: "AddPlanificationReparation",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const planificationReparationSchema = Yup.object().shape({
            refPlanificationReparation: Yup.string().required("La référence est obligatoire."),
            libelle: Yup.string().required("Le libelle est obligatoire."),
            dateReparationReel: Yup.string().required("La date est obligatoire."),
            dateReparationPrevue: Yup.string().required("La date est obligatoire."),
            description: Yup.string().required("La description est obligatoire."),
            //personnel: Yup.string().required("Le personnel est obligatoire."),
            pannes: Yup.string().required("La panne est obligatoire."),
            montantReelDepense:Yup.number().required("Le montant est obligatoire."),
            budgetAlloue:Yup.number().required("Le budget est obligatoire."),
            lieuReparation:Yup.string().required("Le lieu est obligatoire."),
      });
  
      onMounted(() => {
        getAllPersonnels();
        getAllPannes();
      });
  
      const planificationReparationForm =  ref(null);
      const showMErr = ref(false);
      const personnels = ref();
      const pannes = ref();
      const personnelOptions = ref();
      const panneOptions = ref([]);
      
      //const permissions = ref(null);
      const typeOptions = ref([]);
      const categorieOptions = ref([]);
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  
  
      const addPlanificationReparation = async (values: any, { resetForm }) => {
      values['personnels'] = personnels.value.value
      values['pannes'] = pannes.value.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/planificationReparations", values)
           .then(({ data }) => {
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListePlanificationReparation" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
       }
    };
  
    const getAllPersonnels = async () => {
          try{
          const response = await ApiService.get('/personnels');
          const personnelsData = response.data;
          console.log('Data', personnelsData)
          personnelOptions.value = personnelsData.map((personnel) => ({
            value: personnel.id,
            label: personnel.nom+ " " + personnel.prenom,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        }
        const getAllPannes= async () => {
          try{
          const response = await ApiService.get('/all/pannes');
          const pannesData = response.data.data;
          panneOptions.value = pannesData.map((panne) => ({
            value: panne.id,
            label: panne.nomPanne,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        } 
    
     
  
      return { planificationReparationSchema, addPlanificationReparation, planificationReparationForm,panneOptions,showMErr,categorieOptions,personnels,pannes,personnelOptions};
    },
  });
  </script>