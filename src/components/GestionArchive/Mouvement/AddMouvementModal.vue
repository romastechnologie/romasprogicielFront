<template>

  <div class="modal fade" id="AddMouvementModal" tabindex="-1" role="dialog" ref="addMouvementModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="mouvementForm" @submit="addMouvement" :validation-schema="mouvementSchema">
           <!-- <fieldset class="border rounded-3 p-1">
              <legend class="float-none w-auto px-3">
                Source
              </legend>-->
              <div class="row">
                <div class="col-md-12 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black mb-10">
                      Type Mouvement <span class="text-danger">*</span>
                    </label>
                    <Field name="typeMouvement" type="text" v-slot="{ field }">
                      <Multiselect v-model="field.value" :options="typeMouvement" v-bind="field" :preserve-search="true" :multiple="false"
                        :searchable="true" placeholder="Sélectionner un type de mouvement" label="label"
                        track-by="label" />
                    </Field>
                    <ErrorMessage name="typeMouvement" class="text-danger" />
                  </div>
                </div>
              </div>
            <!--</fieldset>-->
            <fieldset class="border rounded-3 p-1">
              <legend class="float-none w-auto px-3">
                Source
              </legend>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black mb-10">
                      Type Emplacement <span class="text-danger">*</span>
                    </label>
                    <Field name="typeEmplacementSource" type="text" v-slot="{ field }">
                      <Multiselect v-model="field.value" v-bind="field" :preserve-search="true" :multiple="false"
                        :searchable="true" placeholder="Sélectionner un type emplacement source" label="label"
                        track-by="label" />
                    </Field>
                    <ErrorMessage name="typeEmplacementSource" class="text-danger" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="form-group mb-15 mb-sm-20 mb-md-25">
                    <label class="d-block text-black mb-10">
                      Emplacement <span class="text-danger">*</span>
                    </label>
                    <Field name="emplacementSource" type="text" v-slot="{ field }">
                      <Multiselect v-model="field.value" v-bind="field" :preserve-search="true" :multiple="false"
                        :searchable="true" placeholder="Sélectionner un emplacement" label="label" track-by="label" />
                    </Field>
                    <ErrorMessage name="emplacementSource" class="text-danger" />
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="row">

              <div class="col-md-6 mb-3">
                <fieldset class="border rounded-3 p-1" disabled>
                  <legend class="float-none w-auto px-3">
                    Document informations
                  </legend>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Type Document <span class="text-danger">*</span>
                        </label>
                        <Field name="typeeDocument" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="Sélectionner un typee document" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="typeeDocument" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Document <span class="text-danger">*</span>
                        </label>
                        <Field name="document" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="Sélectionner un document" label="label" track-by="label" />
                        </Field>
                        <ErrorMessage name="document" class="text-danger" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-6 mb-3">
                <fieldset class="border rounded-3 p-1" disabled>
                  <legend class="float-none w-auto px-3">
                    Destination
                  </legend>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Type Emplacement <span class="text-danger">*</span>
                        </label>
                        <Field name="typeEmplacement" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="Sélectionner un type emplacement" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="typeEmplacement" class="text-danger" />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Emplacement Destination <span class="text-danger">*</span>
                        </label>
                        <Field name="emplacementDestination" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="Sélectionner un emplacement" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="emplacementDestination" class="text-danger" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>

            </div>

            <button class="btn btn-primary" type="submit">
              {{ btntext }}
            </button>
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
import Multiselect from '@vueform/multiselect/src/Multiselect';
import axios from 'axios';

export default {
  name: "AddMouvementModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
  },
  emits: ["refreshMouvements", 'openmodal'],

  setup: (props: any, { emit }: { emit: Function }) => {

    const loading = ref<boolean>(false);
    const mouvementSchema = Yup.object().shape({
      code: Yup.string().required('Le code est obligatoire'),
      libelle: Yup.string().required('Le libelle est obligatoire'),

    });


    const mouvementnew = ref(props.id);
    const typeMouvement = ref([
      {
        value:"Retour",label:"Retour"
      },
      {
        value:"Sortie",label:"Sortie"
      },
      {
        value:"Destruction",label:"Destruction"
      },
      {
        value:"Déplacement",label:"Déplacement"
      },
    ])
    const mouvementForm = ref<any | null>(null);
    const addMouvementModalRef = ref<null | HTMLElement>(null);
    let mouvements = ref<Array<any>>([]);
    const title = ref('Ajouter un mouvement');
    const btntext = ref('Ajouter');
    const isupdate = ref(false);
    const router = useRouter();

    watch(() => props.id, (newValue) => {
      if (newValue != 0) {
        getMouvement(newValue);
        isupdate.value = true;
      }
      btnTitle();
    });

    const getMouvement = async (id: number) => {
      return ApiService.get("/mouvements/" + id)
        .then(({ data }) => {
          mouvementForm.value?.setFieldValue("id", data.data.id);
          mouvementForm.value?.setFieldValue("code", data.data.code);
          mouvementForm.value?.setFieldValue("libelle", data.data.libelle);
          emit('openmodal', addMouvementModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const btnTitle = async () => {
      if (isupdate.value) {
        title.value = "Modifier le Mouvement";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un Mouvement";
        btntext.value = "Ajouter";
      }
    }

    const addMouvement = async (values: any, { resetForm }: { resetForm: () => void }) => {
      //values = values;
      loading.value = false;
      if (isupdate.value) {
        await axios.put(`/mouvements/${values.id}`, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              resetForm();
              hideModal(addMouvementModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("refreshMouvements");
              router.push('/mouvements/liste-mouvement');
            }
          }).catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        await axios.post("/mouvements", values)
          .then(({ data }) => {
            console.log("ZZZZZZZjjj ==> ", data)
            if (data.code == 201) {
              success(data.message)
              resetForm();
              hideModal(addMouvementModalRef.value);
              //router.push('/mouvements/liste-mouvement');
              emit("refreshMouvements");

            }
          }).catch(({ response }) => {
            console.log("ZZZZZZZ ==> ", response)
            error(response.data.message);
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
      mouvements, title, btntext, resetValue, mouvementSchema,
      addMouvement,typeMouvement, mouvementForm, addMouvementModalRef, mouvementnew,
      //refreshMouvements
    };
  },
};
</script>@/models/Mouvement
<style>
/* fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.scheduler-border {
    width:inherit;
    border-bottom:none;
} */
</style>