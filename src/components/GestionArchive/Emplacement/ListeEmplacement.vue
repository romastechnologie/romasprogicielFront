<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddEmplacementModal"
        >
        <i class="fa fa-plus-circle"></i>
          <!-- <i class="fa fa-plus-circle"></i> -->
          Ajouter un emplacement
        </a>
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
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
           
            class="form-control shadow-none text-black"
            placeholder="Rechercher un emplacement"
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
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Code
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Description
               
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Type Emplacement
               
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Emplacement
               
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Catégorie document
               
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Type document
               
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
  <template v-for="(emplacement, index) in emplacements" :key="index">
    <!-- S'il y a des catégories, afficher une ligne par catégorie -->
    <tr v-if="emplacement.emplacementCategories.length" v-for="(cat, catIndex) in emplacement.emplacementCategories" :key="`${index}-${catIndex}`">
      <td class="shadow-none lh-1 fw-medium text-black">
        {{ emplacement.code }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ emplacement.description }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ emplacement.typeEmplacement?.libelle }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ emplacement.emplacement?.code }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ cat.categorie?.libelle }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ cat.typedocument?.libelle }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black pe-0">
        <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu dropdown-block">
          <li class="dropdown-item d-flex align-items-center">
            <a href="javascript:void(0);" @click="suppression(emplacement.id, emplacements, 'emplacements', `l'emplacement ${emplacement.code}`)">
              <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i> Supprimer
            </a>
          </li>
        </ul>
      </td>
    </tr>

    <!-- Si aucune catégorie, afficher une seule ligne vide pour les colonnes correspondantes -->
    <tr v-else>
      <td class="shadow-none lh-1 fw-medium text-black">
        {{ emplacement.code }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ emplacement.description }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ emplacement.typeEmplacement?.libelle }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        {{ emplacement.emplacement?.code }}
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        <!-- vide -->
      </td>
      <td class="shadow-none lh-1 fw-medium text-black-emphasis">
        <!-- vide -->
      </td>
      <td class="shadow-none lh-1 fw-medium text-black pe-0">
        <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Actions
        </button>
        <ul class="dropdown-menu dropdown-block">
          <li class="dropdown-item d-flex align-items-center">
            <a href="javascript:void(0);" @click="suppression(emplacement.id, emplacements, 'emplacements', `l'emplacement ${emplacement.code}`)">
              <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i> Supprimer
            </a>
          </li>
        </ul>
      </td>
    </tr>
  </template>
</tbody>
  
        </table>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
  <AddEmplacementModal
    @get-all-emplacements="getAllEmplacements"
    :id="idemplacement"
    @openmodal="showModalEdite"
    @close="recharger"
    @refreshEmplacements="refreshEmplacements"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import AddEmplacementModal from "./AddEmplacementModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import { Emplacement } from "@/models/Emplacement";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeEmplacement",
  components: {
    AddEmplacementModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllEmplacements();
    });

    const emplacements = ref<Array<Emplacement>>([]);
    const idemplacement = ref(0);
    const loading = ref<boolean>(false);
    const router = useRouter();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }: { page_: number, limit_: number }) => {
      try {
        page.value = page_;
        getAllEmplacements(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllEmplacements(page.value, limit.value, searchTerm.value );
    }

    const recharger = () => {
      getAllEmplacements();
    };
    // END PAGINATE

    onMounted(() => {
      loading.value=false;
      getAllEmplacements()
    });

    const refreshEmplacements = () => {
        getAllEmplacements();
    };

    function getAllEmplacements(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/emplacements?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          emplacements.value = data.data.data;
          console.log("EEEEEEERRRRRRRRR ===> ", data)
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
   
    function moddifier(Editemplacement:any) {
      idemplacement.value = Editemplacement.id;
    }

    function showModalEdite(model:any){
      showModal(model);
      idemplacement.value=0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkEmplacement = (name:string) => {
      return privileges.value.includes(name);
    }

    return {suppression,
      checkEmplacement,
     emplacements,
      format_date,
      getAllEmplacements,
      idemplacement,
      moddifier,
      showModalEdite,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      recharger,
      refreshEmplacements,
     };
  },

 
});
</script>