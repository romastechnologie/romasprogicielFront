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
            data-bs-target="#AddMouvementModal"
          >
          <i class="fa fa-plus-circle"></i>
            <!-- <i class="fa fa-plus-circle"></i> -->
            Ajouter un mouvement
          </a>
         
        </div>
        <div class="d-flex align-items-center">
          <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher un mouvement"
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
              <!-- <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Type Sortie
                </th>--> 
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Document
                  
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >DATE DE Mouvement
                  
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >Statut
                  
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mouvement, index) in mouvements" :key="index">
                <!--<td class="shadow-none lh-1 fw-medium text-black">
                  {{ mouvement.typeMouvement }}
                </td>-->
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ mouvement.document?.nom }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ format_date(mouvement.createdAt)  }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  <span :class="getStatutBadge(mouvement?.statut).badgeClass">
                  {{ getStatutBadge(mouvement.statut).text }}
                </span>
                </td>
                <td
                  class="shadow-none lh-1 fw-medium text-black pe-0"
                >
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                 <!--- <li class="dropdown-item d-flex align-items-center">
                    <router-link  href="javascript:void(0);" @click="moddifier(mouvement)">
                    <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                    </router-link>
                  </li>-->
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);"
                        @click="suppression(mouvement.id,mouvements,'mouvement',`le mouvement ${mouvement.id}`)">  <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
                         Supprimer
                    </a>
                  </li>
                </ul>
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
    <AddMouvementModal
      @get-all-mouvements="getAllMouvements"
      :id="idmouvement"
      @openmodal="showModalEdite"
      @close="recharger"
      @refreshMouvements="refreshMouvements"
    />
  </template>
  <script lang="ts">
  import { defineComponent, onMounted, ref  } from "vue";
  import AddMouvementModal from "./AddMouvementModal.vue";
  import ApiService from "@/services/ApiService";
  import { format_date, showModal, suppression, error, } from "@/utils/utils";
  import { useRouter } from "vue-router";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeMouvement",
    components: {
      AddMouvementModal,
      PaginationComponent
    },
    setup: () => {
  
      onMounted(() => {
        getAllMouvements();
      });
  
      const mouvements = ref<Array<any>>([]);
      const idmouvement = ref(0);
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
          getAllMouvements(page_, limit_);
        } catch (error) {
          //
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
  
       function rechercher(){
        getAllMouvements(page.value, limit.value, searchTerm.value );
      }
  
      const recharger = () => {
        getAllMouvements();
      };
      // END PAGINATE
  
      onMounted(() => {
        loading.value=false;
        getAllMouvements()
      });
  
      const refreshMouvements = () => {
          getAllMouvements();
      };
  
      function getAllMouvements(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/mouvements?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            mouvements.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
      }
      
      function moddifier(Editmouvement:any) {
        idmouvement.value = Editmouvement.id;
      }
  
      function showModalEdite(model:any){
        showModal(model);
        idmouvement.value=0;
      }
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkMouvement = (name:string) => {
        return privileges.value.includes(name);
      }
  
      return {suppression,
        checkMouvement,
       mouvements,
       format_date,
        getAllMouvements,
        idmouvement,
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
        refreshMouvements,
        getStatutBadge
       };
    },

  });
  </script>