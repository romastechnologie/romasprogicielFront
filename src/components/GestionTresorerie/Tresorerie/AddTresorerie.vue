<template>
  <main>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter une trésorerie</h3>
    </div>
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form class="col" :validation-schema="tresorerieschema" @submit="addTresorerie">
          <div class="row">
            
            <div class="col-md-4">
            <label class="d-block text-black fw-semibold mb-10">
              La trésorerie est-elle opérationnelle ?
            </label>
            <div class="form-check-size border rounded-3 p-2">
              <div class="form-check form-check-inline radio radio-primary">
                <Field class="form-check-input" id="radioinli1" v-model="operation" type="radio" name="operation" :value="true" />
                <label class="form-check-label mb-0" for="radioinli1">Oui</label>
              </div>
              <div class="form-check form-check-inline radio radio-primary">
                <Field class="form-check-input" id="radioinli2" v-model="operation" type="radio" name="operation" :value="false" />
                <label class="form-check-label mb-0" for="radioinli2">Non</label>
              </div>
              <ErrorMessage name="operation" class="text-danger" />
            </div>
          </div>

          </div>
          <div class="row mt-3">
            <div class="col-md-12 d-flex">
              <div class="flex-grow-1 me-3">
                <label>
                  Type de trésorerie <span class="text-danger">*</span>
                </label>
                <Field name="typeTresorerie" v-slot="{ field }">
                  <Multiselect :options="typeTresorerieOptions" :searchable="true" track-by="value" label="label"
                    v-model="field.value" v-bind="field" placeholder="Sélectionner le type de trésorerie" />
                </Field>
                <ErrorMessage name="typeTresorerie" class="text-danger" />
              </div>
              <div class="flex-grow-1">
                <label for="dateCreation">Date de création</label>
                <Field name="dateCreation" id="dateCreation" class="form-control" type="datetime-local" :max="currentDateTime"
                  :value="new Date().toISOString().slice(0, 16).replace('T', ' ')" />
                <ErrorMessage name="dateCreation" class="text-danger" />
              </div>
            </div>
          </div>
          <!-- Nom and Montant on the same line -->
          <div class="col-md-12 d-flex">
            <div class="me-3 flex-grow-1">
              <label for="nom">Nom de la trésorerie</label>
              <Field type="text" name="nom" id="nom" class="form-control" />
              <ErrorMessage name="nom" class="text-danger" />
            </div>
            <div class="flex-grow-1">
              <label for="montant">Montant</label>
              <Field name="montant" v-slot="{ field }">
                <input type="number" v-bind="field" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant" />
              </Field>
              
              <ErrorMessage name="montant" class="text-danger" />
            </div>
          </div>

          <!-- Submit and Cancel buttons -->
          <div class="col-6 mt-3">
            <button type="submit" class="btn btn-primary mx-2">Ajouter</button>
            <router-link to="/tresoreries/liste-tresorerie/" type="button" class="btn btn-danger">Annuler</router-link>
          </div>
        </Form>
      </div>
    </div>
  </main>

  <router-view />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { error, success } from '@/utils/utils';
import { Tresorerie } from "@/models/Tresorerie";
import ApiService from "@/services/ApiService";
import Multiselect from "@vueform/multiselect";

const router = useRouter();
const dateCreation = ref(getCurrentDateTime());
const currentDateTime = ref(getCurrentDateTime());

const tresorerie = ref({
  nom: '',
  operation: 'Non Opérationnelle',
  montant: null,
  dateCreation: '',
  typeTresorerieId: null,
});

const typeTresorerieOptions = ref([]);
const tresorerieschema = Yup.object().shape({
  nom: Yup.string().required("Le nom est obligatoire").label("Nom"),
  montant: Yup.number().required("Le montant est obligatoire").label("Montant"),
  dateCreation: Yup.string().required("La date de création est obligatoire").label("Date de création"),
  typeTresorerie: Yup.string().required("Le type de tresorerie est obligatoire").label("Type trésorerie"),
  operation: Yup.boolean().notRequired(),
});

const operation = ref(true); 
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

onMounted(() => {
  getTypeTresorerie();
  getCurrentDateTime();
  currentDateTime.value = getCurrentDateTime();
});

const getTypeTresorerie = async () => {
  try {
    const res = await ApiService.get("/all/typeTresoreries");
    if (res.data && res.data.data && Array.isArray(res.data.data.data)) {
      const tresorerieArray = res.data.data.data;
      typeTresorerieOptions.value = tresorerieArray.map((tresorerie: any) => ({
        value: tresorerie.id,
        label: tresorerie.libelle,
      }));
    } else {
      console.error("Unexpected response format:", res.data);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des types de trésoreries", error);
  }
};

const addTresorerie = async (values, { resetForm }) => {
  ApiService.post("/tresoreries", values)
    .then(({ data }) => {
      if (data.code == 201) {
        success(data.message);
        resetForm();
        router.push({ name: "ListeTresoreriePage" });
      }
    }).catch(({ response }) => {
      error(response.data.message);
    });

    return {
            dateCreation,
            currentDateTime,
            getCurrentDateTime,
         operation
        };
};

</script>
