<template>
  <div class="modal fade" id="AddTypeEmplacementModal" tabindex="-1" role="dialog" ref="addTypeEmplacementModalRef"
    aria-labelledby="tooltipmodal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button class="btn-close py-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <Form ref="typeEmplacementForm" @submit="addTypeEmplacement" :validation-schema="typeEmplacementSchema">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field name="libelle" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libelle" />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field name="code" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code " />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Prefixe <span class="text-danger">*</span>
                  </label>
                  <Field name="prefixe" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le prefixe" />
                  <ErrorMessage name="prefixe" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ordre <span class="text-danger">*</span>
                  </label>
                  <Field name="ordre" type="text" class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer l'ordre " />
                  <ErrorMessage name="ordre" class="text-danger" />
                </div>
              </div>


              <div class="col-md-12 mb-4">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type Emplacement
                  </label>
                  <Field name="typeemplacement" v-model="typesEmplacements" type="text" v-slot="{ field }">
                    <Multiselect v-model="field.value" v-bind="field" :options="typesEmplacementsOptions"
                      :preserve-search="true" :multiple="false" :searchable="true"
                      placeholder="Sélectionner le Type d'Emplacement " label="label" track-by="label" />
                  </Field>
                  <span class="text-danger" v-if="showMErr">La catégorie dépense est
                    obligatoire</span>

                </div>
              </div>




              <button class="btn btn-primary mt-3">
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
import { error, success } from '@/utils/utils';
import { useRouter } from 'vue-router';
import { TypeEmplacement } from '@/models/TypeEmplacement';
import Multiselect from 'vue-multiselect';

export default defineComponent({
  name: "AddTypeEmplacementModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,

  },
  props: {
    item: {
      type: Number,
      required:true,
      default: 0,
    }
  },

  setup(props, { emit }) {
    const typeEmplacementSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libellé est obligatoire'),
      code: Yup.string().required('Le code est obligatoire'),
      prefixe: Yup.string().required('Le Prefixe est obligatoire'),
      ordre: Yup.string().required('Les ordres sont obligatoires'),
      typeEmplacement: Yup.string().required("Le type d'Emplacement est obligatoire."),



    });

    const typeEmplacementForm = ref<TypeEmplacement | null>(null);
    const addTypeEmplacementModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeEmplacementOptions = ref();
    const typeEmplacement = ref();
    const typesEmplacementsOptions = ref([]);
    const typesEmplacements =  ref();


    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un type d'Emplacement");
    const btntext = ref('Ajouter');
    const showMErr = ref(false);


    onMounted(() => {
      getAllTypeEmplacements();
    });

    watch(() => props.item, (newValue) => {
      getTypeEmplacement(newValue);
      isUPDATE.value = true;
      btnTitle();
    });

    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier le type d'Emplacement";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un type d'Emplacement";
        btntext.value = "Ajouter";
      }
    }

    const getTypeEmplacement = async (id: number) => {
      return ApiService.get("/typeEmplacements/" + id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            typeEmplacementForm.value?.setFieldValue(key, (typeof donnees[key] === 'object' && donnees[key] !== null) ? donnees[key].id : donnees[key]
            );
          }
          emit('openmodal', addTypeEmplacementModalRef.value);

        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const fetchTypeEmplacement = async () => {
      try {
        const response = await ApiService.get('/all/typeEmplacements');
        const typeEmplacementData = response.data.data.data;
        typeEmplacementOptions.value = typeEmplacementData.map((typeEmplacement) => ({
          value: typeEmplacement.id,
          label: `${typeEmplacement.codeTypeEmplacement} - ${typeEmplacement.libelleTypeEmplacement}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypeEmplacement();
    });


    const getAllTypeEmplacements = async () => {
      try {
        const response = await ApiService.get('/all/typeEmplacements');
        const typeEmplacementsData = response.data.data.data;
        console.log('Data', typeEmplacementsData)
        typesEmplacementsOptions.value = typeEmplacementsData.map((typeEmplacement) => ({
          value: typeEmplacement.id,
          label: typeEmplacement.libelle,
        }));
      }
      catch (error) {
        //error(response.data.message)
      }
    }


    const addTypeEmplacement = async (values: any, typeEmplacementForm) => {
      values = values as TypeEmplacement;
      if (isUPDATE.value) {
        ApiService.put("/typeEmplacements/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              typeEmplacementForm.resetForm();
              hideModal(addTypeEmplacementModalRef.value);
              isUPDATE.value = false;
              btnTitle();
              emit('close');
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        console.log('values', values)
        ApiService.post("/typeEmplacements", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              typeEmplacementForm.resetForm();
              hideModal(addTypeEmplacementModalRef.value);
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
      typeEmplacementSchema,
      addTypeEmplacementModalRef,
      addTypeEmplacement,
      typeEmplacementForm,
      title,
      btntext,
      resetValue,
      typeEmplacementOptions,
      showMErr,typesEmplacementsOptions,
      typesEmplacements
      

    };
  },
});
</script>@/models/CategorieInfo