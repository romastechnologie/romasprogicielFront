<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
            <div>
                <div class="mb-3">
                    <!-- {{ (newPersonnel) }} -->
                </div>
                <div class="p-2">
                    <h4 class="text-center mb-0"> Information personnel </h4>
                    <Form @submit="updatePersonnel" :validation-schema="schemaPersonnel()">
                        <div class="d-flex mb-2">
                            <div class="col mx-2">
                                <p class="my-0"> Nom </p>
                                <Field v-model="newPersonnel.nom" type="text" name="nom" id="nom"
                                    class="form-control mb-1" />
                                <ErrorMessage name="nom" class="text-danger text-start" />
                            </div>
                            <div class="col mx-2">
                                <p class="my-0"> Prénom(s) </p>
                                <Field v-model="newPersonnel.prenom" type="text" name="prenom" id="prenom"
                                    class="form-control mb-1" />
                                <ErrorMessage name="prenom" class="text-danger text-start" />
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="col mx-2">
                                <p class="my-0"> Date de naissance </p>
                                <Field @change="verifyPersonnelDateEmbauche" v-model="newPersonnel.birthdate"
                                    type="date" name="birthdate" id="birthdate" class="form-control mb-1" />
                                <ErrorMessage name="birthdate" class="text-danger text-start" />
                            </div>
                            <div class="col mx-2">
                                <p class="my-0"> Adresse e-mail </p>
                                <Field v-model="newPersonnel.email" type="email" name="email" id="email"
                                    class="form-control mb-1" />
                                <ErrorMessage name="email" class="text-danger text-start" />
                            </div>
                        </div>
                        <div class="d-flex mb-2">
                            <div class="col mx-2">
                                <p class="my-0"> Tél </p>
                                <Field v-model="newPersonnel.telephone" type="text" name="telephone" id="telephone"
                                    class="form-control mb-1" />
                                <ErrorMessage name="telephone" class="text-danger text-start" />
                            </div>
                            <div class="col mx-2">
                                <p class="my-0"> Date d'embauche </p>
                                <Field @change="verifyPersonnelAge" v-model="newPersonnel.dateEmbauche" type="date"
                                    name="dateEmbauche" id="dateEmbauche" class="form-control mb-1" />
                                <ErrorMessage name="dateEmbauche" class="text-danger text-start" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="btn btn-primary m-2"> Envoyer </button>
                            <router-link to="/personnels/liste-personnel">
                                <button type="submit" class="btn btn-danger">
                                    Annuler </button>
                            </router-link>
                        </div>
                    </Form>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, FormContext } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';
import ApiService from '@/services/ApiService';
import { useRoute } from 'vue-router';

const route = useRoute();

configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
});

interface Personnel {
    nom: string;
    prenom: string;
    birthdate: string;
    email: string;
    telephone: number;
    dateEmbauche: string;
}

const clickPersonnelForm = ref(null);
const clickContratForm = ref(null);
const clickHoraireForm = ref(null);
const services = ref([] as any[]);
const service_fonctions = ref([] as any[]);
const personnel = ref();
const horaires = ref([] as any[]);
const currentPersonnel = ref();
const currentContrat = ref();

const newPersonnel = ref<Personnel>({
    nom: "",
    prenom: "",
    birthdate: "",
    email: "",
    telephone: 0,
    dateEmbauche: ""
});

const verifyPersonnelAge = () => {
    const dateNaissance = new Date((document.getElementById("birthdate") as HTMLInputElement).value);
    const dateEmbauche = new Date((document.getElementById("dateEmbauche") as HTMLInputElement).value);

    const differenceAnnees = dateEmbauche.getFullYear() - dateNaissance.getFullYear();

    if (differenceAnnees < 18 || (differenceAnnees === 18 && (dateEmbauche.getMonth() < dateNaissance.getMonth() || (dateEmbauche.getMonth() === dateNaissance.getMonth() && dateEmbauche.getDate() < dateNaissance.getDate())))) {
        Swal.fire({
            toast: true,
            position: "top-end",
            timer: 2000,
            timerProgressBar: true,
            text: "Le personnel n'as pas encore 18 ans",
            icon: "error",
            showConfirmButton: false
        })
        newPersonnel.value.birthdate = "";
    }

}

const verifyPersonnelDateEmbauche = () => {
    const dateNaissance = new Date((document.getElementById("birthdate") as HTMLInputElement).value);
    const dateEmbauche = new Date((document.getElementById("dateEmbauche") as HTMLInputElement).value);

    const differenceAnnees = dateEmbauche.getFullYear() - dateNaissance.getFullYear();

    if (differenceAnnees < 18 || (differenceAnnees === 18 && (dateEmbauche.getMonth() < dateNaissance.getMonth() || (dateEmbauche.getMonth() === dateNaissance.getMonth() && dateEmbauche.getDate() < dateNaissance.getDate())))) {
        Swal.fire({
            toast: true,
            position: "top-end",
            timer: 2000,
            timerProgressBar: true,
            text: "Le personnel n'as pas encore 18 ans",
            icon: "error",
            showConfirmButton: false
        })
        newPersonnel.value.dateEmbauche = "";
    }

}

// --------------------------------------------------- SCHEMA ----------------------------------------------
function schemaPersonnel() {
    return yup.object().shape({
        nom: yup.string().required("Le nom est requis."),
        prenom: yup.string().required("Le prenom est requis."),
        birthdate: yup.string().required("La date d'anniversaire est requise."),
        email: yup.string().email("L'adresse e-mail n'est pas valide.").required("L'adresse e-mail est requise."),
        telephone: yup.string().required("Le numéro de telephone est requis."),
        dateEmbauche: yup.string().required("La date d'embauche est requise."),
    })
}

// --------------------------------------------------- SEND -------------------------------------------------

async function updatePersonnel() {

        try {
            const dateNaissance = new Date((document.getElementById("birthdate") as HTMLInputElement).value);
            const dateEmbauche = new Date((document.getElementById("dateEmbauche") as HTMLInputElement).value);

            const differenceAnnees = dateEmbauche.getFullYear() - dateNaissance.getFullYear();

            if (differenceAnnees >= 18) {


                const response = await ApiService.patch(`/personnels/${route.params.id}`, newPersonnel.value);

                if (response.data) {
                    Swal.fire({
                        timer: 700,
                        position: "top-end",
                        text: "Personnel modifié avec succès!",
                        icon: "success"
                    });
                    router.push(`/personnels/liste-personnel/${response.data.id}`)
                }

            } else {
                Swal.fire("Le personnel n'a pas encore 18 ans ou la date de prise de fonction est inférieure à la date d'embauche.", "", "error");
            }


        } catch (error) {
            console.error('Erreur lors de la création du personnel:', error);
            throw error;
        }
}

// --------------------------------------------------- GET ------------------------------------------------
const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getPersonnel = async () => {
    try {
        const response = await ApiService.get(`/personnels/${route.params.id}`);
        personnel.value = response.data
        newPersonnel.value.nom = personnel.value.nom;
        newPersonnel.value.prenom = personnel.value.prenom;
        newPersonnel.value.email = personnel.value.email;
        newPersonnel.value.telephone = personnel.value.telephone;
        newPersonnel.value.dateEmbauche = formatDate(new Date(personnel.value.dateEmbauche));
        newPersonnel.value.birthdate = formatDate(new Date(personnel.value.birthdate));
        console.log(response);
    } catch (error) {
        console.error('Erreur lors de la recupération des personnels:', error);
        throw error;
    }
}

onMounted(() => {
    getPersonnel()
})
</script>

<style></style>