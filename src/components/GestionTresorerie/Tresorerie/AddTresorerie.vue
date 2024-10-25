<template>
    <main>
        <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
            <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
                <Form class="col" :validation-schema="tresorerieschema" @submit="addTresorerie">
                    <div class="row">
                        <div class="col-4 my-3">
                            <label for="nom">Nom</label>
                            <Field type="text" name="nom" id="nom" class="form-control" />
                            <ErrorMessage name="nom" class="text-danger" />
                        </div>
                        <div class="col-4 my-3">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="operation" id="nonOperationnelle" value="Non Opérationnelle" v-model="tresorerie.operation" />
                                <label class="form-check-label" for="nonOperationnelle">
                                    Non Opérationnelle
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="operation" id="operationnelle" value="Opérationnelle" v-model="tresorerie.operation" />
                                <label class="form-check-label" for="operationnelle">
                                    Opérationnelle
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4 my-3">
                            <label for="typeTresorerieId">Type de trésorerie</label>
                            <Multiselect v-model="tresorerie.typeTresorerieId" :options="tresorerieOptions" :close-on-select="true" :clear-on-select="false" :multiple="false" :preserve-search="true" :searchable="true" placeholder="Sélectionner le type de trésorerie" label="label" track-by="label" />
                            <ErrorMessage name="typeTresorerieId" class="text-danger" />
                        </div>
                        

                        <div class="col-4 my-3">
                            <label for="montant">Montant</label>
                            <Field type="number" name="montant" id="montant" class="form-control" placeholder="Entrer le montant" />
                            <ErrorMessage name="montant" class="text-danger" />
                        </div>

                        <div class="col-4 my-3">
                            <label for="dateCreation">Date de création</label>
                            <Field type="date" name="dateCreation" id="dateCreation" class="form-control" />
                            <ErrorMessage name="dateCreation" class="text-danger" />
                        </div>
                    </div>

                    <div class="col-6">
                        <button type="submit" class="btn btn-primary mx-2">Ajouter</button>
                        <router-link to="/tresoreries/liste-tresorerie/" type="button" class="btn btn-danger">Annuler</router-link>
                    </div>
                </Form>
            </div>
        </div>

    </main>

    <router-view />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Tresorerie } from "@/models/Tresorerie";
import ApiService from "@/services/ApiService";
import Multiselect from "@vueform/multiselect";

const router = useRouter();

const tresorerie = ref({
    nom: '',
    operation: 'Non Opérationnelle',
    montant: null,
    dateCreation: '',
    typeTresorerieId: null,
});

const typeTresorerieOptions = ref([]);
const tresorerieschema = Yup.object().shape({
    nom: Yup.string().required("Le nom est obligatoire").label("Nom"),
    montant: Yup.number().required("Le montant est obligatoire").label("Montant"),
    dateCreation: Yup.string().required("La date de création est obligatoire").label("Date de création"),
});

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
});

onMounted(() => {
    getTypeTresorerie();
});

const getTypeTresorerie = async () => {
    try {
        const res = await ApiService.get("all/typeTresoreries");
        typeTresorerieOptions.value = res.data.map((tresorerie: any) => ({
            value: tresorerie.id,
            label: tresorerie.libelle,
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des types de trésoreries", error);
    }
};

const addTresorerie = async (values: any) => {
    try {
        await ApiService.post("/tresoreries/", values);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Trésorerie ajoutée",
            showConfirmButton: false,
            timer: 1500,
        });
        router.push("/tresoreries/liste-tresorerie");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la trésorerie", error);
    }
};
</script>
