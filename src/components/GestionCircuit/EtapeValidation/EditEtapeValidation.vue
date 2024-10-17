<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="etapeValidationForm" @submit="editEtapeValidation" :validation-schema="etapeValidationSchema" :initial-values="circuitForm">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Nom  <span class="text-danger">*</span>
                  </label>
                  <Field name="nom" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                  <ErrorMessage name="nom" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ordre  <span class="text-danger">*</span>
                  </label>
                  <Field name="Ordre" type="number" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ordre "/>
                  <ErrorMessage name="Ordre" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Statut  <span class="text-danger">*</span>
                  </label>
                  <Field name="statut" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Statut "/>
                  <ErrorMessage name="statut" class="text-danger"/>
                </div>
              </div>
  
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Durée  <span class="text-danger">*</span>
                  </label>
                  <Field name="Duree" type="number" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la Durée"/>
                  <ErrorMessage name="Duree" class="text-danger"/>
                </div>
              </div>
              
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Type de Durée <span class="text-danger">*</span>
                  </label>
                  <Field  name="typeDuree"  v-slot="{ field }">
                    <Multiselect
                      :options="typeDureeOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model = "field.value"
                      v-bind = "field"
                      placeholder="Sélectionner le Type de Durée"
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
                  <Field name="roleetap" v-slot="{ field }">
                    <Multiselect v-model="field.value" v-bind="field" :options="roleEtapOptions"
                      :preserve-search="true" :multiple="false" :searchable="true"
                      placeholder="Sélectionner le role etap" label="label" track-by="label" />
                  </Field>
                  <ErrorMessage name="roleetap" class="text-danger" />
                </div>
              </div>    

              
          <div class="col-md-12 d-flex flex-column mt-3">
            <div class="d-flex align-items-center ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Modifier une Etape Validation
              </button>
              <router-link to="/etapeValidations/liste-etapeValidations" 
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
  import { EtapeValidation} from '@/models/EtapeValidation';
  import * as Yup from 'yup';
  import axios from 'axios';
  import Multiselect from '@vueform/multiselect'
  
  export default defineComponent({
      name: "EditEtapeValidation",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
    setup: () => {
      const etapeValidationSchema = Yup.object().shape({
        nom: Yup.string().required("Le nom de l'etape validation est obligatoire"),
        Ordre: Yup.string().required("L'ordre de l'etape validation est obligatoire"),
        statut: Yup.string().required("Le statut de l'etape validation est obligatoire"), 
        Duree: Yup.number().required("La Durée de l'etape validation est obligatoire"),
        typeDuree: Yup.string().required("Le Type Durée de l'etape validation est obligatoire"),
        circuit: Yup.string().required("Le Type Durée de l'etape validation est obligatoire"),
        // roleetap: Yup.string().required("Le Type Durée de l'etape validation est obligatoire"),

      });
  

      onMounted(async () => {
      await getAllCircuits();
      await getAllRoleEtaps();


      });

      const etapeValidationForm = ref<EtapeValidation>();
      const router = useRouter();
      const route = useRoute();
      const typeDureeOptions = ref([]);
      const circuitOptions = ref([]);
      const roleEtapOptions = ref([]);

  
  
  
  
      typeDureeOptions.value = [{value:"jour(s)", label:"Jour(s)"}, {value:"mois", label:"Mois"},{value:"annees", label:"Annees"}]
     
  
      function getEtapeValidation(id:number) {
        ApiService.get("/etapeValidations/"+id.toString())
          .then(({ data }) => {
            for (const key in data.data) {
              etapeValidationForm.value?.setFieldValue(key, 
              (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
            );
            }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
      }
  
  //     const editCircuit = (values, { resetForm }) => {
  //   const data = etapeValidationForm.value;
  
  //   // Vérifie si `data` et `data.id` existent
  //   if (!data || !data.id) {
  //     error("Données du circuit invalides ou ID manquant");
  //     return;
  //   }
  
  //   // Envoi de la requête PUT avec les données du formulaire
  //   ApiService.put("/circuits/" + data.id, data)
  //     .then((response) => {
  //       // Vérifie si la réponse HTTP est un succès (200 OK)
  //       if (response.status === 200) {
  //         success(response.data.message);  // Affiche le message de succès
  //         resetForm();                      // Réinitialise le formulaire après la modification
  //         router.push({ name: "ListeCircuitPage" });  // Redirige vers la page de liste des circuits
  //       } else {
  //         error("Une erreur inattendue s'est produite");  // Gestion des réponses inattendues
  //       }
  //     })
  //     .catch(({ response }) => {
  //       // Gestion des erreurs de l'API
  //       if (response && response.data && response.data.message) {
  //         error(response.data.message);  // Affiche le message d'erreur venant du backend
  //       } else {
  //         error("Une erreur s'est produite lors de la modification du circuit");  // Message générique
  //       }
  //     });
  // };
  
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
  
  
  const editEtapeValidation = async (values, { resetForm }) => {
    try {
      const response = await ApiService.put(`/etapeValidations/${values.id}`, values);
      
      if (response.status === 200) {
        success(response.data.message);
        resetForm();
        router.push({ name: "ListeEtapeValidationPage" });
      }
    } catch (error) {
      error(error.response?.data?.message || "Une erreur est survenue.");
    }
  };
  
  
      onMounted(() => {
        if(route.params.id) {
          getEtapeValidation(parseInt(route.params.id as string));
        }
      });
  
      return { 
     
      etapeValidationSchema, editEtapeValidation, etapeValidationForm, typeDureeOptions,circuitOptions,
      roleEtapOptions };
    },
  });
  </script>