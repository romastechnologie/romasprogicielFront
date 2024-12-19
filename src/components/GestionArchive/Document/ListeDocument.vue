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

    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Référence</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Nom Document</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Description</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Date fin
                conservation</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Tag</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Organisation</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Emplacement</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Statut</th>
              <th scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(document, index) in documents" :key="index">
              <td class="shadow-none lh-1 fw-medium">{{ document?.refDoc }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ document?.nom }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ document?.description }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ format_date(document.dateFinConservation) }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ document?.tagDoc?.libelle }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ document?.organisation?.nom }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ document?.emplacement?.code }}</td>
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
                    <li>
                      <a class="dropdown-item" href="javascript:void(0);"
                        @click="changerStatut(document.id, 'Brouillon')">Brouillon</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="javascript:void(0);"
                        @click="changerStatut(document.id, 'En attente')">En attente</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="javascript:void(0);"
                        @click="changerStatut(document.id, 'Validé')">Validé</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="javascript:void(0);"
                        @click="changerStatut(document.id, 'Rejeté')">Rejeté</a>
                    </li>
                    <li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'ViewDocument', params: { id: document.id } }"
                        class="dropdown-item d-flex align-items-center">
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        <p><strong>Détails</strong></p>
                      </router-link>
                    </li>
                    <li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'EditDocumentPage', params: { id: document.id } }">
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </router-link>
                    </li>
                    <li class="dropdown-item d-flex align-items-center">
                      <a href="javascript:void(0);"
                        @click="suppression(document.id, documents, 'documents', le document ${document.nom})">
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
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Document } from "@/models/Document";
import { format_date, suppression, error, getUrlApiForFiles } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import FilterDocument from "@/components/GestionArchive/Document/FilterDocument.vue";  // Import du composant

export default defineComponent({
  name: "ListeDocument",
  components: {
    PaginationComponent,
    FilterDocument  // Déclaration du composant
  },
  setup() {
    onMounted(() => {
      getAllDocuments();
    });

    const documents = ref<Array<any>>([]);
    const document = ref<Document>();

    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllDocuments(page_, limit_);
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

   function handleFilterChange(filters) {
    console.log("Événement capté dans le parent !");
    console.log("Filtres reçus :", filters);
    console.log("Filtres reçus :", filters);
    // Exemple de logique de filtrage
    this.filteredDocuments = this.documents.filter(doc => {
      return (
        (!filters.categorie || doc.categorie.includes(filters.categorie)) &&
        (!filters.dateFinConservation || doc.dateFinConservation === filters.dateFinConservation) &&
        (!filters.typeDoc || doc.typeDoc.includes(filters.typeDoc))
      );
    });
    console.log("Documents après filtrage :", this.filteredDocuments);
    
  }

    function rechercher() {
      getAllDocuments(page.value, limit.value, searchTerm.value);
    }

    function getAllDocuments(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(/documents?page=${page}&limit=${limi}&mot=${searchTerm}&)
        .then(({ data }) => {
          documents.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
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

    const applyFilters = (filters) => {
      // Intégration des filtres appliqués depuis DocumentFilters
      const filterParams = filters && Object.keys(filters).length
        ? Object.keys(filters)
          .map((key) => ${encodeURIComponent(key)}=${encodeURIComponent(filters[key] ?? '')})
          .join('&')
        : '';
    };

    return {
      documents,
      checkPermission,
      format_date,
      suppression,
      document,
      page,
      changerStatut,
      getStatusClass,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      handleFilterChange,
      searchTerm,
      rechercher,
      applyFilters,  // Fonction pour appliquer les filtres
    };
  },
});
</script>