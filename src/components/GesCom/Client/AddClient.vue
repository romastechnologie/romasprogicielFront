<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="clientForm" @submit="addClient" :validation-schema="clientSchema">
          <div class="row">
            <div class="col-md-4 mb-3">
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
            <div class="col-md-4 mb-3" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Nom du client <span class="text-danger">*</span>
                </label>
                <Field name="nomClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nomClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3" v-if="showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Prénom du client<span class="text-danger">*</span>
                </label>
                <Field name="prenomClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenomClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Sigle <span class="text-danger">*</span>
                </label>
                <Field name="sigle" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le sigle"/>
                <ErrorMessage name="sigle" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Dénomination <span class="text-danger">*</span>
                </label>
                <Field name="denomination" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la denomination"/>
                <ErrorMessage name="denomination" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Raison sociale <span class="text-danger">*</span>
                </label>
                <Field name="raisonSociale" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la raison sociale"/>
                <ErrorMessage name="raisonSociale" class="text-danger"/>
              </div>
            </div>
           <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  IFU <span class="text-danger" v-if="!showAdditionalFields">*</span>
                </label>
                <Field name="ifu" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ifu"/>
                <ErrorMessage name="ifu" class="text-danger"/>
              </div>
            </div>
            
            <div class="col-md-4 mb-3" v-if="!showAdditionalFields">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Régistre de commerce <span class="text-danger">*</span>
                </label>
                <Field name="rccm" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le régistre de commerce"/>
                <ErrorMessage name="rccm" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Adresse 
                </label>
                <Field name="adresseClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'adresse"/>
                <ErrorMessage name="adresseClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Email
                </label>
                <Field name="emailClient" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'email"/>
                <ErrorMessage name="emailClient" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3" v-if="showAdditionalFields">
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
                <Field name="telephone1" v-model="telephone"  v-slot="{ field }">
                  <vue-tel-input
                    placeholder="Entrer le numéro de téléphone"
                    v-model = "field.value"
                    v-bind = "field"
                    defaultCountry="BJ"
                    mode="international"
                    @validate="validate"
                    class ="shadow-none fs-md-15 text-black py-2">
                  </vue-tel-input>
                </Field>
                <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                <!-- <Field name="telephone1" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/> -->
                <ErrorMessage name="telephone1" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Téléphone 2 
                </label>
                <Field name="telephone2" v-model="telephone2"  v-slot="{ field }">
                  <vue-tel-input
                    placeholder="Entrer le numéro de téléphone"
                    v-model = "field.value"
                    v-bind = "field"
                    defaultCountry="BJ"
                    mode="international"
                    @validate="validate"
                    class ="shadow-none fs-md-15 text-black py-2">
                  </vue-tel-input>
                </Field>
                <div v-if="!validPhone"  class="text-danger">Veuillez entrer un numéro correcte</div>
                <!-- <Field name="telephone2" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le téléphone"/> -->
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3" v-if="showAdditionalFields">
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
                                        type="text"
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
              
            <div class="col-md-12 mt-3">
              <div class="d-flex align-items-center ">
                <button
                  class="btn btn-success me-3"
                  type="submit"
                >
                    Ajouter un client
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

import { defineComponent, ref, watch, reactive } from 'vue';
import { Form, Field, ErrorMessage,useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRouter } from "vue-router";
import ApiService from '@/services/ApiService';
import { Client } from '@/models/Client';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { VueTelInput } from 'vue3-tel-input'
import { countries } from '@/utils/countries';

export default defineComponent({
    name: "AddClient",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
    VueTelInput
  },
  setup: () => {
    const clientSchema = Yup.object().shape({
      nomClient: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le nom du client est obligatoire")
          : schema
      }),
      prenomClient: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le prénom du client est obligatoire")
          : schema
      }),
      sexe: Yup.string().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.required("Le sexe est obligatoire")
          : schema
      }),
      raisonSociale: Yup.string().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.required("Le nom du client est obligatoire")
          : schema
      }),
      dateCreation: Yup.date().when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.notRequired()
          : schema
    }),
      dateNais: Yup.date().when([], (value, schema) => {
        return showAdditionalFields.value
          ? schema.notRequired()
          : schema
      }),
      ifu: Yup.string().matches(/^\d{13}$/, 'La saisie doit avoir exactement 13 chiffres').when([], (value, schema) => {
        return !showAdditionalFields.value
          ? schema.min(13,"La saisie doit avoir exactement 13 chiffres").max(13, "La saisie doit avoir exactement 13 chiffres").required('L\'ifu est obligatoire')
          : schema.min(13,"La saisie doit avoir exactement 13 chiffres").max(13, "La saisie doit avoir exactement 13 chiffres")
      }),
      adresseClient: Yup.string().notRequired(),
      emailClient: Yup.string().email("Veuillez entrer un mail valide").notRequired(),
      telephone1: Yup.string().typeError('Veuillez entrer des chiffres').required('Le telephone 1 est obligatoire'),
      telephone2: Yup.string().typeError('Veuillez entrer des chiffres').notRequired(),
      // ifu: Yup.number().typeError('Veuillez entrer des chiffres').required('L\'ifu est obligatoire'),
      sigle: Yup.string().notRequired(),
      denomination: Yup.string().notRequired(),
      statut: Yup.string().required('Le statut est obligatoire'),
    });

    const clientForm =  ref<Client | null>(null);
    const router = useRouter();
    const defaultStatut = ref(1);
    const showAdditionalFields = ref(true);

    const  codepay= ref();
    const  nationalnumlber= ref();
    const telephone=ref();
    const telephone2=ref();
    const validPhone=ref<boolean>(false);
    const numberPhone=ref();
    const countriesRef = ref(countries)
    const  numeroNational = ref();
    const defaultCountriy = 'Bénin';

    function onInput(phone, phoneObject, input) {
      //
    }

    function validate(phoneObject) {
      validPhone.value = phoneObject.valid;
      if (phoneObject.valid == true) {
        telephone.value = phoneObject.number;
        telephone2.value = phoneObject.number;
        codepay.value= phoneObject.countryCallingCode;
        nationalnumlber.value = phoneObject.nationalNumber;
        numberPhone.value = phoneObject.nationalNumber;

      }else{
        telephone.value="";
        telephone2.value="";
        codepay.value= "";
        nationalnumlber.value= "";
        numberPhone.value="";
      }
    }

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

    const addClient = async (values, {resetForm}) => {
      values.adressesLivraisons = adresseLivraisons.map(adresseLivraison => ({
        maison: adresseLivraison.maison,
        quartier: adresseLivraison.quartier,
        ville: adresseLivraison.ville,
      }));
      ApiService.post("/clients",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeClient" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };
    return { clientSchema,
       addClient,
        clientForm,statut,
        showAdditionalFields,
        handleObjetInput,
        defaultStatut,
        removeRowAdresseLivraison,
        addRowAdresseLivraison,
        valideteRowAdresseLivraison,
        valuess,
        validPhone,
        isDisable,
        adresseLivraisons,validate,
      };
  },
});
</script>
<style scoped>
.cursor-not-allowed {
  cursor: not-allowed;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
.marge-droite {
  margin-left: 15px;
}
.hr-longeur {
  width: 80%;
}
.bord1 {
  border: 1px solid #07a;
}
.fond {
  background-color: rgb(94, 191, 233);
}
</style>
