<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form @submit="updateTransfert" :validation-schema="schema" class="card">
                    <template v-for="transfert in transfertList" :key="transfert.id">
                        <div class="card-body" v-if="transfert.id == $route.params.id">
                            <div class="mb-3">
                                <label for="source">Source</label>
                                <Field type="text" id="source" name="source" class="form-control" as="select">
                                    <option v-for="tresorerie in tresorerieList" :key="tresorerie.id"
                                        :value="tresorerie.id" :disabled="tresorerie.status == 'fermé' ">{{ tresorerie.nom }}</option>
                                </Field>
                                <ErrorMessage name="source" class="text-danger" />
                            </div>
                            <div class="mb-3">
                                <label for="destination">Destination</label>
                                <Field type="text" id="destination" name="destination" class="form-control"
                                     as="select">
                                    <option v-for="tresorerie in tresorerieList" :key="tresorerie.id"
                                        :value="tresorerie.id" :disabled="tresorerie.status == 'fermé' ">{{ tresorerie.nom }}</option>
                                </Field>
                                <ErrorMessage name="destination" class="text-danger" />
                            </div>
                            <div class="mb-3">
                                <label for="montant">montant</label>
                                <Field type="number" id="montant" name="montant" class="form-control"
                                    :value="transfert.montant" />
                                <ErrorMessage name="montant" class="text-danger" />
                            </div>
                            <div class="mb-3">
                                <label for="dateDeTransfert">Date de transfert</label>
                                <Field type="date" id="dateDeTransfert" name="dateDeTransfert" class="form-control"
                                    :value="transfert.created_at" />
                                <ErrorMessage name="dateDeTransfert" class="text-danger" />
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary">Envoyer</button>
                                <router-link to="/transferts/liste-transfert" type="submit" class="btn btn-danger mx-1">
                                    Annuler
                                </router-link>
                            </div>
                        </div>
                    </template>
                </Form>
            </div>
        </div>

</template>

<script setup lang="ts">
import { Transfert } from "@/models/Transfert";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

const transfertList = ref<Transfert[]>([])



import { useRouter, useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import { Tresorerie } from "@/models/Tresorerie";
import ApiService from "@/services/ApiService";

const router = useRouter()
const route = useRoute()
const transfert = ref<Transfert>({})
const tresorerieList = ref<Tresorerie[]>([])

const schema = Yup.object().shape({
    source: Yup.string().required('La source est obligatoire').label('Source'),
    destination: Yup.string().required('La destination est obligatoire').label('Destination'),
    montant: Yup.string().required('Le montant est obligatoire').label('Montant'),
    dateDeTransfert: Yup.string().required('La date de transfert est obligatoire').label('Date de transfert'),

})

const updateTransfert = async (value: object) => {
    await ApiService.put(`/transferts/${route.params.id}`, value)
        .then(res => {
            
            console.log(res.data)
            router.push('/transferts/liste-transfert')
        })

}

const getTransfert = async () => {
    await ApiService.get('/transferts').then(res => {
        transfertList.value = res.data
        console.log(transfertList.value)
    })
}

const getTresorerie = () => {
    ApiService.get('/tresoreries')
        .then(res => {
            tresorerieList.value = res.data
            console.log(res)
        })
}

onMounted(() => {
    getTransfert(),
        getTresorerie()
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