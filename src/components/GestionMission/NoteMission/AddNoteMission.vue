<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form ref="noteMissionForm" @submit="addNoteMission" :validation-schema="noteMissionSchema">
        <div class="row">
         <!-- <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Objet<span class="text-danger">*</span>
                </label>
                <Field name="objet" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'objet"/>
                <ErrorMessage name="objet" class="text-danger"/>
              </div>
            </div>-->


            <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Mission <span class="text-danger">*</span>
              </label>
              <Field name="mission" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="missionOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner la mission" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="mission" class="text-danger" />
            </div>
          </div>

          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Référence <span class="text-danger">*</span>
                </label>
                <Field name="reference" type="string" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la Référence"/>
                <ErrorMessage name="reference" class="text-danger"/>
              </div>
            </div> 

          <div class="col-md-6">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Budget <span class="text-danger">*</span>
                </label>
                <Field name="budget" type="number" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le Budget"/>
                <ErrorMessage name="budget" class="text-danger"/>
              </div>
            </div>

            <div class="col-md-12">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Contenue <span class="text-danger">*</span>
                </label>
                <Field name="contenue" type="string" as="textarea" class="form-control shadow-none fs-md-15 text-black" rows="5" 
                 placeholder="Ecrire le Contenue...."/>
                <ErrorMessage name="contenue" class="text-danger"/>
              </div>
            </div>

             
          <div class="col-md-12 d-flex flex-column mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter une Note Mission
              </button>
              <router-link to="/noteMissions/liste-noteMissions" class=" btn btn-danger "><i
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, success,ajouterPeriode } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { NoteMission } from '@/models/NoteMission';

import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';
export default defineComponent({
  name: "AddNoteMission",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  setup: () => {
    const noteMissionSchema = Yup.object().shape({
      budget: Yup.number().required("Le budget est obligatoire."),
      contenue: Yup.string().required("Le contenue  est obligatoire."),
      mission:Yup.string().required("La mission est obligatoire."),
      reference: Yup.string().required("La Référence est obligatoire."),

    });

    onMounted(async () => {
      getAllMissions();
    });

    const noteMissionForm = ref(null);
    //const showMErr = ref(false);
    //const permissions = ref(null);
    const missionOptions = ref([]);
    const router = useRouter();
    // const permissions= ref<Array<Permission>>([]);

    const getAllMissions = async () => {
      try {
        const response = await ApiService.get('/all/missions');
        console.log("RESPONSE ONE PERSO EQUAL THIS ONE ==> ",response)
        const missionsData = response.data.data.data;
        missionOptions.value = missionsData.map((mission) => ({
          value: mission.id,
          label: `${mission.description}`,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    const addNoteMission = async (values, {resetForm}) => {
      console.log("data",values);
      ApiService.post("/noteMissions",values)
        .then(({ data }) => {
          console.log("enregistrement",data);
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeNoteMissionPage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

    return { noteMissionSchema,
       addNoteMission,
       getAllMissions,
       missionOptions,
        noteMissionForm,
      };
    
  },
});
</script>