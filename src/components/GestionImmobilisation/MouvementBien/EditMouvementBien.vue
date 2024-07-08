<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-mouvement-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="mouvementForm" @submit="editMouvement" :validation-schema="mouvementSchema" :initial-values="mouvementForm">
            <div class="row">
              <div class="col-md-4">
                    <label for="refMouvement" class="form-label">Référence</label>
                    <Field name="refMouvement" class="form-control" type="text"/>
                    <ErrorMessage name="refMouvement" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="typeMouvement" class="form-label">Type</label>
                    <Field name="typeMouvement" class="form-control" type="text"/>
                    <ErrorMessage name="typeMouvement" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="dateMouvement" class="form-label">Date Mouvement</label>
                    <Field name="dateMouvement" class="form-control" type="date"/>
                    <ErrorMessage name="dateMouvement" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="infosComplementaire" class="form-label">Infos complementaire</label>
                    <Field name="infosComplementaire" class="form-control" type="text"/>
                    <ErrorMessage name="infosComplementaire" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="ancienEmplacement" class="form-label">Ancien Emplacement</label>
                    <Field name="ancienEmplacement" class="form-control" type="text"/>
                    <ErrorMessage name="ancienEmplacement" class="text-danger"/>
            </div>
            <div class="col-md-4">
                    <label for="nouvelEmplacement" class="form-label">Nouvel Emplacement</label>
                    <Field name="nouvelEmplacement" class="form-control" type="text"/>
                    <ErrorMessage name="nouvelEmplacement" class="text-danger" />
            </div>
            
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Bien <span class="text-danger">*</span>
                </label>
                <Field  name="bien"  v-slot="{ field }">
                  <Multiselect
                    :options="typeOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le bien"
                  />
                </Field>
                <ErrorMessage name="bien" class="text-danger"/>
              </div>
          </div> 
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"
              >
                  Modifier un Mouvement
              </button>
              <router-link to="/liste-mouvementbiens" 
                  class=" btn btn-danger transition border-0 lh-1 fw-medium"><i class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
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
    import { MouvementBien } from '@/models/MouvementBien';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
  
  export default defineComponent({
      name: "EditMouvementBien",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
      
  },
  
  setup: () => {
    const mouvementSchema = Yup.object().shape({
            refMouvement: Yup.string().required("La référence est obligatoire."),
            typeMouvement: Yup.string().required("Le type est obligatoire."),
            dateMouvement: Yup.date().required("la date est obligatoire."),
            infosComplementaire: Yup.string().notRequired(),
            ancienEmplacement: Yup.string().notRequired(),
            nouvelEmplacement: Yup.string().notRequired()
    });

    const typeOptions = ref([]);
    const router = useRouter();
    const mouvementForm = ref<MouvementBien>();
    const route = useRoute();
   

    onMounted(() => {
        getAllBiens();
      if(route.params.id) {
        getMouvementBien(parseInt(route.params.id as string));
      }
    });

    
    function getMouvementBien(id:number) {
      ApiService.get("/mouvementBiens/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            mouvementForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editMouvement = async (values, {resetForm}) => {
      ApiService.put("/mouvementBiens/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeMouvementBienPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };
    const getAllBiens= async () => {
        try{
        const response = await ApiService.get('/all/biens');
        const typesData = response.data.data;
        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.nomBien,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 
   
      return {mouvementForm,
         mouvementSchema,
          editMouvement,
          typeOptions,
          
        };
    },
  });
  </script>