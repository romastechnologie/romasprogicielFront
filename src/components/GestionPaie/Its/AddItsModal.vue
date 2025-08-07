<template>

    <div class="modal fade" id="AddItsModal" tabindex="-1" role="dialog" ref="addItsModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="its">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="itsForm" @submit="addIts" :validation-schema="itsSchema">
                        <div class="row">                    
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                              Plafond minimal<span class="text-danger">*</span>
                              </label>
                              <Field name="plafondMin" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant minimal"/>
                              <ErrorMessage name="plafondMin" class="text-danger"/>
                            </div>
                          </div>

                           <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Plafond maximal<span class="text-danger">*</span>
                              </label>
                              <Field name="plafondMax" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant max"/>
                              <ErrorMessage name="plafondMax" class="text-danger"/>
                            </div>
                          </div>

                            <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Taux<span class="text-danger">*</span>
                              </label>
                              <Field name="taux" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le taux"/>
                              <ErrorMessage name="taux" class="text-danger"/>
                            </div>
                          </div>
                         

                       <!--    <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Montant fixe<span class="text-danger">*</span>
                              </label>
                              <Field name="montantFixe" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le montant fixe"/>
                              <ErrorMessage name="montantFixe" class="text-danger"/>
                            </div>
                          </div>-->
                         
                         
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
    import { Its } from '@/models/Its';
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect'
    
    export default {
      name: "AddItsModal",
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
      emits: ["refreshItss",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const itsSchema = Yup.object().shape({
          plafondMin: Yup.string().required('Le montant minimal est obligatoire'),
          plafondMax: Yup.string().required('Le montant max est obligatoire'),
          taux: Yup.string().required('Le taux est obligatoire'),
      //    montantFixe: Yup.string().required('Le taux est obligatoire'),
        });
    
    
        const itsnew = ref(props.id);
        const itsForm =  ref<Its | null>(null);
        const addItsModalRef = ref<null | HTMLElement>(null);
        let itss= ref<Array<Its>>([]);
        const title = ref('Ajouter un its');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
        const valeurM = ref(false);
        const disable = ref(true);

        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getIts(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getIts = async (id: number) => {
          return ApiService.get("/itss/"+id)
          .then(({ data }) => {
            itsForm.value?.setFieldValue("id",data.data.id);
            itsForm.value?.setFieldValue("plafondMin",data.data.plafondMin);
            itsForm.value?.setFieldValue("plafondMax",data.data.plafondMax);
       //     itsForm.value?.setFieldValue("montantFixe",data.data.montantFixe);
            itsForm.value?.setFieldValue("taux",data.data.taux);
            emit('openmodal', addItsModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier Its";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un Its";
             btntext.value = "Ajouter";
          }
        }
    
        const addIts = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Its;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/itss/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addItsModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshItss");
                router.push('/itss/liste-its');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/itss",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addItsModalRef.value);
                router.push('/itss/liste-its');
                emit("refreshIts");
    
              }
            }).catch(({ response }) => {
              error(response.data.message);
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
    
        return {itss,title,btntext, resetValue, itsSchema,
           addIts,itsForm,addItsModalRef,itsnew,disable,
           };
      },
    };
    </script>@/models/Its

    <style >
      .input-readonly {
        background-color: #f0f0f0;
        color: #888888;
        border-color: #cccccc;
      }
    </style>