<template>
    <div class="card mb-25 border-0 rounded-0 bg-white edit-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="planificationReparationForm" @submit="editPlanificationReparation" :validation-schema="planificationReparationSchema">
              <div class="row">
                <div class="col-md-4">
                    <label for="ref" class="form-label">Référence<span class="text-danger">*</span></label>
                    <Field name="refPlanificationReparation" class="form-control" type="text"/>
                    <ErrorMessage name="refPlanificationReparation" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="dateReparationPrevue" class="form-label">Date Réparation Prévue<span class="text-danger">*</span></label>
                    <Field name="dateReparationPrevue" class="form-control" type="date"/>
                    <ErrorMessage name="dateReparationPrevue" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="libelle" class="form-label">Compteur Initial<span class="text-danger">*</span></label>
                    <Field name="libelle" class="form-control" type="text"/>
                    <ErrorMessage name="libelle" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="dateReparationReel" class="form-label">Date Réparation Prévue<span class="text-danger">*</span></label>
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
            <div class="col-md-6 mb-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black mb-10">
                  Panne <span class="text-danger">*</span>
                </label>
                <Field name="pannes" v-model="pannes" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="panneOptions" :preserve-search="true"
                   :multiple="false" :searchable="true" placeholder="Sélectionner le panne"
                  label="label" track-by="label" />
                </Field>
                <span class="text-danger" v-if="showMErr">La panne est obligatoire</span>
              </div>
            </div>
  
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Modifier une planification de réparation
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
  
  import { useRouter, useRoute } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'
  
  
  
  
  export default defineComponent({
      name: "EditPlanificationReparation",
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
        if(route.params.id) {
        getPlanificationReparation(parseInt(route.params.id as string));
      }
      });
  
      const planificationReparationForm =  ref(null);
      const showMErr = ref(false);
      const personnels = ref();
      const pannes = ref();
      const route = useRoute();
      const personnelOptions = ref();
      const panneOptions = ref([]);
      
      //const permissions = ref(null);
      const typeOptions = ref([]);
      const categorieOptions = ref([]);
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
  
  
      function getPlanificationReparation(id:number) {
      ApiService.get("/planificationReparations/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            planificationReparationForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editPlanificationReparation = async (values, {resetForm}) => {
      ApiService.put("/planificationReparations/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListePlanificationReparationPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };


  
    const getAllPersonnels = async () => {
          try{
          const response = await ApiService.get('/personnels');
          const personnelsData = response.data.data.data;
          console.log('Data', personnelsData)
          personnelOptions.value = personnelsData.map((personnel) => ({
            value: personnel.id,
            label: personnel.nom,
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
    
     
  
      return { planificationReparationSchema, editPlanificationReparation, planificationReparationForm,panneOptions,showMErr,categorieOptions,personnels,pannes,personnelOptions};
    },
  });
  </script>