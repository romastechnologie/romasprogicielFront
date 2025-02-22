<template>
  <div
    class="modal fade modal-lg"
    id="AddRegleConservationModal"
    tabindex="-1"
    role="dialog"
    ref="addRegleConservationModalRef"
    aria-labelledby="tooltipmodal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button
            class="btn-close py-0"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <Form
            ref="regleConservationForm"
            @submit="addRegleConservation"
            :validation-schema="regleConservationSchema"
          >
            <div class="row">
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="code"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code"
                  />
                  <ErrorMessage name="code" class="text-danger" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Libellé <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="libelle"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le libelle"
                  />
                  <ErrorMessage name="libelle" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sort FINAL <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="sortFinal"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le sort final"
                  />
                  <ErrorMessage name="sortFinal" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Durée Conservation <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="dureeConservation"
                    type="number"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer la durée de conservation"
                  />
                  <ErrorMessage name="dureeConservation" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="description"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer la description"
                  />
                  <ErrorMessage name="description" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Type de Durée <span class="text-danger">*</span>
                  </label>
                  <Field name="typeDuree" v-slot="{ field }">
                    <Multiselect
                      :options="typeDureeOptions"
                      :searchable="true"
                      track-by="label"
                      label="label"
                      v-model="field.value"
                      v-bind="field"
                      placeholder="Sélectionner le type de Duree"
                    />
                  </Field>
                </div>
                <ErrorMessage name="typeDuree" class="text-danger" />
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
import { defineComponent, ref, watch, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import ApiService from "@/services/ApiService";
import * as Yup from "yup";
import { hideModal } from "@/utils/utils";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import { RegleConservation } from "@/models/RegleConservation";
import Multiselect from "@vueform/multiselect/src/Multiselect";

export default defineComponent({
  name: "AddRegleConservationModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const regleConservationSchema = Yup.object().shape({
      libelle: Yup.string().required("Le libellé est obligatoire"),
      code: Yup.string().required("Le code est obligatoire"),
      sortFinal: Yup.string().required("Le Sort Final est obligatoire"),
      dureeConservation: Yup.number().required(
        "La Duree Conservation est obligatoire"
      ),
      description: Yup.string().required("La description est obligatoire"),
      typeDuree: Yup.string().required("Le Type Duree est obligatoire"),
    });

    const regleConservationForm = ref<RegleConservation | null>(null);
    const addRegleConservationModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const regleConservationOptions = ref([]);
    const typeDuree = ref();
    const typeDureeOptions = ref([]);

    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter une regle conservation");
    const btntext = ref("Ajouter");
    const showMErr = ref(false);

    watch(
      () => props.item,
      (newValue) => {
        getRegleConservation(newValue);
        isUPDATE.value = true;
        btnTitle();
      }
    );

    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier la Regle Conservation";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter une Regle Conservation";
        btntext.value = "Ajouter";
      }
    };

    typeDureeOptions.value = [
      { value: "jour(s)", label: "Jour(s)" },
      { value: "mois", label: "Mois" },
      { value: "annees", label: "Annees" },
    ];

    const getRegleConservation = async (id: number) => {
      return ApiService.get("/regleConservations/" + id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            regleConservationForm.value?.setFieldValue(
              key,
              typeof donnees[key] === "object" && donnees[key] !== null
                ? donnees[key].id
                : donnees[key]
            );
          }
          emit("openmodal", addRegleConservationModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchRegleConservation = async () => {
      try {
        const response = await ApiService.get("/all/regleConservations");
        const regleConservationData = response.data.data.data;
        regleConservationOptions.value = regleConservationData.map(
          (regleConservation) => ({
            value: regleConservation.id,
            label: `${regleConservation.codeRegleConservation} - ${regleConservation.libelleRegleConservation}`,
          })
        );
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchRegleConservation();
    });

    const addRegleConservation = async (values: any, regleConservationForm) => {
      values = values as RegleConservation;
      if (isUPDATE.value) {
        ApiService.put("/regleConservations/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              regleConservationForm.resetForm();
              hideModal(addRegleConservationModalRef.value);
              isUPDATE.value = false;
              btnTitle();
              emit("close");
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        console.log("values", values);
        ApiService.post("/regleConservations/", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              regleConservationForm.resetForm();
              hideModal(addRegleConservationModalRef.value);
              emit("close");
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      }
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement
      >("input, textarea");
      isUPDATE.value = false;
      formFields.forEach((field) => {
        field.value = "";
      });
      btnTitle();
    };

    return {
      regleConservationSchema,
      addRegleConservationModalRef,
      addRegleConservation,
      regleConservationForm,
      title,
      btntext,
      resetValue,
      regleConservationOptions,
      showMErr,
      typeDuree,
      typeDureeOptions,
    };
  },
});
</script>@/models/CategorieInfo