<template>
  <div
    class="modal fade"
    id="AddEmplacementModal"
    tabindex="-1"
    role="dialog"
    ref="addEmplacementModalRef"
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
            ref="emplacementForm"
            @submit="addEmplacement"
            :validation-schema="emplacementSchema"
          >
            <div class="row">
              <div class="col-md-12 mb-3">
             <!--  <div
                  v-if="dernierCodeMessage != 'RAS' || dernierCodeMessage != ''"
                >
                  <p>Dernier code est : {{ dernierCodeMessage }}</p>
                </div>--> 
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Type d'emplacement <!-- {{ typeEmplacement }}--> 
                    <span class="text-danger">*</span>
                  </label>
                  <Field
                    name="typeEmplacement"
                    v-model="typeEmplacement"
                    type="text"
                    v-slot="{ field }"
                  >
                    <Multiselect
                      v-model="field.value"
                      v-bind="field"
                      :options="typeEmplacementOptions"
                      :preserve-search="true"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner le type d'emplacement"
                      label="label"
                      track-by="label"
                      @select="modificationEmplacement"
                    />
                  </Field>

                  <ErrorMessage name="typeEmplacement" class="text-danger" />
                </div>
              </div>


              <div class="col-md-12" v-if="estContenantActif">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Type Document <span class="text-danger">*</span>
                        </label>
                        <Field name="typedocument" v-model="type3" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :options="typeDocumentOptions"
                            :preserve-search="true" :multiple="false" :searchable="true"
                            placeholder="Sélectionner un type document" label="label" track-by="label" />
                        </Field>
                        <ErrorMessage name="typedocument" class="text-danger" />
                      </div>
                    </div>

                    <div class="col-md-12" v-if="estContenantActif">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                         Categorie Document <span class="text-danger">*</span>
                        </label>
                        <Field name="categorie" v-model="document1" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" label="label" track-by="label" :options="documentByTypeOptions" noOptionsText="Selectionnez un type document" 
                          mode="tags"
                          multiple
                          placeholder="Sélectionner une catégorie document" />
                        </Field>
                        <ErrorMessage name="categorie" class="text-danger" />
                      </div>
                    </div>


              <div class="col-md-12 mb-3">
                <label class="form-label"
                  >Code<span class="text-danger">*</span></label
                >
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon3">
                    {{
                      prefix
                    }}
                  </span>
                  <Field
                    name="code"
                    type="text"
                    aria-describedby="basic-addon3"
                    class="form-control shadow-none fs-md-15 text-black"
                    placeholder="Entrer le code"
                  />
                </div>
                <ErrorMessage name="code" class="text-danger" />
              </div>

              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Description
                  </label>
                  <Field
                    name="description"
                    cols="20"
                    rows="3"
                    as="textarea"
                    placeholder="Description"
                    v-slot="{ field }"
                    class="form-control shadow-none rounded-0 text-black"
                  >
                    <textarea
                      v-model="field.value"
                      class="form-control shadow-none rounded-0 text-black"
                    ></textarea>
                  </Field>
                  <ErrorMessage name="description" class="text-danger" />
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                  <label class="d-block text-black mb-10">
                    Emplacement
                    <span v-if="emplacementEtat == false" class="text-danger"
                      >*</span
                    ></label
                  >
                  <Field
                    name="emplacement"
                    v-model="emplacement"
                    type="text"
                    v-slot="{ field }"
                  >
                    <Multiselect
                      v-model="field.value"
                      v-bind="field"
                      :options="emplacementOptions"
                      :preserve-search="true"
                      :disabled="emplacementEtat"
                      :multiple="false"
                      :searchable="true"
                      placeholder="Sélectionner l'emplacement"
                      label="label"
                      track-by="label"
                    />
                  </Field>
                  <ErrorMessage name="emplacement" class="text-danger" />
                </div>
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
import { ref, watch, onMounted,onBeforeMount,computed } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { error, hideModal, success } from "@/utils/utils";
import { Emplacement } from "@/models/Emplacement";
import { useRouter } from "vue-router";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import axios from "axios";

export default {
  name: "AddEmplacementModal",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ["refreshEmplacements", "openmodal"],

  setup: (props: any, { emit }: { emit: Function }) => {
    const loading = ref<boolean>(false);
    const prefix = ref("");
    const estContenantActif = ref(false);
    const document1 = ref();
    const emplacementEtat = ref(true);
    const emplacementSchema = computed(() => {
  return Yup.object().shape({
    code: Yup.string().required("Le code est obligatoire"),
    description: Yup.string().notRequired(),
    typeEmplacement: Yup.string().required("Le type d'emplacement est obligatoire."),
    typedocument: estContenantActif.value
      ? Yup.string().required("Le type de document est obligatoire")
      : Yup.string().nullable(),
    categorie: estContenantActif.value
      ? Yup.array().min(1, "La catégorie de document est obligatoire").required("La catégorie de document est obligatoire")
      : Yup.array().notRequired().nullable(),
  });
});

    
    const { resetForm } = useForm();
    const emplacementForm = ref<any | null>(null);
    const addEmplacementModalRef = ref<null | HTMLElement>(null);
    const emplacements = ref<Array<any>>([]);
    const title = ref("Ajouter un emplacement");
    const btntext = ref("Ajouter");
    const isupdate = ref(false);
    const router = useRouter();
    const emplacementOptions = ref();
    const typeEmplacementOptions = ref();
    const typeEmplacementSelected = ref(null);
    const dernierCodeMessage = ref("");
    const lesTypesEmplacement = ref([]);
    const emplacement = ref();
    const typeEmplacement = ref();
    const typeDocumentOptions = ref<Array<any>>([]);
      //const etatEmplacement = ref(true);
    const type3 = ref();
    const leDocu = ref();
    const lesDocuments = ref([]);
    const documentByTypeOptions = ref([]);
    const newType= ref();
    const newCategorie= ref();

    watch(
      () => props.id,
      (newValue) => {
        console.log("newValuenewValuenewValue ===> ",newValue)
        if (newValue !== 0) {
          getEmplacement(newValue);
          isupdate.value = true;
        }else{
          emplacementOptions.value = [];
          emplacementEtat.value = true;
        }
        btnTitle();
      }
    );

    watch(type3, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
        getDocumentByType(newValue)
      }
    });
    watch(estContenantActif, (isActive) => {
  if (!isActive) {
    type3.value = null;
    document1.value = [];
  }
});

watch([type3, document1], ([newType, newCategories]) => {
  if (!newType || !newCategories || newCategories.length === 0) return;

  const typeDocObj = typeDocumentOptions.value.find((doc) => doc.value === newType);

  if (typeDocObj) {
    const typeCode = typeDocObj.label.split(" - ")[0]?.trim();

    const categorieCodes = newCategories.map((categorieId) => {
      const categorieObj = documentByTypeOptions.value.find((cat) => cat.value === categorieId);
      return categorieObj ? categorieObj.label.split(" - ")[1]?.trim() : null;
    }).filter((code) => code !== null);

    if (categorieCodes.length > 0) {
      const finalCode = `(${typeCode})-${categorieCodes.join("-")}`;
      emplacementForm.value?.setFieldValue("code", finalCode);
    }
  }
});


    const getTypeDocument = async () => {
      try {
        const response = await ApiService.get("all/typedocs");
        const typeDocumentData =  response.data.data.data;
        console.log("documentrecupéré",typeDocumentData );
        typeDocumentOptions.value = typeDocumentData.map(
          (typeDoc) => ({
            value: typeDoc.id,
            label: `${typeDoc.code} - ${typeDoc.libelle}`,
          })
        );
      } catch (error) {
        //
        console.log("Erreur ===> ",error)
      }
    }

    const getDocumentByType = async (type: any) => {
  try {
    if (!type) {
      console.error("Type de document invalide !");
      return;
    }

    const response = await axios.get(`documents/${type}/donnes`);
    if (response.status === 200) {
      const documentData = response.data.data;
      console.log("Documents récupérés :", documentData);

      lesDocuments.value = documentData;
      documentByTypeOptions.value = documentData.map((document) => ({
        value: document.id,
        label: `${document.libelle} - ${document.code}`,
      }));
    } else {
      console.error("Erreur de récupération :", response.status);
    }
  } catch (error) {
    console.error("Erreur ===> ", error);
  }
};

    const handleTypeEmplacementChange = async (selectedId: number) => {
  try {
    const { data } = await ApiService.get(`/typeEmplacements/${selectedId}`);
    const typeData = data.data;

    if (typeData.estContenant === true) {
      estContenantActif.value = true;
    } else {
      estContenantActif.value = false;
    }
    await modificationEmplacement(selectedId);
  } catch (err) {
    console.error("Erreur lors du fetch du typeEmplacement :", err);
  }
};

watch(typeEmplacement, async (newTypeId) => {
  const selectedType = typeEmplacementOptions.value.find(
    (type) => type.value === newTypeId
  );
  if (selectedType) {
    prefix.value = selectedType.prefix;
    await fetchDernierCode(newTypeId);
    await handleTypeEmplacementChange(newTypeId); // <== ajouté
  } else {
    dernierCodeMessage.value = "RAS";
  }
});
    const isLoaded = ref(false);
    onBeforeMount(() => {});
    onMounted(async () => {
      await getTypeDocument();
      if (!isLoaded.value) {
        isLoaded.value = true;
        await getAllTypeEmplacements();
      }
    });
    const getEmplacement = async (id: number) => {
  return ApiService.get("/emplacements/" + id)
    .then(async ({ data }) => {
      console.log("emplacement", data);

      const emplacementData = data.data;

      if (emplacementData.emplacement) {
        emplacementOptions.value = [
          {
            value: emplacementData.emplacement?.id,
            label: emplacementData.emplacement?.code,
          },
        ];
        await modificationEmplacement(emplacementData?.typeEmplacement?.id);
        emplacementEtat.value = false;
        emplacement.value = emplacementData.emplacement?.id;
      } else {
        emplacementOptions.value = [];
        emplacementEtat.value = true;
      }

      emplacementForm.value?.setFieldValue("id", emplacementData.id);
      emplacementForm.value?.setFieldValue(
        "code",
        emplacementData.code.split("-")[1]
      );
      emplacementForm.value?.setFieldValue(
        "description",
        emplacementData.description
      );

      prefix.value = emplacementData.code.split("-")[0];
      typeEmplacement.value = emplacementData?.typeEmplacement?.id;

      // 🎯 Récupération du typeDocument et categorie depuis emplacementCategories
      if (
        emplacementData.emplacementCategories &&
        emplacementData.emplacementCategories.length > 0
      ) {
        const catDoc = emplacementData.emplacementCategories[0];

        const typeDocId = catDoc.typedocument?.id;
        const categorieId = catDoc.categorie?.id;

        // Mise à jour des champs du formulaire
        emplacementForm.value?.setFieldValue("typeDocument", typeDocId);
        emplacementForm.value?.setFieldValue("categorieDocument", [categorieId]);

        // Optionnel : précharger les documents pour ce type
        await getDocumentByType(typeDocId);

        // Pour que les selects aient les bonnes options actives
        type3.value = typeDocId;
        document1.value = [categorieId];
      }

      emit("openmodal", addEmplacementModalRef.value);
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};
    const btnTitle = async () => {
      if (isupdate.value) {
        title.value = "Modifier l'emplacement";
        btntext.value = "Modifier";
      } else {
        title.value = "Ajouter un emplacement";
        btntext.value = "Ajouter";
      }
    };

    
    const getAllTypeEmplacements = async () => {
      try {
        const response = await ApiService.get("/all/typeEmplacements");
        const typeEmplacementsData = response.data.data.data;
        lesTypesEmplacement.value = typeEmplacementsData;
        typeEmplacementOptions.value = typeEmplacementsData.map(
          (typeEmplacement) => ({
            value: typeEmplacement.id,
            label: typeEmplacement.libelle,
            prefix: typeEmplacement.prefixe,
          })
        );
        console.log("LEs type ==> ", typeEmplacementOptions.value);
      } catch (error) {
        // Handle error
      }
    };
    const modificationEmplacement = async (value) => {
      const lesTypes = lesTypesEmplacement.value;
      const objetTrouv = lesTypes.find((objet) => objet.id === value);
      if (
        objetTrouv.typeemplacement &&
        objetTrouv.typeemplacement != undefined
      ) {
        const type = objetTrouv.typeemplacement;
        await getLesEmplacements(type.id);
        
      } else {
        emplacementOptions.value = [];
        emplacementEtat.value = true;
      }
    };

    const getLesEmplacements = async (id: any) => {
      console.log("Je suis dedans ===> ", id);
      try {
        if (id != "" && id != null) {
          const response = await axios.get(
            `/emplacement/by/${id}/typeemplacement`
          );
          const emplacementsData = response.data.data;
          emplacementOptions.value = emplacementsData.map((empla) => ({
            value: empla.id,
            label: "[ " + empla.typeEmplacement?.libelle + " ] " + empla.code,
          }));
          if (emplacementsData.length > 0) {
            emplacementEtat.value = false;
          } else {
            emplacementEtat.value = true;
          }
          return emplacementOptions.value;
        } else {
          emplacementOptions.value = [];
          emplacementEtat.value = true;
        }
      } catch (erreur) {
        //
      }
    };
    const addEmplacement = async (
      values: any,
      { resetForm }: { resetForm: () => void }
    ) => {
      console.log("GHJHGHGHGFHGFHF VALUE ==> ", values)
      console.log("emplacementEtat.value  ==> ", emplacementEtat.value)
      console.log("values.emplacement ==> ", values.emplacement)
      if(emplacementEtat.value === false && !values.emplacement){
        error("Veuillez selectionner un emplacement.");
        return;
      }
      values.code = prefix.value + "-" + values.code;
      loading.value = false;
      if (isupdate.value) {
        ApiService.put(`/emplacements/${values.id}`, values)
          .then(({ data }) => {
            if (data.code == 200) {
              success(data.message);
              resetForm();
              hideModal(addEmplacementModalRef.value);
              isupdate.value = false;
              btnTitle();
              emit("refreshEmplacements");
              hideModal(addEmplacementModalRef.value);
              //router.push("/emplacements/liste-emplacement");
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      } else {
        ApiService.post("/emplacements", values)
          .then(({ data }) => {
            if (data.code == 201) {
              success(data.message);
              resetForm();
              hideModal(addEmplacementModalRef.value);
              emit("refreshEmplacements");
            }
          })
          .catch(({ response }) => {
            error(response.data.message);
          });
      }
    };

    const resetValue = () => {
      emplacementForm.value?.setFieldValue("code", ""); 
      emplacementForm.value?.setFieldValue("description", ""); 
      emplacementForm.value?.setFieldValue("typeEmplacement", ""); 
      emplacementForm.value?.setFieldValue("emplacement", "")
      btnTitle();
    };
    const fetchDernierCode = async (value: any) => {
      try {
        const response = await ApiService.get("/derniercode/" + value);
        console.log("Response from derniercode API:", response);
        if (response.data.code === 200 && response.data.data) {
          dernierCodeMessage.value = response.data.data.code;
        } else {
          dernierCodeMessage.value = "RAS";
        }
      } catch (error) {
        console.error("Error fetching dernier code:", error);
        dernierCodeMessage.value = "RAS";
      }
    };

    watch(typeEmplacement, async (newTypeId) => {
      const selectedType = typeEmplacementOptions.value.find(
        (type) => type.value === newTypeId
      );
      if (selectedType) {
        prefix.value = selectedType.prefix;
        await fetchDernierCode(newTypeId);
      } else {
        dernierCodeMessage.value = "RAS";
      }
    });

    return {
      prefix,
      emplacements,
      title,
      emplacement,
      btntext,
      resetValue,
      emplacementSchema,
      addEmplacement,
      emplacementForm,
      addEmplacementModalRef,
      typeEmplacementOptions,
      emplacementOptions,
      typeEmplacementSelected,
      dernierCodeMessage,
      modificationEmplacement,
      emplacementEtat,
      typeEmplacement,
      typeDocumentOptions,
      getDocumentByType,
      leDocu,
      lesDocuments,
      documentByTypeOptions,
      document1,
      type3,
      estContenantActif,
      newCategorie
    };
  },
};
</script>
  @/models/Emplacement