<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link class="btn btn-primary" to="/tresoreries/ajouter-tresorerie">
          <i class="fa fa-plus-circle"></i>
          Ajouter une trésorerie
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher une trésorerie"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
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
              <th scope="col">Nom de trésorerie</th>
              <th scope="col">Montant</th>
              <th scope="col">Type de trésorerie</th>
              <th scope="col">Operation</th>
              <th scope="col">Date de création</th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tresorerie in tresorerieList" :key="tresorerie.id">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ tresorerie.nom }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ separateur(tresorerie.montant) }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ tresorerie?.typeTresorerie.libelle }}</td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                <span v-if="tresorerie.operation == 1">oui</span>
                <span v-if="tresorerie.operation == 0">non</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ format_Date(tresorerie.dateCreation) }}</td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="suppression(tresorerie.id, tresorerieList, 'tresoreries', `la tresorerie ${tresorerie.id}`)"
                      >
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
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
      <div>
        <ul>
          <li>
            <h1>Trésorerie Générale: {{ separateur(total()) }}</h1>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { format_Date, separateur, suppression, error } from "@/utils/utils";
import PaginationComponent from "@/components/Utilities/Pagination.vue";

export default defineComponent({
  name: "ListeTresorerie",
  components: {
    PaginationComponent
  },
  setup() {
    onMounted(() => {
      getAllTresoreries();
    });

    const tresorerieList = ref([]);
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    function getAllTresoreries(pageNum = 1, limi = 10, search = '') {
      return ApiService.get(`/all/tresoreries?page=${pageNum}&limit=${limi}&mot=${search}`)
        .then(({ data }) => {
          tresorerieList.value = data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    function rechercher() {
      getAllTresoreries(page.value, limit.value, searchTerm.value);
    }

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllTresoreries(page_, limit_, searchTerm.value);
      } catch (error) {
        console.error("Erreur lors de la pagination:", error);
      }
    };

    const deleteTresorerie = async (id: any) => {
      Swal.fire({
        title: 'Etes-vous sûr?',
        text: "Vous voulez vraiment supprimer cette trésorerie !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ddd',
        cancelButtonText: 'Non',
        confirmButtonText: 'Oui!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await ApiService.delete(`/tresoreries/${id}`).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Trésorerie supprimée avec succès!',
              showConfirmButton: false,
              timer: 1000
            });
            rechercher();
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Erreur de suppression!',
              showConfirmButton: false,
              timer: 1000
            });
            console.error('Erreur détectée pendant la suppression:', err);
          });
        }
      });
    };

    const total = () => {
      return tresorerieList.value.reduce((sum, tresorerie) => sum + tresorerie.montant, 0);
    };

    return {
      tresorerieList,
      page,
      totalPages,
      limit,
      totalElements,
      searchTerm,
      getAllTresoreries,
      rechercher,
      handlePaginate,
      deleteTresorerie,
      total,
      format_Date,
      separateur,
      suppression,
      error
    };
  }
});
</script>