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
          data-bs-target="#AddPosteModal">
          <i class="fa fa-plus-circle"></i>
          Ajouter un poste
        </a>
       
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher une fonction"
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
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                CODE555
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                LIBELLE
              </th>
             
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(poste, index) in postes" :key="index">
              <td class="shadow-none lh-1 fw-medium">
                {{ poste.code }}
              </td>
              <td class="shadow-none lh-1 fw-medium">
                {{ poste.libelle }}
              </td>
              
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary pe-0"
              >
              <div class="dropdown">
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
              <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                <li class="dropdown-item d-flex align-items-center">
                  <a  href="javascript:void(0);" @click="moddifier(poste)" data-bs-toggle="modal"
                       data-bs-target="#AddPosteModal">
                  <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                  </a>
                </li>
                <li class="dropdown-item d-flex align-items-center">
                  <a href="javascript:void(0);"
                      @click="suppression(poste.id,postes,'postes',`le poste ${poste.libelle}`)">  <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
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
  <AddPosteModal 
  @get-all-postes="getAllPostes"
  :id="idposte"
  @openmodal="showModalEdite"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import AddPosteModal from "./AddPosteModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression,separateur, error, } from "@/utils/utils";
import { Poste } from "@/models/Poste";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtFonction from "@/services/JwtService";

export default defineComponent({
  name: "ListePoste",
  components: {
    AddPosteModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllPostes();
    });

    const postes = ref<Array<Poste>>([]);
    const idposte = ref(0);

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllPostes(page_, limit_);
      } catch (error) {
        //
        
      }
    };
    function rechercher(){
      getAllPostes(page.value, limit.value, searchTerm.value );
    }
    // END PAGINATE

    function getAllPostes(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/postes?page=${page}&limit=${limi}&mot=${searchTerm}&`)
      //return ApiService.get('/fonctions')
        .then(({ data }) => {
          postes.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(obj:Poste) {
      idposte.value = obj.id;
    }

    function showModalEdite(el){
      showModal(el);
      idposte.value = 0;
    }

    const privileges = ref<Array<string>>(JwtFonction.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }


    return { suppression,
      checkPermission,
      postes,
      format_date,
      getAllPostes,
      idposte,
      moddifier,
      showModalEdite,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      separateur,
      rechercher,
    };
  },

 
});
</script>