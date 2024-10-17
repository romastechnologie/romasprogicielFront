<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="etapeValidationForm" @submit="addEtapeValidation" :validation-schema="etapeValidationSchema">
          <div class="row">

            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom<span class="text-danger">*</span>
                  </label>
                  <Field name="nom" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom "/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ordre<span class="text-danger">*</span>
                  </label>
                  <Field name="Ordre" type="number" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ordre "/>
                  <ErrorMessage name="Ordre" class="text-danger"/>
                </div>
              </div>
  
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Statut <span class="text-danger">*</span>
                  </label>
                  <Field name="statut" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la Durée"/>
                  <ErrorMessage name="statut" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Durée <span class="text-danger">*</span>
                  </label>
                  <Field name="Duree" type="number" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la Durée"/>
                  <ErrorMessage name="Duree" class="text-danger"/>
                </div>
              </div>
            <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Type Durée <span class="text-danger">*</span>
                  </label>
                  <Field  name="typeDuree"  v-slot="{ field }">
                    <Multiselect
                      :options="typeDureeOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionner le type de Duree"
                    />
                  </Field>  
                </div>
                <ErrorMessage name="typeDuree" class="text-danger"/>
              </div>

              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Circuit <span class="text-danger">*</span>
                  </label>
                  <Field name="circuit" v-slot="{ field }">
                    <Multiselect v-model="field.value" v-bind="field" :options="circuitOptions"
                      :preserve-search="true" :multiple="false" :searchable="true"
                      placeholder="Sélectionner le circuit" label="label" track-by="label" />
                  </Field>
                  <ErrorMessage name="circuit" class="text-danger" />
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Role Etape <span class="text-danger">*</span>
                  </label>
                  <Field name="roleetap" type="text" v-slot="{ field }">
                    <Multiselect v-model="field.value" v-bind="field" :options="roleEtapOptions"
                      :preserve-search="true" :multiple="false" :searchable="true"
                      placeholder="Sélectionner le role etap" label="label" track-by="label" />
                  </Field>
                  <ErrorMessage name="roleetap" class="text-danger" />
                </div>
              </div>      
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button class="btn btn-success me-3" type="submit">
                  Ajouter une Etape de Validation
                </button>
                <router-link to="/etapeValidations/liste-etapeValidations" class=" btn btn-danger "><i
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
  import { EtapeValidation} from '@/models/EtapeValidation';
  import { error, success,ajouterPeriode } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import axios from 'axios';
  
  
  export default defineComponent({
    name: "AddEtapeValidation ",
    components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
  
    setup: () => {
      const etapeValidationSchema = Yup.object().shape({
        nom: Yup.string().required("Le nom est obligatoire."),
        Ordre: Yup.string().required("L'ordre est obligatoire."),
        statut: Yup.string().required("Le statut est obligatoire."),
        Duree: Yup.number().required("La Durée est obligatoire."),
        typeDuree: Yup.string().required("Le type de Duree est obligatoire."),
        circuit: Yup.string().required("Le circuit est obligatoire."),
        // roleetap: Yup.string().required("Le Role Etap est obligatoire."),
        
      });
  
      onMounted(async () => {
      await getAllCircuits();
      await getAllRoleEtaps();


      });
  
      const etapeValidationForm = ref(null);
      const typeDuree = ref();
      const nom = ref();
      //const showMErr = ref(false);
      //const permissions = ref(null);
      const router = useRouter();
      // const permissions= ref<Array<Permission>>([]);
      const typeDureeOptions = ref([]);
    const circuitOptions = ref([]);
    const roleEtapOptions = ref([]);



  
      typeDureeOptions.value = [{value:"jour(s)", label:"Jour(s)"}, {value:"mois", label:"Mois"},{value:"annees", label:"Annees"}]
  
  
  
      const getAllCircuits = async () => {
      try {
        const response = await ApiService.get('/all/circuits');
        const circuitsData = response.data.data.data;
        console.log('Data', circuitsData)
        circuitOptions.value = circuitsData.map((circuit) => ({
          value: circuit.id,
          label: circuit.nom,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }
     
    
    const getAllRoleEtaps = async () => {
      try {
        const response = await ApiService.get('/all/roleEtaps');
        const roleEtapsData = response.data.data.data;
        console.log('Data', roleEtapsData)
        roleEtapOptions.value = roleEtapsData.map((roleEtap) => ({
          value: roleEtap.id,
          label: roleEtap.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }
      const addEtapeValidation = async (values, {resetForm}) => {
        ApiService.post("/etapeValidations",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeEtapeValidationPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };

      
  
      return { etapeValidationSchema,
         addEtapeValidation,
          etapeValidationForm,typeDureeOptions,circuitOptions,roleEtapOptions
        };
      
    },
  });
  </script>