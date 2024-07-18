<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="categorieBienForm" @submit="addCategorieBien" :validation-schema="categorieBienSchema">
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

                  Créer une catégorie de bien
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
  import ApiService from '@/services/ApiService';
  import { CategorieBien } from '@/models/CategorieBien';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  
  
  export default defineComponent({
      name: "AddCategorieBien",
      components: {
      Form,
      Field,
      ErrorMessage,
      //Multiselect
    },
  
    setup: () => {
      const categorieBienSchema = Yup.object().shape({
        code: Yup.string().required("Le code est obligatoire."),
        libelle: Yup.string().required("Le libellé est obligatoire."),
      });
  
      onMounted(() => {
        getAllTypeCategorieBien()
      });
  
      const categorieBienForm =  ref(null);
      //const permissions = ref(null);
      const typeOptions = ref([]);
      const router = useRouter();
      //const permissions= ref<Array<Permission>>([]);
      const addCategorieBien = async (values,{ resetForm }) => {
        values = values as CategorieBien;
        ApiService.post("/categories",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message)
            resetForm();
            router.push({ name: "ListeCategorieBien" });
          }
        }).catch(({ response }) => {
          error(response.message);
        });
      }
  
      const getAllTypeCategorieBien = async () => {
        try{
        const response = await ApiService.get('/all/types');
        const typesData = response.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
  
      return { categorieBienSchema, addCategorieBien, categorieBienForm,typeOptions};
    },
  });
  </script>