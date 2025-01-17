<template>

  <div class="modal fade" id="AddTypesDepensesModal" tabindex="-1" role="dialog" ref="addTypesDepensesModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">{{ title }}</h4>
                      <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Form ref="typedepenseForm" @submit="addTypeDepense" :validation-schema="typedepenseSchema">
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
                            <Field name="description" type="text" 
                            class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le description"/>
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
  import { TypeDepense} from '@/models/TypeDepense';
  import { useRouter } from 'vue-router';
  
  export default {
    name: "AddTypesDepensesModal",
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
    emits: ["refreshTypesDepenses",'openmodal'],
  
    setup: (props:any, { emit }: { emit: Function }) => {
  
      const loading = ref<boolean>(false);
      const typedepenseSchema = Yup.object().shape({
        //description: Yup.string().required('La religion est obligatoire'),
        libelle: Yup.string().required('Le libelle est obligatoire'),
        description: Yup.string().required('Le description est obligatoire'),

      });
  
      const typedepensenew = ref(props.id);
      const typedepenseForm =  ref<TypeDepense | null>(null);
      const addTypesDepensesModalRef = ref<null | HTMLElement>(null);
      let typesdepenses= ref<Array<TypeDepense>>([]);
      const title = ref('Ajouter un type de depense');
      const btntext = ref('Ajouter');
      const isupdate=ref(false);
      const router = useRouter();
  
      watch(() => props.id , (newValue) => {   
        if (newValue!=0) {
          getTypeDepense(newValue);
          isupdate.value=true;
        }
        btnTitle();
      });
  
      const getTypeDepense = async (id: number) => {
        return ApiService.get("/typesDepenses/"+id)
        .then(({ data }) => {
          typedepenseForm.value?.setFieldValue("id",data.data.id);
          typedepenseForm.value?.setFieldValue("libelle",data.data.libelle);
          typedepenseForm.value?.setFieldValue("code", data.data.description);
          emit('openmodal', addTypesDepensesModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
      }
  
      const btnTitle = async () => {
        if (isupdate.value) {
           title.value = "Modifier le type de dépense";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter un type de depense";
           btntext.value = "Ajouter";
        }
      }
  
      const addTypeDepense = async (values:any, {resetForm}: {resetForm: () => void  }) => {
        values = values as TypeDepense;
        loading.value = false;
        if(isupdate.value) {
          ApiService.put(`/typesDepenses/${values.id}`,values)
          .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              resetForm();
              hideModal(addTypesDepensesModalRef.value);
              isupdate.value=false;
              btnTitle();
              emit("refreshTypesDepenses");
              router.push('/typesdepenses/liste-typesdepenses');
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
        }else{
          ApiService.post("/typesDepenses",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message)
              resetForm();
              hideModal(addTypesDepensesModalRef.value);
              emit("refreshTypesDepenses");
  
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
  
      return {typesdepenses, title,btntext, resetValue, typedepenseSchema,
         addTypeDepense, typedepenseForm,addTypesDepensesModalRef,typedepensenew,
         //refreshReligions
         };
    },
  };
  </script>@/models/TypeDepense