<template>

    <div class="modal fade" id="AddRoleEtapModal" tabindex="-1" role="dialog" ref="addRoleEtapModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="roleetapForm" @submit="addRoleEtap" :validation-schema="roleetapSchema">
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

                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Ordre <span class="text-danger">*</span>
                              </label>
                              <Field name="ordre" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer l'ordre"/>
                              <ErrorMessage name="ordre" class="text-danger"/>
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
    import { RoleEtap} from '@/models/RoleEtap';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddRoleEtapModal",
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
      emits: ["refreshRoleEtaps",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const roleetapSchema = Yup.object().shape({
          //description: Yup.string().required('La religion est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
          code: Yup.string().required('Le code est obligatoire'),

        });
    
    
        const roleetapnew = ref(props.id);
        const roleetapForm =  ref<RoleEtap | null>(null);
        const addRoleEtapModalRef = ref<null | HTMLElement>(null);
        let roleetaps= ref<Array<RoleEtap>>([]);
        const title = ref('Ajouter un role etap');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getRoleEtap(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getRoleEtap = async (id: number) => {
          return ApiService.get("/roleetaps/"+id)
          .then(({ data }) => {
            roleetapForm.value?.setFieldValue("id",data.data.id);
            roleetapForm.value?.setFieldValue("libelle",data.data.libelle);
            roleetapForm.value?.setFieldValue("code", data.data.code);
            roleetapForm.value?.setFieldValue("ordre", data.data.ordre);
            emit('openmodal', addRoleEtapModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le roleetap";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un roleetap";
             btntext.value = "Ajouter";
          }
        }
    
        const addRoleEtap = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as RoleEtap;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/roleetaps/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addRoleEtapModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshRoleEtaps");
             //   router.push('/roleetaps/liste-roleetaps');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/roleetaps",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addRoleEtapModalRef.value);
                emit("refreshRoleEtaps");
    
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
    
        return {roleetaps, title,btntext, resetValue, roleetapSchema,
           addRoleEtap, roleetapForm,addRoleEtapModalRef,roleetapnew,
           //refreshReligions
           };
      },
    };
    </script>@/models/RoleEtap