<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form @submit="updateTresorerie" :validation-schema="schema" class="card">
                    <template v-for="tresorerie in tresorerieList" :key="tresorerie.id">
                        <div class="card-body" v-if="tresorerie.id == $route.params.id">
                            <div class="mb-3">
                                <label for="nom">Nom</label>
                                <Field type="text" id="nom" name="nom" class="form-control"
                                    :value="tresorerie.nom" />
                                <ErrorMessage name="nom" class="text-danger"/>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="operation"
                                        id="nonOperationnelle" value="Non Opérationnelle" v-model="tresorerie.operation"/>
                                    <label class="form-check-label" for="nonOperationnelle">
                                        Non Opérationnelle
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="operation"
                                        id="operationnelle" checked value="Opérationnelle" v-model="tresorerie.operation"/>
                                    <label class="form-check-label" for="operationnelle">
                                        Opérationnelle 
                                    </label>
                                    
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="montant">Montant</label>
                                <Field type="number" id="montant" name="montant" class="form-control" :value="tresorerie.montant" />
                                <ErrorMessage name="montant" class="text-danger"/>
                            </div>
                            <div class="mb-3">
                                <label for="dateCreation">Date de création</label>
                                <Field type="date" id="dateCreation" name="dateCreation" class="form-control"
                                    :value="tresorerie.dateCreation" />
                                <ErrorMessage name="prenom" class="text-danger"/>
                            </div>
                            <div class="form-group mb-3">
                                <label for="typeTresorerie">Type de trésorerie</label>
                                <Field type="text" name="typeTresorerie" id="typeTresorerie"
                                    class="form-control" v-model="tresorerie.typeTresorerieId" as="select">
                                    <option :value="typeTresorerie.id"
                                        v-for="typeTresorerie in typeTresorerieList"
                                        :key="typeTresorerie.id">
                                        {{ typeTresorerie.libelle }}
                                    </option>

                                </Field>
                                <ErrorMessage name="typeTresorerie" class="text-danger" />
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary mx-1">Envoyer</button>
                                <router-link to="/tresoreries/liste-tresorerie/" type="button"
                            class="btn btn-danger">Annuler</router-link>
                            </div>
                        </div>
                    </template>
                </Form>
            </div>
        </div>

</template>

<script setup lang="ts">
import { Tresorerie } from "@/models/Tresorerie";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { TypeTresorerie } from "@/models/TypeTresorerie";

import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import ApiService from "@/services/ApiService";


const tresorerieList = ref<Tresorerie[]>([])
const router = useRouter()
const route = useRoute()
const tresorerie = ref<Tresorerie>({})
const typeTresorerieList = ref<TypeTresorerie[]>([])

const schema = Yup.object().shape({
    nom: Yup.string().required('Le nom est obligatoire').label('Nom'),
    montant: Yup.number().required('Le montant est obligatoire').label('Montant'),
    dateCreation: Yup.string().required('La date de création est obligatoire').label('Date de création'),
    
})

const updateTresorerie = async (value: object) => {
    await ApiService.put(`/tresoreries/${route.params.id}`, value)
    .then(res => {
        tresorerie.value = {
            id: 0,
            nom: '',
            montant: 0,
            dateCreation: '',
            
        }
        console.log(res.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Type de trésorerie modifié",
            showConfirmButton: false,
            timer: 1500
        })
        router.push('/tresoreries/liste-tresorerie')
    })
    
}

const getTresorerie = async () => {
    await ApiService.get('/tresoreries').then(res => {
        tresorerieList.value = res.data
        console.log(tresorerieList.value)
    })
}

const getTypeTresorerie = async () => {
    await ApiService.get('/typeTresoreries').then(res => {
        typeTresorerieList.value = res.data
        console.log(typeTresorerieList.value)
    })
}

onMounted(() => {
    getTresorerie(),
    getTypeTresorerie()
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
    padding: 10px 400px;

}
</style>