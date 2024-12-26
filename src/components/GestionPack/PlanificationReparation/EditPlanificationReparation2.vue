<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="planificationReparationForm" @submit="editPlanificationReparation" :validation-schema="planificationReparationSchema" :initial-values="planificationReparationForm">
            <div class="row">

              <h3 class="text-center mb-4">Voulez-vous traiter l'action sur le bien "{{ planificationReparationForm?.bien?.libelle }}" ?</h3>

          
          <div class="col-md-4 mt-3">
                  <label for="dateReparationReel" class="form-label">Date Réalisation<span class="text-danger">*</span></label>
                  <Field name="dateReparationReel" class="form-control" type="date"/>
                  <ErrorMessage name="dateReparationReel" class="text-danger" />
          </div>
        
          <div class="col-md-4 mt-3">
                  <label for="description" class="form-label"> Description<span class="text-danger">*</span></label>
                  <Field name="description"  class="form-control" type="text"/>
                  <ErrorMessage name="description" class="text-danger" />
          </div>
       
          <div class="col-md-4 mt-3">
                  <label for="montantReelDepense" class="form-label"> Montant réel dépensé<span class="text-danger">*</span></label>
                  <Field name="montantReelDepense"  class="form-control" type="number"/>
                  <ErrorMessage name="montantReelDepense" class="text-danger" />
          </div>
      
          
        
          
        <div class="col-md-12 mt-3">
          <div class="d-flex align-items-center ">
            <button class="btn btn-success me-3" type="submit">
                Modifier une planification de Reparation
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
import { useRoute, useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';
import VueMultiselect from 'vue-multiselect';

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
         // reference: Yup.string().required("La référence est obligatoire."),
        //  libelle: Yup.string().required("Le libelle est obligatoire."),
          dateReparationReel: Yup.string().required("La date est obligatoire."),
         // dateReparationPrevue: Yup.string().required("La date est obligatoire."),
          description: Yup.string().required("La description est obligatoire."),
          //personnel: Yup.string().required("Le personnel est obligatoire."),
       //   bien: Yup.string().required("La bien est obligatoire."),
       //   panne: Yup.string().required("La panne est obligatoire."),
       //   montantReelDepense:Yup.number().required("Le montant est obligatoire."),
          budgetAlloue:Yup.number().required("Le budget est obligatoire."),
        //  lieuReparation:Yup.string().required("Le lieu est obligatoire."),
    });

    onMounted(() => {
      getAllPannes();
      getAllBiens();
      /*if(route.params.id) {
        getPlanificationReparation(parseInt(route.params.id as string));
      }*/
    });

    const showMErr = ref(false);
    const personnels = ref();
    const pannes = ref();
    const personnelOptions = ref();
    const panneOptions = ref([]);

    const biens = ref();
    const bienOptions = ref([]);
    
    //const permissions = ref(null);
    const typeOptions = ref([]);
    const categorieOptions = ref([]);
    const router = useRouter();
    //const permissions= ref<Array<Permission>>([]);
    const planificationReparationForm  = ref<PlanificationReparation>();
    const route = useRoute();
 
    /*function getPlanificationReparation(id: number) {
  ApiService.get(`/planificationReparations/${id.toString()}`)
    .then(({ data }) => {
      console.log("donnée", data);
      const planificationData = data.data;
      for (const key in planificationData) {
        if (planificationReparationForm.value) {
          planificationReparationForm.value[key] = 
            typeof planificationData[key] === 'object' && planificationData[key] !== null
              ? planificationData[key].id 
              : planificationData[key];
        }
      }
      if (planificationData.bien) {
        planificationReparationForm.value.bien = planificationData.bien;
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
}

const editPlanificationReparation = async (values, { resetForm }) => {
  try {
    values["estRepare"] = true;
    const response = await ApiService.put(`/planificationReparations/${values.id}`, values);
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListePlanificationReparationPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};*/

      const getAllPannes= async () => {
        try{
        const response = await ApiService.get('/all/pannes');
        const pannesData = response.data.data.data;
        console.log("panne", pannesData);
        panneOptions.value = pannesData.map((panne) => ({
          value: panne.id,
          label: panne.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      const getAllBiens= async () => {
        try{
        const response = await ApiService.get('/all/biens');
        const biensData = response.data.data.data;
        console.log("bien", biensData);
        bienOptions.value = biensData.map((bien) => ({
          value: bien.id,
          label: bien.nomBien,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
   

    return { planificationReparationSchema, planificationReparationForm,panneOptions,bienOptions,showMErr,categorieOptions,personnels,pannes,biens,personnelOptions};
  },
});
</script>

