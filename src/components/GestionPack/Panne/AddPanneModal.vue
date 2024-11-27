<template>
    <div class="modal fade" id="AddPanneModal" tabindex="-1" role="dialog" ref="addPanneModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="panneForm" @submit="addPanne" :validation-schema="panneSchema">
                        <div class="row">
        
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Libelle<span class="text-danger">*</span>
                                    </label>
                                    <Field name="libelle" type="text"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Entrer le libelle" />
                                    <ErrorMessage name="libelle" class="text-danger" />
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Description <span class="text-danger">*</span>
                                    </label>
                                    <Field name="description" cols="20" rows="2" as="textarea"
                                        placeholder="Description" v-slot="{ field }"
                                        class="form-control shadow-none rounded-0 text-black">
                                        <textarea v-model="field.value"
                                            class="form-control shadow-none rounded-0 text-black"></textarea>
                                    </Field>
                                    <ErrorMessage name="description" class="text-danger" />
                                </div>
                            </div>
                            <div class="col-md-12 mb-4">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black mb-10">
                                        Bien <span class="text-danger"></span>
                                    </label>
                                 <Field name="bien" v-model="biens" type="text" v-slot="{ field }">
                                    <Multiselect v-model="field.value" v-bind="field" :options="bienOptions" :preserve-search="true"
                                     :multiple="false" :searchable="true" placeholder="Sélectionner le bien "
                                      label="label" track-by="label" />
                                  </Field>
                                    
                                </div>
                            </div>

                            <button class="btn btn-primary" type="submit">
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
import { ref, watch, onMounted} from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Panne } from '@/models/Panne';
import { useRouter } from 'vue-router';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default {
    name: "AddPanneModal",
    components: {
        Form,
        Field,
        Multiselect,
        ErrorMessage
    },
    props: {
        id: {
            type: Number,
            required: true,
            default: 0
        },
    },
    emits: ["refreshPannes", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const panneSchema = Yup.object().shape({
            //code: Yup.string().required('Le code est obligatoire'),
            libelle: Yup.string().required('Le libelle est obligatoire'),
            description: Yup.string().required('La description est obligatoire'),
            bien: Yup.string().required('Le bien est obligatoire'),

        });


        const pannenew = ref(props.id);
        const panneForm = ref<Panne | null>(null);
        const addPanneModalRef = ref<null | HTMLElement>(null);
        let pannes = ref<Array<Panne>>([]);
        const title = ref('Ajouter une panne');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const biens = ref();
        const bienOptions = ref([]);
      

        onMounted(() => {
        getAllBiens();
      });
  

        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getPanne(newValue);
                isupdate.value = true;
                getAllBiens();
            }
            btnTitle();
        });

        const getPanne = async (id: number) => {
  return ApiService.get("/pannes/" + id)
    .then(({ data }) => {
      console.log("Données récupérées: ", data);
      const donnees = data.data;

      // Mapper les données dans le formulaire
      for (const key in donnees) {
        panneForm.value?.setFieldValue(
          key,
          typeof donnees[key] === "object" && donnees[key] !== null
            ? donnees[key].id 
            : donnees[key]  
        );
      }

      if (donnees.bien) {
        panneForm.value?.setFieldValue(
          "bien",
          donnees.bien.id
        );
      }

      emit("openmodal", addPanneModalRef.value);
    })
    .catch(({ response }) => {
      console.error("Erreur lors de la récupération: ", response);
      error(response.data.message);
    });
};
        


        const getAllBiens= async () => {
          try{
          const response = await ApiService.get('/all/biens');
          const biensData = response.data.data.data;
          console.log("bien", biensData);
          bienOptions.value = biensData.map((bien) => ({
            value: bien.id,
            label: bien.nomBien,
          }));
          }
          catch(error){
            //error(response.data.message)
          }
        } 
    

        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier la panne";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter une panne";
                btntext.value = "Ajouter";
            }
        }

        const addPanne = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as Panne;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/pannes/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addPanneModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshPannes");
                            router.push('/pannes/liste-pannes');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/pannes", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addPanneModalRef.value);
                            //router.push('/pannes/liste-panne');
                            emit("refreshPannes");

                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            }
        };

        const resetValue = () => {
            const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
            isupdate.value = false;
            formFields.forEach(field => {
                field.value = '';
            });
            btnTitle()
        };

        return {
            pannes, title, btntext, resetValue, panneSchema,
            addPanne, panneForm, addPanneModalRef, pannenew, bienOptions, biens
            //refreshPannes
        };
    },
};
</script>@/models/Panne