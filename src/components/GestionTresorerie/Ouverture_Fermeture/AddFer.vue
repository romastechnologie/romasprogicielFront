<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form class="card" :validation-schema="schema" @submit="sendFer(ouvFer.tresorerieName, ouvFer.ouvFerName)">
                        <div class="row">
                            <div class="col-md-6">
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
                            <div class="col-md-6">
                                <div class="col mb-3">
                                    <label for="fondDeRoulement">FondDeRoulement</label>
                                    <Field type="number" id="fondDeRoulement" name="fondDeRoulement"
                                        class="form-control" v-model="montantTotal" />
                                    <ErrorMessage name="fondDeRoulement" class="text-danger" />
                                </div>

                                <div class="col mb-3">
                                    <label for="tresorerieName">Tresorerie</label>
                                    <Field type="number" id="tresorerieName" name="tresorerieName" class="form-control"
                                        v-model="ouvFer.tresorerieName" as="select">
                                        <option v-for="caisse in tresorerieList" :key="caisse.id" :value="caisse.id">{{
                                            caisse.nom }} => {{ caisse.status || "fermé" }}</option>
                                    </Field>
                                    <ErrorMessage name="tresorerieName" class="text-danger" />
                                </div>

                                <div class="col mb-3">
                                    <label for="ouvFerName">OuvFer de caisse</label>
                                    <Field type="number" id="ouvFerName" name="ouvFerName" class="form-control"
                                        v-model="ouvFer.ouvFerName" as="select">
                                        <option v-for="ouvFer in ouvFerList" :key="ouvFer.id" :value="ouvFer.id">{{
                                            ouvFer.fondDeRoulement }} => {{ ouvFer.tresorerie?.nom }}({{ouvFer.tresorerie?.status}})</option>
                                    </Field>
                                    <ErrorMessage name="ouvFerName" class="text-danger" />
                                </div>

                                <div class="mb-3">
                                    <button type="submit" 
                                        class="btn btn-primary top-end">Save</button>
                                </div>
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
import * as Yup from 'yup'
import { configure, Form, Field, ErrorMessage } from "vee-validate"
import { useRouter } from 'vue-router';
import { Monnaie } from "@/models/Monnaie";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";


const ouvFer = ref<Ouv_Fer>({})
const ouvFerList = ref<Ouv_Fer[]>([])
const tresorerieList = ref<Tresorerie[]>([])
const tresorerie = ref<Tresorerie>({})
    const router = useRouter();


interface Billetage {
    montant: number;
  libelle: string;
  qteBillet: number;
  valueAct: number;
  monnaie: number;
  ouv_fer?: number;
}
const billetageList = reactive<Billetage[]>([])
const monnaieList = ref([] as any[])
let montantTotal = ref(0)



const schema = Yup.object().shape({
    fondDeRoulement: Yup.number().required('Le fond de roulement est obligatoire'),
    ouvFerName: Yup.number().required('L\' ouverture de caisse  est obligatoire'),

    tresorerieName: Yup.number().required('La trésorerie est obligatoire'),

})

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});


async function sendFer(tresorerieName: any, ouvFerName: any) {
    try {
        ouvFer.value.fondDeRoulement = (document.getElementById('fondDeRoulement') as HTMLInputElement).value
        const res = await axios.post(`/ouv_fers/`, ouvFer.value)
        const ouvFerId = res.data.id;

        if (res.data) {
            try {

                const billetageData = billetageList.map(billetage => ({
                    ...billetage,
                    ouv_fer: ouvFerId
                }));

                await axios.post(`/billetages/`, billetageData)
                router.push("/ouv_fers/liste-ouv_fer");

                Swal.fire({
                    timer: 1000,
                    position: "top-end",
                    text: "billetage réussi avec succès",
                    icon: "success"
                }).then(() => {
                    router.push("/ouv_fers/liste-ouv_fer");
                });
            } catch (error) {
                console.error('Erreur lors du billetage:', error)
                throw error;
            }
        }


    } catch (error) {
        console.error('Erreur lors de l\'ouverture de caisse:', error)
        throw error;
    }
}

const caisses = computed(() => {
  return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'));
});


const getTresorerie = async () => {
  try {
    console.log("Tentative de récupération des trésoreries...");
    const response = await axios.get("all/tresoreries");
    tresorerieList.value =  response.data.data.data;
    console.log("Données des trésoreries récupérées:", response);
  } catch (error) {
    console.error("Erreur lors de la récupération des trésoreries:", error);
  }
};
const getouvFer = async () => {
    await axios.get<Ouv_Fer[]>('/ouv_fers').then(res => {
        ouvFerList.value = res.data
        console.log(ouvFerList.value)
    })
}

// const getBilletage = async () => {
//     await axios.get<Billetage[]>('http://localhost:3000/api/billetage').then(res => {
//         billetageList.value = res.data
//         console.log(billetageList.value)
//     })
// }


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
  montantTotal.value = billetageList.reduce((total, billetage) => {
    return total + (billetage.montant || 0);
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
    getTresorerie(),
        getMonnaie(),
        calculateTotal(),
        getouvFer()
})

</script>

<style scoped>
.overview {
    margin: auto;

}

.container {
    padding: 10px 10px;
}

.text-title {
    text-align: center;
}

.overflow {
    padding: 20px 100px;

}
</style>