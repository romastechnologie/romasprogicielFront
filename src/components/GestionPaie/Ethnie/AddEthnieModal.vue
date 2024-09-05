<template>

    <div class="modal fade" id="AddEthnieModal" tabindex="-1" role="dialog" ref="addEthnieModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="ethnieForm" @submit="addEthnie" :validation-schema="ethnieSchema">
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
    import { Ethnie } from '@/models/Ethnie';
    import { useRouter } from 'vue-router';
    
    export default {
      name: "AddEthnieModal",
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
      emits: ["refreshEthnies",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const ethnieSchema = Yup.object().shape({
          description: Yup.string().required('La ethnie est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
        });
    
    
        const ethnienew = ref(props.id);
        const ethnieForm =  ref<Ethnie | null>(null);
        const addEthnieModalRef = ref<null | HTMLElement>(null);
        let ethnies= ref<Array<Ethnie>>([]);
        const title = ref('Ajouter une ethnie');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getEthnie(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getEthnie = async (id: number) => {
          return ApiService.get("/ethnies/"+id)
          .then(({ data }) => {
            ethnieForm.value?.setFieldValue("id",data.data.id);
            ethnieForm.value?.setFieldValue("libelle",data.data.libelle);
            ethnieForm.value?.setFieldValue("description",data.data.description);
            emit('openmodal', addEthnieModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier la ethnie";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter une ethnie";
             btntext.value = "Ajouter";
          }
        }
    
        const addEthnie = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Ethnie;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/ethnies/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addEthnieModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshEthnies");
                router.push('/ethnies/liste-ethnie');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/ethnies",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addEthnieModalRef.value);
                //router.push('/ethnies/liste-ethnie');
                emit("refreshEthnies");
    
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
    
        return {ethnies, title,btntext, resetValue, ethnieSchema,
           addEthnie, ethnieForm,addEthnieModalRef,ethnienew,
           //refreshEthnies
           };
      },
    };
    </script>@/models/Ethnie