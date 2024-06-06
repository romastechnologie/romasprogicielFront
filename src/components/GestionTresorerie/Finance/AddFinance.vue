<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
            <Form class="row g-3" :validation-schema="schema" @submit="sendFinance">

                <div class="row">
                    <div class="col-md-6">
                        <div class="my-3">
                            <label for="fichier">Fichier</label>
                            <Field type="file" class="form-control" id="fichier" name="fichier"
                                v-model="finance.fichier" />
                            <ErrorMessage name="fichier" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="montant">Montant</label>
                            <Field type="number" id="montant" name="montant" class="form-control" v-model="montantTotal"
                                disabled />
                            <ErrorMessage name="montant" class="text-danger" v-model="finance.montant" />
                        </div>
                        <div class="mb-3">
                            <label for="type">Type de Finance</label>
                            <Field type="text" id="type" name="type" class="form-select" 
                                v-model="finance.type" v-slot="{field}">
                                <VueMultiselect v-model="field.value" v-bind="field" :options="['recettes', 'depenses']"
                                    :close-on-select="true" :clear-on-select="false"
                                    placeholder="Sélectionner le type de finance" />
                            </Field>
                            <ErrorMessage name="type" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="nomBeneficiaire">Nom du Bénéficiaire</label>
                            <Field type="text" id="nomBeneficiaire" name="nomBeneficiaire" class="form-control"
                                v-model="finance.nomBeneficiaire" />
                            <ErrorMessage name="nomBeneficiaire" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="prenomBeneficiaire">Prénom du Bénéficiaire</label>
                            <Field type="text" id="prenomBeneficiaire" name="prenomBeneficiaire" class="form-control"
                                v-model="finance.nomBeneficiaire" />
                            <ErrorMessage name="prenomBeneficiaire" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurName">Utilisateur</label>
                            <Field type="text" id="utilisateurName" name="utilisateurName" class="form-select"
                                as="select">
                                <!--<option v-for="" :key=".id"
                                            :value="utilisateur.id">{{ utilisateur.nom }} {{ utilisateur.prenom }}
                                        </option>-->
                            </Field>

                        </div>
                        <div class="mb-3">
                            <label for="tresorerieName">Tresorerie</label>
                            <Field type="number" id="tresorerieName" name="tresorerieName" class="form-select"
                                as="select" v-model="finance.tresorerieName">
                                <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">{{
                                    caisse.nom }} => {{ caisse.status || "fermé" }}</option>
                            </Field>
                            <ErrorMessage name="tresorerieName" class="text-danger" />
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <p class="col-md-4 text-center">
                                Monnaie
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
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <select name="monnaie" id="monnaie" disabled
                                                placeholder="Sélectionner la monnaie" class="form-control">
                                                <template v-for="monnaie in monnaieList" :key="monnaie.id">
                                                    <option v-if="billetage.monnaie == monnaie.id">
                                                        {{ monnaie.valeur }}
                                                    </option>
                                                </template>
                                            </select>
                                        </div>
                                        <div class="col-md-3">

                                            <Field name="qteBillet" id="qteBillet" v-model="billetage.qteBillet"
                                                type="number" placeholder="Entrer la quantité" class="form-control"
                                                @change="billetage.montant = billetage.valueAct * billetage.qteBillet" />
                                            <ErrorMessage name="qteBillet" />

                                        </div>
                                        <div class="col-md-3">

                                            <Field name="montant" id="montant" type="text" v-model="billetage.montant"
                                                placeholder="Entrer le montant" disabled class="form-control" />
                                            <ErrorMessage name="montant" />

                                        </div>
                                    </div>

                                </div>
                            </Form>
                        </template>
                        <p>Montant total: {{ montantTotal }}</p>
                    </div>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary">Envoyer</button>
                </div>


            </Form>

        </div>
    </div>

</template>

<script setup lang="ts">


import { Finance } from "@/models/Finance";


import { onMounted, ref, reactive, watch, computed } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import * as Yup from "yup"
import { User } from "@/services/auth";
import { Tresorerie } from "@/models/Tresorerie";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import VueMultiselect from 'vue-multiselect'


let finance = ref<Finance>({})
const utilisateurList = ref<User[]>([])
let tresorerie = ref<Tresorerie>({})
const tresorerieList = ref<Tresorerie[]>([])
const monnaieList = ref([] as any[])
const billetageList = reactive<Billetage[]>([])
let montantTotal = ref(0)


const caisses = computed(() => {
    return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'))
})


interface Billetage {
    montant: number
    qteBillet: number
    valueAct: number
    monnaie: number
    finance?: number
    // ouv_fer?: number
}

const schema = Yup.object().shape({
    fichier: Yup.string().required('La piece de la caisse est obligatoire'),
    montant: Yup.number().required('Le montant est obligatoire'),
    type: Yup.string().required('Le type est obligatoire'),
    nomBeneficiaire: Yup.string().required('Le nom du bnéficiaire est obligatoire'),
    prenomBeneficiaire: Yup.string().required('Le prénom du bénéficiaire est obligatoire'),

    tresorerieName: Yup.string().required('La trésorerie est obligatoire'),
})

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});


async function sendFinance(value: Object) {
    try {
        value['type'] = finance.value.type
        const type =  value['type']
        const formData = new FormData()
        const fichier = (document.getElementById('fichier') as HTMLInputElement)
        const montant = (document.getElementById('montant') as HTMLInputElement).value
        //const type = (document.getElementById('type') as HTMLInputElement).value
        const nomBeneficiaire = (document.getElementById('nomBeneficiaire') as HTMLInputElement).value
        const prenomBeneficiaire = (document.getElementById('prenomBeneficiaire') as HTMLInputElement).value
        const utilisateurName = (document.getElementById('utilisateurName') as HTMLInputElement).value
        const tresorerieName = (document.getElementById('tresorerieName') as HTMLInputElement).value

        if (fichier.files) {
            formData.append('fichier', fichier.files[0])
            formData.append('type', type)
            formData.append('montant', montant)
            formData.append('nomBeneficiaire', nomBeneficiaire)
            formData.append('prenomBeneficiaire', prenomBeneficiaire)
            formData.append('utilisateurName', utilisateurName)
            formData.append('tresorerieName', tresorerieName)
        }


        const res = await ApiService.post('/finances/', formData)
        const financeId = res.data.id
        console.log(res)
        console.log(financeId)
        if (res.data) {
            try {
                const billetageData = billetageList.map(billetage => ({
                    ...billetage,
                    finance: financeId
                }));

                await ApiService.post(`/billetages/`, billetageData)

                Swal.fire({
                    timer: 1000,
                    position: "top-end",
                    text: "billetage réussi avec succès",
                    icon: "success"
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Erreur de la creation d'un financement",
                    showConfirmButton: false,
                    timer: 1000
                });
                console.error('Erreur lors du billetage:', error)
                throw error;
            }

        }

    } catch (error) {

        console.error('Erreur lors du financement:', error)
        throw error;
    }
}



const getTresorerie = () => {
    ApiService.get('/tresoreries')
        .then(res => {
            tresorerieList.value = res.data
            console.log(tresorerieList.value)
        })
}

const getMonnaie = async () => {
    await ApiService.get('/monnaies').then(res => {
        monnaieList.value = res.data
        console.log(monnaieList.value)

        monnaieList.value.forEach(element => {
            billetageList.push({
                montant: 0,
                valueAct: element.valeur,
                monnaie: element.id,
                qteBillet: 0,
                finance: 0
            })
        });
    })
}

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
        calculateTotal()
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