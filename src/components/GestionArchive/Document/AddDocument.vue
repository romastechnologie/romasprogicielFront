<template>
  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <Form
        ref="documentForm"
        @submit="addDocument"
        :validation-schema="documentSchema"
      >
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label class="d-block text-black fw-semibold mb-10"> Date </label>
              <Field
                name="dateConservation"
                v-model="dateConservation"
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
              />
              <ErrorMessage name="dateConservation" class="text-danger" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie <span class="text-danger">*</span>
              </label>
              <Field
                name="categorie"
                v-model="categorie"
                type="text"
                v-slot="{ field }"
              >
                <Multiselect
                  v-model="field.value"
                  v-bind="field"
                  :options="categoriesOptions"
                  :preserve-search="true"
                  :multiple="false"
                  :searchable="true"
                  placeholder="Sélectionner une catégorie"
                  label="label"
                  track-by="label"
                />
              </Field>
              <ErrorMessage name="categorie" class="text-danger" />
            </div>
          </div>
          <div class="col-6">
            <label class="d-block text-black mb-10">
              Type de document <span class="text-danger">*</span>
            </label>
            <div class="row">
              <div class="col-12">
                <div class="col-12 d-flex date-details">
                  <div
                    class="d-inline-block"
                    v-for="(type, index) in typeOptions"
                    :key="index"
                  >
                    <label class="d-block mb-0">
                      <Field
                        name="typeDoc"
                        v-model="typeDoc"
                        @change="getAllRegleByTypeOrCategorie"
                        :value="type.value"
                        class="checkbox_animated"
                        type="radio"
                      />{{ type.label }}
                    </label>
                  </div>
                  <div class="d-inline-block">
                    <label class="d-block mb-0">
                      <Field
                        name="typeDoc"
                        v-model="typeDoc"
                        value="deux"
                        @change="getAllRegleByTypeOrCategorie"
                        class="checkbox_animated"
                        type="radio"
                      />Les deux
                    </label>
                  </div>
                </div>
                <div class="col-12">
                  <ErrorMessage name="typeDoc" class="text-danger" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mt-3">
            <label for="refDoc" class="form-label"
              >Référence Document<span class="text-danger">*</span></label
            >
            <Field
              name="refDoc"
              class="form-control"
              type="text"
              placeholder="Saisir la référence"
            />
            <ErrorMessage name="refDoc" class="text-danger" />
          </div>

          <div class="col-md-4 mt-3">
            <label for="nom" class="form-label"
              >Nom Document<span class="text-danger">*</span></label
            >
            <Field
              name="nom"
              class="form-control"
              type="text"
              placeholder="Entrer le nom du document"
            />
            <ErrorMessage name="nom" class="text-danger" />
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Description <span class="text-danger">*</span>
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

          <div class="col-md-4 mt-3">
            <label for="fichier" class="form-label"
              >Fichier<span class="text-danger">*</span></label
            >
            <Field
              name="fichier"
              @change="fichierChange"
              class="form-control"
              type="file"
            />
            <ErrorMessage name="fichier" class="text-danger" />
          </div>
          
          <div class="col-md-4 mt-3">
            <label for="dateFinConservation" class="form-label"
              >Date Début Conservation<span class="text-danger">*</span></label
            >
            <Field
              name="dateDebutConservation"
              class="form-control"
              type="date"
            />
            <ErrorMessage name="dateFinConservation" class="text-danger" />
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Tag <span class="text-danger">*</span>
              </label>
              <Field name="tagDoc" type="text" v-slot="{ field }">
                <Multiselect
                  v-model="field.value"
                  v-bind="field"
                  :options="tagOptions"
                  :preserve-search="true"
                  :multiple="false"
                  :searchable="true"
                  placeholder="Sélectionner le tag"
                  label="label"
                  track-by="label"
                />
              </Field>
              <ErrorMessage name="tagDoc" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Organisation de production<span class="text-danger">*</span>
              </label>
              <Field
                name="organisation"
                v-model="organisations"
                type="text"
                v-slot="{ field }"
              >
                <Multiselect
                  v-model="field.value"
                  v-bind="field"
                  :options="organisationOptions"
                  :preserve-search="true"
                  :multiple="false"
                  :searchable="true"
                  placeholder="Sélectionner l'organisation"
                  label="label"
                  track-by="label"
                />
              </Field>
              <ErrorMessage name="organisation" class="text-danger" />
            </div>
          </div>
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Emplacement<span class="text-danger">*</span>
              </label>
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
                  :multiple="false"
                  :searchable="true"
                  placeholder="Sélectionner un emplacement"
                  label="label"
                  track-by="label"
                />
              </Field>
              <ErrorMessage name="emplacement" class="text-danger" />
            </div>
          </div>
          <div class="col-12">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active p-10"
                id="home-tab-pane"
                role="tabpanel"
                tabindex="0"
              >
                <div class="row">
                  <div class="border border-primary mb-5">
                    <div
                      class="row d-flex align-items-center justify-content-between fw-bold py-2"
                      style="background-color: #0a59a4"
                    >
                      <div class="col-md-7">
                        <h3 class="fs-4 text-white">
                          Règle de conservation par type choisi
                        </h3>
                      </div>
                    </div>
                    <div>
                      <div class="card-body p-15 p-sm-20 p-md-25">
                        <div class="table-responsive">
                          <table
                            class="table table-fixed text-nowrap align-middle mb-0"
                          >
                            <thead>
                              <tr>
                                <th scope="col" class="text-center">Type</th>
                                <th scope="col" class="text-center">Durée</th>
                                <th scope="col" class="text-center">
                                  Date fin conservation
                                </th>
                                <th scope="col" class="text-center">
                                  Sort final
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(regle, index) in reglesConservations"
                                :key="index"
                              >
                                <td class="text-center">
                                  {{ regle.typeDocument.nom }}
                                </td>
                                <td class="text-center">
                                  {{
                                    regle.regleConservation?.dureeConservation +
                                    " " +
                                    regle.regleConservation?.typeDuree
                                  }}
                                </td>
                                <td class="text-center">
                                  {{ regle.dateFinConservation }}
                                </td>
                                <td class="text-center">
                                  {{ regle.regleConservation?.sortFinal }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 mt-3">
            <div class="d-flex align-items-center">
              <button class="btn btn-success me-3" type="submit">
                Créer un document
              </button>
              <router-link to="/documents/liste-document" class="btn btn-danger"
                ><i class="fa fa-trash-o lh-1 me-1 position-relative top-2"></i>
                <span class="position-relative"></span>Annuler</router-link
              >
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";
import { Document } from "@/models/Document";
import { error, success, ajouterPeriode, onFileChange } from "@/utils/utils";
import { useRouter } from "vue-router";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import axios from "axios";

export default defineComponent({
  name: "AddDocument",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },

  setup: () => {
    const documentSchema = Yup.object().shape({
      nom: Yup.string().required("Le nom est obligatoire."),
      description: Yup.string().required("La description est obligatoire."),
      refDoc: Yup.string().required("La référence est obligatoire."),
      dateConservation: Yup.string().required("La date est obligatoire."),
      fichier: Yup.mixed().required("Le fichier est obligatoire."),
      organisation: Yup.string().required("L'organisation est obligatoire"),
      tagDoc: Yup.string().required("Le tag est obligatoire."),
      emplacement: Yup.string().notRequired(),
      categorie: Yup.string().required("Le tag est obligatoire."),
      typeDoc: Yup.string().required("Le type est obligatoire."),
    });

    const documentForm = ref(null);
    const tagOptions = ref();
    const formatOptions = ref();
    const organisationOptions = ref();
    const organisations = ref();
    const reglesConservations = ref<Array<any>>([]);
    const tag = ref();
    const selectedFile = ref<any>();
    const typeDoc = ref();
    const formats = ref();
    const categorie = ref();
    const dateConservation = ref();
    const lesRegles = ref<Array<number>>([]);
    const emplacementOptions = ref<Array<any>>();
    const emplacement = ref();
    //const showMErr = ref(false);
    //const permissions = ref(null);
    const typeOptions = ref([]);
    const router = useRouter();
    // const permissions= ref<Array<Permission>>([]);

    const fichierChange = (e) => {
      selectedFile.value = onFileChange(e, [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ]);
    };

    const addDocument = async (values, { resetForm }) => {
      values["regles"] = lesRegles.value;
      axios
        .post("/documents", values, {
          headers: { "Content-Type": "multipart/form-data", Accept: "*/*" },
        })
        .then(({ data }) => {
          if (data.code == 201) {
            success(data.message);
            resetForm();
            router.push({ name: "ListeDocumentPage" });
          }
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    };

    const getAllTypeDocument = async () => {
      console.log("Je suis dedans ");
      try {
        const response = await axios.get("all/typedocuments");
        const typesData = response.data.data.data;

        typeOptions.value = typesData.map((type) => ({
          value: type.id,
          label: type.nom,
        }));
      } catch (error) {
        console.log("Erreur ", error);
        //error(response.data.message)
      }
    };
    const getCurrentDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      dateConservation.value = `${year}-${month}-${day}`;
      return dateConservation.value;
    };

    const getAllOrganisations = async () => {
      try {
        const response = await axios.get("all/organisations");
        const organisationsData = response.data.data.data;
        console.log("RESPONSE ORGANISATION ===> ", response);
        organisationOptions.value = organisationsData.map((organisations) => ({
          value: organisations.id,
          label: organisations.nom,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    const getAllFormats = async () => {
      try {
        const response = await axios.get("/formats");
        const formatsData = response.data.data.data;
        console.log("RESPONSE FORMAT ===> ", response);
        formatOptions.value = formatsData.map((formats) => ({
          value: formats.id,
          label: formats.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };
    const getEmplacements = async () => {
      try {
        const response = await axios.get("/tous/emplacements/sans/fils");
        const emplacementDatas = response.data.data.data;
        console.log("RESPONSE EMPLACEMENT ===> ", response);
        emplacementOptions.value = emplacementDatas.map((empl) => ({
          value: empl.id,
          label: empl.code,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };
    const categoriesOptions = ref<Array<any>>([]);
    const getAllCategorie = async () => {
      try {
        const response = await axios.get("/all/categorieDocuments");

        const formatsData = response.data.data.data;

        categoriesOptions.value = formatsData.map((cate) => ({
          value: cate.id,
          label: cate.libelle,
        }));
        return categoriesOptions.value;
      } catch (error) {
        //error(response.data.message)
      }
    };

    const getAllRegleByTypeOrCategorie = async () => {
      const categoriee = categorie.value;
      const type = typeDoc.value;
      const date = dateConservation.value;
      if (type && categoriee) {
        try {
          const response = await axios.get(
            `/getAllRegleByTypeOrCategorie?categorie=${categoriee}&type=${type}`
          );
          console.log("EERRRR ==> ", response);
          const formatsData = response.data.data;

          console.log("formatsData ==> ", formatsData);
          success(
            `Ces informations ont permis de trouvé ${formatsData.length} règle(s) de conservation de ce document`
          );
          for (let r of formatsData) {
            lesRegles.value.push(r.id);
          }
          reglesConservations.value = formatsData.map((regles) => {
            return {
              ...regles,
              dateFinConservation: ajouterPeriode(
                date.toLowerCase(),
                regles.regleConservation?.dureeConservation,
                regles.regleConservation?.typeDuree
              ),
            };
          });
        } catch (error) {
          console.warn("GHGH ==> ", error);
        }
      }
    };

    const getAllTags = async () => {
      try {
        const response = await ApiService.get("/tags");
        const tagsData = response.data.data.data;
        console.log("Data", tagsData);
        tagOptions.value = tagsData.map((tag) => ({
          value: tag.id,
          label: tag.libelle,
        }));
      } catch (error) {
        //error(response.data.message)
      }
    };

    watch(categorie, async (newVal, oldVal) => {
      categorie.value = newVal;
      await getAllRegleByTypeOrCategorie();
    });

    watch(dateConservation, async (newVal, oldVal) => {
      console.log(newVal);
      dateConservation.value = newVal;
      await getAllRegleByTypeOrCategorie();
    });
    onMounted(async () => {
      await getAllTypeDocument();
      await getAllTags();
      await getAllOrganisations();
      await getAllCategorie();
      await getCurrentDate();
      await getEmplacements();
    });
    return {
      documentSchema,
      emplacementOptions,
      emplacement,
      onFileChange,
      fichierChange,
      categorie,
      dateConservation,
      getCurrentDate,
      categoriesOptions,
      organisations,
      getAllRegleByTypeOrCategorie,
      typeDoc,
      formats,
      reglesConservations,
      addDocument,
      documentForm,
      typeOptions,
      formatOptions,
      organisationOptions,
      tagOptions,
    };
  },
});
</script>