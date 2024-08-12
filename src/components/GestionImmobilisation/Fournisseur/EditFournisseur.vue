<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-fournisseur-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="fournisseurForm" @submit="editFournisseur" :validation-schema="fournisseurSchema" :initial-values="fournisseurForm">
            <div class="row">
              <div class="col-md-6 mt-3">
                    <label for="nom" class="form-label">Nom Fournisseur<span class="text-danger">*</span></label>
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
                  Modifier un Fournisseur
              </button>
              <router-link to="/fournisseurs/liste-fournisseurs" 
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
    import { Fournisseur } from '@/models/Fournisseur';
  
  export default defineComponent({
      name: "EditFournisseur",
      components: {
      Form,
      Field,
      ErrorMessage,
      
  },
  
  setup: () => {
    const fournisseurSchema = Yup.object().shape({
        nom: Yup.string().required("Le nom est obligatoire."),
            telephone: Yup.string().required("Le téléphone est obligatoire."),
            adresse: Yup.string().notRequired(),
    });

   
    const router = useRouter();
    const fournisseurForm = ref<Fournisseur>();
    const route = useRoute();
   

    onMounted(() => {
      if(route.params.id) {
        getFournisseur(parseInt(route.params.id as string));
      }
    });

    
    function getFournisseur(id:number) {
      ApiService.get("/fournisseurs/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            fournisseurForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editFournisseur = async (values, {resetForm}) => {
      ApiService.put("/fournisseurs/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeFournisseur" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

   
      return {fournisseurForm,
         fournisseurSchema,
          editFournisseur,
          
        };
    },
  });
  </script>