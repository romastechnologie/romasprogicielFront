<template>
    <div class="modal fade" id="AddCongeModal" tabindex="-1" role="dialog" ref="addCongeModalRef"
        aria-labelledby="tooltipmodal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{ title }}</h4>
                    <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form ref="congeForm" @submit="addConge" :validation-schema="congeSchema">
                <div class="row">
                    <div class="col-md-6 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black  mb-10">
                Personnel <span class="text-danger">*</span>
              </label>
              <Field name="personnel" v-model="personnels" type="text" v-slot="{ field }">
              <Multiselect v-model="field.value" v-bind="field" :options="personnelOptions" :preserve-search="true"
                 :multiple="false" :searchable="true" placeholder="Sélectionner le personnel "
                label="label" track-by="label" />
              </Field>
              <span class="text-danger" v-if="showMErr">Le personnel est obligatoire</span>
            </div>
          </div>
          <div v-show="fieldHide6" class="col-md-6 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type de congés <span class="text-danger">*</span>
              </label>
              <Field name="typeConge" type="text" v-slot="{ field }">
                <Multiselect v-model="field.value" v-bind="field" :options="typeCongeOptions" :preserve-search="true"
                  :multiple="false" :searchable="true" placeholder="Sélectionner le type de congé" label="label"
                  track-by="label" />
              </Field>
              <ErrorMessage name="typeConge" class="text-danger" />
            </div>
          </div>
          <div   class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de début <span class="text-danger">*</span>
              </label>
              <Field name="dateDebut" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateDebut" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de fin <span class="text-danger">*</span>
              </label>
              <Field name="dateFin" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateFin" class="text-danger" />
            </div>
          </div>

          <div  class="col-md-4 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Date de Reprise  <span class="text-danger">*</span>
              </label>
              <Field name="dateReprise" type="date" class="form-control shadow-none fs-md-15 text-black" />
              <ErrorMessage name="dateReprise" class="text-danger" />
            </div>
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
import { onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
import ApiService from '@/services/ApiService';
import { error, hideModal, success } from '@/utils/utils';
import { Conge } from '@/models/Conge';
import { useRouter } from 'vue-router';

export default {
    name: "AddCongeModal",
    components: {
        Form,
        Field,
        ErrorMessage
    },
    props: {
        id: {
            type: Number,
            required: true,
            default: 0
        },
    },
    emits: ["refreshConges", 'openmodal'],

    setup: (props: any, { emit }: { emit: Function }) => {

        const loading = ref<boolean>(false);
        const congeSchema = Yup.object().shape({
            code: Yup.string().required('Le code est obligatoire'),
            libelle: Yup.string().required('Le libelle est obligatoire'),
            
        });


        const congenew = ref(props.id);
        const congeForm = ref<Conge | null>(null);
        const addCongeModalRef = ref<null | HTMLElement>(null);
        let conges = ref<Array<Conge>>([]);
        const title = ref('Ajouter un congé');
        const btntext = ref('Ajouter');
        const isupdate = ref(false);
        const router = useRouter();
        const typeConge = ref();
        const personnel= ref();
       //const personnelOptions:ref();
        const typeCongeOptions = ref([] as any[]);
        const personnelOptions = ref([] as any[]);


        watch(() => props.id, (newValue) => {
            if (newValue != 0) {
                getConge(newValue);
                isupdate.value = true;
            }
            btnTitle();
        });

        const getConge = async (id: number) => {
            return ApiService.get("/conges/" + id)
                .then(({ data }) => {
                    congeForm.value?.setFieldValue("id", data.data.id);
                    congeForm.value?.setFieldValue("code", data.data.code);
                    congeForm.value?.setFieldValue("libelle", data.data.libelle);
                    emit('openmodal', addCongeModalRef.value);
                })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        const btnTitle = async () => {
            if (isupdate.value) {
                title.value = "Modifier le congé";
                btntext.value = "Modifier";
            } else {
                title.value = "Ajouter un congé";
                btntext.value = "Ajouter";
            }
        }

        const addConge = async (values: any, { resetForm }: { resetForm: () => void }) => {
            values = values as Conge;
            loading.value = false;
            if (isupdate.value) {
                ApiService.put(`/conges/${values.id}`, values)
                    .then(({ data }) => {
                        if (data.code == 200) {
                            success(data.message);
                            resetForm();
                            hideModal(addCongeModalRef.value);
                            isupdate.value = false;
                            btnTitle();
                            emit("refreshConges");
                            router.push('/conges/liste-conges');
                        }
                    }).catch(({ response }) => {
                        error(response.message);
                    });
            } else {
                ApiService.post("/conges", values)
                    .then(({ data }) => {
                        if (data.code == 201) {
                            success(data.message)
                            resetForm();
                            hideModal(addCongeModalRef.value);
                            //router.push('/conges/liste-conge');
                            emit("refreshConges");

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

        onMounted(() => {
        getAllPersonnels();
        getAllTypeConges();
})
        const getAllTypeConges = async () => {
        try{
        const response = await ApiService.get('/typeConges');
        const typeCongesData = response.data.data.data;

        typeCongeOptions.value = typeCongesData.map((typeConge) => ({
          value: typeConge.id,
          label: typeConge.libelle,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 

      

  
      const getAllPersonnels = async () => {
        try{
        const response = await ApiService.get('/all/personnels');
        const personnelsData = response.data.data.data;
        console.log(personnelsData,"gggggggggg");
        personnelOptions.value = personnelsData.map((personnel) => ({
          value: personnel.id,
          label: personnel.nom + " " + personnel.prenom,
        }));
        }
        catch(error){
          //error(response.data.message)
        }
      } 


        return {
            conges, title, btntext, resetValue, congeSchema,
            addConge, congeForm, addCongeModalRef, congenew,personnelOptions,personnel, typeCongeOptions,typeConge
            //refreshConges
        };
    },
};

</script>@/models/Conge