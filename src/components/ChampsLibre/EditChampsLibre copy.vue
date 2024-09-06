<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
  <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="champsLibreForm" @submit="editChampsLibre" :validation-schema="champsLibreSchema" :initial-values="champsLibreForm">
            <div class="row">
             <!--<div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Client <span class="text-danger">*</span>
                </label>
                <Field  name="client"  v-slot="{ field }">
                  <Multiselect
                    :options="clientOptions"
                    :searchable="true"
                    track-by="label"
                    label="label"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le client"
                  />
                </Field>  
              </div>
              <ErrorMessage name="client" class="text-danger"/>
            </div>-->
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Libellé du champ<span class="text-danger">*</span>
                </label>
                <Field name="libelleChamp" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l' intitule du champsLibre"/>
                <ErrorMessage name="libelleChamp" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Nom du champ <span class="text-danger">*</span>
                </label>
                <Field name="nomChamp" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le solde initial"/>
                <ErrorMessage name="nomChamp" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
               Valeur Par Défaut<span class="text-danger">*</span>
                </label>
                <Field name="valeurParDefaut" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le solde actuel"/>
                <ErrorMessage name="valeurParDefaut" class="text-danger"/>
              </div>
            </div> 
            <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Mode de saisie
                  </label>
                  <Field name="modeSaisie" type="text" 
                  class="form-control shadow-none fs-md-15 text-black"/>
                </div>
              <ErrorMessage name="modeSaisie" class="text-danger"/>
              </div>
            <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type de champs libre 
              </label>
              <Field name="typeChampsLibre" v-model="typeChampsLibre" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="typeChampsLibreOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner la typeChampsLibre"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le type est obligatoire</span>
            </div>
          </div>
          <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
               Valeur Possible<span class="text-danger">*</span>
                </label>
                <Field name="valeurPossible" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le solde actuel"/>
                <ErrorMessage name="valeurPossible" class="text-danger"/>
              </div>
            </div> 
            <div class="col-md-4">
            <br />
            <div class="form-check mt-3 mb-2 mb-sm-2 mb-md-2">
              <label
                for="estActif"
                class="form-check-label fw-medium position-relative top-1"
              >
                Est Obligatoire?
              </label>
              <input
                id="estObligatoire"
                name="estObligatoire"
                v-model="estObligatoire"
                :value="estObligatoire"
                type="checkbox"
                class="form-check-input shadow-none"
              />
              <ErrorMessage name="estObligatoire" class="text-danger" />
            </div>
          </div>
          <div class="col-md-12 mb-md-25">
              <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                <div class="row">
                  <div class="border border-primary mb-10">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4">
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">
                          Enfants
                        </h3>
                      </div>
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                            @click="addRowEnfant()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter un valeurPossible
                          </button>
                          <router-link to="/liste-mouvements"></router-link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="row d-flex align-items-center justify-content-between mt-10">
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold">
                            Nom
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-3">
                          <label class="d-block text-black fw-semibold">
                            Prénom
                            <span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-10">
                            Date Naissance<span class="text-danger">*</span>
                          </label>
                        </div>
                        <div class="col-md-2">
                          <label class="d-block text-black fw-semibold mb-10">
                            Sexe <span class="text-danger">*</span>
                          </label>
                        </div>
                      </div>
                      <hr class="mt-0" />
                      <div class="row" v-for="(valeurPossible, index) in valeurPossibles" :key="index">
                        <div class="col-md-3 mb-3">
                          <div class="form-group mb-5 mb-sm-5 mb-md-5">
                            <input v-model="valeurPossible.nom" type="text" class="form-control shadow-none fs-md-15 text-black"
                              placeholder="Saisir le nom" />
                            <div class="invalid-feedback" v-if="valideteRowEnfant(valeurPossible.nom)">
                              Le nom est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 mb-3">
                          <div class="form-group mb-5 mb-sm-5 mb-md-5">
                            <input v-model="valeurPossible.prenom" type="text"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="saisir le prénom" />
                            <div class="invalid-feedback" v-if="valideteRowEnfant(valeurPossible.prenom)">
                              Le prénom est obligatoire.
                            </div>
                          </div>
                        </div>
                        <div class="col-md-3 mb-3">
                          <div class="form-group mb-5 mb-sm-5 mb-md-5">
                            <input v-model="valeurPossible.dateNaissance" type="date"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                          </div>
                          <div class="invalid-feedback" v-if="valideteRowEnfant(valeurPossible.dateNaissance)">
                            La date est obligatoire.
                          </div>
                        </div>
                        <div class="col-md-3 mb-3">
                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <Multiselect :searchable="true" :options="['Masculin', 'Féminin']" v-model="valeurPossible.sexe"
                              v-bind="field" placeholder="Sélectionner le sexe" />
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
                >
                  Modifier un champsLibre
                </button>
                <router-link to="/champsLibres/liste-champsLibres" 
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

import { defineComponent, ref, watch,reactive,onMounted } from 'vue';
import { Form, Field, ErrorMessage,useFieldArray } from 'vee-validate';
import { error, success } from '@/utils/utils';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '@/services/ApiService';
import { ChampsLibre} from '@/models/ChampsLibre';
import * as Yup from 'yup';
import axios from 'axios';
import Multiselect from '@vueform/multiselect'

export default defineComponent({
    name: "EditChampsLibre",
    components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const champsLibreSchema = Yup.object().shape({
     
      modeSaisie: Yup.string().required('Le mode de saisie est obligatoire'),
      typeChampsLibre: Yup.string().required('Le type de champs libre est obligatoire'),
      libelleChamp: Yup.string().required('Le libellé du champ libre est obligatoire'),
      nomChamp: Yup.string().required('Le nom du champ libre est obligatoire'),
      valeurPossible: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur est obligatoire'),
      valeurParDefaut: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur est obligatoire'),
      estObligatoire: Yup.boolean().notRequired(),
    });

    const champsLibreForm = ref<ChampsLibre>();
    const router = useRouter();
    const route = useRoute();
    const typeChampsLibreOptions = ref([]);
    const estObligatoire= ref(false)
    

    const isDisable = ref(true);
    const valeurPossibles = reactive([{
      nom: "",
      sexe: "",
      prenom: "",
      dateNaissance: ""
    }]);
    
    const laPhoto = ref<any>()

    const onFileChange = (file:File)=>{
      console.log("Le fichier ===> ",file);
      laPhoto.value = file["file"];
    }

    const addRowEnfant = () => {
      valeurPossibles.push({
        nom: "",
        sexe: "",
        prenom: "",
        dateNaissance: ""
      });
    };

    const removeRowEnfant = (index) => {
      if (valeurPossibles.length > 1) valeurPossibles.splice(index, 1);
      //totals();
    };

    const valideteRowEnfant = (e) => {
      if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    const { remove, push, fields, update } = useFieldArray("valeurPossibles");

    const valeurPossibleOptions = ref([]);
    
    


    

    const addChampsLibre = async (values, { resetForm }) => {
      values.valeurPossibles = valeurPossibles.map(valeurPossible => ({
        nom: valeurPossible.nom,
        sexe: valeurPossible.sexe,
        prenom: valeurPossible.prenom,
        dateNaissance: valeurPossible.dateNaissance,
      }));



    watch(estObligatoire, () => {
      console.log('estservice', estObligatoire.value)
    })

    
    onMounted(()=> {
      if(route.params.id) {
        getChampsLibre(parseInt(route.params.id as string));
      }
      //fetchClient();
      //fetchFournisseur()
    })

    function getChampsLibre(id:number) {
      ApiService.get("/champsLibres/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            champsLibreForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.data.message);
      });
    }

    const editChampsLibre = async (values, {resetForm}) => {
      const data = champsLibreForm.value;
      ApiService.put("/champsLibres/" + data?.id, data)
        .then(({ data }) => {
          if (data.code == 200) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeChampsLibrePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };


    return { 
      champsLibreSchema, editChampsLibre, champsLibreForm,typeChampsLibreOptions,estObligatoire,removeRowEnfant,
      addRowEnfant,
      valideteRowEnfant,
      valeurPossibleOptions,
      isDisable,
      valeurPossibles,
      };
  },
});
</script>