<template>

  <div class="modal fade" id="AddPosteModal" tabindex="-1" role="dialog" ref="addPosteModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="poste">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">{{ title }}</h4>
                      <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Form ref="posteForm" @submit="addPoste" :validation-schema="posteSchema">
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
  import { Poste} from '@/models/Poste';
  import { useRouter } from 'vue-router';
  
  export default {
    name: "AddPosteModal",
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
    emits: ["refreshPostes",'openmodal'],
  
    setup: (props:any, { emit }: { emit: Function }) => {
      const loading = ref<boolean>(false);
      const posteSchema = Yup.object().shape({
        //description: Yup.string().required('La religion est obligatoire'),
        libelle: Yup.string().required('Le libelle est obligatoire'),
        code: Yup.string().required('Le code est obligatoire'),

      });
      const postenew = ref(props.id);
      const posteForm =  ref<Poste | null>(null);
      const addPosteModalRef = ref<null | HTMLElement>(null);
      let postes= ref<Array<Poste>>([]);
      const title = ref('Ajouter un poste');
      const btntext = ref('Ajouter');
      const isupdate=ref(false);
      const router = useRouter();
  
      watch(() => props.id , (newValue) => {   
        if (newValue!=0) {
          getPoste(newValue);
          isupdate.value=true;
        }
        btnTitle();
      });
  
      const getPoste = async (id: number) => {
        return ApiService.get("/postes/"+id)
        .then(({ data }) => {
          posteForm.value?.setFieldValue("id",data.data.id);
          posteForm.value?.setFieldValue("libelle",data.data.libelle);
          posteForm.value?.setFieldValue("code", data.data.code);
          emit('openmodal', addPosteModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
      }
  
      const btnTitle = async () => {
        if (isupdate.value) {
           title.value = "Modifier le poste";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter une poste";
           btntext.value = "Ajouter";
        }
      }
  
      const addPoste = async (values:any, {resetForm}: {resetForm: () => void  }) => {
        values = values as Poste;
        loading.value = false;
        if(isupdate.value) {
          ApiService.put(`/postes/${values.id}`,values)
          .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              resetForm();
              hideModal(addPosteModalRef.value);
              isupdate.value=false;
              btnTitle();
              emit("refreshPostes");
              router.push('/postes/liste-poste');
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
        }else{
          ApiService.post("/postes",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message)
              resetForm();
              hideModal(addPosteModalRef.value);
              emit("refreshPostes");
  
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
  
      return {postes, title,btntext, resetValue, posteSchema,
         addPoste, posteForm,addPosteModalRef,postenew,
         //refreshReligions
         };
    },
  };
  </script>@/models/Poste