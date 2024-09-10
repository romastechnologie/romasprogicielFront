<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-horaire-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <Form ref="horaireForm" @submit="editHoraire" :validation-schema="horaireSchema" :initial-values="horaireForm">
            <div class="row">
              <<div class="col-md-4 mb-3">
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
    import { defineComponent, onMounted, ref} from 'vue';
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
          
          
          
        };
    },
  });
  </script>