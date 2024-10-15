<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="circuitForm" @submit="editCircuit" :validation-schema="circuitSchema" :initial-values="circuitForm">
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
                  Durée  <span class="text-danger">*</span>
                </label>
                <Field name="Duree" type="number" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la Durée"/>
                <ErrorMessage name="Duree" class="text-danger"/>
              </div>
            </div>
            
            <div class="col-md-6">
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
            
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier un circuit
            </button>
            <router-link to="/circuits/liste-circuits" 
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
import { Circuit} from '@/models/Circuit';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditCircuit",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const circuitSchema = Yup.object().shape({
      nom: Yup.string().required('Le nom du circuit est obligatoire'),
      Duree: Yup.number().required('La Duree est obligatoire'),
      typeDuree: Yup.string().required('Le Type de Duree est obligatoire'),
    });

    const circuitForm = ref<Circuit>();
    const router = useRouter();
    const route = useRoute();
    const typeDureeOptions = ref([]);




    typeDureeOptions.value = [{value:"jour(s)", label:"Jour(s)"}, {value:"mois", label:"Mois"},{value:"annees", label:"Annees"}]
   

    function getCircuit(id:number) {
      ApiService.get("/circuits/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            circuitForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

//     const editCircuit = (values, { resetForm }) => {
//   const data = circuitForm.value;

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



const editCircuit = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/circuits/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeCircuitPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};


    onMounted(() => {
      if(route.params.id) {
        getCircuit(parseInt(route.params.id as string));
      }
    });

    return { 
      circuitSchema, editCircuit, circuitForm, typeDureeOptions
    };
  },
});
</script>