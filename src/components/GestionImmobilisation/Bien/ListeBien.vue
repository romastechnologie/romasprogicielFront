<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
           class="btn btn-primary"
            to="/biens/ajouter-bien"
          >
          <i class="fa fa-plus-circle"></i>
            Ajouter un bien
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
                  Référence du Bien
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  Nom Bien
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Cout Acquisition
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date acquisition
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date de mise en Service
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                Duree de vie
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                Numéro d'enregistrement
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
                >Code Bar</th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Valeur Nette Comptable
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
              <tr  v-for ="(bien, index) in biens" :key="index">
                  <td class="shadow-none lh-1 fw-medium ">{{ bien.refBien }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ bien.nomBien }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ bien?.coutAcquisition }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ format_date(bien?.dateAcquisition) }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ format_date(bien.dateMiseEnService) }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ bien.dureeVie }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ bien.numeroEnregistrement }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ bien.codeBar }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ bien.valeurNetteComptable }} </td>
                  <td class="shadow-none lh-1 fw-medium">{{ format_date(bien.createdAt) }} </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                    <div class="dropdown">
                      <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>

                        <ul class="dropdown-menu">
                          
                          <li class="dropdown-item d-flex align-items-center">
                            <router-link
                              
                              :to="{ name: 'EditBien',params: { id: bien.id } }"
                            >
                              <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                              Modifier
                            </router-link>
                          </li>
                          <li  class="dropdown-item d-flex align-items-center">
                            <a
                             
                              href="javascript:void(0);"
                              @click="suppression(bien.id, biens, 'biens', 'un utilisateur')"
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
  import { Bien } from "@/models/Bien";
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
  
      const biens = ref<Array<Bien>>([]);
      const bien = ref<Bien>();
  
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
        return ApiService.get(`/all/biens?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            biens.value = data.data;
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
  
      return {biens,
        checkPermission,
        format_date,
        suppression,
        bien,
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