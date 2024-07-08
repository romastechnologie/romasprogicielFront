<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link 
            class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
            to="/categorieBiens/ajouter-categorieBien"
          >
            <i class="flaticon-plus position-relative ms-5 fs-12"></i>
            Ajouter une categorie de bien
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
          <form class="search-box position-relative me-15" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black rounded-0 border-0"
              placeholder="Rechercher un utilisateur"
            />
            <button
              type="submit"
              class="bg-transparent text-primary transition p-0 border-0"
            >
              <i class="flaticon-search-interface-symbol"></i>
            </button>
          </form>
          <!-- <button
            class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
            type="button"
          >
            <i class="flaticon-dots"></i>
          </button> -->
        </div>
      </div>
      <div class="card-body p-15 p-sm-20 p-md-25">
        <div class="table-responsive">
          <table  class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Référence
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  Code
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Libelle
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date
                </th>
                
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for ="(categorieBien, index) in categorieBiens" :key="index">
                  <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    {{ categorieBien.libelle }}
                  </th>
                  <td class="shadow-none lh-1 fw-medium ">{{ categorieBien.code }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ categorieBien.libelle }} </td>
                  <td class="shadow-none lh-1 fw-medium">{{ format_date(categorieBien.createdAt) }} </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                    <div class="dropdown">
                        <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Actions
                            <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                        </span>
                        <ul class="dropdown-menu">
                          
                          <li>
                            <router-link
                              class="dropdown-item d-flex align-items-center"
                              :to="{ name: 'EditCategorieBien',params: { id: categorieBien.id } }"
                            >
                              <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                              Modifier
                            </router-link>
                          </li>
                          <li>
                            <a
                              class="dropdown-item d-flex align-items-center"
                              href="javascript:void(0);"
                              @click="suppression(categorieBien.id, categorieBiens, 'categorieBiens', 'un utilisateur')"
                            >
                              <i
                                class="flaticon-delete lh-1 me-8 position-relative top-1"
                              ></i>
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
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref} from "vue";
  import ApiService from "@/services/ApiService";
  import { CategorieBien } from "@/models/CategorieBien";
  import { format_date, suppression, error, } from "@/utils/utils";
  
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeBien",
    components: {
      PaginationComponent
    },
    setup(){
      onMounted(() => {
        getAllBiens();
      });
  
      const categorieBiens = ref<Array<CategorieBien>>([]);
      const categorieBien = ref<CategorieBien>();
  
      // BEGIN PAGINATE
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllBiens(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllBiens(page.value, limit.value, searchTerm.value );
      }
  
  
      // END PAGINATE
  
      function getAllBiens(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/categories?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            categorieBiens.value = data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
      }
  
      const selectedBien = ref<CategorieBien | undefined>(undefined);
  
    const openEditAgenceModal = (categorieBien: CategorieBien) => {
      selectedBien.value = { ...categorieBien };
    };
  
    const openEditPassModal = (categorieBien: CategorieBien) => {
      selectedBien.value = { ...categorieBien };
    };
  
    const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
  const checkPermission = (name) => {
    return privileges.value.includes(name);
  }
  
      return {categorieBiens,
        checkPermission,
        format_date,
        suppression,
        categorieBien,
        selectedBien,
        openEditAgenceModal,
        openEditPassModal,
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