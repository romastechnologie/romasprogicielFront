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
          data-bs-target="#AddTypesDepensesModal"
        >
        <i class="fa fa-plus-circle"></i>
          <!-- <i class="fa fa-plus-circle"></i> -->
          Ajouter un type de dépense
        </a>
       
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un type"
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
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Libelle
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >Description
                
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(typeDepense, index) in typesDepenses" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ typeDepense.libelle }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ typeDepense.description }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-black pe-0"
              >
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
              <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                <li class="dropdown-item d-flex align-items-center">
                  <a  href="javascript:void(0);" @click="moddifier(typeDepense)">
                  <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                  </a>
                </li>
                <li class="dropdown-item d-flex align-items-center">
                  <a href="javascript:void(0);"
                      @click="suppression(typeDepense.id,typesDepenses,'typesDepenses',`le type ${typeDepense.libelle}`)">  <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
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
  <AddTypesDepensesModal
    @get-all-typesDepenses="getAllTypesDepenses"
    :id="idtypeDepense"
    @openmodal="showModalEdite"
    @close="recharger"
    @refreshTypesDepenses="refreshTypesDepenses"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import AddTypesDepensesModal from "./AddTypesDepensesModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import { TypeDepense } from "@/models/TypeDepense";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeTypeDepense",
  components: {
    AddTypesDepensesModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllTypesDepenses();
    });

    const typesDepenses = ref<Array<TypeDepense>>([]);
    const idtypeDepense = ref(0);
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
        getAllTypesDepenses(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllTypesDepenses(page.value, limit.value, searchTerm.value );
    }

    const recharger = () => {
      getAllTypesDepenses();
    };
    // END PAGINATE

    onMounted(() => {
      loading.value=false;
      getAllTypesDepenses()
    });

    const refreshTypesDepenses = () => {
        getAllTypesDepenses();
    };

    function getAllTypesDepenses(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/typesDepenses?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          typesDepenses.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(EdittypeDepense:TypeDepense) {
      idtypeDepense.value = EdittypeDepense.id;
    }

    function showModalEdite(model:any){
      showModal(model);
      idtypeDepense.value=0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkType = (name:string) => {
      return privileges.value.includes(name);
    }

    return {suppression,
      checkType,
     typesDepenses,
      getAllTypesDepenses,
      idtypeDepense,
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
      refreshTypesDepenses,
     };
  },

 
});
</script>