<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
      <div>
        <div class="mb-3">
          <!-- {{ (newPersonnel) }} -->
        </div>
        <div class="p-2">
          <h4 class="text-center mb-0"> Information personnel </h4>
          <Form :validation-schema="schemaPersonnel()">
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Nom </p>
                <Field v-model="newPersonnel.personnel.nom" type="text" name="nom" id="nom" class="form-control mb-1" />
                <ErrorMessage name="nom" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Prénom(s) </p>
                <Field v-model="newPersonnel.personnel.prenom" type="text" name="prenom" id="prenom"
                  class="form-control mb-1" />
                <ErrorMessage name="prenom" class="text-danger text-start" />
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Date de naissance </p>
                <Field @change="verifyPersonnelDateEmbauche" v-model="newPersonnel.personnel.birthdate" type="date"
                  name="birthdate" id="birthdate" class="form-control mb-1" />
                <ErrorMessage name="birthdate" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Adresse e-mail </p>
                <Field v-model="newPersonnel.personnel.email" type="email" name="email" id="email"
                  class="form-control mb-1" />
                <ErrorMessage name="email" class="text-danger text-start" />
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Tél </p>
                <Field v-model="newPersonnel.personnel.telephone" type="text" name="telephone" id="telephone"
                  class="form-control mb-1" />
                <ErrorMessage name="telephone" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Date d'embauche </p>
                <Field @change="verifyPersonnelAge" v-model="newPersonnel.personnel.dateEmbauche" type="date"
                  name="dateEmbauche" id="dateEmbauche" class="form-control mb-1" />
                <ErrorMessage name="dateEmbauche" class="text-danger text-start" />
              </div>
            </div>
            <h4 class="text-center mt-4 mb-0"> Service - Fonction </h4>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Service </p>
                <Field name="service" id="service" class="form-select mb-1"
                  @click="sortServiceFonctionWithService($event.target)" as="select">
                  <option disabled selected> Choisir le service </option>
                  <option :value=service.libelle v-for="service in services" :key="service.id">
                    {{ service.libelle }}
                  </option>
                </Field>
                <ErrorMessage name="service" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Fonction </p>
                <Field v-model="newPersonnel.personnelServiceFonction.service_fonction" name="serviceFonction"
                  id="serviceFonction" class="form-select mb-1" as="select">
                  <option disabled selected> Choisir la fonction </option>
                  <option :value=service_fonction.id v-for="service_fonction in filterServiceFonction"
                    :key="service_fonction.id">
                    {{ service_fonction.fonction.libelle }}
                  </option>
                </Field>
                <ErrorMessage name="serviceFonction" class="text-danger text-start" />
              </div>
              <button ref="clickPersonnelForm" type="submit" class="d-none"> Envoyer </button>
            </div>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Date debut </p>
                <Field v-model="newPersonnel.personnelServiceFonction.dateDebut" type="date" name="dateDebut"
                  id="dateDebut" class="form-control mb-1" />
                <ErrorMessage name="dateDebut" class="text-danger text-start" />
              </div>
              <div class="col mx-2">

              </div>
            </div>
          </Form>
          <h4 class="text-center mt-4 mb-0"> Contrat </h4>
          <Form :validation-schema="schemaContrat()">
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Date de prise de fonction </p>
                <Field v-model="newPersonnel.contrat.datePriseFonction" type="date" name="datePriseFonction"
                  id="datePriseFonction" class="form-control mb-1" />
                <ErrorMessage name="datePriseFonction" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Salaire </p>
                <Field v-model="newPersonnel.contrat.salaire" type="number" name="salaire" id="salaire"
                  class="form-control mb-1" />
                <ErrorMessage name="salaire" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Duration </p>
                <Field v-model="newPersonnel.contrat.duration" type="number" name="duration" id="duration"
                  class="form-control mb-1" />
                <ErrorMessage name="duration" class="text-danger text-start mb-2" />
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Conditions de licenciement </p>
                <Field v-model="newPersonnel.contrat.conditionLicenciement" type="text" name="conditionLicenciement"
                  id="conditionLicenciement" class="form-control mb-1" />
                <ErrorMessage name="conditionLicenciement" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Nombre de jour de congé </p>
                <Field v-model="newPersonnel.contrat.nbJourConge" type="number" name="nbJourConge" id="nbJourConge"
                  class="form-control mb-1" />
                <ErrorMessage name="nbJourConge" class="text-danger text-start mb-2" />
              </div>
            </div>
            <button ref="clickContratForm" type="submit" class="d-none"> Envoyer </button>
          </Form>
          <h4 class="text-center mt-4 mb-0"> Horaire </h4>
          <div>
            <div class="row gx-2">
              <div class="col">
                <h6> Jour </h6>
              </div>
              <div class="col">
                <h6> Heure d'arrivée </h6>
              </div>
              <div class="col">
                <h6> Heure de depart </h6>
              </div>
            </div>
            <template v-for="horairepersonnel in newPersonnel.horaire_personnels" :key="horairepersonnel.jour">
              <Form :validation-schema="schemaHorairePerso()" class="row gx-2">
                <div class="col">
                  <div>
                    <Field v-model="horairepersonnel.jour" name="jour" id="jour" class="form-select mb-1" as="select"
                      disabled>
                      <option :value=horairepersonnel.jour>
                        {{ horairepersonnel.jour }}
                      </option>
                    </Field>
                    <ErrorMessage name="jour" class="text-danger text-start mb-2" />
                  </div>
                </div>
                <div class="col">
                  <div>
                    <Field v-model="horairepersonnel.heureArrivee" type="text" name="heureArrivee" id="heureArrivee"
                      class="form-control mb-1" />
                    <ErrorMessage name="heureArrivee" class="text-danger text-start mb-2" />
                  </div>
                </div>
                <div class="col">
                  <div>
                    <Field v-model="horairepersonnel.heureDepart" type="text" name="heureDepart" id="heureDepart"
                      class="form-control mb-1" />
                    <ErrorMessage name="heureDepart" class="text-danger text-start mb-2" />
                  </div>
                </div>
                <button ref="clickHoraireForm" type="submit" class="d-none"> Envoyer </button>
              </Form>
            </template>
          </div>
        </div>
        <div>
          <button @click="createPersonnel" class="btn btn-primary m-2"> Envoyer </button>
          <router-link to="/personnels/liste-personnel">
            <button type="submit" class="btn btn-danger">
              Annuler </button>
          </router-link>
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

interface PersonnelServiceFonction {
  dateDebut: string;
  personnel: number;
  service_fonction: number;
}

interface Contrat {
  datePriseFonction: string;
  salaire: number;
  duration: number;
  conditionLicenciement: string;
  nbJourConge: number;
  personnel: number;
}

interface Horairepersonnel {
  jour: string;
  heureArrivee: string;
  heureDepart: string;
  horaire: number;
  contrat: number;
}

interface PERSONNEL {
  personnel: Personnel,
  personnelServiceFonction: PersonnelServiceFonction;
  contrat: Contrat;
  horaire_personnels: Horairepersonnel[];
}

const clickPersonnelForm = ref(null);
const clickContratForm = ref(null);
const clickHoraireForm = ref(null);
const services = ref([] as any[]);
const service_fonctions = ref([] as any[]);
const personnels = ref([] as any[]);
const horaires = ref([] as any[]);
const currentPersonnel = ref();
const currentContrat = ref();

const horairePersonnels = ref<Horairepersonnel[]>([]);

const newPersonnel = ref<PERSONNEL>({
  personnel: {
    nom: "",
    prenom: "",
    birthdate: "",
    email: "",
    telephone: 0,
    dateEmbauche: ""
  },
  personnelServiceFonction: {
    dateDebut: "",
    personnel: 0,
    service_fonction: 0,
  },
  contrat: {
    datePriseFonction: "",
    salaire: 0,
    duration: 0,
    conditionLicenciement: "",
    nbJourConge: 30,
    personnel: 0,
  },
  horaire_personnels: horairePersonnels.value
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
    newPersonnel.value.personnel.birthdate = "";
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
    newPersonnel.value.personnel.dateEmbauche = "";
  }

}

let filterServiceFonction = ref([] as any[]);

function sortServiceFonctionWithService(choseed: any) {
  filterServiceFonction.value = service_fonctions.value.filter(service_fonction => service_fonction.service.libelle === choseed.value);
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
    service: yup.string().required("Le service est requis."),
    serviceFonction: yup.string().required("La fonction est requise."),
    dateDebut: yup.string().required("La date de début est requise."),
  })
}

function schemaContrat() {
  return yup.object().shape({
    datePriseFonction: yup.string().required("La date de prise de fonction est requise."),
    personnel: yup.string().required("Le personnel est requis."),
    salaire: yup.string().required("Le salaire est requis."),
    duration: yup.string().required("La duration du contrat est requise."),
    conditionLicenciement: yup.string().required("Les conditions de licenciement sont requise."),
    nbJourConge: yup.string().required("Le nombre de jour de congé est requis."),
  })
}

function schemaHorairePerso() {
  return yup.object().shape({
    jour: yup.string().required("Le jour est requis."),
    heureArrivee: yup.string().required("L'heure d'arrivée est requise."),
    heureDepart: yup.string().required("L'heure de départ est requise.")
  })
}

// --------------------------------------------------- SEND -------------------------------------------------
// async function sendPersonnel() {

//     // try {
//     //     const response = await ApiService.post('/personnels', personnel.value);
//     //     if (response.data) {

//     //         currentPersonnel.value = response.data.id;
//     //         const serviceFonction = document.getElementById("serviceFonction") as HTMLSelectElement;
//     //         const dateDebut = document.getElementById("dateDebut") as HTMLInputElement;

//     //         try {
//     //             await ApiService.post(`/personnelServiceFonctions/${response.data.id}/${serviceFonction.value}`, {
//     //                 dateDebut: dateDebut.value
//     //             });
//     //         } catch (error) {
//     //             console.error('Erreur lors de la création de la fonction du personnel:', error);
//     //             throw error;
//     //         }

//     //     }
//     // } catch (error) {
//     //     console.error('Erreur lors de la création du personnel:', error);
//     //     throw error;
//     // }
// }

// async function sendContrat() {

//     // try {
//     //     const response = await ApiService.post(`/contrats`, contrat.value);
//     //     if (response.data) {
//     //         for (let index = 0; index < horairePersonnels.value.length; index++) {
//     //             horairePersonnels.value[index].contrat = response.data.id;
//     //         }
//     //     }

//     // } catch (error) {
//     //     console.error('Erreur lors de la création du contrat!', error);
//     //     throw error;
//     // }
// }

// async function sendHorairePerso() {

//     // try {
//     //     await ApiService.post(`/horairePersonnels`, horairePersonnels.value);

//     // } catch (error) {
//     //     console.error('Erreur lors de la création de l\'horaire personnel:', error);
//     //     throw error;
//     // }
// }

async function createPersonnel() {

  if (clickPersonnelForm.value && clickContratForm.value) {

    try {
      const dateNaissance = new Date((document.getElementById("birthdate") as HTMLInputElement).value);
      const dateEmbauche = new Date((document.getElementById("dateEmbauche") as HTMLInputElement).value);
      const datePriseFonction = new Date((document.getElementById("datePriseFonction") as HTMLInputElement).value);

      const differenceAnnees = dateEmbauche.getFullYear() - dateNaissance.getFullYear();

      if (differenceAnnees >= 18 && datePriseFonction >= dateEmbauche) {


        const response = await ApiService.post('/personnels', newPersonnel.value);

        if (response.data) {
          Swal.fire({
            timer: 700,
            position: "top-end",
            text: "Personnel ajouté avec succès!",
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
}

// --------------------------------------------------- GET ------------------------------------------------
const getAllServices = async () => {
  try {
    const response = await ApiService.get('/services');
    services.value = response.data.data.data

    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des services:', error);
    throw error;
  }
}

const getAllServiceFonctions = async () => {
  try {
    const response = await ApiService.get('/servicefonctions');
    service_fonctions.value = response.data
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des services fonctions:', error);
    throw error;
  }
}

const getAllPersonnels = async () => {
  try {
    const response = await ApiService.get('/personnels');
    personnels.value = response.data
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}

const getAllHoraires = async () => {
  try {
    const response = await ApiService.get('/horaires');
    horaires.value = response.data
    for (let index = 0; index < horaires.value.length; index++) {
      newPersonnel.value.horaire_personnels.push({
        jour: horaires.value[index].jour,
        heureArrivee: horaires.value[index].heureOuverture,
        heureDepart: horaires.value[index].heureFermeture,
        horaire: horaires.value[index].id,
        contrat: 0
      })
    }
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des horaires:', error);
    throw error;
  }
}

onMounted(() => {
  getAllServices();
  getAllServiceFonctions();
  getAllPersonnels();
  getAllHoraires();
})
</script>

<style></style>