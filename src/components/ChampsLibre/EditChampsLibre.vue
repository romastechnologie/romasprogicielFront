<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
         <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
             <Form ref="champsLibreForm" @submit="editChampsLibre" :validation-schema="champsLibreSchema">
             <div class="row">
                <div class="col-md-4">
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

            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Libellé du champ<span class="text-danger">*</span>
                </label>
                <Field name="libelleChamp" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libellé"/>
                <ErrorMessage name="libelleChamp" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                Nom du champ <span class="text-danger">*</span>
                </label>
                <Field name="nomChamp" type="text" 
                class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom du champ"/>
                <ErrorMessage name="nomChamp" class="text-danger"/>
              </div>
            </div>
            <div class="col-md-4 mb-3">
              <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
               Valeur Par Défaut<span class="text-danger">*</span>
                </label>
                <Field name="valeurParDefaut" type="text" 
                class="form-control shadow-none fs-md-15 text-black" 
                placeholder="Entrer la valeur"/>
                <ErrorMessage name="valeurParDefaut" class="text-danger"/>
              </div>
            </div> 
            <div class="col-md-4 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Mode de saisie
                  </label>
                  <Field name="modeSaisie" type="text" placeholder="Entrer le mode"
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
                 :multiple="false" :searchable="true" placeholder="Sélectionner le type de champ libre"
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le type est obligatoire</span>
            </div>
          </div>
        </div>
                <div class="row">
                  <div class="border border-primary mb-10">
                    <div class="row d-flex align-items-center justify-content-between fw-bold py-2" style="background-color: #0a59a4">
                          <div class="col-md-7">
                            <h3 class="fs-4 text-white">
                              Valeurs Possibles
                            </h3>
                          </div>
                      
                      <div class="col-md-5">
                        <div class="d-flex float-end">
                          <button
                            class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                            type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                            @click="addRowValeurPossible()">
                            <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                            Ajouter une valeur possible
                          </button>
                        </div>
                      </div>
                    </div>
                      <div class="row  align-items-center justify-content-between mt-10">
                              <div class="col-md-5">
                                <label class="d-block text-black fw-semibold">
                                  Valeur
                                  <span class="text-danger">*</span>
                                </label>
                              </div>
                              <div class="col-md-5">
                                <label class="d-block text-black fw-semibold">
                                  Libelle
                                  <span class="text-danger">*</span>
                                </label>
                              </div>
                              <div class="col-md-2">
                                <label class="d-block text-black fw-semibold">
                                  Actions
                                  <span class="text-danger">*</span>
                                </label>
                              </div>  
                        </div>  
                      <hr class="mt-0" />
                      <div class="row" v-for="(valeurPossible, index) in valeurPossibles" :key="index">
                                <div class="col-md-5 mb-3">
                                  <div class="d-block text-black fw-semibold mb-10">
                                    <input v-model="valeurPossible.valeur" type="text" class="form-control shadow-none fs-md-15 text-black"
                                      placeholder="Saisir la valeur" />
                                    <div class="invalid-feedback" v-if="valideteRowValeurPossible(valeurPossible.valeur)">
                                      La valeur est obligatoire.
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-5 mb-3">
                                  <div class="d-block text-black fw-semibold mb-10">
                                    <input v-model="valeurPossible.libelle" type="text"
                                      class="form-control shadow-none fs-md-15 text-black" placeholder="saisir le libellé" />
                                      <div class="invalid-feedback" v-if="valideteRowValeurPossible(valeurPossible.libelle)">
                                      Le libelle est obligatoire.
                                      </div>
                                    </div>
                                  </div>
                                    
                                  <div class="col-md-2 mb-3">
                                  <div class="d-block text-black fw-semibold mb-10">
                                        <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                          @click="removeRowValeurPossible(index)">
                                          <i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                                        </button>
                                    </div>
                                  </div>
                                
                              </div>
                             
            
                  
        </div>
        <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Modifier un champ libre
              </button>
              <router-link to="/champsLibres/liste-champsLibre" class=" btn btn-danger "><i
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
   
   import { defineComponent, ref, watch, onMounted, reactive } from 'vue';
   import { Form, Field, ErrorMessage, useFieldArray } from 'vee-validate';
   import { error, success } from '@/utils/utils';
   import { useRouter,useRoute } from "vue-router";
   import ApiService from '@/services/ApiService';
   import { ChampsLibre } from '@/models/ChampsLibre';
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
         libelle: Yup.number().typeError('Veuillez entrer des chiffres').required('Le libelle est obligatoire'),
         valeurParDefaut: Yup.number().typeError('Veuillez entrer des chiffres').required('La valeur actuel est obligatoire'),
         estObligatoire: Yup.boolean().notRequired(),
              
       });


       onMounted(() => {
        getAllTypeChampsLibres();
      if(route.params.id) {
        getChampsLibre(parseInt(route.params.id as string));
      }
    });
   
       const champsLibreForm = ref<ChampsLibre | null>(null);
       const router = useRouter();
       const typeChampsLibres = ref();
       const typeChampsLibreOptions = ref();
       const route = useRoute();
    
       
       const valeur = ref();
       
       const isDisable = ref(true);
       const valeurPossibles = reactive([{
        valeur: "",
         libelle: "",
         
       }]);
       
       
   
       const addRowValeurPossible = () => {
         valeurPossibles.push({
          valeur: "",
           libelle: "",
          
         });
       };
   
       const removeRowValeurPossible = (index) => {
         if (valeurPossibles.length > 1) valeurPossibles.splice(index, 1);
         //totals();
       };
   
       const valideteRowValeurPossible = (e) => {
         if (e == "" || e == 0 || e < 0) {
           console.log('erg')
           return true;
         } else {
           return false;
         }
       };
   

       watch(
      valeurPossibles,
      (newValue) => {
        isDisable.value =
        newValue.some(
          (valeurPossible) =>
          valideteRowValeurPossible(valeurPossible.valeur) ||
          valideteRowValeurPossible(valeurPossible.libelle)
         
        );
      },
      { deep: true }
    );

    
       const { remove, push, fields, update } = useFieldArray("valeurPossibles");
   
       const valeurPossibleOptions = ref([]);
       const valuess = ref();
       
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
        error(response.message);
      });
    }

    const editChampsLibre = async (values, {resetForm}) => {
      ApiService.put("/champsLibres/"+values.id,values)
        .then(({ data }) => {
          if(data.code == 200) { 
            success(data.message);
            resetForm();
            router.push({ name: "ListeChampsLibre" });
          }
        }).catch(({ response }) => {
          error(response.data.message);
      });
    };

    const getAllTypeChampsLibres = async () => {
          try{
          const response = await ApiService.get('/typeChampsLibres');
          const typeChampsLibresData = response.data;
          console.log('Data', typeChampsLibresData)
          typeChampsLibreOptions.value = typeChampsLibresData.map((typeChampsLibre) => ({
            value: typeChampsLibre.id,
            label: typeChampsLibre.libelle,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        }

       
   
       return {
         champsLibreSchema,
         editChampsLibre,
         champsLibreForm,
         removeRowValeurPossible,
         addRowValeurPossible,
         valideteRowValeurPossible,
         valuess,
         valeurPossibleOptions,
         isDisable,typeChampsLibreOptions,
         typeChampsLibres,
         valeurPossibles
       }
     }
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
   
   
   
   
   
   
   