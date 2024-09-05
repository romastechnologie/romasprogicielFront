<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
            <div class="card p-2 col-lg-6 col-md-7 mx-auto">
                <Form @submit="updateDemande" :validation-schema="schemaDemande()" name="sendPresence"
                    :initial-values="demandes">
                    <p class="my-0"> Catégorie de la demande </p>
                    <select name="categorieId" id="categorieId" class="form-select mb-1 text-black">
                        <template v-if="category">
                            <option v-if="category" :value="category.id" selected> {{ category.libelle }} </option>
                            <template v-for="categorie in categorieDemandes" :key="categorie.id">
                                <option v-if="category.id != categorie.id" :value=categorie.id>
                                    {{ categorie.libelle }}
                                </option>
                            </template>
                        </template>
                    </select>
                    <!-- <Field name="categorieId" v-model="cate" v-slot="{ field }">
                        <VueMultiselect v-model="field.value" v-bind="field" :options="categorieOptions"
                            :close-on-select="true" :clear-on-select="false" :multiple="false" :searchable="true"
                            placeholder="Sélectionner la catégorie" label="label" track-by="label" />
                    </Field> -->
                    <p class="my-0"> Personnel </p>
                    <input type="text"
                        :value="demandes.personnel ? demandes.personnel.nom + ' ' + demandes.personnel.prenom : ''"
                        class="form-select mb-1" readonly>
                    <p class="my-0"> Demande </p>
                    <Field type="file" name="demandeFileName" id="demandeFileName" class="form-control mb-1" />
                    <ErrorMessage name="demandeFileName" class="text-danger text-start mb-2" />
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary" style="background-">
                            Modifier </button>
                        <router-link to="/demandes/liste-demande">
                            <button type="submit" class="btn btn-danger">
                                Annuler </button>
                        </router-link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import VueMultiselect from 'vue-multiselect'
import ApiService from '@/services/ApiService';

const router = useRouter()
const route = useRoute()

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
});

const demandes = ref([] as any[]);
const categorieDemandes = ref([] as any[]);
const cate = ref();
const categorieOptions = ref([] as any[]);
const category = ref(null as any);

// ------------------------------------------------ SCHEMA -------------------------------------------------

function schemaDemande() {
    return yup.object().shape({
        demandeFileName: yup.string().required("Le fichier de la demande est obligatoire."),
    })
}

// ------------------------------------------------ UPDATE -------------------------------------------------

async function updateDemande() {

    const formData = new FormData();

    const categorieId = document.getElementById("categorieId") as HTMLInputElement;
    const target = document.getElementById("demandeFileName") as HTMLInputElement;

    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file && file.size > 1048576) {
            Swal.fire({
                title: "Oops...!",
                text: "La taille du fichier dépasse 1 Mo!",
                icon: "error"
            });
        } else {
            formData.append('fichier', target.files[0])
            try {
                const response = await ApiService.put(`/demandes/${route.params.id}/${categorieId.value}`, formData);
                Swal.fire({
                    timer: 1500,
                    position: "top-end",
                    text: "La demande a été modifiée avec succès!",
                    icon: "success"
                });
                router.push("/demandes/liste-demande")
            } catch (error) {
                console.error('Erreur lors de la modification de la demande:', error);
                throw error;
            }
        }
    }
}

const getAllCategorieDemandes = async () => {
    try {
        const response = await ApiService.get("/categorieDemandes");
        categorieDemandes.value = response.data.data.data;
        categorieOptions.value = response.data.data.data.map((categorie: any) => ({
        value: categorie.id,
        label: `${categorie.libelle}`
      }));
        console.log(response);
    } catch (error) {
        console.error('Erreur lors de la recupération des categories de demandes:', error);
        throw error;
    }
}

const getDemande = async () => {
    try {
        const response = await ApiService.get(`/demandes/${route.params.id}`);
        demandes.value = response.data;
        category.value = response.data.categorie
        console.log("Response", response);
        console.log("Demande", category.value);
    } catch (error) {
        console.error('Erreur lors de la recupération des demandes:', error);
        throw error;
    }
}

onMounted(() => {
    getAllCategorieDemandes()
    getDemande()
})

</script>

<style></style>