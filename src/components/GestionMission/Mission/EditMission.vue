<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="missionForm" @submit="editMission" :validation-schema="missionlSchema" :initial-values="missionForm">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description <span class="text-danger">*</span>
                  </label>
                  <Field name="description" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la description"/>
                  <ErrorMessage name="description" class="text-danger"/>
                </div>
              </div>
  
  
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Destination<span class="text-danger">*</span>
                  </label>
                  <Field name="contenu" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la destination"/>
                  <ErrorMessage name="destination" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date debut<span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebut" type="date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date debut"/>
                  <ErrorMessage name="dateDebut" class="text-danger"/>
                </div>
              </div>
  

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date fin<span class="text-danger">*</span>
                  </label>
                  <Field name="dateFin" type="date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date de fin"/>
                  <ErrorMessage name="dateFin" class="text-danger"/>
                </div>
              </div>
  
            
            
              
             
              
          <div class="col-md-12 d-flex flex-column mt-3">
            <div class="d-flex align-items-center ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Modifier mission
              </button>
              <router-link to="/missions/liste-missions" 
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
  import { Mission} from '@/models/Mission';
  import * as Yup from 'yup';
  import axios from 'axios';
  import Multiselect from '@vueform/multiselect'
  
  export default defineComponent({
      name: "EditMission",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
    setup: () => {
      const missionSchema = Yup.object().shape({
        description: Yup.string().required("Description est obligatoire."),
        destination: Yup.string().required("Destination est obligatoire."),
        dateDebut: Yup.string().required("Date debut est obligatoire."),
        dateFin: Yup.string().required("Date Fin est obligatoire."),

      });
  
      const missionForm = ref<Mission>();
      const router = useRouter();
      const route = useRoute();
  
  
  
  
     
  
      function getMission(id:number) {
        ApiService.get("/missions/"+id.toString())
          .then(({ data }) => {
            for (const key in data.data) {
              missionForm.value?.setFieldValue(key, 
              (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
            );
            }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
      }
  
  
  
  const editMission = async (values, { resetForm }) => {
    try {
      const response = await ApiService.put(`/missions/${values.id}`, values);
      
      if (response.status === 200) {
        success(response.data.message);
        resetForm();
        router.push({ name: "ListeMissionPage" });
      }
    } catch (error) {
      error(error.response?.data?.message || "Une erreur est survenue.");
    }
  };
  
  
      onMounted(() => {
        if(route.params.id) {
          getMission(parseInt(route.params.id as string));
        }
      });
  
      return { 
        missionSchema, editMission, missionForm
      };
    },
  });
  </script>