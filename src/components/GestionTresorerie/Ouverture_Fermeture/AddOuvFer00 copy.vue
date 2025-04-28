<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Faire une ouverture de caisse</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form class="row g-3" :validation-schema="schema" @submit="sendOuvFer">
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
            <Field
              name="dateOuverture"
              class="form-control shadow-none fs-md-15 text-black"
              type="datetime-local"
              :max="currentDateTime"
              v-model="dateOuverture"
            />
            <ErrorMessage name="dateOuverture" class="text-danger" />
          </div>
          <div class="col mb-3">
            <label for="fondDeRoulement">Fond de roulement</label>
            <Field
              type="number"
              id="fondDeRoulement"
              name="fondDeRoulement"
              class="form-control"
              v-model="montantTotal"
              disabled
            />
            <ErrorMessage name="fondDeRoulement" class="text-danger" />
          </div>
          <div class="col mb-3">
            <label for="tresorerie">Trésorerie</label>
            <Field name="tresorerie" v-model="tresoreries" type="text" v-slot="{ field }">
              <Multiselect v-model="tresoreries" :options="tresorerieOptions" :preserve-search="true" :multiple="false"
                :searchable="true" placeholder="Sélectionner la trésorerie" label="label" track-by="value" />
            </Field>
            <ErrorMessage name="tresorerie" class="text-danger" />
          </div>
          <div class="col-md-12 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Utilisateur <span class="text-danger">*</span>
              </label>
              <Field name="user" v-slot="{ field }">
                <Multiselect
                  v-model="user"
                  :options="userOptions"
                  :searchable="true"
                  track-by="value"
                  mode="tags"
                  label="label"
                  placeholder="Sélectionner l'Utilisateur"
                  v-bind="field"
                />
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
import { OuvFer } from "@/models/OuvFer";
import { Tresorerie } from "@/models/Tresorerie";
import { computed, onMounted, reactive, ref, watch } from "vue";
import * as Yup from "yup";
import { configure, Form, Field, ErrorMessage } from "vee-validate";
import Multiselect from "@vueform/multiselect";
import { Monnaie } from "@/models/Monnaie";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import router from "@/router";

interface Ouv_Fer {
  id: number;
  tresorerieId: number;
  fondDeRoulement: number;
  solde: number;
  dateOuverture: string;
  status: string;
  userIds: number[];
  userCreationId: number;
}

interface Billetage {
  montant: number;
  libelle: string;
  qteBillet: number;
  valueAct: number;
  monnaie: number;
  ouv_fer: number;
}

const userOptions = ref([]);
const user = ref<number[]>([]);
const dateOuverture = ref(getCurrentDateTime());
const currentDateTime = ref(getCurrentDateTime());

function getCurrentDateTime() {
  console.log("[getCurrentDateTime] Calcul de la date actuelle");
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const dateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  console.log("[getCurrentDateTime] Date calculée:", dateTime);
  return dateTime;
}

const ouvFer = ref<Ouv_Fer>({});
const ouvFerList = ref<Ouv_Fer[]>([]);
const tresorerieList = ref<Tresorerie[]>([]);
const tresorerie = ref<Tresorerie>({});
const billetageList = reactive<Billetage[]>([]);
const monnaieList = ref([] as any[]);
let montantTotal = ref<null | number>(null);
const tresoreries = ref<number | null>(null);
const userCreation = ref<number | null>(null);
const tresorerieOptions = ref([]);

const schema = Yup.object().shape({
  fondDeRoulement: Yup.number()
    .nullable()
    .required("Le fond de roulement est obligatoire")
    .notOneOf([0], "Le fond de roulement ne peut pas être 0"),
  tresorerie: Yup.string().required("La trésorerie est obligatoire"),
  qteBillet: Yup.number()
    .typeError("La quantité doit être un nombre")
    .required("La quantité est obligatoire")
    .integer("La quantité doit être un entier")
    .min(0, "La quantité ne peut pas être négative"),
  user: Yup.array()
    .min(1, "Au moins un utilisateur doit être sélectionné")
    .required("L'utilisateur est obligatoire"),
  dateOuverture: Yup.string().required("La date d'ouverture est obligatoire"),
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});

const restrictInput = (event: KeyboardEvent) => {
  console.log("[restrictInput] Touche pressée:", event.key);
  const invalidChars = ["e", "E", "+", "-", "."];
  if (invalidChars.includes(event.key)) {
    console.log("[restrictInput] Caractère non autorisé, bloqué:", event.key);
    event.preventDefault();
  }
};

async function sendOuvFer() {
  console.log("[sendOuvFer] Début de la soumission du formulaire");
  try {
    console.log("[sendOuvFer] Valeurs du formulaire:", {
      tresorerieId: tresoreries.value,
      fondDeRoulement: montantTotal.value,
      solde: montantTotal.value,
      dateOuverture: dateOuverture.value,
      userIds: user.value,
      userCreationId: userCreation.value,
    });

    if (!userCreation.value) {
      console.error("[sendOuvFer] userCreationId manquant");
      throw new Error("L'utilisateur créateur n'est pas défini.");
    }

    ouvFer.value.tresorerieId = tresoreries.value;
    ouvFer.value.fondDeRoulement = montantTotal.value;
    ouvFer.value.solde = montantTotal.value;
    ouvFer.value.dateOuverture = dateOuverture.value;
    ouvFer.value.status = "OPEN";
    ouvFer.value.userIds = user.value;
    ouvFer.value.userCreationId = userCreation.value;

    console.log("[sendOuvFer] Données envoyées:", ouvFer.value);

    console.log("[sendOuvFer] Envoi de la requête à /ouv_fers/");
    const res = await ApiService.post("/ouv_fers/", ouvFer.value);
    console.log("[sendOuvFer] Réponse de l'API:", res.data);

    const ouvFerId = res.data.id;
    if (res.data) {
      const billetageData = billetageList.map((billetage) => ({
        ...billetage,
        ouv_fer: ouvFerId,
      }));
      console.log("[sendOuvFer] Envoi des données de billetage:", billetageData);
      await ApiService.post("/billetages/", billetageData);
      console.log("[sendOuvFer] Billetage envoyé avec succès");

      console.log("[sendOuvFer] Redirection vers /ouv_fers/liste-ouv_fer");
      router.push( { name: "ListeOuvFerPage" });
      Swal.fire({
        timer: 2000,
        position: "top-end",
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        text: "Ouverture réussie avec succès",
        icon: "success",
      });
    }
  } catch (err) {
    console.error("[sendOuvFer] Erreur lors de l'ouverture de caisse:", err);
    const errorMessage = err.response?.data?.message || "Une erreur est survenue.";
    Swal.fire({
      timer: 3000,
      position: "top-end",
      toast: true,
      showConfirmButton: false,
      timerProgressBar: true,
      text: errorMessage,
      icon: "error",
    });
  }
}

const caisses = computed(() => {
  console.log("[caisses] Calcul des caisses filtrées");
  const filtered = tresorerieList.value.filter((entity) => entity.nom?.toLowerCase().includes("caisse"));
  console.log("[caisses] Caisses filtrées:", filtered);
  return filtered;
});

const getTresorerie = async () => {
  try {
    console.log("[getTresorerie] Récupération des trésoreries...");
    const response = await ApiService.get("/tresoreriecaisses");
    const tresoreriesData = response.data.data.data;
    tresorerieOptions.value = tresoreriesData
      .filter((tresorerie) => tresorerie.operation === true)
      .map((tresorerie) => ({
        value: tresorerie.id,
        label: tresorerie.nom,
      }));
    console.log("[getTresorerie] Trésoreries récupérées:", tresorerieOptions.value);
  } catch (error) {
    console.error("[getTresorerie] Erreur lors de la récupération des trésoreries:", error);
  }
};

const getAllAllUsers = async () => {
  try {
    console.log("[getAllAllUsers] Récupération des utilisateurs...");
    const response = await ApiService.get("/all/users");
    const userData = response.data.data;
    userOptions.value = userData.map((user: any) => ({
      value: user.id,
      label: `${user.nom} ${user.prenom}`,
    }));
    console.log("[getAllAllUsers] Utilisateurs récupérés:", userOptions.value);
  } catch (err) {
    console.error("[getAllAllUsers] Erreur lors de la récupération des utilisateurs:", err);
  }
};

const getouvFer = async () => {
  try {
    console.log("[getouvFer] Récupération des ouv_fer...");
    const res = await ApiService.get("/all/ouv_fers");
    ouvFerList.value = res.data;
    console.log("[getouvFer] Ouv_fer récupérés:", ouvFerList.value);
  } catch (error) {
    console.error("[getouvFer] Erreur lors de la récupération des ouv_fer:", error);
  }
};

const getAllMonnaie = async () => {
  try {
    console.log("[getAllMonnaie] Récupération des monnaies...");
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
    console.log("[getAllMonnaie] Monnaies récupérées:", monnaieList.value);
    console.log("[getAllMonnaie] Billetage initialisé:", billetageList);
  } catch (error) {
    console.error("[getAllMonnaie] Erreur lors de la récupération des monnaies:", error);
  }
};

function handleBilletageInput(event: Event, billetage: Billetage) {
  console.log("[handleBilletageInput] Entrée détectée pour billetage:", billetage.libelle);
  const newValue = Number((event.target as HTMLInputElement).value);
  billetage.qteBillet = newValue || 0;
  console.log("[handleBilletageInput] Nouvelle quantité:", billetage.qteBillet);
  updateMontant(billetage);
}

const updateMontant = (billetage: Billetage) => {
  console.log("[updateMontant] Mise à jour du montant pour:", billetage.libelle);
  billetage.montant = billetage.qteBillet * billetage.valueAct || 0;
  console.log("[updateMontant] Nouveau montant:", billetage.montant);
  calculateTotal();
};

const calculateTotal = () => {
  console.log("[calculateTotal] Calcul du montant total...");
  const total = billetageList.reduce((total, billetage) => {
    return total + (billetage.montant || 0);
  }, 0);
  montantTotal.value = total || null;
  console.log("[calculateTotal] Montant total calculé:", montantTotal.value);
};

watch(
  billetageList,
  () => {
    console.log("[watch:billetageList] Changement détecté dans billetageList");
    calculateTotal();
  },
  { deep: true }
);

onMounted(() => {
  console.log("[onMounted] Initialisation du composant...");
  getTresorerie();
  getAllMonnaie();
  calculateTotal();
  getAllAllUsers();
  getouvFer();

  // Simuler un userCreationId pour les tests (à remplacer)
  userCreation.value = userCreation;
  console.log("[onMounted] userCreationId initialisé:", userCreation.value);
  console.log("[onMounted] État initial:", {
    tresoreries: tresoreries.value,
    user: user.value,
    dateOuverture: dateOuverture.value,
    montantTotal: montantTotal.value,
  });
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