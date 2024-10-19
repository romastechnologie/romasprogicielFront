<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="modelForm" @submit="addModel" :validation-schema="modelSchema">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                  <ErrorMessage name="libelle" class="text-danger"/>
                </div>
              </div>
  
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Contenu <span class="text-danger">*</span>
                  </label>
                  <Field name="contenu" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le contenu"/>
                  <ErrorMessage name="contenu" class="text-danger"/>
                </div>
              </div>
         
              
           
         
          
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button class="btn btn-success me-3" type="submit">
                  Ajouter Model
                </button>
                <router-link to="/models/liste-models" class=" btn btn-danger "><i
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
    name: "AddModel",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
  
    setup: () => {
      const modelSchema = Yup.object().shape({
        libelle: Yup.string().required("Libellé est obligatoire."),
        contenu: Yup.string().required("Contenu est obligatoire."),

      });
  
      onMounted(async () => {
      });
  
      const modelForm = ref(null);
      const libelle = ref();
      const contenu = ref();

    
      const router = useRouter();
  
  
  
  
     
      const addModel = async (values, {resetForm}) => {
        ApiService.post("/models",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeModelPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
  
      return { modelSchema,
         addModel,
          modelForm,
        };
      
    },
  });
  </script>