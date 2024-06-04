<template>
       <div class="modal fade" id="AddMonnaieModal" tabindex="-1" role="dialog" ref="addMonnaieModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="monnaieForm" @submit="addMonnaie" :validation-schema="monnaieSchema">
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
                                Valeur <span class="text-danger">*</span>
                              </label>
                              <Field name="valeur" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Valeur"/>
                              <ErrorMessage name="valeur" class="text-danger"/>
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
import { useRouter } from 'vue-router';
import { Monnaie } from '@/models/Monnaie';



export default {
    name: "AddMonnaieModal",
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
      emits: ["refreshMonnaies",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const monnaieSchema = Yup.object().shape({
          valeur: Yup.string().required('La valeur est obligatoire'),
          libelle: Yup.string().required('Le libelle est obligatoire'),
        });
    
    
        const monnaienew = ref(props.id);
        const monnaieForm =  ref<Monnaie | null>(null);
        const addMonnaieModalRef = ref<null | HTMLElement>(null);
        let monnaies= ref<Array<Monnaie>>([]);
        const title = ref('Ajouter une monnaie');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
    
        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getMonnaie(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getMonnaie = async (id: number) => {
          return ApiService.get("/monnaies/"+id)
          .then(({ data }) => {
            monnaieForm.value?.setFieldValue("id",data.data.id);
            monnaieForm.value?.setFieldValue("nom",data.data.libelle);
            monnaieForm.value?.setFieldValue("description",data.data.valeur);
            emit('openmodal', addMonnaieModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier la monnaie";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter une monnaie";
             btntext.value = "Ajouter";
          }
        }
    
        const addMonnaie = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as Monnaie;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/monnaies/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addMonnaieModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshMonnaies");
                router.push('/monnaies/liste-monnaie');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/monnaies",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addMonnaieModalRef.value);
                //router.push('/monnaies/liste-monnaie');
                emit("refreshMonnaies");
    
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
    
        return {monnaies, title,btntext, resetValue, monnaieSchema,
           addMonnaie, monnaieForm,addMonnaieModalRef,monnaienew,
           //refreshMonnaies
           };
      },
};

</script>