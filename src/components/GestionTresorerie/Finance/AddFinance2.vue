<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-header">
      <h3 class="text-black fw-semibold">Ajouter une recette</h3>
    </div>
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
            <Form class="row g-3" :validation-schema="schema" @submit="sendFinance">
                    <div class="col-md-6">
                        <div class="my-3">
                            <label for="fichierfinance">Fichier<span class="text-danger">*</span></label>
                            <Field type="file" class="form-control"
                             @change="fichierfinanceChange"
                            id="fichierfinance" name="fichierfinance"
                                v-model="finance.fichierfinance" />
                            <ErrorMessage name="fichierfinance" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="montant">Montant</label>
                            <Field type="number" id="montant" name="montant" class="form-control" v-model="montantTotal"
                                disabled />
                            <ErrorMessage name="montant" class="text-danger" v-model="finance.montant" />
                        </div>
                      <div class="mb-3">
                            <label for="type">Mode paiement</label>
                            <Field type="text" id="type" name="modepaiement" class="form-select" v-model="finance.modepaiement"
                                v-slot="{ field }">
                                <Multiselect v-model="field.value" v-bind="field" :options="['Espece', 'Momo', 'Chèque', 'Virement bancaire']"
                                    :close-on-select="true" :clear-on-select="false"
                                    placeholder="Sélectionner le mode de paiement" />
                            </Field>
                            <ErrorMessage name="modepaiement" class="text-danger" />
                        </div>
                       <!--<div class="mb-3">
                            <label for="nomBeneficiaire">Nom du Bénéficiaire</label>
                            <Field type="text" id="nomBeneficiaire" name="nomBeneficiaire" class="form-control"
                                v-model="finance.nomBeneficiaire" />
                            <ErrorMessage name="nomBeneficiaire" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="prenomBeneficiaire">Prénom du Bénéficiaire</label>
                            <Field type="text" id="prenomBeneficiaire" name="prenomBeneficiaire" class="form-control"
                                v-model="finance.prenomBeneficiaire" />
                            <ErrorMessage name="prenomBeneficiaire" class="text-danger" />
                        </div>
                        <div class=" mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                    Personnel <span class="text-danger">*</span>
                                </label>
                                <Field name="personnel" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions"
                                        :preserve-search="true" :multiple="false" :searchable="true"
                                        placeholder="Sélectionner le personnel" label="label" track-by="label" />
                                </Field>
                                <ErrorMessage name="personnel" class="text-danger" />
                            </div>
                        </div>--> 

                     
                        <div class=" mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                    Trésorerie <span class="text-danger">*</span>
                                </label>
                                <Field name="tresorerieName" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="tresorerieOptions"
                                        :preserve-search="true" :multiple="false" :searchable="true"
                                        placeholder="Sélectionner la trésorerie" label="label" track-by="label" />
                                </Field>
                                <ErrorMessage name="tresorerie" class="text-danger" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
  <div class="row">
    <div class="col-md-12 mb-md-25">
      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
        <div class="row">
          <div class="border border-primary mb-10">
            <div class="row d-flex align-items-center justify-content-between fw-bold py-2" style="background-color: #0a59a4">
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


                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Ajouter une recette</button>
                    <router-link to="/finances/liste-finance/" type="button"
                        class="btn btn-danger mx-1">Annuler</router-link>
                </div>
            </Form>

        </div>
    </div>

</template>

<script setup lang="ts">


import { Finance } from "@/models/Finance";
import { error, success,onFileChange  } from '@/utils/utils';
import { onMounted, ref, reactive, watch, computed } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import * as Yup from "yup"
import { Tresorerie } from "@/models/Tresorerie";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import VueMultiselect from 'vue-multiselect'
import Multiselect from '@vueform/multiselect/src/Multiselect';
import router from "@/router";
import { User } from "@/models/users";

const users = ref<User[]>([])
let finance = ref<Finance>({})
const utilisateurList = ref<User[]>([])
let tresorerie = ref<Tresorerie>({})
const tresorerieList = ref<Tresorerie[]>([])
const monnaieList = ref([] as any[])
const billetageList = reactive<Billetage[]>([])
let montantTotal = ref(0)

const personnelOptions = ref([]); // Initialisation avec une liste vide
const tresorerieOptions = ref([]);

const caisses = computed(() => {
    return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'))
})


interface Billetage {
    libelle:string
    montant: number
    qteBillet: number
    valueAct: number
    monnaie: number
    finance?: number
    // ouv_fer?: number
}

const schema = Yup.object().shape({
    fichierfinance: Yup.mixed().required('Le fichier de la caisse est obligatoire'),
    montant: Yup.number().min(1, '').required('Le montant est obligatoire'),
    modepaiement: Yup.string().required('Le mode de paiement est obligatoire'),
   // nomBeneficiaire: Yup.string().required('Le nom du bénéficiaire est obligatoire'),
   // prenomBeneficiaire: Yup.string().required('Le prénom du bénéficiaire est obligatoire'),
    //personnel: Yup.string().required('Le personnel est obligatoire'),
    tresorerieName: Yup.string().required('La trésorerie est obligatoire'),
    
})

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});
const selectedFile = ref<any>();
const fichierfinanceChange = (e) => {
      selectedFile.value = onFileChange(e, [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ]);
    };


    const sendFinance = async (values, { resetForm }) => {
  try {
    const payload = {
      ...values,
      type:"recettes",
      billetages: billetageList.map((billetage) => ({
        montant: billetage.montant,
        qteBillet: billetage.qteBillet,
        valueAct: billetage.valueAct,
        monnaie: billetage.monnaie,
      })),
    };

    console.log("Payload envoyé :", payload); // Vérifiez ce qui est envoyé

    const { data } = await axios.post("/finances", payload, {
      headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
    });

    if (data.code == 201) {
      success(data.message);
      resetForm();
      router.push({ name: "ListeFinancePage" });
    }
  } catch ({ response }) {
    error(response?.data?.message || "Une erreur s'est produite");
  }
};



function getAllUsers() {
    return ApiService.get(`/users`)
        .then(({ data }) => {
            users.value = data.data.data;
            return data.data;
        })
        .catch(({ response }) => {

        });
}

const getAllPersonnels = async () => {
    try {
        const response = await ApiService.get('all/personnels');
        const personnelsData = response.data.data.data;
        console.log('Data', personnelsData)
        personnelOptions.value = personnelsData.map((personnel) => ({
            value: personnel.id,
            label: personnel.nom +" "+personnel.prenom,
        }));
    }
    catch (error) {
        //error(response.data.message)
    }
}

const getAllTresoreries = async () => {
    try {
        const response = await ApiService.get('all/tresoreries');
        const tresoreriesData = response.data.data.data;
        console.log('Data', tresoreriesData)
        tresorerieOptions.value = tresoreriesData
        .filter(tresorerie => tresorerie.operation === true)
        .map((tresorerie) => ({
            value: tresorerie.id,
            label: tresorerie.nom,
        }));
    }
    catch (error) {
        //error(response.data.message)
    }
}

const getMonnaie = async () => {
  try {
    const res = await ApiService.get("/monnaies");
    monnaieList.value = res.data.data.data;
    monnaieList.value.forEach((element) => {
      billetageList.push({
        libelle:element.libelle,
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
};


const updateMontant = (billetage: Billetage) => {
  // Recalculate the montant for the current billetage
  billetage.montant = billetage.qteBillet * billetage.valueAct || 0; // Ensure default is 0
  calculateTotal(); // Update the total
};

// Calculate total montant across all billetage entries
const calculateTotal = () => {
  montantTotal.value = billetageList.reduce((total, billetage) => {
    return total + (billetage.montant || 0); // Ensure montant is considered as 0 if undefined
  }, 0);
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
    getAllTresoreries();
    getMonnaie();
    calculateTotal();
    getAllUsers();
    getAllPersonnels();
    
})

</script>




<style scoped>
.overview {
    margin: auto;
}

.text-title {
    text-align: center;
}

.overflow {
    padding: 10px 100px;

}
</style>