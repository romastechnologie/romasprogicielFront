<template>

    <div class="modal fade" id="AddTypePrimeModal" tabindex="-1" role="dialog" ref="addTypePrimeModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="typePrimeForm" @submit="addTypePrime" :validation-schema="typePrimeSchema">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Nom du prime<span class="text-danger">*</span>
                              </label>
                              <Field name="nomPrime" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nomPrime"/>
                              <ErrorMessage name="nomPrime" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black mb-10">
                              Type de valeur <span class="text-danger">*</span>
                            </label>
                            <Field  name="typeDeValeur" v-model="typeC"  type="text"  v-slot="{ field }">
                              <Multiselect
                              :searchable = "true"
                              :options = "['%', 'MT']"
                              v-model = "field.value"
                              v-bind = "field"
                              placeholder="Sélectionner le type"
                              />
                            </Field>
                            <ErrorMessage name="typeDeValeur" class="text-danger"/>
                          </div>
                        </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Valeur<span class="text-danger">*</span>
                              </label>
                              <Field name="valeur" type="text" :class="{'cursor-not-allowed':disable}" :disabled="disable"
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la valeur"/>
                              <ErrorMessage name="valeur" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Description <span class="text-danger">*</span>
                              </label>
                              <Field name="description" cols="20"
                              rows="3" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
                                <textarea
                                  v-model="field.value"
                                  class="form-control shadow-none rounded-0 text-black"
                                ></textarea>
                              </Field>
                              <ErrorMessage name="description" class="text-danger"/>
                            </div>
                          </div>
                          <button
                            class="btn btn-primary"
                            type="submit">
                            {{ btntext }}
                          </button>
                        </div>
                      </Form>
                    </div>
                    <!-- <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-primary" type="button">Save changes</button>
                    </div> -->
                </div>
            </div>
        </div>
    </template> 
    
    <script lang="ts">
    import { ref, watch } from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import ApiService from '@/services/ApiService';
    import { error, hideModal, success } from '@/utils/utils';
    import { TypePrime } from '@/models/TypePrime';
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect'
    
    export default {
      name: "AddTypePrimeModal",
      components: {
        Form,
        Field,
        ErrorMessage,
        Multiselect
      },
      props:{
        id: {
          type: Number,
          required: true,
          default:0
        },
      },
      emits: ["refreshTypePrimes",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const typePrimeSchema = Yup.object().shape({
          description: Yup.string().required('La description est obligatoire'),
          nomPrime: Yup.string().required('Le nomPrime est obligatoire'),
          valeur: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
          return !valeurM.value
            ? schema.max(100, 'La valeur ne peut pas être supérieure à 100').required("La valeur est obligatoire")
            : schema.notRequired()
          }),
          typeDeValeur: Yup.string().required('Le type est obligatoire'),
        });
    
    
        const typePrimenew = ref(props.id);
        const typePrimeForm =  ref<TypePrime | null>(null);
        const addTypePrimeModalRef = ref<null | HTMLElement>(null);
        let typePrimes= ref<Array<TypePrime>>([]);
        const title = ref('Ajouter un type de prime');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
        const typeC = ref(null);
        const valeurM = ref(false);
        const disable = ref(true);

        watch(typeC, (newVal) => {
          disable.value = newVal !== "%" && newVal !== "MT";
          valeurM.value = newVal !== "%";
        });
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getTypePrime(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getTypePrime = async (id: number) => {
          return ApiService.get("/typePrimes/"+id)
          .then(({ data }) => {
            typePrimeForm.value?.setFieldValue("id",data.data.id);
            typePrimeForm.value?.setFieldValue("nomPrime",data.data.nomPrime);
            typePrimeForm.value?.setFieldValue("description",data.data.description);
            typePrimeForm.value?.setFieldValue("valeur",data.data.valeur);
            typePrimeForm.value?.setFieldValue("typeDeValeur",data.data.typeDeValeur);
            emit('openmodal', addTypePrimeModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le type de prime";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un type de prime";
             btntext.value = "Ajouter";
          }
        }
    
        const addTypePrime = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as TypePrime;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/typePrimes/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addTypePrimeModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshTypePrimes");
                router.push('/typePrimes/liste-typePrime');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/typePrimes",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addTypePrimeModalRef.value);
                //router.push('/typePrimes/liste-typePrime');
                emit("refreshTypePrimes");
    
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }
        }; 
    
        const resetValue = () => {
          const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isupdate.value=false;
          formFields.forEach(field => {
            field.value = '';
          });
          btnTitle()
        };
    
        return {typePrimes, title,btntext, resetValue, typePrimeSchema,
           addTypePrime, typePrimeForm,addTypePrimeModalRef,typePrimenew,
           typeC,valeurM,disable,
           };
      },
    };
    </script>@/models/TypePrime

    <style >
      .input-readonly {
        background-color: #f0f0f0;
        color: #888888;
        border-color: #cccccc;
      }
    </style>