<template>

    <div class="modal fade" id="AddFormatModal" tabindex="-1" role="dialog" ref="addFormatModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="formatForm" @submit="addFormat" :validation-schema="formatSchema">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Code<span class="text-danger">*</span>
                              </label>
                              <Field name="code" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le code"/>
                              <ErrorMessage name="code" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Libelle<span class="text-danger">*</span>
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
    import { Format } from '@/models/Format';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddFormatModal",
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
      emits: ["refreshFormats",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const formatSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
          
        });
    
    
        const formatnew = ref(props.id);
        const formatForm =  ref<Format | null>(null);
        const addFormatModalRef = ref<null | HTMLElement>(null);
        let formats= ref<Array<Format>>([]);
        const title = ref('Ajouter un format');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getFormat(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getFormat = async (id: number) => {
          return ApiService.get("/formats/"+id)
          .then(({ data }) => {
            formatForm.value?.setFieldValue("id",data.data.id);
            formatForm.value?.setFieldValue("code",data.data.code);
            formatForm.value?.setFieldValue("libelle",data.data.libelle);
            emit('openmodal', addFormatModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le format";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un format";
             btntext.value = "Ajouter";
          }
        }
    
        const addFormat = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Format;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/formats/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addFormatModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshFormats");
                router.push('/formats/liste-format');
              }
            }).catch(({ response }) => {
              console.log("ZZZZZZZ ==> ",response)
              error(response.data.message);
            });
          }else{
            ApiService.post("/formats",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addFormatModalRef.value);
                //router.push('/formats/liste-format');
                emit("refreshFormats");
    
              }
            }).catch(({ response }) => {
              console.log("ZZZZZZZ ==> ",response)
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
    
        return {formats, title,btntext, resetValue, formatSchema,
           addFormat, formatForm,addFormatModalRef,formatnew,
           //refreshFormats
           };
      },
    };
    </script>@/models/Format