<template>
  <div
    class="modal fade"
    id="AddTypeEmplacementModal"
    tabindex="-1"
    role="dialog"
    ref="addTypeEmplacementModalRef"
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
            ref="typeEmplacementForm"
            @submit="addTypeEmplacement"
            :validation-schema="typeEmplacementSchema"
          >
            <div class="row">

              <div class="col-md-12 mb-3">
              <div class="form-check">
                <Field
                  name="estContenant"
                  type="checkbox"
                  class="form-check-input"
                  id="estContenantCheckbox"
                  :value="true"
                />
                <label class="form-check-label" for="estContenantCheckbox">
                  Est contenant
                </label>
              </div>
            </div>

             
              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Code <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="code"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code "
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
                    Prefixe <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="prefixe"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le prefixe"
                  />
                  <ErrorMessage name="prefixe" class="text-danger" />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type d'emplacement
                  </label>
                  <Field name="typeemplacement" v-model="typeEmplacement" type="text" v-slot="{ field }">
                    <Multiselect
                      v-model="field.value"
                      v-bind="field"
                      :options="typesEmplacementsOptions"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner le type d'emplacement"
                      label="label"
                      track-by="label"
                    />
                  </Field>
                  <ErrorMessage name="typeemplacement" class="text-danger" />
                </div>
              </div>

           <!--  <div class="col-md-6">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ordre <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="ordre"
                    type="text"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer l'ordre "
                  />
                  <ErrorMessage name="ordre" class="text-danger" />
                </div>
              </div>--> 
            <button
              class="btn btn-primary mt-3"
            >
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
import { defineComponent, ref, watch, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import ApiService from "@/services/ApiService";
import * as Yup from "yup";
import { hideModal } from "@/utils/utils";
import { error, success } from "@/utils/utils";
import { useRouter } from "vue-router";
import { TypeEmplacement } from "@/models/TypeEmplacement";
import Multiselect from "@vueform/multiselect/src/Multiselect";

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
      required: true,
      default: 0,
    },
  },
  setup(props, { emit }){
    const typeEmplacementSchema = Yup.object().shape({
      libelle: Yup.string().required("Le libellé est obligatoire"),
      code: Yup.string().required("Le code est obligatoire"),
      prefixe: Yup.string().required("Le Prefixe est obligatoire"),
      //ordre: Yup.string().required("Les ordres sont obligatoires"),
      typeEmplacement: Yup.string().notRequired(),
     estContenant: Yup.string().notRequired(),
    });

    const typeEmplacementForm = ref<TypeEmplacement | null>(null);
    const addTypeEmplacementModalRef = ref<null | HTMLElement>(null);
    const router = useRouter();
    const typeEmplacementOptions = ref();
    const typeEmplacement = ref();
    const typesEmplacementsOptions = ref([]);
    const typesEmplacements = ref();
    

    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Ajouter un type d'Emplacement");
    const btntext = ref("Ajouter");
    const showMErr = ref(false);

    onMounted(() => {
      getAllTypeEmplacements();
    });

    watch(
      () => props.item,
      (newValue) => {
        getTypeEmplacement(newValue);
        isUPDATE.value = true;
        btnTitle();
      }
    );

    const btnTitle = async () => {
      if (isUPDATE.value) {
         title.value = "Modifier le Type Emplacement";
         btntext.value = "Modifier";
      }else{
         title.value = "Ajouter un Type Emplacement";
         btntext.value = "Ajouter";
      }
    };

    const getTypeEmplacement = async (id: number) => {
      return ApiService.get("/typeEmplacements/" + id)
        .then(({ data }) => {
          // map data in form
          console.log("RRRRRRRRRRRRRR ===> ",data)
          const donnees = data.data;
          for (const key in donnees) {
            console.log("typeEmplacementForm.value == ",typeEmplacementForm.value)
            typeEmplacementForm.value?.setFieldValue(
              key,
              typeof donnees[key] === "object" && donnees[key] !== null
                ? donnees[key].id
                : donnees[key]
            );
          }
          typeEmplacement.value = data.data['typeEmplacement'];
          //typeEmplacement.value = donnees.typeEmplacement?.id;
          console.log("typeEmplacement.value ",typeEmplacement.value)
          emit("openmodal", addTypeEmplacementModalRef.value);
        })
        .catch(({ response }) => {
          console.log("response == ",response)
          error(response);
        });
    };

    const fetchTypeEmplacement = async () => {
      try {
        const response = await ApiService.get("/all/typeEmplacements");
        console.log("TYTTTTTTTt )) ===> ",response);
        const typeEmplacementData = response.data.data;
        typeEmplacementOptions.value = typeEmplacementData.map(
          (typeEmplacement) => ({
            value: typeEmplacement.id,
            label: `${typeEmplacement.codeTypeEmplacement} - ${typeEmplacement.libelleTypeEmplacement}`,
          })
        );
      } catch (error) {
        //
      }
    };


    onMounted(() => {
      fetchTypeEmplacement();
      getAllTypeEmplacements();
    });

    const getAllTypeEmplacements = async () => {
      try {
        const response = await ApiService.get("/all/typeEmplacements");
        const typeEmplacementsData = response.data.data.data;
        console.log("Data zzzzzzzzzzz ", response);
        typesEmplacementsOptions.value = typeEmplacementsData.map(
          (typeEmplacement) => ({
            value: typeEmplacement.id,
            label: typeEmplacement.libelle,
          })
        );
      } catch (error) {
        //error(response.data.message)
      }
    };

    const addTypeEmplacement = async (values: any, typeEmplacementForm) => {
      console.log("ZEZEZEZEZEZ ===> ", values);
      if (isUPDATE.value) {
        ApiService.put("/typeEmplacements/" + values.id, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              typeEmplacementForm.resetForm();
              hideModal(addTypeEmplacementModalRef.value);
              isUPDATE.value=false;
              btnTitle();
              emit("close");
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        console.log("values", values);
        ApiService.post("/typeEmplacements", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              typeEmplacementForm.resetForm();
              hideModal(addTypeEmplacementModalRef.value);
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

    return { typeEmplacementSchema,
      addTypeEmplacementModalRef,
      addTypeEmplacement,
      typeEmplacementForm,
      title,btntext,resetValue,
      typeEmplacementOptions,
      typeEmplacement,
      showMErr,
      typesEmplacementsOptions,
      typesEmplacements,
    };
  },
});
</script>