<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Faire une ouverture de caisse</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form class="row g-3" :validation-schema="schema" @submit="sendOuvFer(ouvFer.tresorerieName, ouvFer.ouvFerName)">
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 mb-md-25">
              <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-10">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Billetage</h3>
                      </div>
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-2">
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">Monnaie</label>
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">Quantité</label>
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">Montant</label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <template v-for="(billetage, index) in billetageList" :key="index">
                        <Form :validation-schema="schema" class="container m-3">
                          <div class="">
                            <div class="row">
                              <div class="col-md-4">
                                <input name="monnaie" id="monnaie" placeholder="Sélectionner la monnaie"
                                  v-model="billetage.libelle" readonly class="form-control">
                              </div>
                              <div class="col-md-4">
                                <Field name="qteBillet" id="qteBillet" type="number" placeholder="Entrer la quantité"
                                  class="form-control" :value="billetage.qteBillet"
                                  @input="event => handleBilletageInput(event, billetage)"
                                  @keypress="restrictInput($event)" />
                                <ErrorMessage name="qteBillet" class="text-danger" />
                              </div>
                              <div class="col-md-4">
                                <Field name="montant" id="montant" type="text" v-model="billetage.montant"
                                  placeholder="Montant" readonly class="form-control" />
                                <ErrorMessage name="montant" class="text-danger" />
                              </div>
                            </div>
                          </div>
                        </Form>
                      </template>
                      <p class="montant-total">Montant Total : {{ montantTotal }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mt-4">
            <div class="col mb-3">
              <label class="d-block text-black fw-semibold mb-10">
                Date d'ouverture <span class="text-danger">*</span>
              </label>
              <Field name="dateOuverture" class="form-control shadow-none fs-md-15 text-black" type="datetime-local" :max="currentDateTime"
              :value="new Date().toISOString().slice(0, 16).replace('T', ' ')"/>
              <ErrorMessage name="dateOuverture" class="text-danger" />
            </div>
         
          <div class="col mb-3">
            <label for="fondDeRoulement">Fond de roulement</label>
            <Field type="number" id="fondDeRoulement" name="fondDeRoulement" class="form-control" v-model="montantTotal"
              disabled />
            <ErrorMessage name="fondDeRoulement" class="text-danger" />
          </div>
          <div class="col mb-3">
            <label for="tresorerieName">Trésorerie</label>
            <Field name="tresorerieName" v-model="tresoreries" type="text" v-slot="{ field }">
              <Multiselect v-model="tresoreries" :options="tresorerieOptions" :preserve-search="true" :multiple="false"
                :searchable="true" placeholder="Sélectionner la trésorerie" label="label" track-by="value" />
            </Field>
            <ErrorMessage name="tresorerieName" class="text-danger" />
          </div>
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Utilisateur <span class="text-danger">*</span>
              </label>
              <Field name="user" v-slot="{ field }">
                <Multiselect v-model="field.value" :options="userOptions" :searchable="true" track-by="label" mode="tags"
                  label="label" placeholder="Sélectionner l'Utilisateur" v-bind="field" />
              </Field>
              <ErrorMessage name="user" class="text-danger" />
            </div>
          </div>
          <div class="mb-3 mt-1">
            <button type="submit" class="btn btn-primary top-end">
              Envoyer
            </button>
            <router-link to="/ouv_fers/liste-ouv_fer/" type="button" class="btn btn-danger mx-1">Annuler</router-link>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ouv_Fer } from "@/models/OuvFer";
import { Tresorerie } from "@/models/Tresorerie";
import { computed, onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import * as Yup from "yup";
import { configure, Form, Field, ErrorMessage } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import { Monnaie } from "@/models/Monnaie";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import router from "@/router";
import { error } from "../../../utils/utils";

const userOptions = ref([]);
const user = ref();
const dateOuverture = ref(getCurrentDateTime());
    const currentDateTime = ref(getCurrentDateTime());
    function getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
const ouvFer = ref<Ouv_Fer>({});
const ouvFerList = ref<Ouv_Fer[]>([]);
const tresorerieList = ref<Tresorerie[]>([]);
const tresorerie = ref<Tresorerie>({});
let show = ref(true);

interface Billetage {
  montant: number;
  libelle: string;
  qteBillet: number;
  valueAct: number;
  monnaie: number;
  ouv_fer?: number;
}

const billetageList = reactive<Billetage[]>([]);
const monnaieList = ref([] as any[]);
let montantTotal = ref<null | number>(null);
const tresoreries = ref();
const tresorerieOptions = ref([]);

const schema = Yup.object().shape({
  fondDeRoulement: Yup.number()
    .nullable()
    .required("Le fond de roulement est obligatoire")
    .notOneOf([0], "Le fond de roulement ne peut pas être 0"),
  tresorerieName: Yup.string().required("La trésorerie est obligatoire"),
  qteBillet: Yup.number()
    .typeError("La quantité doit être un nombre")
    .required("La quantité est obligatoire")
    .integer("La quantité doit être un entier")
    .min(0, "La quantité ne peut pas être négative"),
    user: Yup.array().required("L'utilisateur est obligatoire"),
    dateOuverture: Yup.string().required("Date de transfert est obligatoire."),
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

// Restreindre l'entrée à des chiffres uniquement (bloquer 'e', 'E', '+', '-', '.')
const restrictInput = (event: KeyboardEvent) => {
  const invalidChars = ['e', 'E', '+', '-', '.'];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
};

async function sendOuvFer(tresorerieName: any, ouvFerName: any) {
  try {
    ouvFer.value.tresorerieId = tresoreries.value;
    const fondDeRoulement = (
      document.getElementById("fondDeRoulement") as HTMLInputElement
    ).value;
    ouvFer.value.fondDeRoulement = Number(fondDeRoulement);
    console.log("Données envoyées :", ouvFer.value);
    const res = await ApiService.post("/ouv_fers/", ouvFer.value);
    const ouvFerId = res.data.id;
    if (res.data) {
      const billetageData = billetageList.map((billetage) => ({
        ...billetage,
        ouv_fer: ouvFerId,
      }));
      await ApiService.post("/billetages/", billetageData);
      router.push("/ouv_fers/liste-ouv_fer");
      Swal.fire({
        timer: 2000,
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        text: "Ouverture réussi avec succès",
        icon: "success",
      });
    }
  } catch (err) {
    console.error("Erreur lors de l'ouverture de caisse:", err);
    if (err.code && err.code === "ERR_BAD_REQUEST") {
      const errorMessage = err.response?.data?.message || "Une erreur est survenue.";
      error(errorMessage);
    }
  }
}



const caisses = computed(() => {
  return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'));
});

const getTresorerie = async () => {
  try {
    const response = await ApiService.get('/tresoreriecaisses');
    const tresoreriesData = response.data.data.data;
    console.log("tresorerie", tresoreriesData);
    tresorerieOptions.value = tresoreriesData
      .filter(tresorerie => tresorerie.operation === true)
      .map((tresorerie) => ({
        value: tresorerie.id,
        label: tresorerie.nom,
      }));
  } catch (error) {
    // Gestion d'erreur
  }
};

const getAllAllUsers = async () => {
      try {
        const response = await ApiService.get('/all/users');
        const userData = response.data.data;
        userOptions.value = userData.map((user: any) => ({
          value: user.id,
          label: `${user.nom} ${user.prenom}`,
        }));
      } catch (err) {
        //error('Erreur lors de la récupération des utilisateurs');
      }
    };

const getouvFer = async () => {
  await ApiService.get("all/ouv_fers").then((res) => {
    ouvFerList.value = res.data;
    console.log(ouvFerList.value);
  });
};

const getAllMonnaie = async () => {
  try {
    const res = await ApiService.get("/all/monnaies");
    monnaieList.value = res.data.data.data;
    monnaieList.value.forEach((element) => {
      billetageList.push({
        libelle: element.libelle,
        montant: 0,
        valueAct: element.valeur,
        monnaie: element.id,
        qteBillet: 0,
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des monnaies:", error);
  }
};

function handleBilletageInput(event: Event, billetage: Billetage) {
  const newValue = Number((event.target as HTMLInputElement).value);
  billetage.qteBillet = newValue || 0;
  updateMontant(billetage);
}

const updateMontant = (billetage: Billetage) => {
  billetage.montant = billetage.qteBillet * billetage.valueAct || 0;
  calculateTotal();
};

const calculateTotal = () => {
  const total = billetageList.reduce((total, billetage) => {
    return total + (billetage.montant || 0);
  }, 0);
  montantTotal.value = total || null;
};

watch(
  billetageList,
  () => {
    calculateTotal();
  },
  { deep: true }
);

onMounted(() => {
  getTresorerie(), getAllMonnaie(), calculateTotal(), getAllAllUsers(), getouvFer();
});
</script>

<style scoped>
.overview {
  margin: auto;
}
.text-title {
  text-align: center;
}
.overflow {
  padding: 20px 100px;
}
.montant-total {
  text-align: right;
  font-weight: bold;
  margin-top: 10px;
}
</style>