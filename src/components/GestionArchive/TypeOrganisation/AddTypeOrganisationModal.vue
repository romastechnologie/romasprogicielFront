<template>

    <div class="modal fade" id="AddTypeOrganisationModal" tabindex="-1" role="dialog" ref="addTypeOrganisationModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="typeOrganisationForm" @submit="addTypeOrganisation" :validation-schema="typeOrganisationSchema">
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
    import { TypeOrganisation } from '@/models/TypeOrganisation';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddTypeOrganisationModal",
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
      emits: ["refreshTypeOrganisations",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const typeOrganisationSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
         
        });
    
    
        const typeOrganisationnew = ref(props.id);
        const typeOrganisationForm =  ref<TypeOrganisation | null>(null);
        const addTypeOrganisationModalRef = ref<null | HTMLElement>(null);
        let typeOrganisations= ref<Array<TypeOrganisation>>([]);
        const title = ref('Ajouter un typeOrganisation');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getTypeOrganisation(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getTypeOrganisation = async (id: number) => {
          return ApiService.get("/typeOrganisations/"+id)
          .then(({ data }) => {
            typeOrganisationForm.value?.setFieldValue("id",data.data.id);
            typeOrganisationForm.value?.setFieldValue("code",data.data.code);
            typeOrganisationForm.value?.setFieldValue("libelle",data.data.libelle);
            emit('openmodal', addTypeOrganisationModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le typeOrganisation";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un typeOrganisation";
             btntext.value = "Ajouter";
          }
        }
    
        const addTypeOrganisation = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as TypeOrganisation;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/typeOrganisations/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addTypeOrganisationModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshTypeOrganisations");
                router.push('/typeOrganisations/liste-typeOrganisation');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/typeOrganisations",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addTypeOrganisationModalRef.value);
                //router.push('/typeOrganisations/liste-typeOrganisation');
                emit("refreshTypeOrganisations");
    
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
    
        return {typeOrganisations, title,btntext, resetValue, typeOrganisationSchema,
           addTypeOrganisation, typeOrganisationForm,addTypeOrganisationModalRef,typeOrganisationnew,
           //refreshTypeOrganisations
           };
      },
    };
    </script>@/models/TypeOrganisation