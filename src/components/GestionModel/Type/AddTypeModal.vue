<template>

    <div class="modal fade" id="AddTypeModal" tabindex="-1" role="dialog" ref="addTypeModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="typeForm" @submit="addType" :validation-schema="typeSchema">
                        <div class="row">
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
    import { Type} from '@/models/Type';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddTypeModal",
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
      emits: ["refreshTypes",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const typeSchema = Yup.object().shape({
          //description: Yup.string().required('La religion est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
          code: Yup.string().required('Le code est obligatoire'),

        });
    
    
        const typenew = ref(props.id);
        const typeForm =  ref<Type | null>(null);
        const addTypeModalRef = ref<null | HTMLElement>(null);
        let types= ref<Array<Type>>([]);
        const title = ref('Ajouter un type');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getType(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getType = async (id: number) => {
          return ApiService.get("/types/"+id)
          .then(({ data }) => {
            typeForm.value?.setFieldValue("id",data.data.id);
            typeForm.value?.setFieldValue("libelle",data.data.libelle);
            typeForm.value?.setFieldValue("code", data.data.code);
            emit('openmodal', addTypeModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le type";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter une type";
             btntext.value = "Ajouter";
          }
        }
    
        const addType = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Type;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/types/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addTypeModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshTypes");
                router.push('/types/liste-types');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/types",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addTypeModalRef.value);
                emit("refreshTypes");
    
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
    
        return {types, title,btntext, resetValue, typeSchema,
           addType, typeForm,addTypeModalRef,typenew,
           //refreshReligions
           };
      },
    };
    </script>@/models/Type