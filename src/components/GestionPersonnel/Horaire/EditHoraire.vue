<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-horaire-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="horaireForm" @submit="editHoraire" :validation-schema="horaireSchema" :initial-values="horaireForm">
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="sidebar-body">  
                                    <div class="col-md-12 mb-md-25">
                                      <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                                        <div class="row">
                                          <div class="border border-primary mb-10">
                                            <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                              style="background-color: #0a59a4">
                                              <div class="col-md-7">
                                                <h3 class="fs-4 text-white">
                                                  Les horaires
                                                </h3>
                                              </div>
                                              <div class="col-md-5">
                                                <div class="d-flex float-end">
                                                  <button
                                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                                    type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                                                    @click="addRowHoraire()">
                                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                                    Ajouter un horaire
                                                  </button>
                                                  <router-link to="/liste-mouvements"></router-link>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div class="row d-flex align-items-center justify-content-between mt-10">
                                               <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold">
                                                    Jour
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div> 
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold">
                                                    Heure d'ouverture
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold">
                                                    Heure de fermeture
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold">
                                                    Heure de début de pause
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Heure de fin de pause<span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                               <!-- <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Statut <span class="text-danger">*</span>
                                                  </label>
                                                </div>-->
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Actions <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                              </div>
                                              <hr class="mt-0" />
                                              <div class="row" v-for="(horaire, index) in horaires" :key="index">
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group ">
                                                    <Field name="jour" type="text" v-slot="{ field }">
                                              <Multiselect :searchable="true" :options="['Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi','Samedi','Dimanche']"
                                                 v-model="field.value" v-bind="field" placeholder="Sélectionner le jour" />
                                                </Field>
                                                    <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.jour)">
                                                      Le jour est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="horaire.heureOuverture" type="time" class="form-control shadow-none fs-md-15 text-black"
                                                      placeholder="Saisir le nom" />
                                                    <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureOuverture)">
                                                      L'heure d'ouverture est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="horaire.heureFermeture" type="time" class="form-control shadow-none fs-md-15 text-black"
                                                      placeholder="Saisir le nom" />
                                                    <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureFermeture)">
                                                      L'horaire de fermeture est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="horaire.heureDebutPause" type="time"
                                                      class="form-control shadow-none fs-md-15 text-black"/>
                                                    <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureDebutPause)">
                                                      heureDebutPause est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group">
                                                    <input v-model="horaire.heureFinPause" type="time"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                                  </div>
                                                  <div class="invalid-feedback" v-if="valideteRowHoraire(horaire.heureFinPause)">
                                                    L'heure est obligatoire.
                                                  </div>
                                                </div>
                                               
                                                <div class="col-md-2 mb-2">
                                                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                                    @click="removeRowHoraire(index)">
                                                   <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
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
                              
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Modifier un horaire
              </button>
              <router-link to="/horaires/liste-horaire" 
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
    import { defineComponent, onMounted, reactive, ref, watch} from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import axios from 'axios';
    import ApiService from '@/services/ApiService';
    import { error, success } from '@/utils/utils';
    import { useRouter, useRoute } from 'vue-router';
    import { Horaire } from '@/models/Horaire';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
    import VueMultiselect from 'vue-multiselect'

  
  export default defineComponent({
      name: "EditHoraire",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
      
  },
  
  setup: () => {
    const horaireSchema = Yup.object().shape({
            jour: Yup.string().required("Le jour est obligatoire."),
            heureOuverture: Yup.string().required("L'heure d'ouverture est obligatoire."),
            heureFermeture: Yup.string().required("L'heure de fermeture est obligatoire."),
            heureDebutPause: Yup.string().required("L'heure de début est obligatoire."),
            heureFinPause: Yup.string().required("L'heure de fin est obligatoire."),
          });

    
    const router = useRouter();
    const horaireForm = ref<Horaire>();
    const route = useRoute();
    const showMErr = ref(false);
   
   

    onMounted(() => {
        
      if(route.params.id) {
        getHoraire(parseInt(route.params.id as string));
      }
    });

    


    const isDisable = ref(true);
    const horaires = reactive([{
        jour: "",
        heureOuverture: "",
        heureFermeture: "",
        heureDebutPause: "",
        heureFinPause: ""
       
      }]);
    
    

    const addRowHoraire = () => {
        horaires.push({
          jour: "",
          heureOuverture: "",
          heureFermeture: "",
          heureDebutPause: "",
          heureFinPause: ""
         
        });
      };

    const removeRowHoraire = (index) => {
      if (horaires.length > 1) horaires.splice(index, 1);
      //totals();
    };

    watch(
      horaires,
      (newValue) => {
        isDisable.value =
        newValue.some(
          (horaire) =>
          valideteRowHoraire(horaire.jour) ||
          valideteRowHoraire(horaire.heureOuverture) ||
          valideteRowHoraire(horaire.heureFermeture) ||
          valideteRowHoraire(horaire.heureDebutPause) ||
          valideteRowHoraire(horaire.heureFinPause)
        );
      },
      { deep: true }
    );

    const valideteRowHoraire = (e) => {
      if (e == "" || e == "" || e == 0 || e == "0" || e == null || e < 0) {
        console.log('erg')
        return true;
      } else {
        return false;
      }
    };

    //const { remove, push, fields, update } = useFieldArray("horaires");

    const horaireOptions = ref([]);
    const valuess = ref();
  
    function getHoraire(id:number) {
      ApiService.get("/horaires/"+id.toString())
        .then(({ data }) => {
          for (const key in data.data) {
            horaireForm.value?.setFieldValue(key, 
            (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
          );
          }
      })
      .catch(({ response }) => {
        error(response.message);
      });
    }

    const editHoraire = async (values, {resetForm}) => {
      ApiService.put("/horaires/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeHorairePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };
   
   
   
      return {horaireForm,
         horaireSchema,
          editHoraire,
          showMErr,
          removeRowHoraire,
      addRowHoraire,
      valideteRowHoraire,
      horaireOptions,
      isDisable,
      horaires,
          
          
        };
    },
  });
  </script>