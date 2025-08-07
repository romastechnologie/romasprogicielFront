<template>

    <div class="modal fade" id="AddModePaiementModal" tabindex="-1" role="dialog" ref="addModePaiementModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="modepaiementForm" @submit="addModePaiement" :validation-schema="modepaiementSchema">
                        <div class="row">

                            <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                              Code <span class="text-danger">*</span>
                              </label>
                              <Field name="code" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                              <ErrorMessage name="code" class="text-danger"/>
                            </div>
                          </div>
                        
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Libelle <span class="text-danger">*</span>
                              </label>
                              <Field name="libelle" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le libelle"/>
                              <ErrorMessage name="libelle" class="text-danger"/>
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
    import { ModePaiement } from '@/models/ModePaiement';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddModePaiementModal",
      components: {
        Form,
        Field,
        ErrorMessage
      },
      props:{
        id: {
          type: Number,
          required: true,
          default:0
        },
      },
      emits: ["refreshModePaiements",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const modepaiementSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libellé est obligatoire'),
        });
    
    
        const modepaiementnew = ref(props.id);
        const modepaiementForm =  ref<ModePaiement | null>(null);
        const addModePaiementModalRef = ref<null | HTMLElement>(null);
        let modepaiements= ref<Array<ModePaiement>>([]);
        const title = ref('Ajouter un mode de paiement');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getModePaiement(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getModePaiement = async (id: number) => {
          return ApiService.get("/modepaiements/"+id)
          .then(({ data }) => {
            modepaiementForm.value?.setFieldValue("id",data.data.id);
            modepaiementForm.value?.setFieldValue("libelle",data.data.libelle);
            modepaiementForm.value?.setFieldValue("code",data.data.code);
            emit('openmodal', addModePaiementModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le mode de paiement";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un mode de paiement";
             btntext.value = "Ajouter";
          }
        }
    
        const addModePaiement = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as ModePaiement;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/modepaiements/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addModePaiementModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshModePaiements");
                router.push('/modepaiements/liste-modepaiement');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/modepaiements",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addModePaiementModalRef.value);
                //router.push('/ethnies/liste-ethnie');
                emit("refreshModePaiements");
    
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
    
        return {modepaiements,title,btntext,resetValue,modepaiementSchema,
           addModePaiement, loading, getModePaiement, isupdate, modepaiementForm,addModePaiementModalRef,modepaiementnew,
           //refreshEthnies
           };
      },
    };
    </script>@/models/ModePaiement