<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="demandeForm" @submit="payer" :validation-schema="selectedSchema">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type de demande <span class="text-danger">*</span>
              </label>
              <Field name="typeDemande" v-slot="{ field }" v-model="typeDemande">
                <Multiselect :options="typeDemandeOptions" :searchable="true" v-model="field.value" v-bind="field"
                  @change="typeDemandeChange($event)" placeholder="Sélectionner le type de demande" />
              </Field>
              <ErrorMessage name="typeDemande" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide1" class="col-md-8">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Abonnement<span class="text-danger">*</span>
              </label>
              <Field name="abonnement" v-model="abonnementSelected" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" placeholder="Rechercher un abonnement"
                  :filter-results="false" :min-chars="3" :resolve-on-load="false" :delay="0" :searchable="true"
                  :options-limit="300" :options="async (query) => {
                    return await fetchAbonnements(query)
                  }" noResultText="Aucun enregistrement trouvé" noOptionsText="Tapez au moins trois caractères"
                  :no-options-text=noOptionsTextAbb />
              </Field>
              <ErrorMessage name="abonnement" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide13" class="col-md-4">
            <label class="d-block text-black fw-semibold mb-10">
              Type Abonne <span class="text-danger">*</span>
            </label>
            <div class="form-check form-check-inline mt-2">
              <input class="form-check-input shadow-none" v-model="n_o_abonne" type="radio" name="na_abonne"
                id="inlineRadio1" value="1">
              <label class="form-check-label fw-medium" for="inlineRadio1">Nouvel abonné</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input shadow-none" v-model="n_o_abonne" type="radio" name="na_abonne"
                id="inlineRadio2" value="0">
              <label class="form-check-label fw-medium" for="inlineRadio2">Ancien abonné</label>
            </div>
          </div>
          <div v-show="fieldHide2" v-if="n_o_abonne == 0" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Abonné <span class="text-danger">*</span>
              </label>
              <Field name="abonne" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" placeholder="Rechercher un abonné"
                  :filter-results="false" :min-chars="3" :resolve-on-load="false" :delay="0" :searchable="true"
                  :options-limit="300" :options="async (query) => {
                    return await fetchAbonnes(query)
                  }" noResultText="Aucun enregistrement trouvé" noOptionsText="Tapez au moins trois caractères" />
              </Field>
              <ErrorMessage name="abonne" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide7" v-if="n_o_abonne != 0" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Catégorie du nouvel abonné <span class="text-danger">*</span>
              </label>
              <Field name="categorieBeneficiaire" v-slot="{ field }">
                <Multiselect :options="categorieAbonnesOptions" :searchable="true" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner la catégorie du nouvel abonné" />
              </Field>
              <ErrorMessage name="categorieBeneficiaire" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 d-none">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date <span class="text-danger">*</span>
              </label>
              <Field name="dateDemande" type="date" class="form-control shadow-none rounded-0 text-black" />
              <ErrorMessage name="dateDemande" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide3" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Commune <span class="text-danger">*</span>
              </label>
              <Field name="commune" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="communesOptions" :searchable="true"
                  @change="communeChange($event)" placeholder="Rechercher une commune"
                  noResultText="Aucun enregistrement trouvé" noOptionsText="Tapez au moins deux caractères" />
              </Field>
              <ErrorMessage name="commune" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide4" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Agence / Nouvelle Agence <span class="text-danger">*</span>
              </label>
              <Field name="nouvelleAgence" v-slot="{ field }" v-model="nouvelleAgence">
                <Multiselect :no-options-text="nooptions" v-model="field.value" v-bind="field" :options="bureauOptions"
                  placeholder="Selectionner un bureau" />
              </Field>
              <ErrorMessage name="nouvelleAgence" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide5" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Model de boîte <span class="text-danger">*</span>
              </label>
              <Field name="typeBoite" v-slot="{ field }">
                <Multiselect :options="typeOptions" :searchable="true" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner le modèle de boîte" />
              </Field>
              <ErrorMessage name="typeBoite" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide6" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Adresse Postale <span class="text-danger">*</span>
              </label>
              <Field name="adressePostale" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="adressePostaleOptions"
                  placeholder="Rechercher l'adresse postale" />
              </Field>
              <ErrorMessage name="adressePostale" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide8" v-if="n_o_abonne != 0" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Nom et prénom du nouvel abonné <span class="text-danger">*</span>
              </label>
              <Field name="nomCompletBeneficiaire" type="text" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer le nom et prénom du nouvel abonné" />
              <ErrorMessage name="nomCompletBeneficiaire" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide12" v-if="n_o_abonne != 0" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email du nouvel abonné <span class="text-danger">*</span>
              </label>
              <Field name="email" type="email" class="form-control shadow-none fs-md-15 text-black"
                placeholder="Entrer l' email du nouvel abonné" />
              <ErrorMessage name="email" class="text-danger" />
            </div>
          </div>
          <div v-show="fieldHide9" v-if="n_o_abonne != 0" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Téléphone du nouvel abonné <span class="text-danger">*</span>
              </label>
              <Field name="telephoneBeneficiaire" v-model="telephoneBeneficiaire" v-slot="{ field }">
                <vue-tel-input placeholder="Entrer le numéro de téléphone" v-model="field.value" v-bind="field"
                  defaultCountry="BJ" mode="international" @validate="validate"
                  class="shadow-none fs-md-15 text-black py-2">
                </vue-tel-input>
              </Field>
              <ErrorMessage name="telephoneBeneficiaire" class="text-danger" />
              <div v-if="!validPhone" class="text-danger">Veuillez entrer un numéro correcte</div>

            </div>
          </div>
          <div v-show="fieldHide10" v-if="n_o_abonne != 0" class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Secteur d'activité <span class="text-danger">*</span>
              </label>
              <Field name="secteurActiviteBeneficiaire" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="secteurActiviteBeneficaire"
                  placeholder="Rechercher un secteur d'activité" />
              </Field>
              <ErrorMessage name="secteurActiviteBeneficiaire" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="form-label fw-medium text-black">
                Mode de paiement
              </label>
              <Field name="mode" v-slot="{ field }" v-model="mode">
                <Multiselect :options="modeOptions" :searchable="true" v-model="field.value" v-bind="field"
                  placeholder="Sélectionner un mode" />
              </Field>
              <ErrorMessage name="mode" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Montant <span class="text-danger">*</span>
              </label>
              <Field name="montant" readonly="true" type="text" v-model="montant"
                class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="montant" class="text-danger" />
            </div>
          </div>
          <!--<div class="col-md-4" v-show="fieldHide14">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Quartier 
            </label>
            <Field 
              name="quartier"
              type="text"
              class="form-control shadow-none fs-md-15 text-black"/>
            <ErrorMessage name="quartier" class="text-danger"/>
          </div>
        </div>
        <div class="col-md-4" v-show="fieldHide15">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              Description
            </label>
            <Field 
              name="description"
              type="text"
              class="form-control shadow-none fs-md-15 text-black"/>
            <ErrorMessage name="description" class="text-danger"/>
          </div>
        </div>-->
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Contenu
              </label>
              <Field name="contenu" cols="30" rows="12" as="textarea" placeholder="Ecrire votre contenu"
                v-slot="{ field }" class="form-control shadow-none rounded-0 text-black">
                <textarea v-model="field.value" class="form-control shadow-none rounded-0 text-black"></textarea>
              </Field>
              <ErrorMessage name="contenu" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center ">
              <button
                class="default-btn me-20 transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                type="submit"> Créer une demande
              </button>
              <router-link to="/liste-demandes" class=" btn btn-danger transition border-0 lh-1 fw-medium"><i
                  class="flaticon-delete lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler
              </router-link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRef, watch } from 'vue';
import { Form, Field, ErrorMessage, useForm, useField } from 'vee-validate';
import * as Yup from 'yup';

import ApiService from '@/services/ApiService';
import { hideModal, showModal, success, error, getUrlApiForFiles, openAndPrint } from '@/utils/utils';
import { Demande } from '@/models/Demande';
import { Abonne } from '@/models/Abonne';
import Multiselect from '@vueform/multiselect'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useRouter } from "vue-router";
import router from '@/router';
import { Quill } from 'quill';
import axios from 'axios';
import { KKIAPAY } from '@/models/KKIAPAY';
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from "kkiapay";
import Swal from "sweetalert2";

import { VueTelInput } from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'


export default ({
  name: "AddDemande",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueTelInput
    // QuillEditor
  },
  setup: () => {

    const n_o_abonne = ref('1');

    const transfertSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
      commune: Yup.number().typeError('Veuillez entrer un nombre').required('La commune est obligatoire'),
      montant: Yup.number().typeError('Veuillez entrer un nombre').required('Le montant est obligatoire'),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      nouvelleAgence: Yup.number().typeError('Veuillez entrer un nombre').required('L\'Agence est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
      // quartier: Yup.string().typeError('Veuillez entrer du texte').notRequired(),
      // description: Yup.string().typeError('Veuillez entrer du texte').notRequired(),
    });

    function openNewWindow(data: any) {
      openAndPrint(getUrlApiForFiles("Recu", data.paiement.refPaiement + ".pdf"));
    }

    const cessionSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),

      categorieBeneficiaire: Yup.number()
        .typeError('Veuillez entrer un nombre')
        .when([], (value, schema) => {
          return (n_o_abonne.value == '1') ? schema.required('La catégorie de l\'abonné est obligatoire') : schema
        }),
      abonne: Yup.number()
        .typeError('Veuillez entrer un nombre')
        .when([], (value, schema) => {
          return (n_o_abonne.value == '0') ? schema.required("L'abonné est obligatoire") : schema
        }),
      nomCompletBeneficiaire: Yup.string()
        .typeError('Veuillez entrer une chaine de caractère')
        .when([], (value, schema) => {
          return (n_o_abonne.value == '1') ? schema.required("Le nom et le prénom sont obligatoires") : schema
        }),
      // nomCompletBeneficiaire: Yup.string().typeError('Veuillez entrer une chaine de caractère').required(`Le nom et le prénom sont obligatoires`),
      secteurActiviteBeneficiaire: Yup.string().typeError('Veuillez entrer une chaine de caractère')
        .when([], (value, schema) => {
          return (n_o_abonne.value == '1') ? schema.required(`Le secteur d'activité est obligatoire`) : schema
        }),
      email: Yup.string().email('Veuillez entrer un mail valide')
        .when([], (value, schema) => {
          return (n_o_abonne.value == '1') ? schema.required(`L'adresse mail est obligatoire`) : schema
        }),
      telephoneBeneficiaire: Yup.string()
        .typeError('Veuillez entrer un nombre')
        .when([], (value, schema) => {
          return (n_o_abonne.value == '1') ? schema.required(`Le numéro de téléphone est obligatoire`) : schema
        }),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
    });

    const attestationSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
    });

    const resiliationSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
    });

    const changementCleSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      //abonne: Yup.number().typeError('Veuillez entrer un nombre').required(`L'abonne est obligatoire`),
      montant: Yup.number().typeError('Veuillez entrer un nombre').required('Le montant est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
    });

    const partageSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
    });

    const reclamationSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
      mode: Yup.number().typeError('Veuillez entrer un nombre').required('Le mode de paiement est obligatoire'),
      abonnement: Yup.string().required('L\'abonnement est obligatoire'),
    });

    const defaultSchema = Yup.object().shape({
      typeDemande: Yup.number().typeError('Veuillez entrer un nombre').required('Le type de demande est obligatoire'),
    });

    const demandeForm = ref<null | Demande>(null);
    const abonnementOptions = ref([]);
    const typeDemandeOptions = ref([]);
    const typeDemande = ref();
    const abonnesOptions = ref([]);
    const communesOptions = ref([]);
    const bureauOptions = ref([]);
    const typeOptions = ref([]);
    const categorieAbonnesOptions = ref([]);
    const secteurActiviteBeneficaire = ref([]);
    const abonneOptions = ref([]);
    const adressePostaleOptions = ref([]);
    const nouvelleAgence = ref();
    const myQuillEditor = ref<InstanceType<typeof Quill> | null>(null);
    var montant = ref(0);
    const mode = ref(1);
    const isReadonly = ref(true);
    const fieldHide1 = ref(true);
    const fieldHide2 = ref(false);
    const fieldHide3 = ref(false);
    const fieldHide4 = ref(false);
    const fieldHide5 = ref(false);
    const fieldHide6 = ref(false);
    const fieldHide7 = ref(false);
    const fieldHide8 = ref(false);
    const fieldHide9 = ref(false);
    const fieldHide10 = ref(false);
    const fieldHide11 = ref(false);
    const fieldHide12 = ref(false);
    const fieldHide13 = ref(false);
    // const fieldHide14 = ref(false);
    // const fieldHide15 = ref(false);

    var check = reactive({
      typeError: "RAS",
      idTransaction: 0
    });
    const modeOptions = ref([]);
    const codepay = ref();
    const nationalnumlber = ref();
    const telephoneBeneficiaire = ref();
    const validPhone = ref<boolean>(false);
    const numberPhone = ref();
    const selectedSchema = ref(defaultSchema);
    const abonnementSelected = ref('');
    const agenceSelectionne = ref("");
    const abonneSelected = ref(0);


    const noOptionsTextAbb = ref("Tapez au moins trois caractères");


    function onInput(phone, phoneObject, input) {
      //
    }

    function validate(phoneObject) {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid == true) {
        telephoneBeneficiaire.value = phoneObject.number;
        codepay.value = phoneObject.countryCallingCode;
        nationalnumlber.value = phoneObject.nationalNumber;
        numberPhone.value = phoneObject.nationalNumber;
      } else {
        telephoneBeneficiaire.value = "";
        codepay.value = "";
        nationalnumlber.value = "";
        numberPhone.value = "";
      }
    }

    const nooptions = "Aucun enregistrement trouvé";
    const noResultText = "Aucun enregistrement trouvé";

    const fetchModePaiement = async () => {
      try {
        const response = await axios.get('/modepaiements');
        const modesData = response.data.data.data;
        modeOptions.value = modesData.map((mode) => ({
          value: mode.id,
          label: mode.libelle,
        }));
        return modeOptions.value;
      } catch (error) {
        //
      }
    };

    function communeChange(value) {
      console.log("agenceSelectionne.value === > ", agenceSelectionne.value);

      bureauOptions.value = [];
      if (typeDemande.value && typeDemande.value == 2) {
        ApiService.get('/bureaux/commune/' + value + `/` + agenceSelectionne.value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              bureauOptions.value = donnee.map((nouvelleAgence: any) => {
                return {
                  label: nouvelleAgence.nom,
                  value: nouvelleAgence.id,
                };
              });
            }
          })
          .catch((response) => {
            error(response.data.message);
          });
      } else {
        ApiService.get('/bureaux/commune/' + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              bureauOptions.value = donnee.map((nouvelleAgence: any) => {
                return {
                  label: nouvelleAgence.nom,
                  value: nouvelleAgence.id,
                };
              });
            }
          })
          .catch((response) => {
            error(response.data.message);
          });
      }
    }

    const fetchCommune = async () => {
      ApiService.get('/communes')
        .then(({ data }) => {
          const donneee = data.data.data;
          communesOptions.value = donneee.map((commune: any) => {
            return {
              label: commune.libelle,
              value: commune.id,
            };
          });
        })
        .catch((response) => {
          error(response.data.message);
        });
    }

    const typeDemandeChange = async (value) => {

      if (value == null || value == undefined || value == "") {
        return;
      }

      setMontant(value);

      switch (value) {
        case 1:
          // abonnement
          fieldHide1.value = false;
          fieldHide2.value = false;
          fieldHide3.value = true;
          fieldHide4.value = true;
          fieldHide5.value = true;
          fieldHide6.value = true;
          fieldHide7.value = true;
          fieldHide8.value = true;
          fieldHide9.value = true;
          fieldHide10.value = true;
          fieldHide11.value = true;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        case 2:
          // tranfert
          selectedSchema.value = transfertSchema;
          fieldHide1.value = true;
          fieldHide2.value = false;
          fieldHide3.value = true;
          fieldHide4.value = true;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = true;
          // fieldHide15.value = true;
          break;

        case 3:
          // cession
          selectedSchema.value = cessionSchema;
          fieldHide1.value = true;
          fieldHide2.value = true;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = true;
          fieldHide8.value = true;
          fieldHide9.value = true;
          fieldHide10.value = true;
          fieldHide11.value = true;
          fieldHide12.value = true;
          fieldHide13.value = true;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        case 4:
          // attestation
          selectedSchema.value = attestationSchema;
          fieldHide1.value = true;
          fieldHide2.value = false;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        case 5:
          // resiliation
          selectedSchema.value = resiliationSchema;
          fieldHide1.value = true;
          fieldHide2.value = false;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        case 7:
          // changement
          selectedSchema.value = changementCleSchema;
          fieldHide1.value = true;
          fieldHide2.value = true;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        case 6:
          // partage
          selectedSchema.value = partageSchema;
          fieldHide1.value = true;
          fieldHide2.value = false;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        case 8:
          // reclamation
          selectedSchema.value = reclamationSchema;
          fieldHide1.value = true;
          fieldHide2.value = false;
          fieldHide3.value = false;
          fieldHide4.value = false;
          fieldHide5.value = false;
          fieldHide6.value = false;
          fieldHide7.value = false;
          fieldHide8.value = false;
          fieldHide9.value = false;
          fieldHide10.value = false;
          fieldHide11.value = false;
          fieldHide12.value = false;
          fieldHide13.value = false;
          // fieldHide14.value = false;
          // fieldHide15.value = false;
          break;

        default:
          break;
      }

    }

    const setMontant = async (value) => {
      ApiService.get('/typeDemandes/' + value)
        .then(({ data }) => {
          const donneee = data.data;
          if (donneee.service) {
            montant.value = donneee.service.cout;
          } else {
            montant.value = 0;
          }
        })
        .catch((response) => {
          error(response.data.message);
        });
    }


    const fetchAbonnes = async (key) => {
      try {
        abonneSelected.value = parseInt(abonnementSelected.value.split('-')[1]);
        const response = await axios.get(`/abonnes/recherche/${key}?abonneSelected=${abonneSelected.value}`);
        const abonnesData = response.data.data;
        abonnesOptions.value = abonnesData.map((abonne) => ({
          value: abonne.id,
          label: abonne.nomComplet + ' [ ' + abonne.telephone + ' ]',
        }));
        return abonnesOptions.value;
      } catch (error) {
        //
      }
    }

    async function successHandler(response, values) {
      check.typeError = "SUCCESS";
      check.idTransaction = response.transactionId;

      if (check.typeError === "SUCCESS") {
        values["idTransaction"] = check.idTransaction;
        values["check"] = check

        await addDemande(values);
      } else {
        check.typeError = "RAS";
        check.idTransaction = 0;
      }

      // Retourne les données après l'exécution
      return { check, response };
    }

    async function failHandler(response) {
      // Mise à jour de l'objet check avec les informations de l'échec
      check.typeError = "ECHOUE";
      check.idTransaction = response.transactionId;

      // Dans le cas d'un échec, vous pouvez ajouter des actions supplémentaires ici
      // Par exemple, réinitialiser le formulaire ou gérer l'affichage d'un message d'erreur

      check.typeError = "RAS";
      check.idTransaction = response.transactionId;

      // Retourne les données après l'exécution
      return { check, response };
    }

    const addDemande = async (values: any) => {
      values.status = 'En attente';
      values.abonnement = abonnementSelected.value.split('-')[0];
      ApiService.post('/demandes/S', values)
        .then(async (response) => {
          console.log("REEEEES ", response);
          if (response.status === 201) {
            success(response.data.message)
            router.push({ name: 'ListDemandePage' });
            if (response.data.data.paiement) {
              const maFonction = async () => {
                const result = await Swal.fire({
                  html: `<div>Cliquer sur le bouton Aperçu ci-dessous pour avoir un aperçu de votre document</div>`,
                  icon: "success",
                  buttonsStyling: true,
                  confirmButtonText: "Aperçu",
                  showCancelButton: false,
                  cancelButtonText: `Fermer`,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  heightAuto: false,
                  customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-warning",
                  },
                });

                if (result.isConfirmed) {
                  openNewWindow(response.data.data)
                }
              }

              // Utiliser setTimeout pour exécuter la fonction après la durée spécifiée
              setTimeout(maFonction, 3000);
            }

          }
        })
        .catch((errorr) => {
          error(errorr.response.data.message);
        });
    }

    const payer = async (valeur) => {
      if (valeur.typeDemande == 5) {
        addDemande(valeur)
      } else {
        if ((valeur.montant == 0 || !valeur.montant) && valeur.typeDemande != 8) {
          const result = await Swal.fire({
            text: "Le montant ne peut pas être égal à zéro",
            icon: "warning",
            buttonsStyling: true,
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-info",
            },
          });
        } else {

          if (valeur.mode == 1) {
            try {
              const result = await Swal.fire({
                text: "Vous êtes sur le point de faire un paiement d'une somme de " + valeur.montant + " F CFA",
                icon: "warning",
                buttonsStyling: true,
                showCancelButton: true,
                confirmButtonText: "Payer",
                cancelButtonText: `Annuler`,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-danger",
                },
              });

              if (result.isConfirmed) {
                valeur["idTransaction"] = check.idTransaction;
                addDemande(valeur);
                success("Paiement effectué avec succès")
              }


            } catch (error) {
              // 
            }
          }
          if (valeur.mode == 2) {
            try {
              const result = await Swal.fire({
                text: "Vous êtes sur le point de faire un paiement d'une somme de " + valeur.montant + " F CFA",
                icon: "warning",
                buttonsStyling: true,
                showCancelButton: true,
                confirmButtonText: "Payer",
                cancelButtonText: `Annuler`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-danger",
                },
              });

              if (result.isConfirmed) {
                KKIAPAY.kkia(valeur.montant);
                //Attendre que le paiement soit effectué ou échoué
                await new Promise<void>((resolve) => {
                  addKkiapayListener('failed', (event) => {
                    failHandler(event);  // Passe values et resetForm ici
                    resolve();                                  // Résolution de la promesse
                  });

                  addKkiapayListener('success', (event) => {
                    successHandler(event, valeur); // Passe values et resetForm ici
                    resolve();                                   // Résolution de la promesse
                  });

                  const checkRef = toRef(check);

                  let resolved = false;

                  const intervalId = setInterval(() => {
                    if (!resolved && checkRef.value.typeError !== "RAS") {
                      clearInterval(intervalId);
                      resolved = true;
                      resolve();
                    }
                  }, 500);
                });

              }
            } catch (error) {
              // Gérer les erreurs ici
            }
          }
        }
      }


    }

    const fetchAbonnements = async (key) => {
      try {
        const response = await axios.get(`/abonnements/recherche/${key}`);
        const abonnementsData = response.data.data;
        console.log('ABONNEMENT == > ', abonnementsData);
        abonnementOptions.value = abonnementsData.map((abonnement) => (
          {
            value: `${abonnement.id}-${abonnement.abonne.id}-${abonnement?.bureau ? abonnement?.bureau.id : 0} `,
            label: `${abonnement.abonne.nomComplet} - [${abonnement.adresseVirtuelle ? abonnement.adresseVirtuelle : abonnement.boite?.adressePostale?.adresse_postale}] - ${abonnement?.bureau?.nom}`,
          }));
        if (abonnementOptions.value.length == 0) {
          noOptionsTextAbb.value = noResultText;
        } else {
          noOptionsTextAbb.value = 'Tapez au moins trois caractères';
        }
        return abonnementOptions.value;
      } catch (error) {
        //
      }
    }

    const fetchTypeDemandes = async () => {
      ApiService.get('/typeDemandes')
        .then(({ data }) => {
          const donneee = data.data;
          typeDemandeOptions.value = donneee.map((typeDemande: any) => {
            return {
              id: typeDemande.id,
              label: typeDemande.libelle,
              value: typeDemande.id,
            };
          });
        })
        .catch((response) => {
          error(response.data.message);
        });
    }

    const fetchTypeBoite = async () => {
      ApiService.get('/modele_boites')
        .then(({ data }) => {
          const donneee = data.data;
          typeOptions.value = donneee.map((typeBoite: any) => {
            return {
              label: typeBoite.libelle,
              value: typeBoite.id,
            };
          });
        })
        .catch((response) => {
          error(response.data.message);
        });
    }

    const fetchAdressePostale = async () => {
      ApiService.get('/adressePostales')
        .then(({ data }) => {
          const donnee = data.data;
          if (donnee.length > 0) {
            adressePostaleOptions.value = donnee.map((ap: any) => {
              return {
                label: ap.adresse_postale,
                value: ap.id,
              };
            });
          }
        })
        .catch((response) => {
          error(response.data.message);
        });
    }

    const fetchCategorieAbonnes = async () => {
      ApiService.get('/categorieAbonnes')
        .then(({ data }) => {
          const donnee = data.data.data;
          if (donnee.length > 0) {
            categorieAbonnesOptions.value = donnee.map((ca: any) => {
              return {
                label: ca.libelle,
                value: ca.id,
              };
            });
          }
        })
        .catch((response) => {
          error(response.data.message);
        });
    }

    const fetchSecteurActivite = async () => {
      ApiService.get('/secteurActivites')
        .then(({ data }) => {
          const donnee = data.data;
          if (donnee.length > 0) {
            secteurActiviteBeneficaire.value = donnee.map((sa: any) => {
              return {
                label: sa.libelle,
                value: sa.id,
              };
            });
          }
        })
        .catch((response) => {
          error(response.data.message);
        });
    }

    const typeBoite = ref(null);
    const categorieAbonne = ref(null);
    watch(typeBoite, (newValue, oldValue) => {
      //
    });

    watch(abonnementSelected, async (newValue, oldValue) => {
      if (newValue) {
        if (typeDemande.value && typeDemande.value == 2) {
          communesOptions.value = [];
          console.log("newValue ==>  ", newValue);
          agenceSelectionne.value = newValue.split("-")[2];
          await fetchCommune()
        }
      }
    });

    onMounted(() => {
      fetchModePaiement();
      fetchCategorieAbonnes();
      fetchTypeDemandes();
      fetchCommune();
      fetchTypeBoite();
      fetchAdressePostale();
      fetchSecteurActivite();
      demandeForm.value?.setFieldValue('dateDemande', new Date().toISOString().substr(0, 10));

    });

    return {
      modeOptions,
      mode,
      selectedSchema,
      addDemande,
      payer,
      demandeForm,
      abonnementOptions,
      typeDemandeOptions,
      fetchAbonnes,
      fetchAbonnements,
      secteurActiviteBeneficaire,
      myQuillEditor,
      typeDemandeChange,
      communeChange,
      successHandler,
      failHandler,
      communesOptions,
      typeOptions,
      bureauOptions,
      adressePostaleOptions,
      categorieAbonnesOptions,
      abonneOptions,
      montant,
      nouvelleAgence,
      isReadonly,
      fieldHide1,
      fieldHide2,
      fieldHide3,
      fieldHide4,
      fieldHide5,
      fieldHide6,
      fieldHide7,
      fieldHide8,
      fieldHide9,
      fieldHide10,
      fieldHide11,
      fieldHide12,
      fieldHide13,
      // fieldHide14,
      // fieldHide15,
      typeBoite,
      categorieAbonne,
      noResultText,
      nooptions,
      telephoneBeneficiaire,
      validPhone,
      validate,
      onInput,
      noOptionsTextAbb,
      n_o_abonne,
      openNewWindow,
      abonnementSelected,
      typeDemande,
      agenceSelectionne
    };
  },
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>