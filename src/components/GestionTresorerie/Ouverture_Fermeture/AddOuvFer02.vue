<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-header">
      <h3 class="text-black fw-semibold">Faire une ouverture de caisse</h3>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form class="row g-3" :validation-schema="schema" @submit="sendOuvFer">
        <div class="col-md-6">
          <div class="mb-3">
            <label class="d-block text-black mb-10">
              Date d'ouverture <span class="text-danger">*</span>
            </label>
            <Field
              name="dateOuverture"
              type="datetime-local"
              class="form-control"
              :max="currentDateTime"
              v-model="dateOuverture"
            />
            <ErrorMessage name="dateOuverture" class="text-danger" />
          </div>
          <div class="mb-3">
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
          <div class="mb-3">
            <label class="d-block text-black mb-10">
              Trésorerie <span class="text-danger">*</span>
            </label>
            <Field name="tresorerie" type="text" v-slot="{ field }">
              <Multiselect
                v-model="field.value"
                v-bind="field"
                :options="tresorerieOptions"
                :preserve-search="true"
                :multiple="false"
                :searchable="true"
                placeholder="Sélectionner la trésorerie"
                label="label"
                track-by="value"
              />
            </Field>
            <ErrorMessage name="tresorerie" class="text-danger" />
          </div>
          <div class="mb-3">
            <label class="d-block text-black mb-10">
              Utilisateur <span class="text-danger">*</span>
            </label>
            <Field name="user" v-slot="{ field }">
              <Multiselect
                v-model="field.value"
                v-bind="field"
                :options="userOptions"
                :searchable="true"
                :multiple="true"
                track-by="value"
                label="label"
                mode="tags"
                placeholder="Sélectionner l'utilisateur"
              />
            </Field>
            <ErrorMessage name="user" class="text-danger" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="border border-primary mb-10">
            <div class="row d-flex align-items-center justify-content-between fw-bold py-2" style="background-color: #0a59a4">
              <div class="col-md-7">
                <h3 class="fs-4 text-white">Billetage</h3>
              </div>
            </div>
            <div class="p-10">
              <div class="row d-flex align-items-center justify-content-between mt-2">
                <div class="col-md-4">
                  <label class="d-block text-black fw-semibold">Monnaie</label>
                </div>
                <div class="col-md-4">
                  <label class="d-block text-black fw-semibold">Quantité</label>
                </div>
                <div class="col-md-4">
                  <label class="d-block text-black fw-semibold">Montant</label>
                </div>
              </div>
              <hr class="mt-0" />
              <template v-for="(billetage, index) in billetageList" :key="index">
                <Form :validation-schema="schema" class="container m-3">
                  <div class="row">
                    <div class="col-md-4">
                      <input
                        name="monnaie"
                        id="monnaie"
                        placeholder="Sélectionner la monnaie"
                        v-model="billetage.libelle"
                        readonly
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="qteBillet"
                        id="qteBillet"
                        type="number"
                        placeholder="Entrer la quantité"
                        class="form-control"
                        :value="billetage.qteBillet"
                        @input="event => handleBilletageInput(event, billetage)"
                        @keypress="restrictInput($event)"
                      />
                      <ErrorMessage name="qteBillet" class="text-danger" />
                    </div>
                    <div class="col-md-4">
                      <Field
                        name="montant"
                        id="montant"
                        type="text"
                        v-model="billetage.montant"
                        placeholder="Montant"
                        readonly
                        class="form-control"
                      />
                      <ErrorMessage name="montant" class="text-danger" />
                    </div>
                  </div>
                </Form>
              </template>
              <p class="montant-total">Montant Total: {{ montantTotal }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-12 mb-3">
          <button type="submit" class="btn btn-primary">Envoyer</button>
          <router-link to="/ouv_fers/liste-ouv_fer/" class="btn btn-danger mx-1">Annuler</router-link>
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
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import router from "@/router";

interface Billetage {
  montant: number;
  libelle: string;
  qteBillet: number;
  valueAct: number;
  monnaie: number;
  ouv_fer?: number;
}

const userOptions = ref<{ value: number; label: string }[]>([]);
const user = ref<number[]>([]);
const dateOuverture = ref(getCurrentDateTime());
const currentDateTime = ref(getCurrentDateTime());
const ouvFer = ref<OuvFer>({});
const tresorerieList = ref<Tresorerie[]>([]);
const billetageList = reactive<Billetage[]>([]);
const monnaieList = ref<any[]>([]);
const montantTotal = ref<number | null>(null);
const tresoreries = ref<number | null>(null);
const userCreation = ref<number | null>(null);
const tresorerieOptions = ref<{ value: number; label: string }[]>([]);

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const schema = Yup.object().shape({
  fondDeRoulement: Yup.number()
    .nullable()
    .required("Le fond de roulement est obligatoire")
    .min(1, "Le fond de roulement doit être supérieur à 0"),
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
  const invalidChars = ["e", "E", "+", "-", "."];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
};

const sendOuvFer = async (values: any, { resetForm }: any) => {
  try {
    if (!userCreation.value) {
      throw new Error("L'utilisateur créateur n'est pas défini.");
    }

    ouvFer.value.tresorerieId = tresoreries.value;
    ouvFer.value.fondDeRoulement = montantTotal.value;
    ouvFer.value.solde = montantTotal.value;
    ouvFer.value.dateOuverture = dateOuverture.value;
    ouvFer.value.status = "OPEN";
    ouvFer.value.userIds = user.value;
    ouvFer.value.userCreationId = userCreation.value;

    const res = await ApiService.post("/ouv_fers/", ouvFer.value);
    const ouvFerId = res.data.id;

    if (res.data) {
      const billetageData = billetageList.map((billetage) => ({
        ...billetage,
        ouv_fer: ouvFerId,
      }));
      await ApiService.post("/billetages/", billetageData);

      resetForm();
      router.push("/ouv_fers/liste-ouv_fer");
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
};

const caisses = computed(() => {
  return tresorerieList.value.filter((entity) => entity.nom?.toLowerCase().includes("caisse"));
});

const getTresorerie = async () => {
  try {
    const response = await ApiService.get("/tresoreriecaisses");
    const tresoreriesData = response.data.data.data;
    tresorerieOptions.value = tresoreriesData
      .filter((tresorerie) => tresorerie.operation === true)
      .map((tresorerie) => ({
        value: tresorerie.id,
        label: tresorerie.nom,
      }));
  } catch (error) {
    console.error("Erreur lors de la récupération des trésoreries:", error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await ApiService.get("/all/users");
    const userData = response.data.data;
    userOptions.value = userData.map((user: any) => ({
      value: user.id,
      label: `${user.nom} ${user.prenom}`,
    }));
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
  }
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

const handleBilletageInput = (event: Event, billetage: Billetage) => {
  const newValue = Number((event.target as HTMLInputElement).value);
  billetage.qteBillet = newValue || 0;
  updateMontant(billetage);
};

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
  getTresorerie();
  getAllMonnaie();
  getAllUsers();
  userCreation.value = userCreation.value; // À remplacer par une vraie logique d'authentification
});
</script>

<style scoped>
.montant-total {
  text-align: right;
  font-weight: bold;
  margin-top: 10px;
}
</style>