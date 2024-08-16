<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/livraisons/ajouter-livraison"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une livraison
        </router-link>
        <!-- <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddLivraisonModal"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter une livraison
        </a> -->
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
            placeholder="Rechercher une livraison"
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
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
              Commande
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Date
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Livraison
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Livreur
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(livraison, index) in livraisons" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ livraison.reference }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(livraison.createdAt)  }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ livraison.date }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-primary">
                {{ livraison.montant }}
              </td>
              <!-- <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(livraison.createdAt)  }}
              </td> -->
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
              >
              <div class="dropdown">
                  <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Actions
                      <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <!-- <li>
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="editLivraison(livraison.id)"
                      >
                        <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Modifier
                      </a>
                    </li> -->
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(livraison.id,livraisons,'livraisons',`l' livraison ${livraison.reference}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
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
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
  <!-- <AddLivraisonModal @get-all-Livraisons="getAllLivraisons"
    :id="idLivraison"
    @openmodal="showModalEdite"
    @close="recharger" /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
// import AddLivraisonModal from "./AddLivraisonModal.vue";
import { Livraison } from "@/models/Livraison";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeLivraison",
  components: {
    // AddLivraisonModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllLivraisons();
    });

    const livraisons = ref<Array<Livraison>>([]);
    const idLivraison = ref(0);
    const selectedItem = ref(0);

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllLivraisons(page_, limit_);
      } catch (error) {
        //
      }
    };
    function rechercher(){
      getAllLivraisons(page.value, limit.value, searchTerm.value );
    }
    // END PAGINATE
    

    const editLivraison = (id: number) => {
      selectedItem.value = id;
    };

    const recharger = () => {
      getAllLivraisons();
    };
    function getAllLivraisons(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/livraisons?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          const donnees = data.data.data;
          livraisons.value = donnees;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(EditLivraison:Livraison) {
      idLivraison.value = EditLivraison.id;
    }

    function showModalEdite(model){
      showModal(model);
      idLivraison.value=0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }

    return {suppression,
      checkPermission,
      livraisons,
      format_date,
      getAllLivraisons,
      idLivraison,
      moddifier,
      showModalEdite,
      editLivraison,
      selectedItem ,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      recharger
     };
  },


});
</script>