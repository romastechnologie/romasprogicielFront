<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-document-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="documentForm" @submit="editDocument" :validation-schema="documentSchema" :initial-values="documentForm">
            <div class="row">
              <div class="col-md-6 mt-3">
                    <label for="nom" class="form-label">Nom Document<span class="text-danger">*</span></label>
                    <Field name="nom" class="form-control" type="text"/>
                    <ErrorMessage name="nom" class="text-danger" />
            </div>
            <div class="col-md-6 mt-3">
                    <label for="telephone" class="form-label">Téléphone<span class="text-danger">*</span></label>
                    <Field name="telephone" class="form-control" type="number"/>
                    <ErrorMessage name="telephone" class="text-danger" />
            </div>
            <div class="col-md-6 mt-3">
                    <label for="adresse" class="form-label">Adresse</label>
                    <Field name="adresse" class="form-control" type="text"/>
                    <ErrorMessage name="adresse" class="text-danger" />
            </div>
           
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Modifier un Document
              </button>
              <router-link to="/documents/liste-documents" 
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
    import { defineComponent, onMounted, ref} from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { Document } from '@/models/Document';
  
  export default defineComponent({
      name: "EditDocument",
      components: {
      Form,
      Field,
      ErrorMessage,
      
  },
  
  setup: () => {
    const documentSchema = Yup.object().shape({
        nom: Yup.string().required("Le nom est obligatoire."),
            telephone: Yup.string().required("Le téléphone est obligatoire."),
            adresse: Yup.string().notRequired(),
    });

   
    const router = useRouter();
    const documentForm = ref<Document>();
    const route = useRoute();
   

    onMounted(() => {
      if(route.params.id) {
        getDocument(parseInt(route.params.id as string));
      }
    });

    
    function getDocument(id:number) {
      ApiService.get("/documents/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            documentForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editDocument = async (values, {resetForm}) => {
      ApiService.put("/documents/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeDocument" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

   
      return {documentForm,
         documentSchema,
          editDocument,
          
        };
    },
  });
  </script>