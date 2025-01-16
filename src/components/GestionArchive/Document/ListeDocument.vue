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
            <input type="text" v-model="searchTerm" @keyup="rechercher" class="form-control shadow-none text-black"
              placeholder="Rechercher un document" />
            <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
              <i class="flaticon-search-interface-symbol"></i>
            </button>
          </form>
        </div>
      </div>

      <div class="col-md-12">
      <div class="row"> 
          <div class="col-md-3 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
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

          <div class="col-md-4 mb-2">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
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
              <ErrorMessage name="categorie" class="text-danger"/>
            </div>
          </div>

          <div class="col-md-3 mb-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Type de Document <span class="text-danger">*</span>
              </label>
              <Field v-model="typeDoc" name="typeDocument" v-slot="{ field }">
                <Multiselect
                  :options="typeOptions" 
                  :searchable="true"
                  v-model="field.value"
                  v-bind="field"
                  placeholder="Sélectionner le type de document"
                />
              </Field>
              <ErrorMessage name="typeDoc" class="text-danger"/>
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
                <td class="shadow-none lh-1 fw-medium ">
              <span v-for="(val, index) in document?.regleDocuments" :key="index"
                class="badge bg-info text-dark me-1">
                {{ val.regleType?.categoriedocument?.libelle || 'Non renseigné' }}
              </span>
            </td>

                <td>
                  <span :class="getStatusClass(document.statut)">
                    {{ document.statut }}
                  </span>
                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                  <div class="dropdown">
                    <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">Actions</button>
                    <ul class="dropdown-menu">
                      <!-- Options pour changer le statut -->
                      <li>
                        <a class="dropdown-item" href="javascript:void(0);"
                          @click="changerStatut(document.id, 'Brouillon')">
                          Brouillon
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="javascript:void(0);"
                          @click="changerStatut(document.id, 'En attente')">
                          En attente
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="javascript:void(0);"
                          @click="changerStatut(document.id, 'Validé')">
                          Validé
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="javascript:void(0);"
                          @click="changerStatut(document.id, 'Rejeté')">
                          Rejeté
                        </a>
                      </li>

                      <li class="dropdown-item d-flex align-items-center">
                        <router-link :to="{ name: 'ViewDocument', params: { id: document.id } }"
                          class="dropdown-item d-flex align-items-center">
                          <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                          <p><strong>Détails</strong></p>
                        </router-link>
                      </li>
                      <li class="dropdown-item d-flex align-items-center">
                        <router-link :to="{ name: 'EditDocumentPage', params: { id: document.id } }" >
                          <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                          Modifier
                        </router-link>
                      </li>
                      <li class="dropdown-item d-flex align-items-center">
                        <a href="javascript:void(0);"
                          @click="suppression(document.id, documents, 'documents', `le document ${document.nom}`)">
                          <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>
                          Supprimer
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
          <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
            @paginate="handlePaginate" />
        </div>
      </div>
    </div>
  
</template>

<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import ApiService from "@/services/ApiService";
import { Document } from "@/models/Document";
import { format_date,format_Date, suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import { Field } from "vee-validate";
import Multiselect from "@vueform/multiselect/src/Multiselect";


export default defineComponent({
  name: "ListeDocument",
  components: {
    PaginationComponent,
    Field,
    Multiselect

  },
  setup() {
    onMounted(() => {
      getAllDocuments();
      fetchCategorieDocuments();
      fetchTypeDocuments();
      rechercher();
    });

    const documents = ref<Array<any>>([]);
    const document = ref<Document>();

    const categorieOptions = ref([]);
    const typeOptions = ref([]);

    const searchTerm = ref('');
    const dateFinConservation = ref('');
    
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const categorie = ref('');
    const typeDoc= ref('');


    const handlePaginate = ({ page, limit }) => {
      try {
        page.value = page;
        getAllDocuments(page, limit);
      } catch (error) {
        //
      }
    };

    // Fonction pour changer le statut d'un document
const changerStatut = (id, nouveauStatut) => {
  const doc = documents.value.find((d) => d.id === id);
  if (doc) {
    doc.statut = nouveauStatut;
  }
};

// Fonction pour retourner une classe CSS en fonction du statut
const getStatusClass = (statut) => {
  switch (statut) {
    case "Brouillon":
      return "badge bg-secondary";
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


  watch(categorie, () => {
      rechercher();
    });

    watch(typeDoc, () => {
      rechercher();
    });

    watch(dateFinConservation, () => {
      rechercher();
    });

     function rechercher()  {
  getAllDocuments(page.value, limit.value, categorie.value,typeDoc.value,dateFinConservation.value);
};


    function getAllDocuments(page = 1, limi = 10, categorie = '' ,  typeDoc = '', dateFinConservation = '' ,searchTerm = '') {
      return ApiService.get(`/documents?page=${page}&limit=${limi}&categoriedocument=${categorie}&typeDocument=${typeDoc}&dateFinConservation=${dateFinConservation}&mot=${searchTerm}&`)
        .then(({ data }) => {
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
      categorieOptions,
      typeOptions,
      dateFinConservation,
      changerStatut,
      getStatusClass,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      format_Date
    };
  },
});
</script>