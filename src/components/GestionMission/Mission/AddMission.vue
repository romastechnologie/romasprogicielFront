<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="missionForm" @submit="addMission" :validation-schema="missionSchema">
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
                    Destination <span class="text-danger">*</span>
                  </label>
                  <Field name="destination" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la destination"/>
                  <ErrorMessage name="destination" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date debut  <span class="text-danger">*</span>
                  </label>
                  <Field name="datedebut" type="Date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date début"/>
                  <ErrorMessage name="datedebut" class="text-danger"/>
                </div>
              </div>
         
              
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date fin  <span class="text-danger">*</span>
                  </label>
                  <Field name="datefin" type="Date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date fin"/>
                  <ErrorMessage name="dateFin" class="text-danger"/>
                </div>
              </div>
           
         
          
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button class="btn btn-success me-3" type="submit">
                  Ajouter Mission
                </button>
                <router-link to="/missions/liste-missions" class=" btn btn-danger "><i
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
  
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import ApiService from '@/services/ApiService';
  import { Document } from '@/models/Document';
  import { error, success,ajouterPeriode } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import axios from 'axios';
  
  
  export default defineComponent({
    name: "AddMission",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
  
    setup: () => {
      const missionSchema = Yup.object().shape({
        description: Yup.string().required("Description est obligatoire."),
        destination: Yup.string().required("Destination est obligatoire."),
        datedebut: Yup.string().required("Date debut est obligatoire."),
        datefin: Yup.string().required("Date fin est obligatoire."),

      });
  
      onMounted(async () => {
      });
  
      const missionForm = ref(null);
      const description = ref();
      const destination= ref();
      const datedebut= ref();
      const datefin= ref();



    
      const router = useRouter();
  
  
  
  
     
      const addMission = async (values, {resetForm}) => {
        ApiService.post("/missions",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeMissionPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
  
      return { missionSchema,
         addMission,
          missionForm,
        };
      
    },
  });
  </script>