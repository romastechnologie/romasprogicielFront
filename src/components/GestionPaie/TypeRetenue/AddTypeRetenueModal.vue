<template>

    <div class="modal fade" id="AddTypeRetenueModal" tabindex="-1" role="dialog" ref="addTypeRetenueModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{ title }}</h4>
                        <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <Form ref="typeRetenueForm" @submit="addTypeRetenue" :validation-schema="typeRetenueSchema">
                        <div class="row">
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Nom <span class="text-danger">*</span>
                              </label>
                              <Field name="nomRetenue" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le nomRetenue"/>
                              <ErrorMessage name="nomRetenue" class="text-danger"/>
                            </div>
                          </div>
                     <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type de valeur <span class="text-danger">*</span>
                  </label>
                  <Field  name="typeDeValeur"  type="text" v-model="typeC" v-slot="{ field }">
                    <Multiselect
                    :searchable = "true"
                    :options = "['%', 'MT']"
                    v-model = "field.value"
                    v-bind = "field"
                    placeholder="Sélectionner le type"
                    />
                  </Field>
                  <ErrorMessage name="typeDeValeur" class="text-danger"/>
                </div>
              </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                               Valeur<span class="text-danger">*</span>
                              </label>
                              <Field name="valeur" type="text" 
                              class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer la valeur"/>
                              <ErrorMessage name="valeur" class="text-danger"/>
                            </div>
                          </div>
                          <div class="col-md-12 mb-3">
                            <div class="form-group mb-15 mb-sm-20 mb-md-25">
                              <label class="d-block text-black fw-semibold mb-10">
                                Description <span class="text-danger">*</span>
                              </label>
                              <Field name="description" cols="20"
                              rows="12" as="textarea" placeholder="Description" v-slot="{ field}" class="form-control shadow-none rounded-0 text-black">
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
    import { TypeRetenue } from '@/models/TypeRetenue';
    import { useRouter } from 'vue-router';
    import Multiselect from '@vueform/multiselect'
    
    export default {
      name: "AddTypeRetenueModal",
      components: {
        Form,
        Field,
        ErrorMessage,
        Multiselect
      },
      props:{
        id: {
          type: Number,
          required: true,
          default:0
        },
      },
      emits: ["refreshTypeRetenues",'openmodal'],
    
      setup: (props:any, { emit }: { emit: Function }) => {
    
        const loading = ref<boolean>(false);
        const typeRetenueSchema = Yup.object().shape({
          description: Yup.string().required('La description est obligatoire'),
          nomRetenue: Yup.string().required('Le nom de la retenue est obligatoire'),
          typeDeValeur: Yup.string().required('Le type de la valeur est obligatoire'),
          valeur: Yup.number().typeError('Veuillez entrer des chiffres').when([], (value, schema) => {
          return !valeurM.value
            ? schema.max(100, 'La valeur ne peut pas être supérieure à 100').required("La valeur est obligatoire")
            : schema.notRequired()
          }),
        });
    
    
        const typeRetenuenew = ref(props.id);
        const typeRetenueForm =  ref<TypeRetenue | null>(null);
        const addTypeRetenueModalRef = ref<null | HTMLElement>(null);
        let typeRetenues= ref<Array<TypeRetenue>>([]);
        const title = ref('Ajouter un type de retenue');
        const btntext = ref('Ajouter');
        const isupdate=ref(false);
        const router = useRouter();
        const typeC = ref(null);
        const valeurM = ref(false);
        const disable = ref(true);

        watch(typeC, (newVal) => {
          disable.value = newVal !== "%" && newVal !== "MT";
          valeurM.value = newVal !== "%";
        });

        watch(() => props.id , (newValue) => {   
          if (newValue!=0) {
            getTypeRetenue(newValue);
            isupdate.value=true;
          }
          btnTitle();
        });
    
        const getTypeRetenue = async (id: number) => {
          return ApiService.get("/typeRetenues/"+id)
          .then(({ data }) => {
            typeRetenueForm.value?.setFieldValue("id",data.data.id);
            typeRetenueForm.value?.setFieldValue("nomRetenue",data.data.nomRetenue);
            typeRetenueForm.value?.setFieldValue("description",data.data.description);
            typeRetenueForm.value?.setFieldValue("valeur",data.data.valeur);
            typeRetenueForm.value?.setFieldValue("typeDeValeur",data.data.typeDeValeur);
            emit('openmodal', addTypeRetenueModalRef.value);
          })
          .catch(({ response }) => {
            error(response.data.message)
          });
        }
    
        const btnTitle = async () => {
          if (isupdate.value) {
             title.value = "Modifier le TypeRetenue";
             btntext.value = "Modifier";
          }else{
             title.value = "Ajouter un TypeRetenue";
             btntext.value = "Ajouter";
          }
        }
    
        const addTypeRetenue = async (values:any, {resetForm}: {resetForm: () => void  }) => {
          values = values as TypeRetenue;
          loading.value = false;
          if(isupdate.value) {
            ApiService.put(`/typeRetenues/${values.id}`,values)
            .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                resetForm();
                hideModal(addTypeRetenueModalRef.value);
                isupdate.value=false;
                btnTitle();
                emit("refreshTypeRetenues");
                router.push('/typeRetenues/liste-TypeRetenue');
              }
            }).catch(({ response }) => {
              error(response.message);
            });
          }else{
            ApiService.post("/typeRetenues",values)
            .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message)
                resetForm();
                hideModal(addTypeRetenueModalRef.value);
                //router.push('/typeRetenues/liste-TypeRetenue');
                emit("refreshTypeRetenues");
    
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
    
        return {typeRetenues, title,btntext, resetValue, typeRetenueSchema,
           addTypeRetenue, typeRetenueForm,addTypeRetenueModalRef,typeRetenuenew,
           typeC,valeurM,disable,
           };
      },
    };
    </script>@/models/TypeRetenue