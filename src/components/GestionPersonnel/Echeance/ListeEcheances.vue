<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#AddEcheanceModal">
          <i class="fa fa-plus-circle"></i>
          <!-- <i class="fa fa-plus-circle"></i> -->
          Ajouter une échéance
        </a>
        
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher"
            class="form-control shadow-none text-black" placeholder="Rechercher une echeance" />
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Date Echeance
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Montant
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Reste A Payer
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0">Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(echeance, index) in echeances" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(echeance.dateEcheance )}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ echeance.montant }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ echeance.resteAPaye }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block"
                  style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                  data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);" @click="moddifier(echeance)">
                      <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);"
                      @click="suppression(echeance.id, echeances, 'echeances', `l'echeance ${echeance.montant}`)">
                      <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
                      Supprimer
                    </a>
                  </li>
                </ul>
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
  <AddEcheanceModal @get-all-echances="getAllEcheances" :id="idEcheances"
    @openmodal="showModalEdite" @close="recharger" @refreshEcheances="refreshEcheances" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import AddEcheanceModal from "./AddEcheanceModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import { Echeance } from "@/models/Echeance";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeEcheances",
  components: {
    AddEcheanceModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllEcheances();
    });

    const echeances = ref<Array<Echeance>>([]);
    const idEcheances = ref(0);
    // const categorieDepenses = ref<categorieDepenses>();
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
        getAllEcheances(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllEcheances(page.value, limit.value, searchTerm.value);
    }

    const recharger = () => {
      getAllEcheances();
    };
    // END PAGINATE

    onMounted(() => {
      loading.value=false;
      getAllEcheances()
    });

    const refreshEcheances = () => {
      getAllEcheances();
    };

    function getAllEcheances(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/echeances?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          console.log("Valeurs recupérées",data);
          echeances.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }
    
    function moddifier(EditEcheances: Echeance) {
      idEcheances.value = EditEcheances.id;
    }

    function showModalEdite(model: any) {
      showModal(model);
      idEcheances.value = 0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkEcheances = (name:string) => {
      return privileges.value.includes(name);
    }

    return {
      suppression,
      checkEcheances,
      echeances,
      format_date,
      getAllEcheances,
      idEcheances,
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
      refreshEcheances,
    };
  },

 
});
</script>