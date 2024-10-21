<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="roleetapForm" @submit="editRoleEtap" :validation-schema="roleetapSchema" :initial-values="roleetapForm">
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
                    Code<span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                  <ErrorMessage name="code" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ordre <span class="text-danger">*</span>
                  </label>
                  <Field name="ordre" type="number" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer ordre"/>
                  <ErrorMessage name="ordre" class="text-danger"/>
                </div>
              </div>
              
             
              
          <div class="col-md-12 d-flex flex-column mt-3">
            <div class="d-flex align-items-center ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Modifier Role etape
              </button>
              <router-link to="/roleetaps/liste-roleetaps" 
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
  import { RoleEtap} from '@/models/RoleEtap';
  import * as Yup from 'yup';
  import axios from 'axios';
  import Multiselect from '@vueform/multiselect'
  
  export default defineComponent({
      name: "EditRoleEtap",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
    setup: () => {
      const roleetapSchema = Yup.object().shape({
        libelle: Yup.string().required("Libellé est obligatoire."),
        code: Yup.string().required("Code est obligatoire."),
        ordre: Yup.number().required("Ordre est obligatoire."),
      });
  
      const roleetapForm = ref<RoleEtap>();
      const router = useRouter();
      const route = useRoute();

  
      function getRoleEtap(id:number) {
        ApiService.get("/roleetaps/"+id.toString())
          .then(({ data }) => {
            for (const key in data.data) {
              roleetapForm.value?.setFieldValue(key, 
              (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
            );
            }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
      }
  
  
  
  const editRoleEtap = async (values, { resetForm }) => {
    try {
      const response = await ApiService.put(`/roleetaps/${values.id}`, values);
      
      if (response.status === 200) {
        success(response.data.message);
        resetForm();
        router.push({ name: "ListeRoleEtapPage" });
      }
    } catch (error) {
      error(error.response?.data?.message || "Une erreur est survenue.");
    }
  };
  
  
      onMounted(() => {
        if(route.params.id) {
          getRoleEtap(parseInt(route.params.id as string));
        }
      });
  
      return { 
        roleetapSchema, editRoleEtap, roleetapForm
      };
    },
  });
  </script>