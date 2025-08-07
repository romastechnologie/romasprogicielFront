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
            data-bs-target="#AddModePaiementModal"
          >
          <i class="fa fa-plus-circle"></i>
            Ajouter un mode de paiement
          </a>
        
        </div>
        <div class="d-flex align-items-center">
          <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher un mode de paiement"
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
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Code 
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Libellé
                  
                </th>
                
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >DATE DE CREATION
                  
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(modepaiement, index) in modepaiements" :key="index">
                <td class="shadow-none lh-1 fw-medium text-black">
                  {{ modepaiement.code }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ modepaiement.libelle }}
                </td>
               
                 <!-- <div class="row">
                          <span v-for="(roleEthnie,index) in ethnie.roleEthnies" :key="index" class="text-center">
                          <div class="col-12">
                          <div class="col-6">
                           <span class="badge badge-primary"  v-if="roleEthnie.role">{{ roleEthnie.role.description }}</span> 
                          </div><br>
                          </div>
                          </span>
                      </div>
                </td> -->
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ format_date(modepaiement.createdAt)  }}
                </td>
                <td
                  class="shadow-none lh-1 fw-medium text-black pe-0"
                >
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center">
                    <a  href="javascript:void(0);" @click="moddifier(modepaiement)">
                    <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);"
                        @click="suppression(modepaiement.id,modepaiements,'modepaiements',`mode de paiement ${modepaiement.libelle}`)">  <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
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
    <AddModePaiementModal
      @get-all-modepaiements="getAllModePaiements"
      :id="idmodepaiement"
      @openmodal="showModalEdite"
      @close="recharger"
      @refreshModePaiements="refreshModePaiements"
    />
  </template>
  <script lang="ts">
  import { defineComponent, onMounted, ref  } from "vue";
  import AddModePaiementModal from "./AddModePaiementModal.vue";
  import ApiService from "@/services/ApiService";
  import { format_date, showModal, suppression, error, } from "@/utils/utils";
  import { useRouter } from "vue-router";
  import { ModePaiement } from "@/models/ModePaiement";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeModePaiement",
    components: {
      AddModePaiementModal,
      PaginationComponent
    },
    setup: () => {
  
      onMounted(() => {
        getAllModePaiements();
      });
  
      //const ethnies = ref<Array<EthnieData>>([]);
      const idmodepaiement = ref(0);
      const modepaiements = ref<ModePaiement>();
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
          getAllModePaiements(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllModePaiements(page.value, limit.value, searchTerm.value );
      }
  
      const recharger = () => {
        getAllModePaiements();
      };
      // END PAGINATE
  
      onMounted(() => {
        loading.value=false;
        getAllModePaiements()
      });
  
      const refreshModePaiements = () => {
          getAllModePaiements();
      };
  
      function getAllModePaiements(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/modepaiements?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            modepaiements.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
      }
      
      function moddifier(Editmodepaiement:ModePaiement) {
        idmodepaiement.value = Editmodepaiement.id;
      }
  
      function showModalEdite(model:any){
        showModal(model);
        idmodepaiement.value=0;
      }
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkModePaiement = (name:string) => {
        return privileges.value.includes(name);
      }
  
      return {suppression,
        checkModePaiement,
       modepaiements,
        format_date,
        getAllModePaiements,
        idmodepaiement,
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
        refreshModePaiements,
       };
    },
  
   
  });
  </script>