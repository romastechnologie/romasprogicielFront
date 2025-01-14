<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="missionForm" @submit="editMission" :validation-schema="missionlSchema" :initial-values="missionForm">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description <span class="text-danger">*</span>
                  </label>
                  <Field name="description" type="string" v-model="description"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la description"/>
                  <ErrorMessage name="description" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Destination<span class="text-danger">*</span>
                  </label>
                  <Field name="destination" type="string" v-model="destination"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la destination"/>
                  <ErrorMessage name="destination" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date debut<span class="text-danger">*</span>
                  </label>
                  <Field name="dateDebut" type="date" :value="dateDebut"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date debut"/>
                  <ErrorMessage name="dateDebut" class="text-danger"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Date fin<span class="text-danger">*</span>
                  </label>
                  <Field name="dateFin" type="date" :value="dateFin"
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la date de fin"/>
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

          <div class="col-md-12 d-flex flex-column mt-3">
            <div class="d-flex align-items-center ">
              <button
                class="btn btn-success me-3"
                type="submit"
              >
                  Modifier mission
              </button>
              <router-link to="/missions/liste-missions" 
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
  
  import { defineComponent, ref, reactive,onMounted,watch} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { error, format_Date, success } from '@/utils/utils';
  import { useRoute, useRouter } from 'vue-router';
  import ApiService from '@/services/ApiService';
  import { Mission} from '@/models/Mission';
  import * as Yup from 'yup';
  import axios from 'axios';
  import Multiselect from '@vueform/multiselect'
  
  export default defineComponent({
      name: "EditMission",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
    setup: () => {
      const missionSchema = Yup.object().shape({
        description: Yup.string().required("Description est obligatoire."),
        destination: Yup.string().required("Destination est obligatoire."),
        dateDebut: Yup.string().required("Date debut est obligatoire."),
        dateFin: Yup.string().required("Date Fin est obligatoire."),

      });
  
      const missionForm = ref<Mission>();
      const router = useRouter();
      const route = useRoute();
       var dateFin = ref("");
       var dateDebut = ref("");
       const destination = ref();
       const description = ref();

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


      const isDisable = ref(true);
    const missions = reactive([{
      titre: "",
      description: "",
      datefin: "",
      datedebut: ""
    }]);

  
      function getMission(id:number) {
        ApiService.get("/missions/"+id.toString())
          .then(({ data }) => {
            console.log('data',data);
            // for (const key in data.data) {
            //   let value = data.data[key];
            //   missionForm.value?.setFieldValue(key, 
            //   (typeof data.data[key] === 'object' && data.data[key] !== null)? data.data[key].id :data.data[key]
            // );
           
            // }

            console.log("data.data['dateDebut']",data.data['dateDebut'].split('T')[0])
              dateDebut.value = data.data['dateDebut'].split('T')[0];
              dateFin.value = data.data['dateFin'].split('T')[0];
              description.value = data.data['description'];
              destination.value = data.data['destination'];
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
      }
  
  
  
  const editMission = async (values, { resetForm }) => {
    try {
      const response = await ApiService.put(`/missions/${values.id}`, values);
      if (response.status === 200) {
        success(response.data.message);
        resetForm();
        router.push({ name: "ListeMissionPage" });
      }
    } catch (error) {
      error(error.response?.data?.message || "Une erreur est survenue.");
    }
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

  
  
      onMounted(() => {
        if(route.params.id) {
          getMission(parseInt(route.params.id as string));
        }
      });
  
      return { 
        missionSchema, editMission, missionForm,missions,isDisable,
        addRowMission,removeRowMission,valideteRowMission,dateFin,dateDebut,destination,description
        
      };
    },
  });
  </script>