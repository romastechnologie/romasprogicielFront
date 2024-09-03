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
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Titre du Poste </p>
                <Field v-model="newPersonnel.personnel.titrePoste" type="text" name="titrePoste" id="titrePoste" class="form-control mb-1" />
                <ErrorMessage name="titrePoste" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Boite Postale </p>
                <Field v-model="newPersonnel.personnel.boitePostale" type="text" name="boitePostale" id="boitePostale"
                  class="form-control mb-1" />
                <ErrorMessage name="boitePostale" class="text-danger text-start" />
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Civilité </p>
                <Field v-model="newPersonnel.personnel.civilite" type="text" name="civilite" id="civilite" class="form-control mb-1" />
                <ErrorMessage name="civilite" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Sexe </p>
                <Field v-model="newPersonnel.personnel.sexe" type="text" name="sexe" id="sexe"
                  class="form-control mb-1" />
                <ErrorMessage name="sexe" class="text-danger text-start" />
              </div>
            </div>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Numero Sécurité Sociale </p>
                <Field v-model="newPersonnel.personnel.numeroSecuriteSociale" type="text" name="numeroSecuriteSociale" id="numeroSecuriteSociale" class="form-control mb-1" />
                <ErrorMessage name="numeroSecuriteSociale" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Nationalité </p>
                <Field v-model="newPersonnel.personnel.nationalite" type="text" name="nationalite" id="nationalite"
                  class="form-control mb-1" />
                <ErrorMessage name="nationalite" class="text-danger text-start" />
              </div>
            </div>

            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Relevé Identité Bancaire </p>
                <Field v-model="newPersonnel.personnel.releveIdentiteBancaire" type="text" name="releveIdentiteBancaire" id="releveidentitebancaire" class="form-control mb-1" />
                <ErrorMessage name="releveIdentiteBancaire" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Code IBAN </p>
                <Field v-model="newPersonnel.personnel.codeIban" type="text" name="codeIban" id="codeIban"
                  class="form-control mb-1" />
                <ErrorMessage name="codeIban" class="text-danger text-start" />
              </div>

              <div class="col mx-2">
                <p class="my-0">Code SWIFT </p>
                <Field v-model="newPersonnel.personnel.codeSwift" type="text" name="codeSwift" id="codeSwift"
                  class="form-control mb-1" />
                <ErrorMessage name="codeSwift" class="text-danger text-start" />
              </div>
            </div>

            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Nombre Enfant </p>
                <Field v-model="newPersonnel.personnel.nombreEnfant" type="number" name="nombreEnfant" id="nombreEnfant" class="form-control mb-1" />
                <ErrorMessage name="nombreEnfant" class="text-danger text-start" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Photo  Employé</p>
                <Field v-model="newPersonnel.personnel.photoEmploye" type="text" name="photoEmploye" id="photoEmploye"
                  class="form-control mb-1" />
                <ErrorMessage name="photoEmploye" class="text-danger text-start" />
              </div>
            </div>
        <div class="d-flex mb-2">
              <div class="col mx-2">
            <label class="d-block text-black mb-10">
                Ethnie <span class="text-danger">*</span>
              </label>
              <Field name="ethnies" v-model="ethnie" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="ethnieOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner l'Ethnie "
                label="label" track-by="label" />
              </Field>  
            </div>
        <div class="col mx-2">
            <label class="d-block text-black mb-10">
                Religion <span class="text-danger">*</span>
              </label>
              <Field name="religions" v-model="religion" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="religionOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la Religion "
                label="label" track-by="label" />
              </Field>  
            </div>
          </div>
       <h4 class="text-center mt-4 mb-0"> Service - Fonction </h4>
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Service </p>
                <Field name="service" v-model="service" v-slot="{ field }">
                  <VueMultiselect @select="sortServiceFonctionWithService(field.value)" v-model="field.value"
                    v-bind="field" :options="serviceOptions" :close-on-select="true" :clear-on-select="false"
                    :multiple="false" :searchable="true" placeholder="Sélectionner le service" label="label"
                    track-by="label" />
                </Field>
                <!-- <p class="my-0"> Service </p>
                <Field name="service" id="service" class="form-select mb-1"
                   as="select">
                  <option disabled selected> Choisir le service </option>
                  <option :value=service.libelle v-for="service in services" :key="service.id">
                    {{ service.libelle }}
                  </option>
                </Field> -->
                <!-- <ErrorMessage name="service" class="text-danger text-start" /> -->
              </div>
              <div class="col mx-2">
                <p class="my-0"> Fonction </p>
                <Field name="serviceFonction" v-model="serviceFonction" v-slot="{ field }">
                  <VueMultiselect v-model="field.value" v-bind="field" :options="fonctionOptions"
                    :close-on-select="true" :clear-on-select="false" :multiple="false" :searchable="true"
                    placeholder="Sélectionner la fonction" label="label" track-by="label" />
                </Field>
                <!-- <Field v-model="newPersonnel.personnelServiceFonction.service_fonction" name="serviceFonction"
                  id="serviceFonction" class="form-select mb-1" as="select">
                  <option disabled selected> Choisir la fonction </option>
                  <option :value=service_fonction.id v-for="service_fonction in filterServiceFonction"
                    :key="service_fonction.id">
                    {{ service_fonction.fonction.libelle }}
                  </option>
                </Field> -->
                <!-- <ErrorMessage name="serviceFonction" class="text-danger text-start" /> -->
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
              </div>
          </Form>
          </div>
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
        
          <h4 class="text-center mt-4 mb-0"> Conjoint </h4>
          <Form :validation-schema="schemaConjoint()">
            <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> nom</p>
                <Field v-model="newPersonnel.conjoint.nom" type="text" name="nom"
                  id="nom" class="form-control mb-1" />
                <ErrorMessage name="nom" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> prenom</p>
                <Field v-model="newPersonnel.conjoint.prenom" type="text" name="prenom" id="prenom"
                  class="form-control mb-1" />
                <ErrorMessage name="prenom" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Deuxieme Prenom</p>
                <Field v-model="newPersonnel.conjoint.deuxiemePrenom" type="text" name="deuxiemePrenom" id="deuxiemePrenom"
                  class="form-control mb-1" />
                <ErrorMessage name="deuxiemePrenom" class="text-danger text-start mb-2" />
              </div>
              </div>
              <div class="d-flex mb-2">
              <div class="col mx-2">
                <p class="my-0"> Date de Naissance</p>
                <Field v-model="newPersonnel.conjoint.dateNaissance" type="date" name="dateNaissance" id="dateNaissance"
                  class="form-control mb-1" />
                <ErrorMessage name="dateNaissance" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Nationalité</p>
                <Field v-model="newPersonnel.conjoint.nationalite" type="text" name="nationalite" id="nationalite"
                  class="form-control mb-1" />
                <ErrorMessage name="nationalite" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Passport </p>
                <Field v-model="newPersonnel.conjoint.passport" type="text" name="passport" id="passport"
                  class="form-control mb-1" />
                <ErrorMessage name="passport" class="text-danger text-start mb-2" />
              </div>
              </div>
              <button ref="clickConjointForm" type="submit" class="d-none"> Envoyer </button>    
           </Form>
            <h4 class="text-center mt-4 mb-0"> Santé Employé  </h4>
          <Form :validation-schema="schemaSanteEmploye()">
            <h3>PHYSIQUE</h3>
              <hr>
            <div class="d-flex mb-2">    
              <div class="col mx-2">
                <p class="my-0"> hauteur</p>
                <Field v-model="newPersonnel.santeEmploye.hauteur" type="text" name="hauteur"
                  id="hauteur" class="form-control mb-1" />
                <ErrorMessage name="hauteur" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0"> Poids</p>
                <Field v-model="newPersonnel.santeEmploye.poids" type="text" name="poids"
                  id="poids" class="form-control mb-1" />
                <ErrorMessage name="poids" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Type de Sang</p>
                <Field v-model="newPersonnel.santeEmploye.typeDeSang" type="text" name="typeDeSang"
                  id="typeDeSang" class="form-control mb-1" />
                <ErrorMessage name="typeDeSang" class="text-danger text-start mb-2" />
              </div>
              </div>
              <h3>VISION</h3>
                <hr>
              <div class="d-flex mb-2">   
              <div class="col mx-2">
                <p class="my-0">Vision Gauche</p>
                <Field v-model="newPersonnel.santeEmploye.visionGauche" type="text" name="visionGauche"
                  id="visionGauche" class="form-control mb-1" />
                <ErrorMessage name="visionGauche" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Vision Droite</p>
                <Field v-model="newPersonnel.santeEmploye.visionDroite" type="text" name="visionDroite"
                  id="visionDroite" class="form-control mb-1" />
                <ErrorMessage name="visionDroite" class="text-danger text-start mb-2" />
              </div>
              </div>
              <h3>MAIN</h3>
                <hr>
              <div class="d-flex mb-2">     
              <div class="col mx-2">
                <p class="my-0">Main Gauche</p>
                <Field v-model="newPersonnel.santeEmploye.mainGauche" type="text" name="mainGauche"
                  id="mainGauche" class="form-control mb-1" />
                <ErrorMessage name="mainGauche" class="text-danger text-start mb-2" />
              </div>
              <div class="col mx-2">
                <p class="my-0">Main Droite</p>
                <Field v-model="newPersonnel.santeEmploye.mainDroite" type="text" name="mainDroite"
                  id="mainDroite" class="form-control mb-1" />
                <ErrorMessage name="mainDroite" class="text-danger text-start mb-2" />
              </div>
              </div>
              <h3>JAMBE</h3>
              <hr>
              <div class="d-flex mb-2">  
              <div class="col mx-2">
                <p class="my-0">Jambe Gauche</p>
                <Field v-model="newPersonnel.santeEmploye.jambeGauche" type="text" name="jambeGauche"
                  id="jambeGauche" class="form-control mb-1" />
                <ErrorMessage name="jambeGauche" class="text-danger text-start mb-2" />
              </div>

              <div class="col mx-2">
                <p class="my-0">Jambe Droite</p>
                <Field v-model="newPersonnel.santeEmploye.jambeDroite" type="text" name="jambeDroite"
                  id="jambeDroite" class="form-control mb-1" />
                <ErrorMessage name="jambeDroite" class="text-danger text-start mb-2" />
              </div>
            </div>
              <button ref="clickSanteEmployeForm" type="submit" class="d-none"> Envoyer </button>
            </Form>
          <h4 class="text-center mt-4 mb-0"> Horaire </h4>
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
</template>

<script setup lang="ts">
import { Form, Field, ErrorMessage, FormContext } from 'vee-validate';
import * as yup from 'yup';
import { configure } from 'vee-validate'
import { onMounted, ref, toValue } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import router from '@/router';
import VueMultiselect from 'vue-multiselect'
import ApiService from '@/services/ApiService';
import Multiselect from '@vueform/multiselect/src/Multiselect';

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
  titrePoste:string,
  boitePostale:string,
  civilite:string,
  sexe:string,
  nationalite:string,
  numeroSecuriteSociale:string,
  releveIdentiteBancaire:string,
  codeIban:string,
  codeSwift:string,
  nombreEnfant:number,
  photoEmploye:string
}

interface PersonnelServiceFonction {
  dateDebut: string;
  personnel: number;
  service_fonction: number;
}

interface Conjoint {
  nom: string;
  prenom: string;
  deuxiemePrenom: string;
  dateNaissance: string;
  nationalite: string;
  passport: string;
}

interface SanteEmploye {
  hauteur: string;
  poids: string;
  typeDeSang: string;
  visionGauche: string;
  visionDroite: string;
  mainGauche: string;
  mainDroite: string;
  jambeGauche:string;
  jambeDroite: string
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
  conjoint:Conjoint;
  santeEmploye:SanteEmploye;
  contrat: Contrat;
  horaire_personnels: Horairepersonnel[];
}
  

const ethnieOptions = ref([]);
const religionOptions = ref([]);
const ethnie = ref(null);
const religion = ref(null);
const clickPersonnelForm = ref(null);
const clickConjointForm = ref(null);
const clickSanteEmployeForm = ref(null);
const clickContratForm = ref(null);
const clickHoraireForm = ref(null);
const services = ref([] as any[]);
const service_fonctions = ref([] as any[]);
const personnels = ref([] as any[]);
const horaires = ref([] as any[]);
const currentPersonnel = ref();
const currentContrat = ref();
const service = ref();
const serviceFonction = ref();
const fonctionOptions = ref([] as any[]);
const serviceOptions = ref([] as any[]);
const horairePersonnels = ref<Horairepersonnel[]>([]);

const newPersonnel = ref<PERSONNEL>({
  personnel: {
    nom: "",
    prenom: "",
    birthdate: "",
    email: "",
    telephone: 0,
    dateEmbauche: "",
    titrePoste:"",
    boitePostale:"",
    civilite:"",
    sexe:"",
    nationalite:"",
    numeroSecuriteSociale:"",
    releveIdentiteBancaire:"",
    codeIban:"",
    codeSwift:"",
    nombreEnfant:0,
    photoEmploye:"",
  

  },
  personnelServiceFonction: {
    dateDebut: "",
    personnel: 0,
    service_fonction: 0,
  },

  conjoint: {
    nom: "",
    prenom: "",
    deuxiemePrenom: "",
    dateNaissance: "",
    nationalite: "",
    passport: ""
  },
  santeEmploye: {
    hauteur: "",
    poids: "",
    typeDeSang: "",
    visionGauche: "",
    visionDroite: "",
    mainGauche: "",
    mainDroite:"",
    jambeGauche:"",
    jambeDroite:""
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
  fonctionOptions.value = [] as any[];
  filterServiceFonction.value = service_fonctions.value.filter(service_fonction => service_fonction.service.id === choseed.value);
  fonctionOptions.value = filterServiceFonction.value.map((fonction: any) => ({
    value: fonction.fonction.id,
    label: `${fonction.fonction.libelle}`
  }));
  console.log("Service choisit", filterServiceFonction.value)
}

// --------------------------------------------------- SCHEMA ----------------------------------------------
function schemaPersonnel() {
  return yup.object().shape({
    nom: yup.string().required("Le nom est obligatoire."),
    prenom: yup.string().required("Le prenom est obligatoire."),
    birthdate: yup.string().required("La date d'anniversaire est obligatoire."),
    email: yup.string().email("L'adresse e-mail n'est pas valide.").required("L'adresse e-mail est obligatoire."),
    telephone: yup.string().required("Le numéro de telephone est obligatoire."),
    dateEmbauche: yup.string().required("La date d'embauche est obligatoire."),
    // service: yup.string().required("Le service est obligatoire."),
    // serviceFonction: yup.string().required("La fonction est obligatoire."),
    dateDebut: yup.string().required("La date de début est obligatoire."),
  })
}


function schemaConjoint() {
  return yup.object().shape({
    nom: yup.string().required("Le nom est obligatoire."),
    prenom: yup.string().required("Le prenom est obligatoire."),
    deuxiemeEmploye: yup.string().required("Le deuxiemeEmploye est obligatoire."),
    dateNaissance: yup.date().required("La date de Naissance  est obligatoire."),
    nationalite: yup.string().required("La nationalité sont requise."),
    passport: yup.string().required("Le passport est obligatoire."),
  })
}

function schemaSanteEmploye() {
  return yup.object().shape({
    hauteur: yup.string().required("La hauteur est obligatoire."),
    poids: yup.string().required("Le poids est obligatoire."),
    typeDeSang: yup.string().required("Le typeDeSang est obligatoire."),
    visionGauche: yup.string().required("La vision Gauche  est obligatoire."),
    visionDroite: yup.string().required("La vision Droite requise."),
    mainGauche: yup.string().required("La main Gauche est obligatoire."),
    mainDroite: yup.string().required("La main Droite est obligatoire."),
    jambeGauche: yup.string().required("La jambe Gauche est obligatoire."),
    jambeDroite: yup.string().required("La jambe Droite est obligatoire."),
  })
}

function schemaContrat() {
  return yup.object().shape({
    datePriseFonction: yup.string().required("La date de prise de fonction est obligatoire."),
    personnel: yup.string().required("Le personnel est obligatoire."),
    salaire: yup.string().required("Le salaire est obligatoire."),
    duration: yup.string().required("La duration du contrat est obligatoire."),
    conditionLicenciement: yup.string().required("Les conditions de licenciement sont requise."),
    nbJourConge: yup.string().required("Le nombre de jour de congé est obligatoire."),
  })
}

function schemaHorairePerso() {
  return yup.object().shape({
    jour: yup.string().required("Le jour est obligatoire."),
    heureArrivee: yup.string().required("L'heure d'arrivée est obligatoire."),
    heureDepart: yup.string().required("L'heure de départ est obligatoire.")
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

        newPersonnel.value.personnelServiceFonction.service_fonction = serviceFonction.value.value;

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
    serviceOptions.value = response.data.data.data.map((service: any) => ({
      value: service.id,
      label: `${service.libelle}`
    }));
    console.log(response.data.data.data);
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


const getAllEthnie = async () => {
        try{
        const response = await ApiService.get('/api/all/ethnies');
        const ethniesData = response.data.data;
        console.log("bhbdhbd",ethniesData)

        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
        }
        catch(error){
          console.error('Erreur lors de la recupération des ethnies:', error);
          throw error;
        }
      } 


      const getAllReligion = async () => {
        try{
        const response = await ApiService.get('/api/all/religions');
        const religionsData = response.data.data;

        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
        }
        catch(error){
          console.error('Erreur lors de la recupération des religions:', error);
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
  getAllEthnie();
  getAllReligion();
})
</script>

<style></style>