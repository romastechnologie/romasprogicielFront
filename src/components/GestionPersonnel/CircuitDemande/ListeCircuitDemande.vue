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
          data-bs-target="#AddCircuitDemandeModal"
        >
          <i class="fa fa-plus-circle"></i> Ajouter une catégorie de demande
        </a>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher une catégorie"
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Catégorie Demande
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Circuit
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Statut
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(circuitDemande, index) in circuitDemandes" :key="index">
              <td class="shadow-none lh-1 fw-medium ">{{circuitDemande.categorie?.libelle}} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ circuitDemande.circuit?.nom}} </td>
              <td class="shadow-none lh-1 fw-medium">
                <span
                  :class="{
                    'badge': true,
                    'bg-success': circuitDemande.statut === true,
                    'bg-danger': circuitDemande.statut === false
                  }"
                >
                  {{ circuitDemande.statut === true ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-black pe-0"
              >
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);" @click="moddifier(circuitDemande)">
                      <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);"
                        @click="suppression(circuitDemande.id,circuitDemandes,'circuitDemandes',`le circuit de demande ${circuitDemande.nom}`)">  
                        <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i> Supprimer
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
  <AddCircuitDemandeModal
    @get-all-circuitDemandes="getAllCircuitDemandes"
    :id="idcircuitDemande"
    @openmodal="showModalEdite"
    @close="recharger"
    @refreshCircuitDemandes="refreshCircuitDemandes"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref  } from "vue";
import AddCircuitDemandeModal from "./AddCircuitDemandeModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import { CircuitDemande } from "@/models/CircuitDemande";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeCircuitDemande",
  components: {
    AddCircuitDemandeModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllCircuitDemandes();
    });

    const circuitDemandes = ref<Array<CircuitDemande>>([]);
    const idcircuitDemande = ref(0);
    // const circuitDemande = ref<CircuitDemande>();
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
        getAllCircuitDemandes(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllCircuitDemandes(page.value, limit.value, searchTerm.value );
    }

    const recharger = () => {
      getAllCircuitDemandes();
    };
    // END PAGINATE

    onMounted(() => {
      loading.value=false;
      getAllCircuitDemandes()
    });

    const refreshCircuitDemandes = () => {
        getAllCircuitDemandes();
    };

    function getAllCircuitDemandes(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`all/circuitDemandes?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          circuitDemandes.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(EditcircuitDemande:CircuitDemande) {
      idcircuitDemande.value = EditcircuitDemande.id;
    }

    function showModalEdite(model:any){
      showModal(model);
      idcircuitDemande.value=0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkCircuitDemande = (name:string) => {
      return privileges.value.includes(name);
    }

    return {suppression,
      checkCircuitDemande,
     circuitDemandes,
      format_date,
      getAllCircuitDemandes,
      idcircuitDemande,
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
      refreshCircuitDemandes,
     };
  },

 
});
</script>