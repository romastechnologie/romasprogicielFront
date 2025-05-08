<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
        <div class="d-sm-flex align-items-center">
          <router-link class="btn btn-primary" to="/documents/ajouter-document">
            <i class="fa fa-plus-circle"></i>
            Ajouter un document
          </router-link>
        </div>
        <div class="d-flex align-items-center">
          <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input type="text" name="mot" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
            aria-disabled="true" placeholder="Rechercher un document"/>
            <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
              <i class="flaticon-search-interface-symbol"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="col-md-12">
        <div class="container py-4 px-3">
        <div class="row gx-4"> 
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
              Date de Fin  Conservation
              </label>
              <Field 
                style="max-height: 42px;"
                v-model="dateFinConservation"
                name="dateFinConservation" 
                type="date" 
                aria-disabled="true"
                class="form-control shadow-none fs-md-15 text-black" 
               >
              </Field>
            </div>
          </div>

          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Catégorie Document <span class="text-danger">*</span>
              </label>
              <Field v-model="categorie"   name="categoriedocument" v-slot="{ field }">
                <Multiselect
                  :options="categorieOptions" 
                  :searchable="true"
                  v-bind="field"
                  placeholder="Sélectionner la Catégorie Document"
                />
              </Field>
              <ErrorMessage name="categoriedocument" class="text-danger"/>
            </div>
          </div>

          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Type d'archivage <span class="text-danger">*</span>
              </label>
              <Field v-model="typeDoc" name="typeDocument" v-slot="{ field }">
                <Multiselect
                  :options="typeOptions" 
                  :searchable="true"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le type d'archivage"
                />
              </Field>
              <ErrorMessage name="typeDocument" class="text-danger"/>
            </div>
          </div>

                <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
                Tag <span class="text-danger">*</span>
              </label>
              <Field name="tagDoc" v-model="_tagDoc" type="text" v-slot="{ field }">
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
                v-model="_organisations"
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
        </div>
      </div>
      </div>
      <div class="card-body p-15 p-sm-20 p-md-25">
        <div class="table-responsive">
          <table class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Référence
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Nom Document
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Description
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Date Fin
                  conservation</th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Tag</th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Organisation
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Emplacement
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Categorie Document
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  Statut
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Mouvement</th>

                <th scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(document, index) in documents" :key="index">
              
                <td class="shadow-none lh-1 fw-medium ">{{ document?.refDoc }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ document?.nom }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ document?.description }} </td>
                <td class="shadow-none lh-1 fw-medium">{{ format_Date(document.dateFinConservation) }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ document?.tagDoc?.libelle }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ document?.organisation?.nom }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ document?.emplacement?.code }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ document?.categorie?.libelle}} </td>
                <td>
                  <span :class="getStatusClass(document.statut)">
                    {{ document.statut }}
                  </span>
                </td>
                <td>
                  <span v-if="document?.mouvements?.length > 0" :class="getStatutBadge(document.mouvements[(document.mouvements.length - 1)].statut).badgeClass">
                  {{ getStatutBadge(document.mouvements[(document.mouvements.length - 1)].statut).text }}
                </span>
                <span v-else class="badge bg-secondary">
                  Aucun
                </span>

                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="d-flex justify-content-end gap-2">

                  <div class="dropdown">
                    <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Actions
                    </button>
                    <ul class="dropdown-menu">
                      <li v-for="action in getAvailableActions(document.statut)" :key="action.value">
                        <a class="dropdown-item badge text-outline-info" href="javascript:void(0);"
                          @click="changerStatut(document.id, action.value)">
                          {{ action.label }}
                        </a>
                      </li>
                      <li class="dropdown-item d-flex align-items-center">
                        <router-link :to="{ name: 'ViewDocument', params: { id: document.id } }"
                                    class="dropdown-item d-flex align-items-center">
                          <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                          <p><strong>Détails</strong></p>
                        </router-link>
                      </li>
                     <!-- <li class="dropdown-item d-flex align-items-center">
                        <router-link :to="{ name: 'EditDocumentPage', params: { id: document.id } }">
                          <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                          Modifier
                        </router-link>
                      </li>-->
                    </ul>
                  </div>

                  <div class="dropdown">
                    <button class="btn dropdown-toggle btn-secondary text-white" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                      Mouvmnt
                    </button>
                    <ul class="dropdown-menu">
                      <li v-if="getAvailableMouvements(document).length === 0">
                      <span class="dropdown-item text-muted">Aucun mouvement disponible</span>
                    </li>
                    <li v-for="mvt in getAvailableMouvements(document)" :key="mvt.value">
                      <a class="dropdown-item" href="javascript:void(0);"
                        data-bs-target="#create-task" data-bs-toggle="modal"
                        @click="openModal(document.id, mvt.value)">
                        {{ mvt.label }}
                      </a>
                    </li>
                  </ul>
                  </div>
                </div>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title" v-if="modeMouvement" >Voulez-vous traiter l'action "{{ mouvementLabel }}"sur ce document </h6>
        <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-8">
       
        <Form ref="mouvementForm" @submit="addMouvement" :validation-schema="mouvementSchema">
           
            
            <div class="row">

              <div class="col-md-12"  v-if="modeMouvement === 'Sortie'">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Personnel chargé de retrait <span class="text-danger">*</span>
                        </label>
                        <Field name="personnelR" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :filter-results="false" :min-chars="2"
                            :resolve-on-load="false" :delay="0" :searchable="true" :options-limit="300" :options="async (query) => {
                              const results = await getPersonnelByKey(query);
                              if (results && results.length > 0) {
                                return results;
                              } else if (query.length >= 3) {
                                return [{ value: '', label: 'Aucun enregistrement trouvé' }];
                              } else {
                                return [];
                              }
                            }" noOptionsText="Tapez au moins deux caractères" placeholder="Sélectionner un personnel" />
                        </Field>
                        <ErrorMessage name="personnel2" class="text-danger" />
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Personnel<span class="text-danger">*</span>
                        </label>
                        <Field name="personnel" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :filter-results="false" :min-chars="2"
                            :resolve-on-load="false" :delay="0" :searchable="true" :options-limit="300" :options="async (query) => {
                              const results = await getPersonnelByKey(query);
                              if (results && results.length > 0) {
                                return results;
                              } else if (query.length >= 3) {
                                return [{ value: '', label: 'Aucun enregistrement trouvé' }];
                              } else {
                                return [];
                              }
                            }" noOptionsText="Tapez au moins deux caractères" placeholder="Sélectionner un personnel" />
                        </Field>
                        <ErrorMessage name="personnel" class="text-danger" />
                      </div>
                    </div>
                    
       <div class="col-md-12 mb-3" v-if="modeMouvement === 'Deplacement'">
                <fieldset class="border rounded-3 p-1" >
                  <legend class="float-none w-auto px-3">
                    Destination
                  </legend>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Type Emplacement <span class="text-danger">*</span>
                        </label>
                        <Field name="typeEmplacementDestinataire" v-model="type2" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" v-bind="field" :options="typeEmplacementOptions" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="type emplacement" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="typeEmplacementDestinataire" class="text-danger" />
                      </div>
                    </div>
                   <div class="col-md-12">
                      <div class="form-group mb-15 mb-sm-20 mb-md-25">
                        <label class="d-block text-black mb-10">
                          Emplacement Destination <span class="text-danger">*</span>
                        </label>
                        <Field name="emplacementDestinataire" type="text" v-slot="{ field }">
                          <Multiselect v-model="field.value" :options="emplacementOptions2" v-bind="field" :preserve-search="true" :multiple="false"
                            :searchable="true" placeholder="emplacement" label="label"
                            track-by="label" />
                        </Field>
                        <ErrorMessage name="emplacementDestinataire" class="text-danger" />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Valider</button>
          </div>
          </Form>
      </div>
    </div>
  </div>
</div>
   <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
          <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
            @paginate="handlePaginate" />
        </div>
      </div>
    </div>
  
</template>
<script lang="ts">
import { defineComponent, onMounted, ref,watch,computed } from "vue";
import ApiService from "@/services/ApiService";
import { Document } from "@/models/Document";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { format_date,format_Date, suppression, showModal, hideModal, error,success } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import Multiselect from "@vueform/multiselect/src/Multiselect";
import * as Yup from 'yup';
import axios from "axios";
export default defineComponent({
  name: "ListeDocument",
  components: {
    PaginationComponent,
    Field,
    Multiselect,
    Form
  },
  setup() {
    onMounted(() => {
      getTypeDocument();
      getTypeEmplacement();
      getAllDocuments();
      fetchCategorieDocuments();
      fetchTypeDocuments();
      getAllOrganisations();
      getAllTags();
     
    });
    const mouvementSchema = Yup.object().shape({
      emplacementInitial: Yup.string().notRequired(),
      emplacementDestinataire: Yup.string().notRequired(),
      typeEmplacementSource:Yup.string().notRequired(),
      typeEmplacementDestinataire: Yup.string().notRequired(),
    //  document: Yup.string().required('Le document est obligatoire'),
   //   typeMouvement: Yup.string().required('Le type de mouvement est obligatoire'),
   //   typeDocument: Yup.string().required('Le type de document est obligatoire'),
      personnel: Yup.string().notRequired(),
      personnelR: Yup.string().notRequired(),

    });
    const documents = ref<Array<any>>([]);
    const document = ref<Document>();
    const categorieOptions = ref([]);
    const typeOptions = ref([]);
    const tagOptions = ref();
    const organisationOptions = ref();
    const searchTerm = ref('');
    const dateFinConservation = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const categorie = ref('');
    const typeDoc= ref('');
    const _organisations = ref('');
    const _tagDoc = ref('');
    const documentii = ref();
    const etatDocument = ref("Libre");
    const document1 = ref();
    const typeEmplacementOptions = ref<Array<any>>([]);
    const typeDocumentOptions = ref<Array<any>>([]);
    const typeMouv= ref();
    const type1 = ref();
    const type2 = ref();
    const modeMouvement = ref('');

    const getAvailableMouvements = (document: any) => {
  const mouvements = document?.mouvements || [];
  const dernierMouvement = mouvements.length > 0 ? mouvements[mouvements.length - 1].statut : null;

  const allMouvements = [
    { label: 'Retour', value: 'Retour' },
    { label: 'Sortie', value: 'Sortie' },
    { label: 'Deplacement', value: 'Deplacement' },
    { label: 'Destruction', value: 'Destruction' },
  ];

  switch (dernierMouvement) {
    case 0: // Retour
      return allMouvements.filter(m => m.value !== 'Retour');
    case 1: // Sortie
      return allMouvements.filter(m => m.value === 'Retour');
    case 2: // Destruction
      return []; // Aucune action disponible
    case 3: // Deplacement
      return allMouvements; // Tous les mouvements possibles
    default:
      return allMouvements; // Aucun mouvement effectué encore
  }
};

   
    const handlePaginate = ({ page_, limit_ }:{ page_: number, limit_: number }) => {
      try {
        page.value = page_;
        getAllDocuments(page_, limit_);
      } catch (error) {
        //
      }
    };
    watch(categorie, () => {
      rechercher();
    });
    watch(typeDoc, () => {
      rechercher();
    });
    watch(_tagDoc, () => {
      rechercher();
    });
    watch(_organisations, () => {
      rechercher();
    });
    watch(dateFinConservation, () => {
      rechercher();
    });


    
    const openModal = (id: number, mode: string) => {
  documentii.value = id;
  modeMouvement.value = mode;
 // showModal("create-task"); // ou comme tu ouvres ton modal
};

const mouvementLabel = computed(() => {
  switch (modeMouvement.value) {
    case 'Retour':
      return 'Retour de document';
    case 'Sortie':
      return 'Sortie de document';
    case 'Deplacement':
      return 'Déplacement de document';
    case 'Destruction':
      return 'Destruction de document';
    default:
      return modeMouvement.value;
  }
});


function triggerButtonClick(buttonId: string) {
  const button = window.document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    button.click();
  } else {
    console.error(`Button with ID "${buttonId}" not found.`);
  }
}

const addMouvement = async (values, { resetForm }) => {
  const doc = documents.value.find(d => d.id === documentii.value);
  
  if (doc?.emplacement?.id) {
    values["emplacementInitial"] = doc.emplacement.id;
  } else {
    values["emplacementInitial"] = null; 
  }

  values["document"] = documentii.value;
  values["typeMouvement"] = modeMouvement.value;

  console.log("mouvementdocument", values);

  ApiService.post("/mouvement/document1/", values)
    .then(({ data }) => {
      if (data.code === 201) {
        success(data.message);
        resetForm();
        getAllDocuments();
        triggerButtonClick("close-modal");
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};

    const changerStatut = async (id, nouveauStatut) => {
  const doc = documents.value.find((d) => d.id === id);
  if (doc) {
    doc.statut = nouveauStatut;
    await editDocument({ id: doc.id, statut: nouveauStatut });
  }
};
const editDocument = async (values) => { 
  try {
    const response = await ApiService.put(`/documents/${values.id}`, values);
    if (response.status === 200) {
      success(response.data.message);
      getAllDocuments(); 
    }
  } catch (error) {
    error(error.response?.data?.message || "Une erreur est survenue.");
  }
};
const getStatutBadge = (statut: number) => {
      switch (statut) {
        case 0:
          return {
            text: "Retour",
            badgeClass: "badge bg-secondary text-white",
          };
        case 1:
          return {
            text: "Sortie",
            badgeClass: "badge bg-info text-white",
          };
        case 2:
          return {
            text: "Destruction",
            badgeClass: "badge bg-danger text-white",
          };
          case 3:
          return {
            text: "Deplacement",
            badgeClass: "badge bg-primary text-white",
          };
        default:
          return {
            text: "",
            badgeClass: "badge bg-white text-danger",
          };
      }
    };

const getAvailableActions = (statut) => {
  const actions = [
    { label: "En attente", value: "En attente" },
    { label: "Validé", value: "Validé" },
    { label: "Rejeté", value: "Rejeté" },
  ];
  if (statut === "En attente") {
    return actions.filter(action => action.value !== "En attente");
  } else if (statut === "Validé" || statut === "Rejeté") {
    return [];
  }
  return actions;
};

const getStatusClass = (statut) => {
  switch (statut) {
    case "En attente":
      return "badge bg-warning";
    case "Validé":
      return "badge bg-success";
    case "Rejeté":
      return "badge bg-danger";
    default:
      return "badge bg-light";
  }
};
const fetchCategorieDocuments = async () => {
      ApiService.get("all/categorieDocuments")
      .then(({ data }) => {
        const donnees = data.data.data;
        categorieOptions.value = donnees.map((categorie) => {
          return {
            value: categorie.id,
            label: categorie.libelle,
          }
        });
      })
      .catch(({ response }) => {
        // error(response.data.message)
      });
    }
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
    const fetchTypeDocuments = async () => {
      ApiService.get("all/typedocuments")
      .then(({ data }) => {
        const donnees = data.data.data;
        typeOptions.value = donnees.map((type) => {
          return {
            value: type.id,
            label: type.nom,
          }
        });
      })
      .catch(({ response }) => {
        // error(response.data.message)
      });
    }
     function rechercher()  {
  getAllDocuments(page.value, limit.value,categorie.value,typeDoc.value,dateFinConservation.value,searchTerm.value,_tagDoc.value,_organisations.value);
};
    function getAllDocuments(page = 1, limi = 10, categorie = '' ,  typeDoc = '', dateFinConservation = '' ,searchTerm = '', _tagDoc='', _organisations='') {
      return ApiService.get(`/documents?page=${page}&limit=${limi}&categoriedocument=${categorie}&typeDocument=${typeDoc}&dateFinConservation=${dateFinConservation}&mot=${searchTerm}&organisation=${_organisations}&tagDoc=${_tagDoc}&`)
        .then(({ data }) => {
          console.log("docummentrecupéré",data);
          documents.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          console.log('dataNouveau',data.data);
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    const leDocu = ref()
    const lesDocuments = ref([])
    
    watch(document1, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
        leDocu.value = lesDocuments.value.find(objet => objet.id === newValue);
      }
    });


    const getTypeEmplacement = async () => {
      try {
        const response = await ApiService.get("/all/typeEmplacements");
        const typeEmplacementData = response.data.data.data;
        typeEmplacementOptions.value = typeEmplacementData.map(
          (typeEmplacement) => ({
            value: typeEmplacement.id,
            label: `${typeEmplacement.code} - ${typeEmplacement.libelle}`,
          })
        );
      } catch (error) {
        //
        console.log("Erreur ===> ",error)
      }
    }

    const getTypeDocument = async () => {
      try {
        const response = await ApiService.get("/tous/typedocuments");
        const typeDocumentData = response.data.data;
        typeDocumentOptions.value = typeDocumentData.map(
          (typeDoc) => ({
            value: typeDoc.id,
            label: `${typeDoc.code} - ${typeDoc.nom}`,
          })
        );
      } catch (error) {
        //
        console.log("Erreur ===> ",error)
      }
    }

     const documentByTypeOptions = ref([]);
     const getDocumentByType = async (type: any) => {
  try {
    if (!type) {
      console.error("Type de document invalide !");
      return;
    }
    const response = await axios.get(`documents/typeEmplacement/${type}/donnes`);
    
    if (response.status === 200) {
      const documentData = response.data.data;
      console.log("Documents récupérés :", documentData);

      lesDocuments.value = documentData;
      documentByTypeOptions.value = documentData.map((document) => ({
        value: document.id,
        label: `${document.nom} - ${document.refDoc}`,
      }));
    } else {
      console.error("Erreur de récupération :", response.status);
    }
  } catch (error) {
    console.error("Erreur ===> ", error);
  }
};

    const emplacementOptions1 = ref([])
    const getEmplacement1 = async (type: any) => {
      if (type && type != "") {
        try {
          const response = await ApiService.get(
            `/emplacement/by/${type}/typeemplacement`
          );
          const emplacementData = response.data.data;
          emplacementOptions1.value = emplacementData.map(
            (emplacement) => ({
              value: emplacement.id,
              label: `${emplacement.code}`,
            })
          );
        } catch (error) {
          //
          console.log("Erreur ===> ", error);
        }
      }else{
        emplacementOptions1.value = [];
      }
    };

    const emplacementOptions2 = ref([])
    const getEmplacement2 = async (type: any) => {
      if (type && type != "") {
        try {
          const response = await ApiService.get(
            `/emplacement/by/${type}/typeemplacement`
          );
          const emplacementData = response.data.data;
          emplacementOptions2.value = emplacementData.map(
            (emplacement) => ({
              value: emplacement.id,
              label: `${emplacement.code}`,
            })
          );
        } catch (error) {
          //
          console.log("Erreur ===> ", error);
        }
      }else{
        emplacementOptions2.value = [];
      }
    };

    const getDocumentByKey = async (valeur: any) => {
      try {
          const etat = etatDocument.value;
          const retourr = await axios.get(`get/documents/${valeur}/${etat}`);
          console.log("EEEEEEEE ===> ", retourr);
          const data = retourr.data.data.data;
          return data.map((da) => ({
          value: da.id,
          label: da.nom,
        }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }
    const getEmplacementByTypeEmplacementSource = async (valeur: any) => {
      try {
          const etat = etatDocument.value;
          const retourr = await axios.get(`empacement/documents/${valeur}/${etat}`);
          console.log("EEEEEEEE ===> ", retourr);
          const data = retourr.data.data.data;
          return data.map((da) => ({
          value: da.id,
          label: da.nom,
        }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }
    const getPersonnelByKey = async (valeur: any) => {
      try {
          const retourr = await axios.get(`/get/personnels/${valeur}`);
          const data = retourr.data.data;
          return data.map((da) => ({
            value: da.id,
            label: da.nom + " "+ da.prenom,
          }));
        } catch (error) {
          console.log("ERREREUR  ===> ", error)
        }
    }
  
    const type3 = ref();

    watch(type1, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
       getEmplacement1(newValue)
      }
    });
    watch(type2, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
       getEmplacement2(newValue)
      }
    });
    watch(type3, (newValue, oldValue) => {
      if (newValue != oldValue && newValue) {
        getDocumentByType(newValue)
      }
    });

    const privileges = ref<Array<string>>(JwtService.getPrivilege());
    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }
    return {
      documents,
      checkPermission,
      format_date,
      suppression,
      document,
      page,
      categorie,
      typeDoc,
      _organisations,
      _tagDoc,
      categorieOptions,
      typeOptions,
      dateFinConservation,
      organisationOptions,
      tagOptions,
      changerStatut,
      getStatusClass,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      format_Date,
      getAvailableActions,
      openModal,
     leDocu,
     lesDocuments,
     getEmplacement1,
     type3, 
     type1,
     emplacementOptions1,
     getDocumentByType,
     getPersonnelByKey,
     etatDocument,
     typeEmplacementOptions,
     typeDocumentOptions,
     getDocumentByKey,
     getEmplacementByTypeEmplacementSource,
     emplacementOptions2,
     typeMouv,
     addMouvement,
     mouvementSchema,
     modeMouvement,
     type2,
     getStatutBadge,
     mouvementLabel,
     getAvailableMouvements

     
    };
  },
});
</script>