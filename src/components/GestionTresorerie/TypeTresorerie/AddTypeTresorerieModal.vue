<template>

  <div class="modal fade" id="AddTypeTresorerieModal" tabindex="-1" role="dialog" ref="addTypeTresorerieModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">{{ title }}</h4>
                      <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Form ref="typeTresorerieForm" @submit="addTypeTresorerie" :validation-schema="typeTresorerieSchema">
                      <div class="row">


                   <div class="form-group mb-15 mb-sm-20 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Catégorie <span class="text-danger"></span>
                </label>
                <Field name="typeTresorerieParent" v-model="typeTresorerieParent" type="text" v-slot="{ field }">
                    <Multiselect
                      v-model="field.value"
                      v-bind="field"
                      :options="typesTresorerieParentsOptions"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner la catégorie"
                      label="label"
                      track-by="label"
                    />
                </Field>
                <ErrorMessage name="typeTresorerieParent" class="text-danger" />
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
  import { ref, watch, onMounted, } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';
  import ApiService from '@/services/ApiService';
  import { error, hideModal, success } from '@/utils/utils';
  import { TypeTresorerie} from '@/models/TypeTresorerie';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import Multiselect from '@vueform/multiselect/src/Multiselect';


  
  export default {
    name: "AddTypeTresorerieModal",
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
    emits: ["refreshTypes",'openmodal'],
  
    setup: (props:any, { emit }: { emit: Function }) => {
  
      const loading = ref<boolean>(false);
      const typeTresorerieSchema = Yup.object().shape({
        libelle: Yup.string().required('Le libelle est obligatoire'),
        code: Yup.string().required('Le code est obligatoire'),
      typeTresorerieParent: Yup.string().notRequired(),
      });
  
  
      const typeTresorerienew = ref(props.id);
      const typeTresorerieForm =  ref<TypeTresorerie | null>(null);
      const addTypeTresorerieModalRef = ref<null | HTMLElement>(null);
      let typeTresoreries= ref<Array<TypeTresorerie>>([]);
      const typeTresorerieParentOptions = ref([]);
      const title = ref('Ajouter un type tresorerie');
      const btntext = ref('Ajouter');
      const isupdate=ref(false);
      const router = useRouter();
    const typeTresorerieParent= ref();
    const typesTresorerieParentsOptions = ref([]);
    const typesTresorerieParents = ref();
  
    onMounted(() => {
      fetchTypeTresorerieParent ();
      getAllTypeTresorerieParents();
    });
      watch(() => props.id , (newValue) => {   
        if (newValue!=0) {
          getTypeTresorerie(newValue);
          isupdate.value=true;
        }
        btnTitle();
      });
  
      const getTypeTresorerie = async (id: number) => {
  return ApiService.get("/typeTresoreries/" + id)
    .then(({ data }) => {
      console.log("Données récupérées: ", data);
      const donnees = data.data;

      // Mapper les données dans le formulaire
      for (const key in donnees) {
        typeTresorerieForm.value?.setFieldValue(
          key,
          typeof donnees[key] === "object" && donnees[key] !== null
            ? donnees[key].id 
            : donnees[key]  
        );
      }

      if (donnees.typeTresorerieParent) {
        typeTresorerieForm.value?.setFieldValue(
          "typeTresorerieParent",
          donnees.typeTresorerieParent.id
        );
      }

      emit("openmodal", addTypeTresorerieModalRef.value);
    })
    .catch(({ response }) => {
      console.error("Erreur lors de la récupération: ", response);
      error(response.data.message);
    });
};

  
      const btnTitle = async () => {
        if (isupdate.value) {
           title.value = "Modifier le type tresorerie";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter une type tresorerie";
           btntext.value = "Ajouter";
        }
      }
  
      const addTypeTresorerie = async (values:any, {resetForm}: {resetForm: () => void  }) => {
        values = values as TypeTresorerie;
        loading.value = false;
        if(isupdate.value) {
          ApiService.put(`/typeTresoreries/${values.id}`,values)
          .then(({ data }) => {
            if(data.code == 200) { 
              success(data.message);
              resetForm();
              hideModal(addTypeTresorerieModalRef.value);
              isupdate.value=false;
              btnTitle();
              emit("refreshTypeTresoreries");
              router.push('/typeTresoreries/liste-typeTresoreries');
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
        }else{
          ApiService.post("/typeTresoreries",values)
          .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message)
              resetForm();
              hideModal(addTypeTresorerieModalRef.value);
              emit("refreshTypeTresoreries");
  
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
        }
      }; 

   
    
    const fetchTypeTresorerieParent = async () => {
      try {
        const response = await ApiService.get("/all/typeTresoreries");
        console.log("TYTTTTTTTt )) ===> ",response);
        const typeTresorerieParentData = response.data.data;
        typeTresorerieParentOptions.value = typeTresorerieParentData.map(
          (typeTresorerieParent) => ({
            value: typeTresorerieParent.id,
            label: `${typeTresorerieParent.libelle}`,
          })
        );
      } catch (error) {
        //
      }
    };

    const getAllTypeTresorerieParents = async () => {
      try {
        const response = await ApiService.get("/all/typeTresoreries");
        const typeTresorerieParentsData = response.data.data.data;
        console.log("Data zzzzzzzzzzz ", response);
        typesTresorerieParentsOptions.value = typeTresorerieParentsData.map(
          (typeTresorerieParent) => ({
            value: typeTresorerieParent.id,
            label: typeTresorerieParent.libelle,
          })
        );
      } catch (error) {
        //error(response.data.message)
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
  
    
      return {typeTresoreries, title,btntext, resetValue, typeTresorerieSchema,
         addTypeTresorerie, typeTresorerieForm,addTypeTresorerieModalRef,typeTresorerienew,typeTresorerieParentOptions,typeTresorerieParent, typesTresorerieParentsOptions
         //refreshReligions
         };
    },
  };
  </script>@/models/TypeTresorerie