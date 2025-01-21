<template>
  <div class="modal fade" id="AddReligionModal" tabindex="-1" role="dialog" ref="addReligionModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">{{ title }}</h4>
                      <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Form ref="religionForm" @submit="addReligion" :validation-schema="religionSchema">
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
  import { Religion} from '@/models/Religion';
  import { useRouter } from 'vue-router';
  
  export default {
    name: "AddReligionModal",
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
    emits: ["refreshReligions",'openmodal'],
  
    setup: (props:any, { emit }: { emit: Function }) => {
  
      const loading = ref<boolean>(false);
      const religionSchema = Yup.object().shape({
        libelle: Yup.string().required('Le libelle est obligatoire'),

      });
  
  
      const religionnew = ref(props.id);
      const religionForm =  ref<Religion | null>(null);
      const addReligionModalRef = ref<null | HTMLElement>(null);
      let religions= ref<Array<Religion>>([]);
      const title = ref('Ajouter une religion');
      const btntext = ref('Ajouter');
      const isupdate=ref(false);
      const router = useRouter();
  
      watch(() => props.id , (newValue) => {   
        if (newValue!=0) {
          getReligion(newValue);
          isupdate.value=true;
        }
        btnTitle();
      });
  
      const getReligion = async (id: number) => {
        return ApiService.get("/religions/"+id)
        .then(({ data }) => {
          religionForm.value?.setFieldValue("id",data.data.id);
          religionForm.value?.setFieldValue("libelle",data.data.libelle);
          emit('openmodal', addReligionModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
      }
      const btnTitle = async () => {
        if (isupdate.value) {
           title.value = "Modifier la religion";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter une religion";
           btntext.value = "Ajouter";
        }
      }
  
      const addReligion = async (values:any, {resetForm}: {resetForm: () => void  }) => {
        values = values as Religion;
        loading.value = false;
        if(isupdate.value) {
          ApiService.put(`/religions/${values.id}`,values)
          .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              resetForm();
              hideModal(addReligionModalRef.value);
              isupdate.value=false;
              btnTitle();
              emit("refreshReligions");
             // router.push('/religions/liste-religions');
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
        }else{
          ApiService.post("/religions",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message)
              resetForm();
              hideModal(addReligionModalRef.value);
              emit("refreshReligions");
  
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
  
      return {religions, title,btntext, resetValue, religionSchema,
         addReligion, religionForm,addReligionModalRef,religionnew,
         //refreshReligions
         };
    },
  };
  </script>@/models/Religion