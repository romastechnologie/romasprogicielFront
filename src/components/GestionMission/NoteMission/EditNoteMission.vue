<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="noteMissionForm" @submit="editNoteMission" :validation-schema="circuitSchema" :initial-values="noteMissionForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Objet  <span class="text-danger">*</span>
                </label>
                <Field name="objet" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'objet"/>
                <ErrorMessage name="objet" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Budget  <span class="text-danger">*</span>
                </label>
                <Field name="budget" type="number" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Budjet"/>
                <ErrorMessage name="budget" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Contenue  <span class="text-danger">*</span>
                </label>
                <Field name="contenue" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Contenue"/>
                <ErrorMessage name="contenue" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Référence  <span class="text-danger">*</span>
                </label>
                <Field name="reference" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la référence"/>
                <ErrorMessage name="reference" class="text-danger"/>
              </div>
            </div>    
            
        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center ">
            <button
              class="btn btn-success me-3"
              type="submit"
            >
                Modifier une Note Mission
            </button>
            <router-link to="/noteMissions/liste-noteMissions" 
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
import * as Yup from 'yup';
import axios from 'axios';
import { NoteMission } from '@/models/NoteMission';

import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditNoteMission",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const noteMissionSchema = Yup.object().shape({
      objet: Yup.string().required("L'objet est obligatoire"),
      budget: Yup.number().required("Le Budget est obligatoire"),
      contenue: Yup.string().required("Le contenue est obligatoire"),
      reference: Yup.string().required("La Référence est obligatoire "),

    });

    const noteMissionForm = ref<NoteMission>();
    const router = useRouter();
    const route = useRoute();




   

    function getNoteMission(id:number) {
      ApiService.get("/noteMissions/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            noteMissionForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

//     const editNoteMission = (values, { resetForm }) => {
//   const data = noteMissionForm.value;

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



const editNoteMission = async (values, { resetForm }) => {
  try {
    const response = await ApiService.put(`/noteMissions/${values.id}`, values);
    
    if (response.status === 200) {
      success(response.data.message);
      resetForm();
      router.push({ name: "ListeNoteMissionPage" });
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};


    onMounted(() => {
      if(route.params.id) {
        getNoteMission(parseInt(route.params.id as string));
      }
    });

    return { 
      noteMissionSchema, editNoteMission, noteMissionForm,
    };
  },
});
</script>