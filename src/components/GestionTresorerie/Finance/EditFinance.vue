<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
            <Form class="row g-3" :validation-schema="schema" @submit="updateFinance">

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
                            <Field type="text" id="type" name="type" class="form-select" v-model="finance.type"
                                v-slot="{ field }">
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
                                v-model="finance.prenomBeneficiaire" />
                            <ErrorMessage name="prenomBeneficiaire" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="utilisateurName">Utilisateur</label>
                            <Field type="text" id="utilisateurName" name="utilisateurName" class="form-select"
                                as="select">
                                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.nom }} {{
                                    user.prenom }}
                                </option>
                            </Field>

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
                        </div>

                        <div class=" mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                    Trésorerie <span class="text-danger">*</span>
                                </label>
                                <Field name="tresorerie" type="text" v-slot="{ field }">
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
                            <p class="col-md-4 text-center">
                                Monnaie
                            </p>
                            <p class="col-md-3">
                                Quantité de billet
                            </p>
                            <p class="col-md-4">
                                Montant
                            </p>
                        </div>
                        <template v-for="billetage in billetageList" :key="billetage.monnaie">
                            <Form :validation-schema="schema" class="container m-3">
                                <div class="">
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
                                        <div class="col-md-4">

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
                    <router-link to="/finances/liste-finance/" type="button"
                        class="btn btn-danger mx-1">Annuler</router-link>
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
import Multiselect from '@vueform/multiselect/src/Multiselect';
import { useRouter, useRoute } from "vue-router";

const users = ref<User[]>([])
const router = useRouter()
const route = useRoute()
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


async function updateFinance(value: Object) {
    try {
        value['type'] = finance.value.type
        const type = value['type']
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


        const res = await ApiService.put(`/finances/${route.params.id}`, formData)
        const financeId = res.data.id
        console.log(res.data)
        console.log(financeId)
        if (res.data) {
            try {
                const billetageData = billetageList.map(billetage => ({
                    ...billetage,
                    finance: financeId
                }));

                await ApiService.put(`/billetages`, billetageData)
                router.push('/finances/liste-finance')
                Swal.fire({
                    timer: 1000,
                    position: "top-end",
                    text: "Financement modifié avec succès",
                    icon: "success"
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Erreur de la modification d'un financement",
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

const getAllPersonnels = async () => {
    try {
        const response = await ApiService.get('/personnels');
        const personnelsData = response.data;
        console.log('Data', personnelsData)
        personnelOptions.value = personnelsData.map((personnel) => ({
            value: personnel.id,
            label: personnel.nom + " " + personnel.prenom,  
        }));
    }
    catch (error) {
        //error(response.data.message)
    }
}

function getAllUsers() {
    return ApiService.get(`/users`)
        .then(({ data }) => {
            users.value = data.data.data;
            return data.data;
        })
        .catch(({ response }) => {

        });
}

const getAllTresoreries = async () => {
    try {
        const response = await ApiService.get('/tresoreries');
        const tresoreriesData = response.data.data.data;
        console.log('Data', tresoreriesData)
        tresorerieOptions.value = tresoreriesData.map((tresorerie) => ({
            value: tresorerie.id,
            label: tresorerie.nom,
        }));
    }
    catch (error) {
        //error(response.data.message)
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
    getAllTresoreries(),
    getAllPersonnels(),
        getMonnaie(),
        calculateTotal(),
        getAllUsers()
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