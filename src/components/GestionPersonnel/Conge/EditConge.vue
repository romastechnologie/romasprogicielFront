<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="congeForm" @submit="editConge" :validation-schema="congeSchema" :initial-values="congeForm">
        <div class="row">
          
       

            <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date" />
              <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
          </div>

      <!--  <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fin prévu <span class="text-danger">*</span>
              </label>
              <Field name="dateFinPrevu" type="date" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date" />
              <ErrorMessage name="dateFinPrevu" class="text-danger" />
            </div>
          </div>-->   

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de reprise <span class="text-danger">*</span>
              </label>
              <Field name="dateReprise" type="date" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date" />
              <ErrorMessage name="dateReprise" class="text-danger" />
            </div>
          </div>
            
          
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date fin <span class="text-danger">*</span>
              </label>
              <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date" />
              <ErrorMessage name="dateFin" class="text-danger" />
            </div>
          </div>

        
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
               Programmer maintenant
              </button>
              <router-link to="/conges/liste-conges" class=" btn btn-danger "><i
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

import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Conge} from '@/models/Conge';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditConge",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const congeSchema = Yup.object().shape({
      dateDebut: Yup.string().required("Date Début est obligatoire."),
      dateReprise: Yup.string().required("Date Reprise est obligatoire."),
     // dateFinPrevu: Yup.string().required("Date Fin Prévu est obligatoire."),
      dateFin: Yup.string().required("Date Fin est obligatoire."),
    });

    const congeForm = ref<Conge>();
    const router = useRouter();
    const route = useRoute();

  function getConge(id:number) {
      ApiService.get("/conge/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            congeForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

const editConge = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/conges/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeCongePage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};


    onMounted(() => {
      if(route.params.id) {
        getConge(parseInt(route.params.id as string));
      }
    });

    return { 
      congeSchema, editConge, congeForm
    };
  },
});
</script>