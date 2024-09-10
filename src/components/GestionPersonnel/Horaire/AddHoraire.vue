<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="horaireForm" @submit="addHoraire" :validation-schema="horaireSchema">
              <div class="row">
            <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                <label class="d-block text-black mb-10">
                                  Jour <span class="text-danger">*</span>
                                </label>
                                <Field name="jour" type="text" v-slot="{ field }">
                                 <Multiselect :searchable="true" :options="['Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi','Samedi','Dimanche']"
                                 v-model="field.value" v-bind="field" placeholder="Sélectionner le jour" />
                          </Field>
                         <ErrorMessage name="jour" class="text-danger" />
                    </div>
               </div>
            <div class="col-md-4">
                    <label for="heureOuverture" class="form-label">Heure D'ouverture<span class="text-danger">*</span></label>
                    <Field name="heureOuverture" class="form-control" type="time"/>
                    <ErrorMessage name="heureOuverture" class="text-danger" />
            </div>
            
            <div class="col-md-4">
                    <label for="heureFermeture" class="form-label"> Heure de Fermeture<span class="text-danger">*</span></label>
                    <Field name="heureFermeture"  class="form-control" type="time"/>
                    <ErrorMessage name="heureFermeture" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="heureFinPause" class="form-label"> Heure de finde pause<span class="text-danger">*</span></label>
                    <Field name="heureFinPause"  class="form-control" type="time"/>
                    <ErrorMessage name="heureFinPause" class="text-danger" />
            </div>
            <div class="col-md-4">
                    <label for="heureDebutPause" class="form-label"> Heure début de pause<span class="text-danger">*</span></label>
                    <Field name="heureDebutPause"  class="form-control" type="time"/>
                    <ErrorMessage name="heureDebutPause" class="text-danger" />
            </div>
            
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                  Ajouter un horaire
              </button>
              <router-link to="/horaires/liste-horaire" 
              class=" btn btn-danger"><i
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
  
  import { defineComponent, onMounted, ref} from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import axios from 'axios';
  import ApiService from '@/services/ApiService';
  import { Horaire } from '@/models/Horaire';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';
  import VueMultiselect from 'vue-multiselect'
import { option } from '@/composables/common/animationView';


  
  
  export default defineComponent({
      name: "AddHoraire",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
      VueMultiselect
    },
  
    setup: () => {
      const horaireSchema = Yup.object().shape({
            //refHoraire: Yup.string().required("La référence est obligatoire."),
            jour: Yup.string().required("Le jour est obligatoire."),
            heureOuverture: Yup.string().required("L'heure d'ouverture est obligatoire."),
            heureFermeture: Yup.string().required("L'heure de fermeture est obligatoire."),
            heureDebutPause: Yup.string().required("L'heure de début est obligatoire."),
            heureFinPause: Yup.string().required("L'heure de fin est obligatoire."),
            
      });
  
      onMounted(() => {
       
      });
  
      const horaireForm =  ref(null);
      const showMErr = ref(false);
      const option = ref();
      
      const router = useRouter();
      
      const addHoraire = async (values, {resetForm}) => {
      ApiService.post("/horaires",values)
        .then(({ data }) => {
          if(data.code == 201) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeHorairePage" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
        });
    };

      /*const addHoraire = async (values: any, { resetForm }) => {
      values['types'] = types.value.value
      values['categories'] = categories.value.value
      console.log('Données envoyées', values)
      if (showMErr.value === false) {
        ApiService.post("/horaires", values)
           .then(({ data }) => {
             if (data.code == 201) {
              success(data.message);
               //resetForm();
             console.log('flefelef')
              router.push({ name: "ListeHoraire" });
           }
           }).catch(({ response }) => {
            error(response.data.message);
          });
       }
    };*/

     
      return { horaireSchema, addHoraire, horaireForm,showMErr,option};
    },
  });
  </script>