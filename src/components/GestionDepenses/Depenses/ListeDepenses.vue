<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link class="btn btn-primary" to="/Depenses/ajouter-depenses">
          <i class="fa fa-plus-circle"></i>
          Ajouter une Dépense
        </router-link>
        <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button> -->
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher"
            class="form-control shadow-none text-black" placeholder="Rechercher une dépense" />
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Libellé
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Description
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0">
                Entretien</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Planification Reparation
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Types Dépenses
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Categorie Depense
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Montant
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Motif
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0">
                Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(depense, index) in depenses" :key="index">
              <td class="shadow-none lh-1 fw-medium ">{{ depense.date }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.libelle }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense?.description }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.entretien }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.planificationReparation }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.typesDepenses }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.categoriesDepenses }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.montant }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ depense.motif }} </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                    aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu">
                    <li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'EditDepenses', params: { id: depense.id } }">
                        <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                        Modifier
                      </router-link>
                    </li>
                    <li class="dropdown-item d-flex align-items-center">
                      <a href="javascript:void(0);"
                        @click="suppression(depense.id, depenses, 'depenses', 'une depense')">
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
import { Depense } from "@/models/Depense";
import { suppression, error, } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeDepenses",
  components: {
    PaginationComponent
  },
  setup(){
    onMounted(() => {
      getAllDepenses();
    });
    const depenses = ref<Array<Depense>>([]);
    const depense = ref<Depense>();
    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllDepenses(page_, limit_);
      } catch (error) {
        //
      }
    };
    function rechercher() {
      getAllDepenses(page.value, limit.value, searchTerm.value);
    }
    // END PAGINATE
    function getAllDepenses(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/depenses?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          depenses.value = data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }
    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }
    return {
      depense,
      checkPermission,
      suppression,
      depenses,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher
    };
  },
});
</script>