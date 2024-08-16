<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="clientForm" @submit="editClient" :validation-schema="clientSchema" :initial-values="clientForm">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Statut<span class="text-danger">*</span>
                </label>
                <Field  name="statut" v-model="defaultStatut"  v-slot="{ field }">
                  <Multiselect
                    :options="statut"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le statut"
                    @select="handleObjetInput"
                  />
                </Field>  
              </div>
              <ErrorMessage name="statut" class="text-danger"/>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom du client <span class="text-danger">*</span>
                </label>
                <Field name="nomClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prénom du client<span class="text-danger">*</span>
                </label>
                <Field name="prenomClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la denomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSociale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSociale" class="text-danger"/>
              </div>
            </div>
           <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  IFU <span class="text-danger" v-if="!showAdditionalFields">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            
            <div class="col-md-4" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Régistre de commerce <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse 
                </label>
                <Field name="adresseClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresseClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Email
                </label>
                <Field name="emailClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="emailClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Sexe <span class="text-danger">*</span>
              </label>
              <Field  name="sexe"  type="text"  v-slot="{ field }">
                <Multiselect
                  :searchable = "true"
                  :options = "['Masculin', 'Féminin']"
                  v-model = "field.value"
                  v-bind = "field"
                  placeholder="Sélectionner le sexe"
                />
              </Field>
                <ErrorMessage name="sexe" class="text-danger"/>
            </div>
          </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 1 <span class="text-danger">*</span>
                </label>
                <Field name="telephone1" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone1" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 2 
                </label>
                <Field name="telephone2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/>
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4" v-if="showAdditionalFields">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de naissance 
                  </label>
                  <Field name="dateNais" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateNais" class="text-danger"/>
              </div>
            
           
            <div class="col-md-4" v-if="!showAdditionalFields">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date de création 
                  </label>
                  <Field name="dateCreation" type="date" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="dateCreation" class="text-danger"/>
              </div>
              <div class="col-md-12 mb-md-25">
            <div class="accordion" id="basicAccordion">
              <div class="accordion-item mb-0 bord1">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#basicCollapseOne"
                    aria-expanded="false"
                    aria-controls="basicCollapseOne"
                  >
                    Adresse (s) de livraison
                  </button>
                </h2>
                <div
                  id="basicCollapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#basicAccordion"
                >
                  <div class="accordion-body">

                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active p-10"
                        id="home-tab-pane"
                        role="tabpanel"
                        tabindex="0"
                      >
                        <div class="row">
                          <div class="border border-primary mb-10">
                            <div
                              class="row d-flex align-items-center justify-content-between fw-bold py-2"
                              style="background-color: #0a59a4"
                            >
                              <div class="col-md-7">
                                <h3 class="fs-4 text-white">
                                  Addresse (s) de livraison
                                </h3>
                              </div>
                              <div class="col-md-5">
                                <div class="d-flex float-end">
                                  <button
                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                    type="button"
                                    :class="{ 'cursor-not-allowed': isDisable }"
                                    :disabled="isDisable"
                                    @click="addRowAdresseLivraison()"
                                  >
                                    <i
                                      class="fa fa-plus-circle position-relative ms-5 fs-12"
                                    ></i>
                                    Ajouter une addresse
                                  </button>
                                  <router-link
                                    to="/liste-mouvements"
                                  ></router-link>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div
                                class="row d-flex align-items-center justify-content-between mt-10"
                              >
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold">
                                    Maison / N Carée
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label class="d-block text-black fw-semibold">
                                    Quartier
                                    <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Ville <span class="text-danger">*</span>
                                  </label>
                                </div>
                                <div class="col-md-3">
                                  <label
                                    class="d-block text-black fw-semibold mb-10"
                                  >
                                    Action
                                  </label>
                                </div>
                              </div>
                              <hr class="mt-0" />
                              <div
                                class="row"
                                v-for="(adresseLivraison, index) in adresseLivraisons"
                                :key="index"
                              >
                                <div class="col-md-3 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input
                                        type="text"
                                        v-model="adresseLivraison.maison"
                                        :class="
                                          valideteRowAdresseLivraison(adresseLivraison.maison)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer le adresseLivraison"
                                      />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowAdresseLivraison(adresseLivraison.maison)"
                                    >
                                      La maison est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-3 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input
                                        type="text"
                                        v-model="adresseLivraison.quartier"
                                        :class="
                                          valideteRowAdresseLivraison(adresseLivraison.quartier)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer le adresseLivraison"
                                      />
                                    <div
                                      class="invalid-feedback"
                                      v-if="valideteRowAdresseLivraison(adresseLivraison.quartier)"
                                    >
                                      Le quartier est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-3 mb-2">
                                  <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                    <input
                                        type="number"
                                        v-model="adresseLivraison.ville"
                                        :class="
                                          valideteRowAdresseLivraison(adresseLivraison.ville)
                                            ? 'form-control shadow-none fs-md-15 text-black is-invalid '
                                            : 'form-control shadow-none fs-md-15 text-black '
                                        "
                                        placeholder="Entrer la ville"
                                      />
                                      <div
                                      class="invalid-feedback"
                                      v-if="valideteRowAdresseLivraison(adresseLivraison.ville)"
                                    >
                                      La ville est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-3 mb-2">
                                  <button
                                    class="btn btn-danger transition border-0 pb-2 ps-8 pe-8"
                                    type="button"
                                    @click="removeRowAdresseLivraison(index)"
                                  >
                                    <i
                                      class="fa fa-trash-o lh-1 me-1 position-relative top-2"
                                    ></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div class="col-md-12">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                  :disabled="isDisable"
                  :class="{ 'cursor-not-allowed': isDisable }"
                >
                    Modifier un client
                </button>
                <router-link to="/clients/liste-clients" 
                    class=" btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                    <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
      </div>
    </Form>
  </div>
</div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted, reactive, watch } from 'vue';
import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Client} from '@/models/Client';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditClient",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const clientSchema = Yup.object().shape({
      nomClient: Yup.string().required('Le nom du client est obligatoire'),
      prenomClient: Yup.string().required('Le prénom du client est obligatoire'),
      adresseClient: Yup.string().notRequired(),
      emailClient: Yup.string().email("Veuillez entrer un mail valide").notRequired(),
      telephone1: Yup.number().typeError('Veuillez entrer des chiffres').required('Le telephone 1 est obligatoire'),
      telephone2: Yup.number().typeError('Veuillez entrer des chiffres').notRequired(),
      dateNais: Yup.date().notRequired(),
      raisonSociale: Yup.string().required('La raison sociale est obligatoire'),
      // ifu: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'ifu est obligatoire'),
      ifu: Yup.string().matches(/^\d{13}$/, 'La saisie doit avoir exactement 13 chiffres').when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.min(13,"La saisie doit avoir exactement 13 chiffres").max(13, "La saisie doit avoir exactement 13 chiffres").required('L\'ifu est obligatoire')
          : schema.min(13,"La saisie doit avoir exactement 13 chiffres").max(13, "La saisie doit avoir exactement 13 chiffres")
      }),
      sigle: Yup.string().notRequired(),
      denomination: Yup.string().notRequired(),
      dateCreation: Yup.date().required('La date de création'),
      statut: Yup.string().required('Le statut est obligatoire'),
    });

    const clientForm = ref<Client>();
    const router = useRouter();
    const route = useRoute();
    const defaultStatut = ref(1);
    const showAdditionalFields = ref(true);

    const handleObjetInput = (selectedValue) => {
      showAdditionalFields.value = selectedValue === 1;
    }

    const statut = 
      [
      {
          value: 1 ,
          label: "Personne physique"
      },
      {
          value: 2 ,
          label: "Personne Morale"
      }
    ];

    function getClient(id:number) {
      ApiService.get("/clients/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            clientForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editClient = async (values, {resetForm}) => {
      const data = clientForm.value;
      values.adressesLivraisons = adresseLivraisons.map(adresseLivraison => ({
        maison: adresseLivraison.maison,
        quartier: adresseLivraison.quartier,
        ville: adresseLivraison.ville,
      }));
      ApiService.put("/clients/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeClientPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

     // formulaire dynamique start

     const isDisable = ref(true);
    const adresseLivraisons = reactive([
      {
        maison: "",
        quartier: "",
        ville: ""
      },
    ]);

    const addRowAdresseLivraison = () => {
      adresseLivraisons.push({
        maison: "",
        quartier: "",
        ville: ""
      });
    };

    const removeRowAdresseLivraison = (index) => {
      if (adresseLivraisons.length > 1) adresseLivraisons.splice(index, 1);
    };

    const valideteRowAdresseLivraison = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        return true;
      } else {
        return false;
      }
    };
  
    watch(adresseLivraisons, (newValue, oldValue) => {
      Object.keys(newValue).forEach(function (key) {
        if (
          newValue[key].maison == "" ||
          newValue[key].quartier == "" ||
          newValue[key].ville == ""
        ) {
          isDisable.value = true;
        } else {
          isDisable.value = false;
        }
      });
    });

    const { remove, push, fields, update } = useFieldArray("adresseLivraisons");

    const produitsss: any = ref(null);
    const valuess = ref();

    onMounted(() => {
      if(route.params.id) {
        getClient(parseInt(route.params.id as string));
      }
    });

    return { 
      clientSchema, editClient, clientForm, statut,
        showAdditionalFields,
        handleObjetInput,
        defaultStatut,
        removeRowAdresseLivraison,
        addRowAdresseLivraison,
        valideteRowAdresseLivraison,
        valuess,
        isDisable,
        adresseLivraisons,

    };
  },
});
</script>