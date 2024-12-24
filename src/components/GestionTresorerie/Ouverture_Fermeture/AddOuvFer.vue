<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        class="row g-3"
        :validation-schema="schema"
        @submit="sendOuvFer(ouvFer.tresorerieName, ouvFer.ouvFerName)"
      >
        <div class="col-md-6">
          <div class="row">
            <div class="col-md-12 mb-md-25">
              <div
                class="tab-pane fade show active p-10"
                id="home-tab-pane"
                role="tabpanel"
                tabindex="0"
              >
                <div class="row">
                  <div class="border border-primary mb-10">
                    <div
                      class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4"
                    >
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">Billetage</h3>
                      </div>
                    </div>
                    <div>
                      <div
                        class="row d-flex align-items-center justify-content-between mt-2"
                      >
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold"
                            >Monnaie</label
                          >
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold"
                            >Quantité</label
                          >
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold"
                            >Montant</label
                          >
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <template v-for="(billetage,index) in billetageList" :key="index">
    <Form :validation-schema="schema" class="container m-3">
        <div class="">
            <div class="row">
                <div class="col-md-4">
                    <input name="monnaie" id="monnaie" 
                        placeholder="Sélectionner la monnaie" v-model="billetage.libelle" readonly class="form-control">
                </div>
                <div class="col-md-4">
                    <Field  name="qteBillet" 
         id="qteBillet" 
         type="number" 
         placeholder="Entrer la quantité" 
         class="form-control" 
         :value="billetage.qteBillet"
         @input="event => handleBilletageInput(event, billetage)" />
                    <ErrorMessage name="qteBillet" />
                </div>
                <div class="col-md-4">
                    <Field name="montant" 
                           id="montant" 
                           type="text" 
                           v-model="billetage.montant"
                           placeholder="Montant" 
                           readonly class="form-control" />
                    <ErrorMessage name="montant" />
                </div>
            </div>
        </div>
    </Form>
</template>
                      <p>Montant Total: {{ montantTotal }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mt-4">
          
          <div class="col mb-3">
            <label for="fondDeRoulement">FondDeRoulement</label>
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

          <div class="col mb-3" >
                                    <label for="tresorerieName">Tresorerie</label>
                                    <Field name="tresorerieName" v-model="tresoreries" type="text" v-slot="{ field }">
                                      <Multiselect 
  v-model="tresoreries" 
  :options="tresorerieOptions" 
  :preserve-search="true"
  :multiple="false" 
  :searchable="true" 
  placeholder="Sélectionner la trésorerie"
  label="label" 
  track-by="value" 
/>

                                  </Field>
                                    <ErrorMessage name="tresorerieName" class="text-danger" />
                                </div>

             <div class="mb-3 mt-1">
            <button type="submit" class="btn btn-primary top-end">
              Envoyer
            </button>
            <router-link to="/ouv_fers/liste-ouv_fer/" type="button"
            class="btn btn-danger mx-1">Annuler</router-link>
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
});

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
});


async function sendOuvFer(tresorerieName: any, ouvFerName: any) {
  try {
    ouvFer.value.tresorerieId = tresoreries.value;

    const fondDeRoulement = (
      document.getElementById("fondDeRoulement") as HTMLInputElement
    ).value;
    ouvFer.value.fondDeRoulement = Number(fondDeRoulement); // Conversion en nombre

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
  } catch (error) {
    console.error("Erreur lors de l'ouverture de caisse:", error);
  }
}


const caisses = computed(() => {
  return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'));
});


const getTresorerie= async () => {
          try{
          const response = await ApiService.get('/tresoreriecaisses');
          const tresoreriesData = response.data.data.data;
          console.log("tresorerie", tresoreriesData);
          tresorerieOptions.value = tresoreriesData.map((tresorerie) => ({
            value: tresorerie.id,
            label: tresorerie.nom,
          }));
          }
          catch(error){
          }
        } 

const getouvFer = async () => {
  await ApiService.get("all/ouv_fers").then((res) => {
    ouvFerList.value = res.data;
    console.log(ouvFerList.value);
  });
};

const getMonnaie = async () => {
  try {
    const res = await ApiService.get("/monnaies");
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


// Watch billetageList deeply for changes and recalculate automatically
watch(
  billetageList,
  () => {
    calculateTotal();
  },
  { deep: true }
);

onMounted(() => {
  getTresorerie(), getMonnaie(), calculateTotal(), getouvFer();
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
</style>
