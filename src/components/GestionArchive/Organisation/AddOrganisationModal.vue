<template>

    <div class="modal fade" id="AddOrganisationModal" tabindex="-1" role="dialog" ref="addOrganisationModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="organisationForm" @submit="addOrganisation" :validation-schema="organisationSchema">
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
                                Nom<span class="text-danger">*</span>
                              </label>
                              <Field name="nom" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nom"/>
                              <ErrorMessage name="nom" class="text-danger"/>
                            </div>
                          </div>

                          
                          <div class="col-md-12 mb-3">
                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black mb-10">
                              Organiation <span class="text-danger">*</span>
                            </label>
                            <Field name="organisation" type="text" v-slot="{ field }">
                            <Multiselect v-model="field.value" v-bind="field" :options="organisationOptions" :preserve-search="true"
                              :multiple="false" :searchable="true" placeholder="Sélectionner l'organisation"
                              label="label" track-by="label" />
                            </Field>
                            <ErrorMessage name="organisation" class="text-danger" />
                          </div>
                        </div>

                            
                          <div class="col-md-12 mb-3">
                          <div class="form-group mb-15 mb-sm-20 mb-md-25">
                            <label class="d-block text-black mb-10">
                              Type d'organisation <span class="text-danger">*</span>
                            </label>
                            <Field name="typeorganisation" type="text" v-slot="{ field }">
                            <Multiselect v-model="field.value" v-bind="field" :options="typeOrganisationOptions" :preserve-search="true"
                              :multiple="false" :searchable="true" placeholder="Sélectionner le type d'organisation"
                              label="label" track-by="label" />
                            </Field>
                            <ErrorMessage name="typeorganisation" class="text-danger" />
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
    import { Organisation } from '@/models/Organisation';
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
    
    export default {
      name: "AddOrganisationModal",
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
      emits: ["refreshOrganisations",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const organisationSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          nom: Yup.string().required('Le nom est obligatoire'),
          organisation: Yup.string().required("L'organisation est obligatoire."),
          typeorganisation: Yup.string().required("Le type d'organisation est obligatoire."),

        });
    
    
        const organisationnew = ref(props.id);
        const organisationForm =  ref<Organisation | null>(null);
        const addOrganisationModalRef = ref<null | HTMLElement>(null);
        let organisations= ref<Array<Organisation>>([]);
        const title = ref('Ajouter une organisation');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
        const typeOrganisationOptions = ref();
        const typeOrganisation = ref();
        const organisationOptions = ref();
        const organisation = ref();


      
    

        onMounted(() => {
        
        getAllTypeOrganisations();
        getAllOrganisations();


      });
  
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getOrganisation(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getOrganisation = async (id: number) => {
          return ApiService.get("/organisations/"+id)
          .then(({ data }) => {
            organisationForm.value?.setFieldValue("id",data.data.id);
            organisationForm.value?.setFieldValue("code",data.data.code);
            organisationForm.value?.setFieldValue("nom",data.data.nom);
            organisationForm.value?.setFieldValue("organisation",data.data.organisation);
            organisationForm.value?.setFieldValue("typeOrganisation",data.data.typeOrganisation);
            emit('openmodal', addOrganisationModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier l'organisation";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter une organisation";
             btntext.value = "Ajouter";
          }
        }


        const getAllOrganisations = async () => {
        try{
        const response = await ApiService.get('/all/organisations');
        const organisationsData = response.data.data.data;
        console.log('Data', organisationsData)
        organisationOptions.value = organisationsData.map((organisation) => ({
          value: organisation.id,
          label: organisation.nom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }

        const getAllTypeOrganisations = async () => {
        try{
        const response = await ApiService.get('/all/typeOrganisations');
        const typeOrganisationsData = response.data.data.data;
        console.log('Data', typeOrganisationsData)
        typeOrganisationOptions.value = typeOrganisationsData.map((typeOrganisation) => ({
          value: typeOrganisation.id,
          label: typeOrganisation.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
    
     


        const addOrganisation = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Organisation;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/organisations/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addOrganisationModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshOrganisations");
                router.push('/organisations/liste-organisation');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/organisations",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addOrganisationModalRef.value);
                //router.push('/organisations/liste-organisation');
                emit("refreshOrganisations");
    
              }
            }).catch(({ response }) => {
              console.log('bonjour',response)
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
    
        return {organisations, title,btntext, resetValue, organisationSchema,
           addOrganisation, organisationForm,addOrganisationModalRef,organisationnew,typeOrganisation,organisation,typeOrganisationOptions,organisationOptions,
           //refreshOrganisations
           };
      },
    };
    </script>@/models/Organisation