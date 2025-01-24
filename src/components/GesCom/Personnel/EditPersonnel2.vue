
<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="personnelForm" @submit="editPersonnel" :validation-schema="personnelSchema" :initial-values="personnelForm">
        <div v-if="currentStep === 1" class="row">
          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Nom <span class="text-danger">*</span>
                </label>
                <Field name="nom" type="string" v-model="nom"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                <ErrorMessage name="nom" class="text-danger"/>
              </div>
            </div>


            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                 Prenoms<span class="text-danger">*</span>
                </label>
                <Field name="prenom" type="string" v-model="prenom"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le prenom"/>
                <ErrorMessage name="prenom" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Situation matrimoniale
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="situationMatrimoniale"
                                  v-model="situationMatrimoniale"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="[
                                      'Célibataire',
                                      'Marié(e)',
                                      'Divorcée',
                                      'Veuve',
                                      'Concubinage',
                                      'Union libre',
                                    ]"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la situation"
                                  />
                                </Field>
                              </div>
                            </div>




             <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Civilite <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="civilite"
                                  v-model="civilite"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :searchable="true"
                                    :options="['Mr', 'Mme']"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner la civilité"
                                  />
                                </Field>
                              </div>
                            </div>


            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Date Naissance <span class="text-danger">*</span>
                </label>
                <Field name="birthdate" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer date"/>
                <ErrorMessage name="birthdate" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Date Embauche <span class="text-danger">*</span>
                </label>
                <Field name="dateEmbauche" type="date" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer date"/>
                <ErrorMessage name="dateEmbauche" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Numéro de sécurité sociale <span class="text-danger">*</span>
                </label>
                <Field name="numeroSecuriteSociale" type="string" v-model="numeroSecuriteSociale"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer numéro sécurité sociale"/>
                <ErrorMessage name="numeroSecuriteSociale" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Pays de résidence
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="nationalite"
                                  v-model="nationalite"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="countries"
                                    :searchable="true"
                                    track-by="value"
                                    label="label"
                                    v-model="field.value"
                                    v-bind="field"
                                    placeholder="Sélectionner le pays"
                                  />
                                </Field>
                              </div>
                            </div>

                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Religion <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="religion"
                                  v-model="religion"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    v-model="field.value"
                                    v-bind="field"
                                    :options="religionOptions"
                                    :preserve-search="true"
                                    :multiple="false"
                                    :searchable="true"
                                    placeholder="Sélectionner la religion"
                                    label="label"
                                    track-by="label"
                                  />
                                </Field>
                              </div>
                            </div>

                            <div class="col-md-6 mb-3">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Ethnie <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="ethnie"
                                  v-model="ethnie"
                                  type="text"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    v-model="field.value"
                                    v-bind="field"
                                    :options="ethnieOptions"
                                    :preserve-search="true"
                                    :multiple="false"
                                    :searchable="true"
                                    placeholder="Sélectionner l'ethnie"
                                    label="label"
                                    track-by="label"
                                  />
                                </Field>
                              </div>
                            </div>      
                            </div>

        <div v-if="currentStep === 2" class="row">
          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Boite postale <span class="text-danger">*</span>
                </label>
                <Field name="boitePostale" type="string" v-model="boitePostale" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer boite postale"/>
                <ErrorMessage name="boitePostale" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Téléphone <span class="text-danger">*</span>
                </label>
                <Field name="telephone" type="string" v-model=telephone
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer telephone"/>
                <ErrorMessage name="telephone" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Telephone 2 <span class="text-danger">*</span>
                </label>
                <Field name="telephone2" type="string" v-model="telephone2"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le telephone 2"/>
                <ErrorMessage name="telephone2" class="text-danger"/>
              </div>
            </div>


            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Email <span class="text-danger">*</span>
                </label>
                <Field name="email" type="string" v-model="email"
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le mail"/>
                <ErrorMessage name="email" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Département <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="departement"
                                  v-model="departement"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="departementOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="field.value"
                                    v-bind="field"
                                    @change="departementChange($event)"
                                    placeholder="Sélectionner le departement"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Communes <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="commune"
                                  v-model="commune"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="communeOptions"
                                    @change="communeChange($event)"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedCommune"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord un département"
                                    placeholder="Sélectionner la commune"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Arrondissement
                                  <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="arrondissement"
                                  v-model="arrondissement"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="arrondissementOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedArrondissement"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord une commune"
                                    @change="arrondissementChange($event)"
                                    placeholder="Sélectionner l' arrondissement"
                                  />
                                </Field>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label
                                  class="d-block text-black fw-semibold mb-10"
                                >
                                  Quartier <span class="text-danger">*</span>
                                </label>
                                <Field
                                  name="quartier"
                                  v-model="quartier"
                                  v-slot="{ field }"
                                >
                                  <Multiselect
                                    :options="quartierOptions"
                                    :searchable="true"
                                    track-by="label"
                                    label="label"
                                    v-model="selectedQuartier"
                                    v-bind="field"
                                    noOptionsText="Sélectionner d'abord un arrondissement"
                                    placeholder="Sélectionner le quartier"
                                  />
                                </Field>
                              </div>
                            </div>
                         
                          <div class="col-md-12 mt-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label
                                class="d-block text-black fw-semibold mb-10"
                              >
                                Adresse <span class="text-danger">*</span>
                              </label>
                              <Field
                                name="adresse"
                                cols="20"
                                v-model="adresse"
                                rows="3"
                                as="textarea"
                                placeholder="Ex: M/ DOSSOU C/905"
                                v-slot="{ field }"
                                class="form-control shadow-none rounded-0 text-black"
                              >
                                <textarea
                                  v-model="field.value"
                                  class="form-control shadow-none rounded-0 text-black"
                                ></textarea>
                              </Field>
                            </div>
                          </div>
                    </div>

        <div class="col-md-12 d-flex flex-column mt-3">
          <div class="d-flex align-items-center">
            <button v-if="currentStep > 1" @click.prevent="prevStep" class="btn btn-secondary me-3">
              Précédent
            </button>
            <button v-if="currentStep < totalSteps" @click.prevent="nextStep" class="btn btn-primary me-3">
              Suivant
            </button>
            <button v-if="currentStep === totalSteps" class="btn btn-success me-3" type="submit">
              Modifier 
            </button>
            <router-link to="/models/liste-models" 
                class="btn btn-danger"><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { Personnel } from '@/models/Personnel';
import * as Yup from 'yup';
import Multiselect from "@vueform/multiselect";
import { countries } from "./countries";



export default defineComponent({
  name: "EditPersonnel",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup: () => {
    const personnelSchema = Yup.object().shape({
      nom: Yup.string().required("nom est obligatoire."),
      prenom: Yup.string().required("prenom est obligatoire."),
      birthdate: Yup.string().required("Date de naissance obligatoire"),
      dateEmbauche:Yup.string().required("Date embauche obligatoire"),
      numeroSecuriteSociale:Yup.string().required("Numero securite social"),
      boitePostale:Yup.string().required("boite postale obligatoire"),
      telephone: Yup.string().required("telephone est obligatoire"),
      telephone2: Yup.string().required("telephone 2 est obligatoire"),
      email: Yup.string().required("email obligatoire"),
      nationalite: Yup.string().required("La nationalité est obligatoire"),
      religion: Yup.string().required("Religion est obligatoire"),
      ethnie: Yup.string().required("Ethnie est obligatoire"),
      situationMatrimoniale: Yup.string().required("Situation matrimoniale obligatoire"),
      departement:Yup.string().required("Departement obligatoire"),
      commune: Yup.string().required("commune obligatoire"),
      arrondissement: Yup.string().required("arrondissement obligatoire"),
      quartier: Yup.string().required("quartier est obligatoire"),
      adresse: Yup.string().required ("adresse est obligatoire"),
    });

    const countriesRef = ref(countries);
    const personnelForm = ref<Personnel>();
    const router = useRouter();
    const route = useRoute();
    const currentStep = ref(1);
    const totalSteps = 2;
    const selectedCommune = ref([]);
    const selectedArrondissement = ref([]);
    const selectedQuartier = ref([]);
    const departementOptions = ref([]);
    const communeOptions = ref([]);
    const arrondissementOptions = ref([]);
    const quartierOptions = ref([]);
    const arrondissement = ref();
    const quartier = ref();
    const commune = ref();
    const departement = ref();
    const adresse= ref();
    const nationalite = ref();
    const religion = ref();
    const religionOptions = ref([]);
    const ethnie = ref();
    const situationMatrimoniale = ref();
    const ethnieOptions = ref([]);

    function nextStep() {
      if (currentStep.value < totalSteps) currentStep.value++;
    }

    function prevStep() {
      if (currentStep.value > 1) currentStep.value--;
    }

    const getPersonnel = async(id: number) =>{
      ApiService.get("/personnel/" + id.toString())
        .then(async ({ data }) => {
          console.log("personnel1",data);

          console.log("personnel2",data.data);
          for (const key in data.data) {
            personnelForm.value?.setFieldValue(key, 
              (typeof data.data[key] === 'object' && data.data[key] !== null) ? data.data[key].id : data.data[key]
            );
                     

          }
          departement.value= data?.data?.departement?.id;
          await departementChange(departement.value);
          commune.value= data?.data?.commune?.id;
          arrondissement.value= data?.data?.arrondissement?.id;
          ethnie.value= data?.data?.ethnie?.id;
          console.log ("ethnie",ethnie.value);
          quartier.value= data?.data?.quartier?.id;
          religion.value= data?.data?.religion?.id;
          console.log ("religion",religion.value);
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    const getAllReligions = async () => {
      try {
        const response = await ApiService.get("/all/religions");
        const religionsData = response.data.data.data;
        religionOptions.value = religionsData.map((religion) => ({
          value: religion.id,
          label: religion.libelle,
        }));
      } catch (error) {
      }
    }

    const editPersonnel = async (values, { resetForm }) => {
      try {
        const response = await ApiService.put(`/personnels/${values.id}`, values);

        if (response.status === 200) {
          success(response.data.message);
          resetForm();
          router.push({ name: "ListeModelPage" });
        }
      } catch (error) {
        error(error.response?.data?.message || "Une erreur est survenue.");
      }
    };

    const getAllEthnies = async () => {
      try {
        const response = await ApiService.get("/all/ethnies");
        const ethniesData = response.data.data.data;

        ethnieOptions.value = ethniesData.map((ethnie) => ({
          value: ethnie.id,
          label: ethnie.libelle,
        }));
      } catch (error) {
      }
    };

    function departementChange(value) {
      console.log("g,rl;m", value);
      if (value) {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get("/departements/communes/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            console.log("donnee", donnee);
            if (donnee.length > 0) {
              communeOptions.value = donnee.map((commune: any) => {
                return {
                  label: commune.libelle,
                  value: commune.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        communeOptions.value = [];
        selectedCommune.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function communeChange(value) {
      if (value) {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
        ApiService.get("/communes/arrondissements/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              arrondissementOptions.value = donnee.map(
                (arrondissement: any) => {
                  return {
                    label: arrondissement.libelle,
                    value: arrondissement.id,
                  };
                }
              );
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        arrondissementOptions.value = [];
        selectedArrondissement.value = [];
        selectedQuartier.value = [];
      }
    }

    function arrondissementChange(value) {
      if (value) {
        quartierOptions.value = [];
        selectedQuartier.value = [];
        ApiService.get("/arrondissements/quartiers/" + value)
          .then(({ data }) => {
            const donnee = data.data;
            if (donnee.length > 0) {
              quartierOptions.value = donnee.map((quartier: any) => {
                return {
                  label: quartier.libelle,
                  value: quartier.id,
                };
              });
            }
          })
          .catch(({ response }) => {
            //error(response.data.message);
          });
      } else {
        quartierOptions.value = [];
        selectedQuartier.value = [];
      }
    }

    const fetchDepartements = async () => {
      ApiService.get("/all/departements")
        .then(({ data }) => {
          console.log('departement',data);
          const donnees = data.data.data;
          departementOptions.value = donnees.map((departement) => {
            return {
              value: departement.id,
              label: `${departement.libelle}`,
            };
          });
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    
    onMounted(() => {
      if (route.params.id) {
        getPersonnel(parseInt(route.params.id as string));
      }
      fetchDepartements();
      getAllReligions();
      getAllEthnies();

    });

    return {
      personnelSchema, 
      editPersonnel, 
      personnelForm, 
      currentStep, 
      totalSteps, 
      nextStep, 
      prevStep,
      quartierOptions,
      communeOptions,
      departementOptions,
      arrondissementOptions,
      departementChange,
      communeChange,
      arrondissementChange,
      selectedCommune,
      selectedArrondissement,
      selectedQuartier,
      commune,
      departement,
      adresse,
      quartier,
      arrondissement,
      countries: countriesRef,
      religionOptions,
      religion,
      ethnieOptions,
      ethnie,
      nationalite,
      situationMatrimoniale,
    };
  },
});
</script>