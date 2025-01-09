<template>
    <main>
        <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
                <Form class="col" :validation-schema="tresorerieschema" @submit="addTresorerie">
                    <div class="row">
                        <!-- Radio Buttons -->
                        <div class="col-12 d-flex my-3">
                            <div class="form-check me-3">
                                <input class="form-check-input" type="radio" name="operation" id="nonOperationnelle" value="Non Opérationnelle" v-model="tresorerie.operation" />
                                <label class="form-check-label" for="nonOperationnelle">
                                    Non Opérationnelle
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="operation" id="operationnelle" value="Opérationnelle" v-model="tresorerie.operation" />
                                <label class="form-check-label" for="operationnelle">
                                    Opérationnelle
                                </label>
                            </div>
                        </div>

                        <!-- Nom and Montant on the same line -->
                        <div class="col-md-12 d-flex">
                            <div class="me-3 flex-grow-1">
                                <label for="nom">Nom</label>
                                <Field type="text" name="nom" id="nom" class="form-control" />
                                <ErrorMessage name="nom" class="text-danger" />
                            </div>
                            <div class="flex-grow-1">
                                <label for="montant">Montant</label>
                                <Field type="number" name="montant" id="montant" class="form-control" placeholder="Entrer le montant" />
                                <ErrorMessage name="montant" class="text-danger" />
                            </div>
                        </div>

                        <div class="col-md-12 d-flex mt-3">
                            <div class="me-3 flex-grow-1">
                                <label for="dateCreation">Date de création</label>
                                <Field  name="dateCreation" id="dateCreation" class="form-control"  type="datetime-local" :value="new Date().toISOString().slice(0, 16).replace('T', ' ')"  
                                />
                                <ErrorMessage name="dateCreation" class="text-danger" />
                            </div>
                           

                            <div class="flex-grow-1">
                                <label>
                  Type de trésorerie <span class="text-danger">*</span>
                </label>
                <Field name="typeTresorerie" v-slot="{ field }">
                  <Multiselect
                    :options="typeTresorerieOptions"
                    :searchable="true"
                    track-by="value"
                    label="label"
                    v-model="field.value"
                    v-bind="field"
                    placeholder="Sélectionner le type de trésorerie"
                  />
                </Field>
              <ErrorMessage name="typeTresorerie" class="text-danger" />
          </div>

                        </div>

                        <!-- Submit and Cancel buttons -->
                        <div class="col-6 mt-3">
                            <button type="submit" class="btn btn-primary mx-2">Ajouter</button>
                            <router-link to="/tresoreries/liste-tresorerie/" type="button" class="btn btn-danger">Annuler</router-link>
                        </div>
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

});

const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const currentDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      return currentDate;
    };

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});

onMounted(() => {
    getTypeTresorerie();
    getCurrentDate();
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


const addTresorerie  = async (values, {resetForm}) => {
        ApiService.post("/tresoreries",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeTresoreriePage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };
  
</script>
