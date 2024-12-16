<template>
    <div class="modal fade" id="AddUserEtapesModal" tabindex="-1" role="dialog" ref="addUserEtapesModalRef" aria-labelledby="tooltipmodal" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h4 class="modal-title">{{ title }}</h4>
                          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
            <Form ref="userEtapesForm" @submit="addUserEtapes" :validation-schema="userEtapesSchema">
              <div class="row">
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10" >
                    UserId <span class="text-danger">*</span>
                  </label>
                  <Field name="userId" type="text" 
                  class="form-control shadow-none fs-md-15 text-black" placeholder="Entrer le userId"/>
                  <ErrorMessage name="userId" class="text-danger"/>
                </div>
              </div>

              
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Etape Validation <span class="text-danger">*</span>
                  </label>
                  <Field name="etapevalidation" v-slot="{ field }">
                    <Multiselect v-model="field.value" v-bind="field" :options="etapeValidationOptions"
                      :preserve-search="true" :multiple="false" :searchable="true"
                      placeholder="Sélectionner l'etape de validation" label="label" track-by="label" />
                  </Field>
                  <ErrorMessage name="etapevalidation" class="text-danger" />
                </div>
              </div>
           
              
              <button
                class="btn btn-primary mt-3"
              >
              {{ btntext }}
              </button>
        </div>
          </Form>
          </div>
          <!-- <button
            type="button"
            class="btn-close shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="resetValue()"
          ></button> -->
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch, onMounted } from 'vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import ApiService from '@/services/ApiService';
  import * as Yup from 'yup';
  import { hideModal } from '@/utils/utils';
  import {UserEtapes} from '@/models/UserEtapes';
  import { error , success } from '@/utils/utils';
  import { useRouter } from 'vue-router';
  import Multiselect from '@vueform/multiselect/src/Multiselect';

  
  export default defineComponent({
      name: "AddUserEtapesModal",
      components: {
      Form,
      Field,
      ErrorMessage,
      Multiselect
    },
    props: {
      item: {
        type: Number,
        default: 0,
      }
    },
    setup(props, { emit }){
      const userEtapesSchema = Yup.object().shape({
        userId: Yup.string().required('Le libellé est obligatoire'),
  
      });
  
      const userEtapesForm = ref<UserEtapes | null>(null);
      const addUserEtapesModalRef = ref<null | HTMLElement>(null);
      const router = useRouter();
      const userEtapesOptions = ref([]);
      // const item = ref({ ...props.item });
      const localItem = ref(props.item);
      const isUPDATE = ref(false);
      const etapeValidationOptions = ref();
      const title = ref("Ajouter un UserEtapes");
      const btntext = ref('Ajouter');
  
      watch(() => props.item, (newValue) => {
        getUserEtapes(newValue);
        isUPDATE.value = true;
        btnTitle();
      });
  
      const btnTitle = async () => {
        if (isUPDATE.value) {
           title.value = "Modifier une étape";
           btntext.value = "Modifier";
        }else{
           title.value = "Ajouter une étape";
           btntext.value = "Ajouter";
        }
      }
  
      const getUserEtapes = async (id: number) => {
        return ApiService.get("/userEtapes/"+id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            userEtapesForm.value?.setFieldValue(key, 
            (typeof donnees[key] === 'object' && donnees[key] !== null)? donnees[key].id :donnees[key]
            );
          }
          emit('openmodal', addUserEtapesModalRef.value);
        
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
      }
  
      const fetchUserEtapes = async () => {
        try {
          const response = await ApiService.get('/userEtapes');
          const userEtapesData = response.data.data.data;
          userEtapesOptions.value = userEtapesData.map((userEtapes) => ({
            value: userEtapes.id,
            label: `${userEtapes.codeUserEtapes} - ${userEtapes.libelleUserEtapes}`,
          }));
        } catch (error) {
          //
        }
      };
  
      onMounted(() => {
          fetchUserEtapes();
          getAllEtapeValidations();

      });


      const getAllEtapeValidations = async () => {
      try {
        const response = await ApiService.get('/all/etapeValidations');
        const etapeValidationsData = response.data.data.data;
        console.log('Data', etapeValidationsData)
        etapeValidationOptions.value = etapeValidationsData.map((etapeValidation) => ({
          value: etapeValidation.id,
          label: etapeValidation.statut,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }
     
  
      const addUserEtapes = async (values: any, userEtapesForm) => {
        values = values as UserEtapes;
        if(isUPDATE.value){
          ApiService.put("/userEtapes/"+values.id,values)
          .then(({ data }) => {
              if(data.code == 200) { 
                success(data.message);
                userEtapesForm.resetForm();
                hideModal(addUserEtapesModalRef.value);
                isUPDATE.value=false;
                btnTitle();
                emit('close');
              }
          })
          .catch(({ response }) => {
              error(response.data.message);
          });
        }else{
          console.log('values',values)
          ApiService.post("/userEtapes",values)
          .then(({ data }) => {
              if(data.code == 201) { 
                success(data.message);
                userEtapesForm.resetForm();
                hideModal(addUserEtapesModalRef.value);
                emit('close');
              }
          })
          .catch(({ response }) => {
              error(response.data.message);
          });
        }
      };
  
      const resetValue = () => {
        const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
          isUPDATE.value=false;
        formFields.forEach(field => {
          field.value = '';
        });
        btnTitle()
      };
  
      return { userEtapesSchema,
        addUserEtapesModalRef,
        addUserEtapes,
        userEtapesForm,
        title,btntext,resetValue,
        userEtapesOptions,
        etapeValidationOptions
      };
    },
  });
  </script>@/models/CategorieInfo