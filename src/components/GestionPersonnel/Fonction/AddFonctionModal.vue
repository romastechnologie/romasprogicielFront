<template>

    <div class="modal fade" id="AddFonctionModal" tabindex="-1" role="dialog" ref="addFonctionModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="fonctionForm" @submit="addFonction" :validation-schema="fonctionSchema">
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
    import { ref, watch,onMounted } from 'vue';
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import * as Yup from 'yup';
    import ApiService from '@/services/ApiService';
    import { error, hideModal, success } from '@/utils/utils';
    import { Fonction } from '@/models/Fonction';
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect/src/Multiselect';
    
    export default {
      name: "AddFonctionModal",
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
      emits: ["refreshFonctions",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const fonctionSchema = Yup.object().shape({
          code: Yup.string().required('Le code est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
          Fonction: Yup.string().notRequired(),

         
        });
    
    
        const fonctionnew = ref(props.id);
        const fonctionForm =  ref<Fonction | null>(null);
        const addFonctionModalRef = ref<null | HTMLElement>(null);
        let fonctions= ref<Array<Fonction>>([]);
        const title = ref("Ajouter une fonction");
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();

        const fonctionOptions = ref();
        const Fonction = ref();

        

        onMounted(() => {

        getAllFonctions();
      
      });


    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getFonction(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getFonction = async (id: number) => {
          return ApiService.get("/fonctions/"+id)
          .then(({ data }) => {
            fonctionForm.value?.setFieldValue("id",data.data.id);
            fonctionForm.value?.setFieldValue("code",data.data.code);
            fonctionForm.value?.setFieldValue("libelle",data.data.libelle);
            emit('openmodal', addFonctionModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier la fonction";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un fonction";
             btntext.value = "Ajouter";
          }
        }



        const getAllFonctions = async () => {
        try{
        const response = await ApiService.get('/all/fonctions');
        const fonctionsData = response.data.data.data;
        console.log('Data', fonctionsData)
        fonctionOptions.value = fonctionsData.map((Fonction) => ({
          value: Fonction.id,
          label: Fonction.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      }
    
        const addFonction = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Fonction;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/fonctions/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addFonctionModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshFonctions");
                router.push('/fonctions/liste-Fonction');
              }
            }).catch(({ response }) => {
              error(response.data.message);
            });
          }else{
            ApiService.post("/fonctions",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addFonctionModalRef.value);
                //router.push('/fonctions/liste-Fonction');
                emit("refreshFonctions");
    
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
    
        return {fonctions, title,btntext, resetValue, fonctionSchema,
           addFonction, fonctionForm,addFonctionModalRef,fonctionnew,Fonction,fonctionOptions,
           //refreshFonctions
           };
      },
    };
    </script>@/models/Fonction