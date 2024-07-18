<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-amortissement-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="amortissementForm" @submit="editAmortissement" :validation-schema="amortissementSchema" :initial-values="amortissementForm">
            <div class="row">
              <div class="col-md-6">
                    <label for="taux" class="form-label">Taux d'amortissement</label>
                    <Field name="taux" class="form-control" type="number"/>
                    <ErrorMessage name="taux" class="text-danger"/>
            </div>
            <div class="col-md-6">
                    <label for="valeurNetteComptable" class="form-label">Valeur Nette Comptable</label>
                    <Field name="valeurNetteComptable" class="form-control" type="number"/>
                    <ErrorMessage name="valeurNetteComptable" class="text-danger"/>
            </div>
            <div class="col-md-6">
                    <label for="dureeUtilisation" class="form-label">Duree Utilisation</label>
                    <Field name="dureeUtilisation" class="form-control" type="number"/>
                    <ErrorMessage name="dureeUtilisation" class="text-danger" />
            </div>
          
            <div class="col-md-6 mb-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Bien <span class="text-danger">*</span>
              </label>
              <Field name="biens" v-model="biens" type="text" v-slot="{ field }">
              <VueMultiselect v-model="field.value" v-bind="field" :options="typeOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le bien"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le bien est obligatoire</span>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success m-2"
                type="submit">
                  Modifier un amortissement
              </button>
              <router-link to="/amortissements/liste-amortissements" 
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
    import { Amortissement } from '@/models/Amortissement';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
    import VueMultiselect from 'vue-multiselect'
  
  export default defineComponent({
      name: "EditAmortissement",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
      
  },
  
  setup: () => {
    const amortissementSchema = Yup.object().shape({
        taux: Yup.number().required('Le taux est obligatoire'),
        valeurNetteComptable: Yup.number().required("La valeur nette comptable est obligatoire."),
        dureeUtilisation: Yup.number().required("La durée d'utilisation est obligatoire."),
    });

    const typeOptions = ref([]);
    const router = useRouter();
    const amortissementForm = ref<Amortissement>();
    const route = useRoute();
    const showMErr = ref(false);
    const biens = ref();
   

    onMounted(() => {
        getAllBiens();
      if(route.params.id) {
        getAmortissement(parseInt(route.params.id as string));
      }
    });

    
    function getAmortissement(id:number) {
      ApiService.get("/amortissements/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            amortissementForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editAmortissement = async (values, {resetForm}) => {
      ApiService.put("/amortissements/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeAmortissementPage" });
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
   
      return {amortissementForm,
         amortissementSchema,
          editAmortissement,
          typeOptions,
          showMErr,
          biens
          
        };
    },
  });
  </script>