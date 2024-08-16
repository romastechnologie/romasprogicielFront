<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-typeBien-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="typeBienForm" @submit="editTypeBien" :validation-schema="typeBienSchema" :initial-values="typeBienForm">
            <div class="row">
          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Code <span class="text-danger">*</span>
              </label>

              <Field name="code" class="form-control" type="text" />

              <ErrorMessage name="code" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Libelle <span class="text-danger">*</span>
              </label>
              <Field name="libelle" class="form-control" type="text" />
              <ErrorMessage name="libelle" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Modifier un type de bien
              </button>
              <router-link to="/typebiens/liste-typebiens" class=" btn btn-danger"><i
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
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { TypeBien } from '@/models/TypeBien';
  
  export default defineComponent({
      name: "EditTypeBien",
      components: {
      Form,
      Field,
      ErrorMessage,
      
  },
  
  setup: () => {
    const typeBienSchema = Yup.object().shape({
        code: Yup.string().required("Le code est obligatoire."),
        libelle: Yup.string().required("Le libellé est obligatoire."),
    });

   
    const router = useRouter();
    const typeBienForm = ref<TypeBien>();
    const route = useRoute();
   

    onMounted(() => {
      if(route.params.id) {
        getTypeBien(parseInt(route.params.id as string));
      }
    });

    
    function getTypeBien(id:number) {
      ApiService.get("/types/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            typeBienForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editTypeBien = async (values, {resetForm}) => {
      ApiService.put("/types/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeTypeBien" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

   
      return {typeBienForm,
         typeBienSchema,
          editTypeBien,
          
        };
    },
  });
  </script>