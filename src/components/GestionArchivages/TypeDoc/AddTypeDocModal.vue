<template>
  <div
    class="modal fade"
    id="AddTypeDocModal"
    tabindex="-1"
    role="dialog"
    ref="addTypeDocModalRef"
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
            ref="typeDocForm"
            @submit="addTypeDoc"
            :validation-schema="typeDocSchema"
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
                    placeholder="Entrer le libellé"
                  />
                  <ErrorMessage name="libelle" class="text-danger" />
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
import { defineComponent, ref, watch, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import ApiService from "@/services/ApiService";
import * as Yup from "yup";
import { hideModal } from "@/utils/utils";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import { TypeDoc } from "@/models/TypeDoc";

export default defineComponent({
  name: "AddTypeDocModal",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    item: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const typeDocSchema = Yup.object().shape({
      libelle: Yup.string().required("Le libellé est obligatoire"),
      code: Yup.string().required("Le code est obligatoire"),
    });

    const typeDocForm = ref<TypeDoc | null>(null);
    const addTypeDocModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeDocOptions = ref([]);
    // const item = ref({ ...props.item });
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un type de document");
    const btntext = ref("Ajouter");

    watch(
      () => props.item,
      (newValue) => {
        getTypeDoc(newValue);
        isUPDATE.value = true;
        btnTitle();
      }
    );

    const btnTitle = async () => {
      if (isUPDATE.value) {
        title.value = "Modifier le type de document";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un type de document";
        btntext.value = "Ajouter";
      }
    };

    const getTypeDoc = async (id: number) => {
      return ApiService.get("/typeDocs/" + id)
        .then(({ data }) => {
          // map data in form
          const donnees = data.data;
          for (const key in donnees) {
            typeDocForm.value?.setFieldValue(
              key,
              typeof donnees[key] === "object" && donnees[key] !== null
                ? donnees[key].id
                : donnees[key]
            );
          }
          emit("openmodal", addTypeDocModalRef.value);
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const fetchTypeDoc = async () => {
      try {
        const response = await ApiService.get("/all/typedocs");
        const typeDocData = response.data.data.data;
        typeDocOptions.value = typeDocData.map((typeDoc) => ({
          value: typeDoc.id,
          label: `${typeDoc.codeTypeDoc} - ${typeDoc.libelleTypeDoc}`,
        }));
      } catch (error) {
        //
      }
    };

    onMounted(() => {
      fetchTypeDoc();
    });

    const addTypeDoc = async (values: any, typeDocForm) => {
      values = values as TypeDoc;
      if (isUPDATE.value) {
        ApiService.put("/typeDocs/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              typeDocForm.resetForm();
              hideModal(addTypeDocModalRef.value);
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
        ApiService.post("/typeDocs/", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              typeDocForm.resetForm();
              hideModal(addTypeDocModalRef.value);
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
      typeDocSchema,
      addTypeDocModalRef,
      addTypeDoc,
      typeDocForm,
      title,
      btntext,
      resetValue,
      typeDocOptions,
    };
  },
});
</script>@/models/TypeDoc