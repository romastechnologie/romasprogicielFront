<template>
    <main>
        <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing ">
                <Form class="col" :validation-schema="tresorerieschema" @submit="addTresorerie">
                    <div class="row">
                        <div class="col-6 my-3">
                            <label for="nom">Nom</label>
                            <Field type="text" name="nom" id="nom" class="form-control" />
                            <ErrorMessage name="nom" class="text-danger" />
                        </div>
                        <div class="col-6 my-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="operation" id="nonOperationnelle"
                                    checked value="Non Opérationnelle" v-model="tresorerie.operation"/>
                                <label class="form-check-label" for="nonOperationnelle">
                                    Non Opérationnelle
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="operation" id="operationnelle"
                                    value="Opérationnelle" v-model="tresorerie.operation"/>
                                <label class="form-check-label" for="operationnelle">
                                    Opérationnelle
                                </label>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 my-3">
                            <label for="typeTresorerieId">Type de trésorerie</label>
                            <Field name="typeTresorerieId" v-model="typeTresorerieId" v-slot="{ field }" class="form-control">
                                <VueMultiselect  v-model="field.value" v-bind="field" :options="tresorerieOptions"
                                    :close-on-select="true" :clear-on-select="false" :multiple="false" :preserve-search="true"
                                    :searchable="true" placeholder="Sélectionner le type de trésorerie" label="label"
                                    track-by="label" />
                            </Field>
                            <!--<ErrorMessage name="typeTresorerieId" class="text-danger" />-->
                        </div>


                        <div class="col-6 my-3">
                            <label for="montant">Montant</label>
                            <Field type="number" name="montant" id="montant" class="form-control" placeholder="Entrer le montant"/>
                            <ErrorMessage name="montant" class="text-danger" />
                        </div>
                        <div class="col-6 my-3">
                            <label for="dateCreation">Date de création</label>
                            <Field type="date" name="dateCreation" id="dateCreation" class="form-control" />
                            <ErrorMessage name="dateCreation" class="text-danger" />
                        </div>
                    </div>


                    <div class="col-6">
                        <button type="submit" class="btn btn-primary mx-2">Ajouter</button>
                        <router-link to="/tresoreries/liste-tresorerie/" type="button"
                            class="btn btn-danger">Annuler</router-link>
                    </div>
                </Form>
            </div>

        </div>

    </main>

    <router-view />

</template>

<script setup lang="ts">

import { Tresorerie } from '@/models/Tresorerie';

import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import * as Yup from 'yup'
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { TypeTresorerie } from '@/models/TypeTresorerie';
import ApiService from '@/services/ApiService';
import VueMultiselect from 'vue-multiselect'


const router = useRouter()

const tresorerie = ref<Tresorerie>({})
const typeTresorerieId = ref()
const tresorerieOptions = ref([]);
const tresorerieList = ref<Tresorerie[]>([])
const typeTresorerieList = ref<TypeTresorerie[]>([])
const typeTresorerie = ref<TypeTresorerie>({})
const close = ref(null)

const tresorerieschema = Yup.object().shape({
    nom: Yup.string().required('Le nom est obligatoire').label('Nom'),
    montant: Yup.number().required('Le montant est obligatoire').label('Montant'),
    dateCreation: Yup.string().required('La date de création est obligatoire').label('Date de création'),
    // typeTresorerieId: Yup.number().required('Le type de trésorerie est obligatoire').label('Type de trésorerie')
    // operation: Yup.string().required('L\'opération est obligatoire')
})



configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});

onMounted(() => {
    getTypeTresorerie()

    // tresorerieList.value.push({
    //     typeTresorerieName: tresorerie.value.typeTresorerieName
    // })
})



const addTresorerie = async (value: Object) => {
    
    value['typeTresorerieId'] = typeTresorerieId.value.value
    await ApiService.post(`/tresoreries/`, value).then(res => {
        if (close.value) {
            (close.value as HTMLElement).click()
        }

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Type de trésorerie ajouté",
            showConfirmButton: false,
            timer: 1500
        })
        router.push('/tresoreries/liste-tresorerie')
        console.log(res.data)
    })
}



const getTypeTresorerie = async () => {
    await ApiService.get('/typeTresoreries').then(res => {
        typeTresorerieList.value = res.data
        tresorerieOptions.value = typeTresorerieList.value.map((tresorerie: any) => ({
            value: tresorerie.id,
            label: `${tresorerie.libelle}`
        }));
    })
}



</script>
