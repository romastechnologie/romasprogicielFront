<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form class="row g-3" :validation-schema="schema" @submit="addTransfert()">
                        <div class="mb-3">
                            <label for="source">Source</label>
                            <Field type="text" id="source" name="source" class="form-control" v-model="transfert.source"
                                as="select">
                                <option v-for="tresorerie in tresorerieList" :key="tresorerie.id" :value="tresorerie.id"
                                    :disabled="tresorerie.status == 'fermé'">{{ tresorerie.nom }}</option>
                            </Field>
                            <ErrorMessage name="source" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="destination">Destination</label>
                            <Field type="text" id="destination" name="destination" class="form-control"
                                v-model="transfert.destination" as="select">
                                <option v-for="tresorerie in tresorerieList" :key="tresorerie.id" :value="tresorerie.id"
                                    :disabled="tresorerie.status == 'fermé'">{{ tresorerie.nom }}</option>
                            </Field>
                            <ErrorMessage name="destination" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="montant">Montant</label>
                            <Field type="number" id="montant" name="montant" class="form-control"
                                v-model="transfert.montant" />
                            <ErrorMessage name="montant" class="text-danger" />
                        </div>
                        <div class="mb-3">
                            <label for="dateDeTransfert">Date de transfert</label>
                            <Field type="date" id="dateDeTransfert" name="dateDeTransfert" class="form-control"
                                v-model="transfert.dateDeTransfert" />
                            <ErrorMessage name="dateDeTransfert" class="text-danger" />
                        </div>
                        <div class="">
                            <button type="submit" class="btn btn-primary me-1"
                                :disabled="tresorerie.status == 'fermé'">Envoyer</button>
                                <router-link to="/transferts/liste-transfert" type="submit" class="btn btn-danger">
                                    Annuler
                                </router-link>
                        </div>
                </Form>

            </div>
     </div>

</template>

<script setup lang="ts">


interface Transfert {
    id?: number
    source?: string
    destination?: string
    montant?: number
    dateDeTransfert?: string

}

import { Tresorerie } from "@/models/Tresorerie";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import * as Yup from "yup"
import Swal from "sweetalert2";
import router from "@/router";
import ApiService from "@/services/ApiService";

const transfert = ref<Transfert>({})
const tresorerieList = ref<Tresorerie[]>([])
const tresorerie = ref<Tresorerie>({})

// const caisses = computed(() => {
// return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'))
// })

const caisseStatus = computed(() => {
    return tresorerieList.value.forEach(element => {
        element.status;
    })
})



const schema = Yup.object().shape({
    source: Yup.string().required('La source est obligatoire').label('Source'),
    destination: Yup.string().required('La destination est obligatoire').label('Destination'),
    montant: Yup.string().required('Le montant est obligatoire').label('Montant'),
    dateDeTransfert: Yup.string().required('La date de transfert est obligatoire').label('Date de transfert'),

})

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});



const addTransfert = async () => {
    await ApiService.post('/transferts/', transfert.value).then(res => {

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Transfert ajouté",
            showConfirmButton: false,
            timer: 1500
        })
        router.push('/transfert')
        transfert.value = {
            id: 0,
            source: '',
            destination: '',
            montant: 0,
            dateDeTransfert: '',

        }
        console.log(res.data)

    })



}

const getTresorerie = async () => {
    await ApiService.get('/tresoreries')
        .then(res => {
            tresorerieList.value = res.data
            console.log(res)
        })
}



onMounted(() => {
    getTresorerie()
})





</script>

