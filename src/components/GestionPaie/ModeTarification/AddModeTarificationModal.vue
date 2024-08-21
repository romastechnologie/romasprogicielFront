<template>

    <div class="modal fade" id="AddModeTarificationModal" tabindex="-1" role="dialog" ref="addModeTarificationModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="modeTarificationForm" @submit="addModeTarification" :validation-schema="modeTarificationSchema">
                        <div class="row">
                            <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                code<span class="text-danger">*</span>
                              </label>
                              <Field name="code" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                              <ErrorMessage name="code" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                libelle <span class="text-danger">*</span>
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
    import { ModeTarification } from '@/models/ModeTarification';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddModeTarificationModal",
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
      emits: ["refreshModeTarifications",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const modeTarificationSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
        });
    
    
        const modeTarificationnew = ref(props.id);
        const modeTarificationForm =  ref<ModeTarification | null>(null);
        const addModeTarificationModalRef = ref<null | HTMLElement>(null);
        let modeTarifications= ref<Array<ModeTarification>>([]);
        const title = ref('Ajouter une modeTarification');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getModeTarification(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getModeTarification = async (id: number) => {
          return ApiService.get("/modeTarifications/"+id)
          .then(({ data }) => {
            modeTarificationForm.value?.setFieldValue("id",data.data.id);
            modeTarificationForm.value?.setFieldValue("libelle",data.data.libelle);
            modeTarificationForm.value?.setFieldValue("code",data.data.code);
            emit('openmodal', addModeTarificationModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier la modeTarification";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter une modeTarification";
             btntext.value = "Ajouter";
          }
        }
    
        const addModeTarification = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as ModeTarification;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/modeTarifications/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addModeTarificationModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshModeTarifications");
                router.push('/modeTarifications/liste-modeTarification');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/modeTarifications",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addModeTarificationModalRef.value);
                //router.push('/modeTarifications/liste-modeTarification');
                emit("refreshModeTarifications");
    
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
    
        return {modeTarifications, title,btntext, resetValue, modeTarificationSchema,
           addModeTarification, modeTarificationForm,addModeTarificationModalRef,modeTarificationnew,
           //refreshModeTarifications
           };
      },
    };
    </script>@/models/ModeTarification