<template>

    <div class="modal fade" id="AddEmplacementModal" tabindex="-1" role="dialog" ref="addEmplacementModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="emplacementForm" @submit="addEmplacement" :validation-schema="emplacementSchema">
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
                          <div class="col-md-12 mb-3">
                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black mb-10">
                              Type d'emplacement <span class="text-danger">*</span>
                            </label>
                            <Field name="typeEmplacement" type="text" v-slot="{ field }">
                            <Multiselect v-model="field.value" v-bind="field" :options="typeEmplacementOptions" :preserve-search="true"
                              :multiple="false" :searchable="true" placeholder="Sélectionner le type d'emplacement"
                              label="label" track-by="label" />
                            </Field>
                            <ErrorMessage name="typeEmplacement" class="text-danger" />
                          </div>
                        </div>
                        <div class="col-md-12 mb-3">
                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black mb-10">
                              Emplacement <span class="text-danger">*</span>
                            </label>
                            <Field name="emplacement" type="text" v-slot="{ field }">
                            <Multiselect v-model="field.value" v-bind="field" :options="emplacementOptions" :preserve-search="true"
                              :multiple="false" :searchable="true" placeholder="Sélectionner l'emplacement"
                              label="label" track-by="label" />
                            </Field>
                            <ErrorMessage name="emplacement" class="text-danger" />
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
    import { ref, watch, onMounted } from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import ApiService from '@/services/ApiService';
    import { error, hideModal, success } from '@/utils/utils';
    import { Emplacement } from '@/models/Emplacement';
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
    
    export default {
      name: "AddEmplacementModal",
      components: {
        Form,
        Field,
        ErrorMessage,
        Multiselect,
      },
      props:{
        id: {
          type: Number,
          required: true,
          default:0
        },
      },
      emits: ["refreshEmplacements",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const emplacementSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libellé est obligatoire'),
          description: Yup.string().required('La description est obligatoire'),
          emplacement: Yup.string().required("L'emplacement est obligatoire."),
          typeEmplacement: Yup.string().required("Le type d'emplacement est obligatoire."),

        });
    
    
        const emplacementnew = ref(props.id);
        const emplacementForm =  ref<Emplacement | null>(null);
        const addEmplacementModalRef = ref<null | HTMLElement>(null);
        let emplacements= ref<Array<Emplacement>>([]);
        const title = ref('Ajouter un emplacement');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
        const emplacementOptions = ref();
        const typeEmplacementOptions = ref();
      

        onMounted(() => {
        
        getAllTypeEmplacements();
        getAllEmplacements();

      });
  

    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getEmplacement(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getEmplacement = async (id: number) => {
          return ApiService.get("/emplacements/"+id)
          .then(({ data }) => {
            emplacementForm.value?.setFieldValue("id",data.data.id);
            emplacementForm.value?.setFieldValue("code",data.data.code);
            emplacementForm.value?.setFieldValue("libelle",data.data.libelle);
            emit('openmodal', addEmplacementModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier l'emplacement";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un emplacement";
             btntext.value = "Ajouter";
          }
        }

        const getAllTypeEmplacements = async () => {
        try{
        const response = await ApiService.get('/typeemplacements');
        const typeEmplacementsData = response.data.data.data;
        console.log('Data', typeEmplacementsData)
        typeEmplacementOptions.value = typeEmplacementsData.map((typeEmplacement) => ({
          value: typeEmplacement.id,
          label: typeEmplacement.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
      const getAllEmplacements = async () => {
        try{
        const response = await ApiService.get('/emplacements');
        const emplacementsData = response.data.data.data;
        console.log('Data', emplacementsData)
        emplacementOptions.value = emplacementsData.map((emplacement) => ({
          value: emplacement.id,
          label: emplacement.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
    
        const addEmplacement = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Emplacement;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/emplacements/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addEmplacementModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshEmplacements");
                router.push('/emplacements/liste-emplacement');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/emplacements",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addEmplacementModalRef.value);
                //router.push('/emplacements/liste-emplacement');
                emit("refreshEmplacements");
    
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
    
        return {emplacements, title,btntext, resetValue, emplacementSchema,
           addEmplacement, emplacementForm,addEmplacementModalRef,emplacementnew,typeEmplacementOptions,emplacementOptions
           //refreshEmplacements
           };
      },
    };
    </script>@/models/Emplacement