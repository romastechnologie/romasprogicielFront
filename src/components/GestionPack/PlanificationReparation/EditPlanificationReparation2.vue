<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
    <Form ref="planificationReparationForm" @submit="editPlanificationReparation" :validation-schema="planificationReparationSchema" :initial-values="planificationReparationForm">
      <div class="row">
            
<h3 class="text-center mb-4">
  Voulez-vous traiter l'action sur le bien <strong>{{ planificationReparationForm?.bien?.nomBien }}</strong> ?
</h3>
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

          
            
           
            
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier 
            </button>
            <router-link to="/planificationReparations/liste-planificationReparations" 
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
import {PlanificationReparation} from '@/models/PlanificationReparation';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditPlanificationReparation",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const planificationReparationSchema = Yup.object().shape({
      dateReparationReel: Yup.string().required("La date est obligatoire."),
          description: Yup.string().required("La description est obligatoire."),
         montantReelDepense:Yup.number().required("Le montant est obligatoire."),
    });

    const planificationReparationForm  = ref<PlanificationReparation>();
    const router = useRouter();
    const route = useRoute();



   /* function getPlanificationReparation(id:number) {
      ApiService.get("/planificationReparations/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            planificationReparationForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }*/
    const editPlanificationReparation = async (values, { resetForm }) => {
  try {
    const updatedValues = {
      ...values,
      estRepare: true, 
    };
    const response = await ApiService.put(`/planificationReparations/${values.id}`, updatedValues);
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListePlanificationReparationPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};
    onMounted(() => {
      if(route.params.id) {
       // getPlanificationReparation(parseInt(route.params.id as string));
      }
    });

    return { 
      planificationReparationSchema,editPlanificationReparation, planificationReparationForm
    };
  },
});
</script>

