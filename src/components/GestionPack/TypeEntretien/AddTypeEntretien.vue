<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <Form ref="typeEntretienForm" @submit="addTypeEntretien" :validation-schema="typeEntretienSchema">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Libellé <span class="text-danger">*</span>
                    </label>
                    <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                      placeholder="Entrer le libelle" />
                    <ErrorMessage name="libelle" class="text-danger" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black fw-semibold mb-10">
                      Description <span class="text-danger">*</span>
                    </label>
                    <Field name="description" cols="12" rows="3" as="textarea" placeholder="Description" v-slot="{ field }"
                      class="form-control shadow-none rounded-0 text-black">
                      <textarea v-model="field.value" class="form-control shadow-none rounded-0 text-black"></textarea>
                    </Field>
                    <ErrorMessage name="description" class="text-danger" />
                  </div>
                </div>
  
                <div class="col-md-12 mb-md-25">
                  <div class="accordion" id="basicAccordion">
                    <div class="accordion-item mb-0 bord1">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#basicCollapseOne" aria-expanded="false" aria-controls="basicCollapseOne">
                          Choisir des TypesMoyentsRoulantsEntretien
                        </button>
                      </h2>
                      <div id="basicCollapseOne" class="accordion-collapse collapse" data-bs-parent="#basicAccordion">
                        <div class="accordion-body">
  
                          <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active p-10" id="home-tab-pane" role="tabpanel" tabindex="0">
                              <div class="row">
                                <div class="border border-primary mb-10">
                                  <div class="row d-flex align-items-center justify-content-between fw-bold py-2"
                                    style="background-color: #0a59a4">
                                    <div class="col-md-7">
                                      <h3 class="fs-3 text-white">
                                        TypeMoyensRoulantsEntretien
                                      </h3>
                                    </div>
                                    <div class="col-md-5">
                                      <div class="d-flex float-end">
                                        <button
                                          class="default-btn me-20 transition border-0 fw-medium text-white pt-2 pb-2 ps-8 pe-8 rounded-1 fs-md-13 fs-lg-14 bg-success"
                                          type="button" :class="{ 'cursor-not-allowed': isDisable }" :disabled="isDisable"
                                          @click="addRowFonction()">
                                          <i class="fa fa-plus-circle position-relative ms-5 fs-12"></i>
                                          Ajouter un type
                                        </button>
                                        <router-link to="/liste-mouvements"></router-link>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                     <div class="row d-flex align-items-center justify-content-between mt-10">
                                     <!--  <div class="col-md-2">
                                        <label class="d-block text-black fw-semibold">
                                          Type Entretien
                                          <span class="text-danger">*</span>
                                        </label>
                                      </div>-->
                                      <div class="col-md-3">
                                        <label class="d-block text-black fw-semibold">
                                          Type bien
                                          <span class="text-danger">*</span>
                                        </label>
                                      </div>
                                      <div class="col-md-3">
                                        <label class="d-block text-black fw-semibold mb-10">
                                          Valeur <span class="text-danger">*</span>
                                        </label>
                                      </div>
                                      <div class="col-md-3">
                                        <label class="d-block text-black fw-semibold mb-10">
                                          Unité mesure <span class="text-danger">*</span>
                                        </label>
                                      </div>
                                      
                                      <div class="col-md-3">
                                        <label class="d-block text-black fw-semibold mb-10">
                                          Action
                                        </label>
                                      </div>
                                    </div>
                                    <hr class="mt-0" />
                                    <div class="row" v-for="(fonction, index) in fonctions" :key="index">
                                    <!-- <div class="col-md-2 mb-2">
                                        <div class="">
                                          <Multiselect :options="fonctionOptions" :searchable="true" track-by="label"
                                            label="label" v-model="fonction.typeBien"
                                            placeholder="Sélectionner le type entretien" />
                                          <div class="invalid-feedback" v-if="valideteRowFonction(fonction.typeBien)">
                                            La fonction est obligatoire.
                                          </div>
                                        </div> 
                                      </div>-->
                                      <div class="col-md-3 mb-2">
                                        <div class="">
                                          <Multiselect :options="typeOptions" :searchable="true" track-by="label"
                                            label="label" v-model="fonction.typeBien"
                                            placeholder="Sélectionner le type" />
                                          <div class="invalid-feedback" v-if="valideteRowFonction(fonction.typeBien)">
                                            Le type de bien est obligatoire.
                                          </div>
                                        </div> 
                                      </div>
                                      <!--<div class="col-md-3 mb-2">
                                        <div class="">
                                          <Field name="types" v-model="types" type="text" v-slot="{ field }">
                                            <Multiselect v-model="field.value" v-bind="field" :options="typeOptions"
                                              :preserve-search="true" :multiple="false" :searchable="true"
                                              placeholder="Sélectionner le type" label="label" track-by="label" />
                                          </Field>
                                          <span class="text-danger" v-if="showMErr">Le type de bien est obligatoire</span>
                                        </div>
                                      </div>-->
                                      <div class="col-md-3 mb-2">
                                        <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                          <input v-model="fonction.valeur" type="text"
                                            class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="indiquer la valeur" />
                                          <div class="invalid-feedback" v-if="valideteRowFonction(fonction.valeur)">
                                            La valeur est obligatoire.
                                          </div>
                                        </div>
  
                                      </div>
                                      <div class="col-md-3 mb-2">
                                        <div class="form-group mb-5 mb-sm-5 mb-md-5">
                                          <input v-model="fonction.uniteMesure" type="text"
                                            class="form-control shadow-none fs-md-15 text-black"
                                            placeholder="indiquer l'unité mesure" />
                                        </div>
                                        <div class="invalid-feedback" v-if="valideteRowFonction(fonction.uniteMesure)">
                                          L'unité mesure est obligatoire.
                                        </div>
                                      </div>
                                     
                                      <div class="col-md-3 mb-2">
                                        <button class="btn btn-danger transition border-0 pb-2 ps-8 pe-8" type="button"
                                          @click="removeRowFonction(index)">
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
                    </div>
                  </div>
                </div>
  
                <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center ">
              <button class="btn btn-success me-3" type="submit">
                Ajouter un type d'entretien
              </button>
              <router-link to="/typeEntretiens/liste-typeEntretien" class=" btn btn-danger "><i
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
  import ApiService from '@/services/ApiService';
  import * as Yup from 'yup';
 // import { hide } from '@/utils/utils';
  import { TypeEntretien } from '@/models/TypeEntretien';
  import { error, success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect';
  
  
  export default defineComponent({
    name: "AddTypeEntretien",
    components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect,
    },
    props: {
      item: {
        type: Number,
        default: 0,
      }
    },
    setup(props, { emit }) {
      const typeEntretienSchema = Yup.object().shape({
        libelle: Yup.string().required('Le libellé est obligatoire'),
        description: Yup.string().required('La description est obligatoire'),
        typeBien: Yup.string().required('Le type de bien est obligatoire'),
  
      });
  
      const typeEntretienForm = ref<TypeEntretien | null>(null);
      const addTypeEntretienRef = ref<null | HTMLElement>(null);
      const router = useRouter();
      const typeEntretienOptions = ref([]);
      const types = ref();
      // const item = ref({ ...props.item });
      const typeOptions = ref([]);
      const showMErr = ref(false);
      const localItem = ref(props.item);
      const isUPDATE = ref(false);
      const title = ref("Ajouter un typeEntretien");
      const btntext = ref('Ajouter');
  
      const isDisable = ref(true);
      const { remove, push, fields, update } = useFieldArray("fonctions");
  
      const fonctionOptions = ref([]);
      const fonctions = reactive([
        {
          //caburation: "",
          typeEntretien: "",
          valeur: "",
          uniteMesure: "",
          typeBien: ""
        },
      ]);
  
      const addRowFonction = () => {
        fonctions.push({
         // caburation: "",
          typeEntretien: "",
          valeur: "",
          uniteMesure: "",
          typeBien: ""
        });
      };
  
      const removeRowFonction = (index) => {
        if (fonctions.length > 1) fonctions.splice(index, 1);
        //totals();
      };
  
      const valideteRowFonction = (e) => {
        if ( e == 0 || e == "0" || e == null || e == null || e < 0) {
          console.log('erg')
          return true;
        } else {
          return false;
        }
      };
  
  
      watch(fonctions, (newValue, oldValue) => {
        Object.keys(newValue).forEach(function (key) {
          if (
            //newValue[key].caburation == "" ||
            newValue[key].typeEntretien == "" ||
            newValue[key].valeur == "" ||
            newValue[key].typeBien == "" ||
            newValue[key].uniteMesure == ""
          ) {
            isDisable.value = true;
          } else {
            isDisable.value = false;
          }
        });
      });
  
  
  
  
      /*watch(() => props.item, (newValue) => {
        getTypeEntretien(newValue);
        isUPDATE.value = true;
        //btnTitle();
      });*/
  
      /*const btnTitle = async () => {
        if (isUPDATE.value) {
          title.value = "Modifier le typeEntretien";
          btntext.value = "Modifier";
        } else {
          title.value = "Ajouter un typeEntretien";
          btntext.value = "Ajouter";
        }
      }*/

      const getTypeEntretien = async (id: number) => {
        return ApiService.get("/typeEntretiens/" + id)
          .then(({ data }) => {
            // map data in form
            const donnees = data.data;
            for (const key in donnees) {
              typeEntretienForm.value?.setFieldValue(key,
                (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
              );
            }
            emit('openmodal', addTypeEntretienRef.value);
  
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
      }
  
      const fetchTypeEntretien = async () => {
        try {
          const response = await ApiService.get('/typeEntretiens');
          const typeEntretienData = response.data.data.data;
          typeEntretienOptions.value = typeEntretienData.map((typeEntretien) => ({
            value: typeEntretien.id,
            label: `${typeEntretien.codeTypeEntretien} - ${typeEntretien.libelleTypeEntretien}`,
          }));
        } catch (error) {
          //
        }
      };
      const getAllTypeBien = async () => {
        try {
          const response = await ApiService.get('/all/typeBiens');
          const typesData = response.data.data.data;
  
          typeOptions.value = typesData.map((type) => ({
            value: type.id,
            label: type.libelle,
          }));
        }
        catch (error) {
          //error(response.data.message)
        }
      }
      onMounted(() => {
        fetchTypeEntretien();
        fetchFonction();
        getAllTypeBien();
      });
      const addTypeEntretien = async (values: any, typeEntretienForm) => {
        values = values as TypeEntretien;
        values.fonctions = fonctions.map(fonction => ({
          //caburation: fonction.caburation,
          typeEntretien: fonction.typeEntretien,
          valeur: fonction.valeur,
          uniteMesure: fonction.uniteMesure,
          typeBien: fonction.typeBien
        }));
        if (isUPDATE.value) {
          ApiService.put("/typeEntretiens" + values.id, values)
            .then(({ data }) => {
              if (data.code == 200) {
                success(data.message);
                typeEntretienForm.resetForm();
                //hide(addTypeEntretienRef.value);
                isUPDATE.value = false;
                //btnTitle();
                emit('close');
              }
            })
            .catch(({ response }) => {
              error(response.data.message);
            });
        } else {
          console.log('values', values)
          ApiService.post("/typeEntretiens", values)
            .then(({ data }) => {
              if (data.code == 201) {
                success(data.message);
                typeEntretienForm.resetForm();
                //hide(addTypeEntretienRef.value);
                emit('close');
              }
            })
            .catch(({ response }) => {
              error(response.data.message);
            });
        }
      };
  
      /*const resetValue = () => {
        const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value = false;
        formFields.forEach(field => {
          field.value = '';
        });
        btnTitle()
      };*/
  
      const fetchFonction = async () => {
        try {
          const response = await ApiService.get("/fonctions");
          const fonctionData = response.data.data.data;
          fonctionOptions.value = fonctionData.map((fonction) => ({
            value: fonction.id,
            label: `${fonction.libelle}`,
          }));
        } catch (error) {
          //
        }
      };
  
      return {
        typeEntretienSchema,
        addTypeEntretienRef,
        addTypeEntretien,
        typeEntretienForm,
        title, btntext, //resetValue,
        typeEntretienOptions,
        removeRowFonction,
        addRowFonction,
        valideteRowFonction,
        fonctionOptions,
        fonctions,
        types,
        showMErr,
        typeOptions,
        isDisable
      };
    },
  });
  </script>