<template>
  <div class="p-5">
    <div class="card p-3 pb-1">
      <div class="row gx-3 flex-wrap">
        <div class="col-12 d-flex justify-content-center">
          <div class="" id="heuresup">
            <div class="">
              <Form @submit="sendHeureSup" :validation-schema="schemaHeureSup()">
                <p class="my-0"> Date </p>
                <Field type="date" name="date" id="date" class="form-control mb-1" />
                <ErrorMessage name="date" class="text-danger text-start mb-2" />
                <p class="my-0"> Personnel </p>
                <!-- <select name="heureSupPersonnelId" id="heureSupPersonnelId" class="form-select mb-1">
                  <option disabled selected> Choisir le personnel </option>
                  <option :value=personnel.id v-for="personnel in personnels" :key="personnel.id"> {{
                    personnel.nom + " " + personnel.prenom }} </option>
                </select> -->
                <Field name="personnelId" v-model="perso" v-slot="{ field }">
                  <VueMultiselect v-model="field.value" v-bind="field" :options="personnelOptions"
                    :close-on-select="true" :clear-on-select="false" :multiple="false" :searchable="true"
                    placeholder="Sélectionner le personnel" label="label" track-by="label" />
                </Field>
                <p class="my-0"> Durée </p>
                <Field type="text" name="duree" id="duree" class="form-control mb-1" />
                <ErrorMessage name="duree" class="text-danger text-start mb-2" />
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary"> Envoyer </button>
                  <router-link to="/heureSupps/liste-heureSupp">
                    <button type="submit" class="btn btn-danger">
                      Annuler </button>
                  </router-link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <!-- Demande -->

  <!-- Heure supplémentaire -->


</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
import VueMultiselect from 'vue-multiselect'
import ApiService from '@/services/ApiService';

const router = useRouter()

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const personnelOptions = ref([] as any[]);
const changeConge = ref(true);
const selectAll = ref<boolean>(true);
const selectedPersonnels = ref<number[]>([])

const personnels = ref([] as any[]);
const presences = ref([] as any[]);
const demande = ref([] as any[]);
const conges = ref([] as any[]);
const personnelsEnConge = ref<number[]>([]);
const enConge = ref([] as any[]);

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// ----------------------------------------- SCHEMA -----------------------------------------

function schemaHeureSup() {
  return yup.object().shape({
    date: yup.string().required("La date est obligatoire."),
    // personnel: yup.string().required("Le personnel est obligatoire."),
    duree: yup.string().required("La durrée est obligatoire."),
  })
}

// --------------------------------------- SEND FORMULAIRE ------------------------------------
const perso = ref();

async function sendHeureSup(value: object) {

  try {
    const response = await ApiService.post(`/heureSups/${perso.value.value}`, value);
    Swal.fire({
      timer: 1500,
      position: "top-end",
      text: "Heure supplémentaire ajoutée avec succès!",
      icon: "success"
    });
    router.push("/heureSupps/liste-heureSupp")
  } catch (error) {
    console.error('Erreur lors de la création due l\'heure supplementaire:', error);
    throw error;
  }
}

// --------------------------------------------------- GET ---------------------------------------

const getAllPersonnels = async () => {
  try {
    const response = await ApiService.get("/personnels");
    personnels.value = response.data;
    personnelOptions.value = response.data.map((personnel: any) => ({
      value: personnel.id,
      label: `${personnel.nom + " " + personnel.prenom}`
    }));
    console.log(personnels);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPersonnels();
})


</script>

<style>
a {
  font-weight: bold;
  color: white;
  text-decoration: none;

  &.router-link-exact-active {
    color: white;
    background-color: #7A70BA
  }

  &.router-link-exact-active:hover {
    color: white;
  }

}
</style>