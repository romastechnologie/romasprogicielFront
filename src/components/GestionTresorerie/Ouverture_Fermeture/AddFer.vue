<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form class="card" :validation-schema="schema" @submit="sendFer(ouvFer.tresorerieName, ouvFer.ouvFerName)">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                    <p class="col-md-3">
                                        monnaie
                                    </p>
                                    <p class="col-md-3">
                                        Quantité de billet
                                    </p>
                                    <p class="col-md-3">
                                        Montant
                                    </p>
                                </div>
                                <template v-for="billetage in billetageList" :key="billetage.monnaie">
                                    <Form :validation-schema="schema" class="card">
                                        <div class="container">

                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="">
                                                        <select name="monnaie" id="monnaie" readonly
                                                            placeholder="Sélectionner la monnaie" class="form-control">
                                                            <template v-for="monnaie in monnaieList" :key="monnaie.id">
                                                                <option v-if="billetage.monnaie == monnaie.id">
                                                                    {{ monnaie.valeur }}
                                                                </option>
                                                            </template>
                                                        </select>

                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="">
                                                        <Field name="qteBillet" id="qteBillet"
                                                            v-model="billetage.qteBillet" type="number"
                                                            placeholder="Entrer la quantité" class="form-control"
                                                            @change="billetage.montant = billetage.valueAct * billetage.qteBillet" />
                                                        <ErrorMessage name="qteBillet" />
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="">
                                                        <Field name="montant" id="montant" type="text"
                                                            v-model="billetage.montant" placeholder="Entrer le montant"
                                                            readonly class="form-control" />
                                                        <ErrorMessage name="montant" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Form>
                                </template>
                                <p>Montant total: {{ montantTotal }}</p>
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
                                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">{{
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

import { Monnaie } from "@/models/Monnaie";
import Swal from "sweetalert2";

const ouvFer = ref<Ouv_Fer>({})
const ouvFerList = ref<Ouv_Fer[]>([])
const tresorerieList = ref<Tresorerie[]>([])
const tresorerie = ref<Tresorerie>({})


interface Billetage {
    montant: number
    qteBillet: number
    valueAct: number
    monnaie: number
    // financeName?: string
    ouv_fer?: number
}
const billetageList = reactive<Billetage[]>([])
const monnaieList = ref([] as any[])
let montantTotal = ref(0)



const schema = Yup.object().shape({
    fondDeRoulement: Yup.number().required('Le fond de roulement est obligatoire'),
    ouvFerName: Yup.number().required('L\' ouverture de caisse  est obligatoire'),
    // ecart: Yup.number().required('L\'écart est obligatoire').label('Ecart'),
    // solde: Yup.number().required('Le solde est obligatoire').label('Solde'),
    tresorerieName: Yup.number().required('La trésorerie est obligatoire'),
    // qteBillet: Yup.number().required('La quanitité de billet est obligatoire').label('Quantité de billet'),
    // valeur: Yup.number().required('La valeur de la monnaie est obligatoire').label('Solde'),
    // montant: Yup.number().required('La quanitité de billet est obligatoire'),
    // monnai: Yup.number().required('La quanitité de billet est obligatoire'),
})

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});


// const addouvFer = async (id: any, ouvFerId: any) => {
//     await axios.post<Ouv_Fer>(`http://localhost:3000/api/${id}/${ouvFerId}/ouv_fer`, ouvFer.value).then(res => {

//         console.log(res.data)

//         // await axios.post('http://localhost:3000/api/billetage')

//     })
// }

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

                Swal.fire({
                    timer: 1000,
                    position: "top-end",
                    text: "billetage réussi avec succès",
                    icon: "success"
                })
            } catch (error) {
                console.error('Erreur lors du billetage:', error)
                throw error;
            }
        }

        // Swal.fire({
        //             timer: 1000,
        //             position: "top-end",
        //             text: "billetage réussi avec succès",
        //             icon: "success"
        //         })
    } catch (error) {
        console.error('Erreur lors de l\'ouverture de caisse:', error)
        throw error;
    }
}

const caisses = computed(() => {
    return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'))
})


const getTresorerie = () => {
    axios.get('/tresoreries')
        .then(res => {
            tresorerieList.value = res.data
            console.log(res)
        })
}

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
    await axios.get('/monnaies').then(res => {
        monnaieList.value = res.data
        console.log(monnaieList.value)

        monnaieList.value.forEach(element => {
            billetageList.push({
                montant: 0,
                valueAct: element.valeur,
                monnaie: element.id,
                qteBillet: 0,
                ouv_fer: 0
            })
        });

        // for (let index = 0; index < monnaieList.value.length; index++) {
        //     billetageList.push({
        //         montant: 0,
        //         qteBillet: 0,
        //         valueAct: monnaieList.value[index].valeur,
        //         monnai: monnaieList.value[index].id
        //     })

        //     //    // console.log(monnaieList.value[index].id);
        //     //     console.log(billetageList);
        // }

        // console.log(billetageList,'tttttttttttttttttttttttttttttttttttttttttttt')
    })
}

// const totals = () => {  
//     montantTotal.value = 0
//     billetageList.forEach(element => {
//         // if (element.montant != null) {
//         montantTotal.value += element.montant
//         // }
//     });
// }

const calculateTotal = () => {
    montantTotal.value = billetageList.reduce((total, billetage) => total + billetage.montant, 0);
    return montantTotal;
};
watch(billetageList, () => {
    calculateTotal();
});




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