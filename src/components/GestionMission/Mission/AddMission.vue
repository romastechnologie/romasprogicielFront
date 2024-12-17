<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <Form ref="missionForm" @submit="addMission" :validation-schema="missionSchema">
          <div class="row">
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description <span class="text-danger">*</span>
                  </label>
                  <Field name="description" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la description"/>
                  <ErrorMessage name="description" class="text-danger"/>
                </div>
              </div>
  
            <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Destination <span class="text-danger">*</span>
                  </label>
                  <Field name="destination" type="string" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la destination"/>
                  <ErrorMessage name="destination" class="text-danger"/>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date debut  <span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebut" type="Date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date début"/>
                  <ErrorMessage name="dateDebut" class="text-danger"/>
                </div>
              </div>
         
              
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date fin  <span class="text-danger">*</span>
                  </label>
                  <Field name="dateFin" type="Date" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date fin"/>
                  <ErrorMessage name="dateFin" class="text-danger"/>
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
                                                  Missions
                                                </h3>
                                              </div>
                                              <div class="col-md-5">
                                                <div class="d-flex float-end">
                                                  <button
                                                    class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                                    type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                                                    @click="addRowMission()">
                                                    <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                                    Ajouter une mission
                                                  </button>
                                                  <router-link to="/liste-mouvements"></router-link>
                                                </div>
                                              </div>
                                            </div>
                                            <div>
                                              <div class="row d-flex align-items-center justify-content-between mt-10">
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                   Titre
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-3">
                                                  <label class="d-block text-black fw-semibold">
                                                    Description
                                                    <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Date Debut<span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Date Fin <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                                <div class="col-md-2">
                                                  <label class="d-block text-black fw-semibold mb-10">
                                                    Actions <span class="text-danger">*</span>
                                                  </label>
                                                </div>
                                              </div>
                                              <hr class="mt-0" />
                                              <div class="row" v-for="(mission, index) in missions" :key="index">
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="mission.titre" name="titre" type="text" class="form-control shadow-none fs-md-15 text-black"
                                                      placeholder="Saisir le titre" />
                                                    <div class="invalid-feedback" v-if="valideteRowMission(mission.titre)">
                                                      Le titre est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-3 mb-2">
                                                  <div class="form-group ">
                                                    <input v-model="mission.description" name="description" type="text"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="saisir la description" />
                                                    <div class="invalid-feedback" v-if="valideteRowMission(mission.description)">
                                                      La description est obligatoire.
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group">
                                                    <input v-model="mission.datedebut" name="datedebut" type="date"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                                  </div>
                                                  <div class="invalid-feedback" v-if="valideteRowMission(mission.datedebut)">
                                                    La date de début est obligatoire.
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                  <div class="form-group">
                                                    <input v-model="mission.datefin" name="datefin" type="date"
                                                      class="form-control shadow-none fs-md-15 text-black" placeholder="" />
                                                  </div>
                                                  <div class="invalid-feedback" v-if="valideteRowMission(mission.datefin)">
                                                    La date de fin est obligatoire.
                                                  </div>
                                                </div>
                                                <div class="col-md-2 mb-2">
                                                    <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                                    @click="removeRowMission(index)">
                                                   <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                                    </button>
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
                  Ajouter une mission
                </button>
                <router-link to="/missions/liste-missions" class=" btn btn-danger "><i
                    class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                  <span class="position-relative"></span>Annuler</router-link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </template>
  <script lang="ts">
  
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
  import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
  import * as Yup from 'yup';
  import { Mission} from '@/models/Mission';
  import ApiService from '@/services/ApiService';
  import { error, success,ajouterPeriode } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import axios from 'axios';
  
  
  export default defineComponent({
    name: "AddMission",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
  
    setup: () => {
      const missionSchema = Yup.object().shape({
        description: Yup.string().required("Description est obligatoire."),
        destination: Yup.string().required("Destination est obligatoire."),
        dateDebut: Yup.string().required("Date debut est obligatoire."),
        dateFin: Yup.string().required("Date fin est obligatoire."),

      });
  
      onMounted(async () => {
      });
  
      const missionForm = ref(null);
      const description = ref();
      const destination= ref();
      const dateDebut= ref();
      const dateFin= ref();


    const isDisable = ref(true);
    const missions = reactive([{
      titre: "",
      datefin: "",
      description: "",
      datedebut: ""
    }]);


    const addRowMission = () => {
        missions.push({
          titre: "",
          description: "",
          datedebut: "",
          datefin: ""
        });
      };
  
      const removeRowMission = (index) => {
        if (missions.length > 1) missions.splice(index, 1);
        //totals();
      };
  
      watch(
        missions,
        (newValue) => {
          isDisable.value =
          newValue.some(
            (mission) =>
            valideteRowMission(mission.titre) ||
            valideteRowMission(mission.description) ||
            valideteRowMission(mission.datedebut) ||
            valideteRowMission(mission.datefin)
          );
        },
        { deep: true }
      );
  
      const valideteRowMission = (e) => {
        if (e == "" || e == 0 || e == "0" || e == null || e < 0) {
          console.log('erg')
          return true;
        } else {
          return false;
        }
      };

      const { remove, push, fields, update } = useFieldArray("missions");


    
      const router = useRouter();
  
  
      const addMission = async (values, { resetForm }) => {
  const formatDateWithTime = (date) => {
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
    return `${date}T${formattedTime}`;
  };
  const payload = {
    ...values,
    dateDebut: formatDateWithTime(values.dateDebut),
    dateFin: formatDateWithTime(values.dateFin),
  };

  try {
    const { data } = await ApiService.post("/missions", payload);
    if (data.code === 201) {
      success(data.message);
      resetForm();
      router.push({ name: "ListeMissionPage" });
    }
  } catch ({ response }) {
    error(response.data.message);
  }
};

  
     
     /* const addMission = async (values, {resetForm}) => {
        ApiService.post("/missions",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              resetForm();
              router.push({ name: "ListeMissionPage" });
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      };*/
  
      return { missionSchema,
         addMission,
         isDisable,
        missionForm,
         removeRowMission,
        addRowMission,
        valideteRowMission,
        };
      
    },
  });
  </script>