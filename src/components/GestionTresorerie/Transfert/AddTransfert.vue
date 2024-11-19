<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
            <Form :validation-schema="schema" @submit="addTransfert()">
                <div class="row gx-1">
                    <div class="col-7">
                        <div class="form-group mb-2 mb-sm-2 mb-md-2">
                            <label class="d-block text-black fw-semibold">
                                Source <span class="text-danger">*</span>
                            </label>
                            <Field name="source" v-slot="{ field }">
                                <Multiselect :options="tresorerieList" :searchable="true" track-by="label" label="label"
                                    v-model="field.value" v-bind="field" placeholder="Sélectionner la source" />
                            </Field>
                        </div>
                        <ErrorMessage name="source" class="text-danger" />
                    </div>
                </div>

                <!-- <div class="mb-3">
                    <label for="destination">Destination</label>
                    <Field type="text" id="destination" name="destination" class="form-control"
                        v-model="transfert.destination" as="select">
                        <option v-for="tresorerie in tresorerieList" :key="tresorerie.id" :value="tresorerie.id"
                            :disabled="tresorerie.status == 'fermé'">{{ tresorerie.nom }}</option>
                    </Field>
                    <ErrorMessage name="destination" class="text-danger" />
                </div> -->

                <div class="row gx-1.">
                    <div class="col-7">
                        <div class="form-group mb-2 mb-sm-2 mb-md-2">
                            <label class="d-block text-black fw-semibold">
                                Destination <span class="text-danger">*</span>
                            </label>
                            <Field name="destination" v-slot="{ field }">
                                <Multiselect :options="tresorerieList" :searchable="true" track-by="label" label="label"
                                    v-model="field.value" v-bind="field" placeholder="Sélectionner la destination" />
                            </Field>
                        </div>
                        <ErrorMessage name="destination" class="text-danger" />
                    </div>
                </div>
                <div class="mb-3">
                    <label for="montant">Montant</label>
                    <Field type="number" id="montant" name="montant" class="form-control" v-model="transfert.montant" />
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
import { User } from "@/models/users";
import Multiselect from "@vueform/multiselect";

const transfert = ref<Transfert>({})
const tresorerieList = ref<Array<any>>([])
const tresorerie = ref<Tresorerie>({})

// const caisses = computed(() => {
// return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'))
// })
tresorerieList.value = [
    {
        label: "Element 1",
        value: 1
    },
    {
        label: "Element 55",
        value: 2
    },
    {
        label: "Element 2",
        value: 3
    }
]

const caisseStatus =() => {
    return tresorerieList.value = [
        {
            label: "Element 1",
            value: 1
        },
        {
            label: "Element 55",
            value: 2
        },
        {
            label: "Element 2",
            value: 3
        }
    ]
}



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
    await ApiService.post('/transferts', transfert.value).then(res => {

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Transfert ajouté",
            showConfirmButton: false,
            timer: 1500
        })
        router.push('/transferts/liste-transfert')
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
    await ApiService.get('/transferts')
        .then(res => {
            tresorerieList.value = res.data
            console.log(res)
        })
}
onMounted(async() => {
    await getTresorerie()
    await caisseStatus();
})
</script>

<!-- <div class="row">
    <div class="col-7">
        <div class="form-group mb-2 mb-sm-2 mb-md-2">
            <label class="d-block text-black fw-semibold">
                Type Commande <span class="text-danger">*</span>
            </label>
            <Field name="typeCommande" v-model="typeC" v-slot="{ field }">
                <Multiselect :options="['Au comptoir', 'Sur commande']" :searchable="true"
                    track-by="label" label="label" v-model="field.value" v-bind="field"
                    placeholder="Sélectionner le groupe de taxe" @select="showHide(field.value)" />
            </Field>
        </div>
        <ErrorMessage name="groupeTaxe" class="text-danger" />
    </div>
</div> -->

<!--<div class="mb-3">
    <label for="source">Source</label>
    -- <Field type="text" id="source" name="source" class="form-control" v-model="transfert.source"
                as="select">
                <option v-for="tresorerie in tresorerieList" :key="tresorerie.id" :value="tresorerie.id"
                    :disabled="tresorerie.status == 'fermé'">{{ tresorerie.nom }}</option>
            </Field> 

    <Field name="source" v-model="transfert.source" v-slot="{ field }">
        <Multiselect :options="tresorerieList" :searchable="true" track-by="label" label="label"
            v-model="field.value" v-bind="field" placeholder="Sélectionner le statut" />
    </Field>
    <ErrorMessage name="source" class="text-danger" />
</div>-->
