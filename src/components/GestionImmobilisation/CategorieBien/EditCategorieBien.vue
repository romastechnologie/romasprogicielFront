<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-categorieBien-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="categorieBienForm" @submit="editCategorieBien" :validation-schema="categorieBienSchema" :initial-values="categorieBienForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                    <label for="code" class="form-label">Code<span class="text-danger">*</span></label>
                    <Field name="code" class="form-control" type="text"/>
                    <ErrorMessage name="code" class="text-danger" />
            </div>
            <div class="col-md-6 mb-3">
                    <label for="libelle" class="form-label">Libellé<span class="text-danger">*</span></label>
                    <Field name="libelle" class="form-control" type="text"/>
                    <ErrorMessage name="libelle" class="text-danger"/>
            </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">

                  Modifier une catégorie de bien
              </button>
              <router-link to="/categorieBiens/liste-categorieBiens" 
                  class=" btn btn-danger"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
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
    import { CategorieBien } from '@/models/CategorieBien';
  
  export default defineComponent({
      name: "EditCategorieBien",
      components: {
      Form,
      Field,
      ErrorMessage,
      
  },
  
  setup: () => {
    const categorieBienSchema = Yup.object().shape({
        code: Yup.string().required("Le code est obligatoire."),
        libelle: Yup.string().required("Le libellé est obligatoire."),
    });

   
    const router = useRouter();
    const categorieBienForm = ref<CategorieBien>();
    const route = useRoute();
   

    onMounted(() => {
      if(route.params.id) {
        getCategorieBien(parseInt(route.params.id as string));
      }
    });

    
    function getCategorieBien(id:number) {
      ApiService.get("/categories/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            categorieBienForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editCategorieBien = async (values, {resetForm}) => {
      ApiService.put("/categories/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeCategorieBienPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

   
      return {categorieBienForm,
         categorieBienSchema,
          editCategorieBien,
          
        };
    },
  });
  </script>