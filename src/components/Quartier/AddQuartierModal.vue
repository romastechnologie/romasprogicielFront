<template>
  <div class="modal fade createNewModal" id="AddQuartierModal" tabindex="-1" ref="addQuartierModalRef"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header">
          <h4 class="modal-title fw-bold text-black">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="quartierForm" @submit="addQuartier" :validation-schema="quartierSchema">
            <div class="row">
            <!-- <div class="col-md-12 mt-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code" />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>--> 
              <div class="col-md-12 mt-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libellé" />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Arrondissement <span class="text-danger">*</span>
                  </label>
                  <Field name="arrondissement" v-slot="{ field }">
                    <Multiselect :options="arrondissementOptions" :searchable="true" track-by="label" label="label"
                      v-model="field.value" v-bind="field" placeholder="Sélectionner l' arrondissement" />
                  </Field>
                </div>
                <ErrorMessage name="arrondissement" class="text-danger" />
              </div>
              <button class="btn btn-primary" type="submit">
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
import { defineComponent, ref, watch, onMounted } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '../../services/ApiService';
import * as Yup from 'yup';
import { Quartier } from '../../models/Quartier';
import { error, success, hideModal } from '../../utils/utils';
import Multiselect from '@vueform/multiselect'
import axios from 'axios';

export default defineComponent({
  name: "AddQuartierModal",
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
  setup(props, { emit }) {
    const quartierSchema = Yup.object().shape({
    //  code: Yup.string().required("Le code est obligatoire"),
      libelle: Yup.string().required('Le libellé est obligatoire'),
      arrondissement: Yup.string().required('L\'arrondissement est obligatoire'),

    });

    const quartierForm = ref<Quartier | null>(null);
    const addQuartierModalRef = ref<null | HTMLElement>(null);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un quartier");
    const btntext = ref('Ajouter');
    const arrondissementOptions = ref([]);

    watch(() => props.item, (newValue) => {
      getQuartier(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier le quartier";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un quartier";
        btntext.value = "Ajouter";
      }
    }

    const getQuartier = async (id: number) => {
      return ApiService.get("/quartiers/" + id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            quartierForm.value?.setFieldValue(key,
              (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
            );
          }
          emit('openmodal', addQuartierModalRef.value);

        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    onMounted(() => {
      fetchArrondissement();
    })

    const fetchArrondissement = async () => {
      try {
        const response = await axios.get('all/arrondissements');
        const arrondissementsData = response.data.data.data;
        arrondissementOptions.value = arrondissementsData.map((arrondissement) => ({
          value: arrondissement.id,
          label: `${arrondissement.libelle}`,
        }));
      } catch (error) {
        //
      }
    };

    const addQuartier = async (values: any, quartierForm) => {
      values = values as Quartier;
      if (isUPDATE.value) {
        ApiService.put("/quartiers/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              quartierForm.resetForm();
              hideModal(addQuartierModalRef.value);
              isUPDATE.value = false;
              btnTitle();
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        ApiService.post("/quartiers", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              quartierForm.resetForm();
              hideModal(addQuartierModalRef.value);
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
      isUPDATE.value = false;
      formFields.forEach(field => {
        field.value = '';
      });
      btnTitle()
    };

    return {
      quartierSchema,
      addQuartierModalRef,
      addQuartier,
      quartierForm, arrondissementOptions,
      title, btntext, resetValue
    };
  },
});
</script>@/models/Quartier