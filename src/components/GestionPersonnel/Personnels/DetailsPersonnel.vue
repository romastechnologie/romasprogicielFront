<template>
  <div class="mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing form theme-form">
      <div class="px-2 pt-3 pb-1 m-1">
        <div v-for="personnel in personnels" :key="personnel.id" class="d-flex justify-content-center">
          <h3 v-if="$route.params.id == personnel.id" class="d-flex align-items-center bg-secondary text-center text-light py-1 px-2"
            style="border-radius: 0px 15px 0px 15px;">
            {{ personnel.nom + " " + personnel.prenom }} : 
            <router-link :to="{ name: 'EditPersonnelPage', params: { id: personnel.id } }">
              <i class="fa fa-pencil card rounded-1 p-1 bg-light text-secondary m-0"></i>
            </router-link>
          </h3>
        </div>
        <div class="row gx-3 flex-wrap d-flex justify-content-center m-2">
          <div class="col-4">
            <div type="button"
              class="card d-flex flex-row p-2 bg-secondary justify-content-center align-items-center mb-2"
              data-bs-toggle="modal" :data-bs-target="`#contrat`">
              <h6> Ajouter un contrat </h6>
            </div>
          </div>
          <div class="col-4">
            <div type="button"
              class="card d-flex flex-row p-2 bg-secondary justify-content-center align-items-center mb-2"
              data-bs-toggle="modal" :data-bs-target="`#fonctionService`">
              <h6> Ajouter une fonction </h6>
            </div>
          </div>
          <!-- <div class="col-4">
                <PersonnelElement target="horairePerso" icone="schedule" libelle="Ajouter une horaire personnel" />
            </div>
            <div class="col-4">
                <PersonnelElement target="servicePerso" icone="home_repair_service"
                    libelle="Ajouter un service personnel" />
            </div>
            <div class="col-4">
                <PersonnelElement target="fonctionPerso" icone="engineering" libelle="Ajouter une fonction personnel" />
            </div>
            <div class="col-4">
                <PersonnelElement target="contratPerso" icone="update" libelle="Modifier un contrat" />
            </div> -->
        </div>
        <h5 class="text-center"> Services - Fonctions </h5>
        <table class="table mb-5">
          <thead>
            <tr>
              <th scope="col"> Service </th>
              <th scope="col"> Fonction </th>
              <th scope="col"> Date de début </th>
              <th scope="col"> Date de Fin </th>
              <th scope="col"> Statut </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="personnel in personnels" :key="personnel.id">
              <template v-for="personnel_service_fonction in personnel.personnel_service_fonctions"
                :key="personnel_service_fonction.id">
                <tr v-if="personnel.id == $route.params.id">
                  <td>
                    {{ personnel_service_fonction.service_fonction.service.libelle }}
                  </td>
                  <td>
                    {{ personnel_service_fonction.service_fonction.fonction.libelle }}
                  </td>
                  <td> {{ (personnel_service_fonction.dateDebut as Date).toString().slice(0, 10) }} </td>
                  <td> {{ personnel_service_fonction.dateFin }} </td>
                  <td v-if="personnel_service_fonction.statut === 'Actif'" class="text-center"> <span
                      class="badge badge-success">Actif</span> </td>
                  <td v-else-if="personnel_service_fonction.statut === 'Inactif'" class="text-center"> <span
                      class="badge badge-danger">Inactif</span>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <h5 class="text-center"> Horaires </h5>
        <table class="table mb-5">
          <thead>
            <tr>
              <th scope="col"> Jour </th>
              <th scope="col"> Heure d'arrivée </th>
              <th scope="col"> Heure de départ </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="contrat in contrats" :key="contrat.id">
              <template v-if="contrat.personnel.id == $route.params.id">
                <tr v-for="horaire_personnel in contrat.horaire_personnels" :key="horaire_personnel.id">
                  <td> {{ horaire_personnel.jour }} </td>
                  <td> {{ horaire_personnel.heureArrivee }} H </td>
                  <td> {{ horaire_personnel.heureDepart }} H </td>
                  <td class="d-flex justify-content-center align-items-center">
                    <i class="fa fa-pencil card rounded-1 p-1 bg-secondary m-2"
                      @click="updateHeurePerso(horaire_personnel.id)"></i>
                  </td>
                </tr>
              </template>
            </template>
          </tbody>
        </table>
        <h5 class="text-center"> Contrats </h5>
        <table class="table m-0">
          <thead>
            <tr>
              <th scope="col"> Date de prise de fonction </th>
              <th scope="col"> Date de Fin </th>
              <th scope="col"> Statut </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="contrat in contrats" :key="contrat.id">
              <tr v-if="contrat.personnel.id == $route.params.id">
                <td> {{ contrat.datePriseFonction ? (contrat.datePriseFonction as Date).toString().slice(0, 10) : "" }}
                </td>
                <td> {{ contrat.dateFin }} </td>
                <td v-if="contrat.statut === 'Actif'" class="text-center"> <span
                    class="badge badge-success">Actif</span> </td>
                <td v-else-if="contrat.statut === 'Inactif'" class="text-center"> <span
                    class="badge badge-danger">Inactif</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <!-- Contrat -->
      <div class="modal fade" id="contrat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel"> Ajouter un contrat </h5>
              <button ref="closeContratModal" type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Form @submit="sendContrat" :validation-schema="schemaContrat()">
                <p class="my-0"> Date de prise de fonction </p>
                <Field type="date" name="datePriseFonction" id="datePriseFonction" class="form-control mb-1" />
                <ErrorMessage name="datePriseFonction" class="text-danger text-start mb-2" />
                <p class="my-0"> Salaire </p>
                <Field type="number" name="salaire" id="salaire" class="form-control mb-1" />
                <ErrorMessage name="salaire" class="text-danger text-start mb-2" />
                <p class="my-0"> Duration </p>
                <Field type="number" name="duration" id="duration" class="form-control mb-1" />
                <ErrorMessage name="duration" class="text-danger text-start mb-2" />
                <p class="my-0"> Conditions de licenciement </p>
                <Field type="text" name="conditionLicenciement" id="conditionLicenciement" class="form-control mb-1" />
                <ErrorMessage name="conditionLicenciement" class="text-danger text-start mb-2" />
                <p class="my-0"> Nombre de jour de congé </p>
                <Field type="number" name="nbJourConge" id="nbJourConge" class="form-control mb-1" />
                <ErrorMessage name="nbJourConge" class="text-danger text-start mb-2" />
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                  <button type="submit" class="btn btn-primary"> Envoyer </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <!-- Fonction -->
      <div class="modal fade" id="fonctionService" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel"> Ajouter une fonction personnel </h5>
              <button ref="closeFonctionModal" type="button" class="btn-close" data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Form @submit="sendFonctionPerso($event, $route.params.id)" :validation-schema="schemaFonctionPerso()">
                <p class="my-0"> Service </p>
                <Field name="service" id="service" class="form-select mb-1"
                  @click="sortServiceFonctionWithService($event.target)" as="select">
                  <option disabled selected> Choisir le service </option>
                  <option :value=service.libelle v-for="service in services" :key="service.id">
                    {{ service.libelle }}
                  </option>
                </Field>
                <ErrorMessage name="service" class="text-danger text-start" />
                <p class="my-0"> Fonction </p>
                <Field name="serviceFonction" id="serviceFonction" class="form-select mb-1" as="select">
                  <option disabled selected> Choisir la fonction </option>
                  <option :value=service_fonction.id v-for="service_fonction in filterServiceFonction"
                    :key="service_fonction.id">
                    {{ service_fonction.fonction.libelle }}
                  </option>
                </Field>
                <ErrorMessage name="serviceFonction" class="text-danger text-start" />
                <p class="my-0"> Date debut </p>
                <Field type="date" name="dateDebut" id="dateDebut" class="form-control mb-1" />
                <ErrorMessage name="dateDebut" class="text-danger text-start" />
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                  <button type="submit" class="btn btn-primary"> Envoyer </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <!-- Update Contrat -->
      <div class="modal fade" id="contratPerso" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel"> Mettre à jour un contrat </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <template v-for="contrat in contrats" :key="contrat.id">
                <Form v-if="contrat.personnel.id == $route.params.id" @submit="updateContrat"
                  :validation-schema="schemaContrat()">
                  <p class="my-0"> Date de prise de fonction </p>
                  <Field type="date" name="datePriseFonction" id="datePriseFonction" :value="contrat.datePriseFonction"
                    class="form-control mb-1" />
                  <ErrorMessage name="datePriseFonction" class="text-danger text-start mb-2" />
                  <p class="my-0"> Salaire </p>
                  <Field type="number" name="salaire" id="salaire" :value="contrat.salaire" class="form-control mb-1" />
                  <ErrorMessage name="salaire" class="text-danger text-start mb-2" />
                  <p class="my-0"> Duration </p>
                  <Field type="number" name="duration" id="duration" :value="contrat.duration"
                    class="form-control mb-1" />
                  <ErrorMessage name="duration" class="text-danger text-start mb-2" />
                  <p class="my-0"> Conditions de licenciement </p>
                  <Field type="text" name="conditionLicenciement" id="conditionLicenciement"
                    :value="contrat.conditionLicenciement" class="form-control mb-1" />
                  <ErrorMessage name="conditionLicenciement" class="text-danger text-start mb-2" />
                  <p class="my-0"> Nombre de jour de congé </p>
                  <Field type="number" name="nbJourConge" id="nbJourConge" :value="contrat.nbJourConge"
                    class="form-control mb-1" />
                  <ErrorMessage name="nbJourConge" class="text-danger text-start mb-2" />
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button type="submit" class="btn btn-primary"> Envoyer </button>
                  </div>
                </Form>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import axios from 'axios';
import Swal from 'sweetalert2'
import ApiService from '@/services/ApiService';

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const route = useRoute();

const personnels = ref([] as any[]);
const services = ref([] as any[]);
const service_fonctions = ref([] as any[]);

const contrats = ref([] as any[]);

const horairePersos = ref([] as any[]);

let filterServiceFonction = ref([] as any[]);

function sortServiceFonctionWithService(choseed: any) {
  filterServiceFonction.value = service_fonctions.value.filter(service_fonction => service_fonction.service.libelle === choseed.value);
}

// ------------------------------------ SCHEMA -------------------------------------------

function schemaContrat() {
  return yup.object().shape({
    datePriseFonction: yup.string().required("La date de prise de fonction est requise."),
    salaire: yup.string().required("Le salaire est requis."),
    duration: yup.string().required("La duration du contrat est requise."),
    conditionLicenciement: yup.string().required("Les conditions de licenciement sont requise."),
    nbJourConge: yup.string().required("Le nombre de jour de congé est requis."),
  })
}

function schemaFonctionPerso() {
  return yup.object().shape({
    service: yup.string().required("Le service est requis."),
    serviceFonction: yup.string().required("La fonction est requise."),
    dateDebut: yup.string().required("La date de début est requise."),
  })
}

// ------------------------------------ CLOSE MODAL --------------------------------------

const closeContratModal = ref(null);
const closeFonctionModal = ref(null);

// --------------------------------------- SENDING REQUEST --------------------------------


async function sendContrat(value: object) {

  Object.assign(value, {
    personnel: route.params.id
  })

  try {
    const response = await ApiService.post(`/contrats`, value);
    Swal.fire({
      timer: 1500,
      position: "top-end",
      text: "Contrat ajoutée avec succès!",
      icon: "success"
    });
    getAllContrat()
    if (closeContratModal.value) {
      (closeContratModal.value as HTMLElement).click();
    }
  } catch (error) {
    console.error('Erreur lors de la création du contrat!', error);
    throw error;
  }
}

async function sendFonctionPerso(value: object, id: string | string[]) {

  const serviceFonction = document.getElementById("serviceFonction") as HTMLSelectElement;

  try {
    const response = await ApiService.post(`/personnelServiceFonctions/${id}/${serviceFonction.value}`, value);
    Swal.fire({
      timer: 1000,
      position: "top-end",
      text: "Fonction ajouté avec succès!",
      icon: "success"
    });
    getAllPersonnel()
    if (closeFonctionModal.value) {
      (closeFonctionModal.value as HTMLElement).click();
    }
  } catch (error) {
    console.error('Erreur lors de la création de la fonction du personnel:', error);
    throw error;
  }
}

// ------------------------------------------- UPDATE ---------------------------------

const updateHeurePerso = async (id: any) => {

  const { value: formValues } = await Swal.fire({
    title: "Modifer l'horaire du personnel",
    html: `
        <input id="swal-input1" class="swal2-input" placeholder="Heure d'arrivée">
        <input id="swal-input2" class="swal2-input" placeholder="Heure de départ">
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (document.getElementById("swal-input1") as HTMLInputElement).value,
        (document.getElementById("swal-input2") as HTMLInputElement).value
      ];
    }
  });
  if (formValues) {

    try {
      const response = await ApiService.put(`/horairePersonnels/${id}`, {
        heureArrivee: formValues[0],
        heureDepart: formValues[1],
      });
      Swal.fire("Horaire modifié avec succès", "", "success");
      getAllContrat()

    } catch (error) {
      console.error('Erreur lors de la modification de l\'horaire du personnel:', error);
      throw error;
    }
  }

}

async function updateContrat(value: object) {

  const contratStatut = document.getElementById("updateContratStatut") as HTMLInputElement;

  Object.assign(value, {
    statut: contratStatut.value
  })

  try {
    const response = await ApiService.put(`/contrats/${route.params.id}`, value);
    Swal.fire({
      timer: 1500,
      position: "top-end",
      text: "Contrat mise à jour avec succès!",
      icon: "success"
    });

    if (closeContratModal.value) {
      (closeContratModal.value as HTMLElement).click();
    }
  } catch (error) {
    console.error('Erreur lors de la mise en jour du contrat!', error);
    throw error;
  }
}

// ------------------------------------------ GET DATA --------------------------------
const getAllPersonnel = async () => {
  try {
    const response = await ApiService.get('/personnels');
    personnels.value = response.data;
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}

const getAllContrat = async () => {
  try {
    const response = await ApiService.get('/contrats');
    contrats.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la recupération des contrats:', error);
    throw error;
  }
}

const getAllHoraire = async () => {
  try {
    const response = await ApiService.get('/horaires');

  } catch (error) {
    console.error('Erreur lors de la recupération des horaires:', error);
    throw error;
  }
}

const getAllFonctions = async () => {
  try {
    const response = await ApiService.get('/fonctions');


  } catch (error) {
    console.error('Erreur lors de la recupération des fonctions:', error);
    throw error;
  }
}

const getAllContratPersos = async () => {
  try {
    const response = await ApiService.get('/contrats');


  } catch (error) {
    console.error('Erreur lors de la recupération des contrats:', error);
    throw error;
  }
}

const getAllHorairePersos = async () => {
  try {
    const response = await ApiService.get('/horairePersonnels');
    horairePersos.value = response.data;

  } catch (error) {
    console.error('Erreur lors de la recupération des horaires personnels :', error);
    throw error;
  }
}

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

onMounted(() => {
  getAllContrat(),
    getAllHoraire(),
    getAllServices(),
    getAllFonctions(),
    getAllContratPersos(),
    getAllHorairePersos(),
    getAllServiceFonctions(),
    getAllPersonnel()
})

</script>

<style></style>