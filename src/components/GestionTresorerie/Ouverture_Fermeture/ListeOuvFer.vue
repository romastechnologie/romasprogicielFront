<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
            class="btn btn-primary"
            to="/ouv_fers/ajouter-ouv_fer"
          >
            <i class="fa fa-plus-circle"></i>
            Ouverture de caisse
          </router-link>
        </div>
         <!-- <div class="d-sm-flex align-items-center">
          <router-link
            class="btn btn-primary"
            to="/ouv_fers/ajouter-fermeture"
          >
            <i class="fa fa-plus-circle"></i>
            Fermeture de caisse
          </router-link>
      
        </div>-->
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher caisse"
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
               <!--        <th scope="col">id</th>-->
                            <th scope="col">Caisse</th>
                            <th scope="col">Fond de roulement</th>
                            <th scope="col">Solde</th>
                            <th scope="col">Chiffre d'affaire</th>    
                            <th scope="col">Ecart</th>
                            <th scope="col">Statut</th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ouvFer, index) in ouvFers" :key="index">
                      <!--<th>{{ ouvFer.id }}</th>-->
                             <th>{{ ouvFer.tresorerie?.nom }} </th>
                             <th>{{ separateur(ouvFer.fondDeRoulement) }}</th>
                             <th>{{ separateur(ouvFer.solde) }}</th>
                             <th>{{ separateur(ouvFer?.ouvFerId?.chiffreaffaire) }}</th>
                             <th>{{ separateur(ouvFer?.ecart) }}</th>
                             <th>
  <span
    :class="[
      'badge fs-15',
      ouvFer.status === 'Fermé' ? 'bg-danger' : 'bg-success'
    ]"
  >
    {{ ouvFer.status ? ouvFer.status : 'Ouvert' }}
  </span>
</th>
<td class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0">
  <button 
    v-if="ouvFer.status !== 'Fermé'" 
    class="btn btn-primary" 
    @click="updateStatut(ouvFer.id, 'Fermé')"
  >
    <i class="flaticon-lock lh-1 me-8 position-relative top-1"></i>Fermer
  </button>
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
  import Swal from "sweetalert2";
  import { OuvFer } from "@/models/OuvFer";
  import ApiService from "@/services/ApiService";
  import { suppression, error,separateur } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  export default defineComponent({
    name: "ListeOuvFer",
    components: {
      PaginationComponent
    },
    setup(){
      onMounted(() => {
        getAllOuvFers();
      });
      const ouvFers = ref<Array<OuvFer>>([]);   
      const ouvFer = ref<OuvFer>();
       const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllOuvFers(page_, limit_);
        } catch (error) {
        }
      };
       function rechercher(){
        getAllOuvFers(page.value, limit.value, searchTerm.value );
      }
      function getAllOuvFers(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/ouv_fers/?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            console.log("données", data)
            ouvFers.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
        
      } 
      function moddifier(EditouvFers:OuvFer) {
        ouvFer.value = EditouvFers;
      }
      const deleteOuvFer = (id: number) => {
        ApiService.delete(`/ouvFers/${id}`)
        .then(({ data }) => {
          Swal.fire({
            text: data.message,
            toast: true,
            icon: 'success',
            title: 'General Title',
            animation: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            heightAuto: false
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response.data.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Réssayer à nouveau!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn fw-semobold btn-light-danger",
            },
          });
        });
        for(let i = 0; i < ouvFers.value.length; i++) {
          if (ouvFers.value[i].id === id) {
             ouvFers.value.splice(i, 1);
          }
        }
      };
      function updateStatut(id: number, statut: string) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: `Voulez-vous vraiment fermer cette caisse ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, fermer',
    cancelButtonText: 'Annuler',
    reverseButtons: true,
    heightAuto: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme, effectuer la fermeture
      ApiService.put(`/updatestatut/${id}`, { statut })
        .then(({ data }) => {
          Swal.fire({
            text: data.message,
            toast: true,
            icon: 'success',
            title: 'Statut mis à jour',
            animation: false,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            heightAuto: false,
          });

          const index = ouvFers.value.findIndex((ouvFer) => ouvFer.id === id);
          if (index !== -1 && ouvFers.value[index].tresorerie) {
            ouvFers.value[index].tresorerie.status = statut;
          }
        })
        .catch(({ response }) => {
          Swal.fire({
            text: response.data.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Réessayer',
            heightAuto: false,
            customClass: {
              confirmButton: 'btn fw-semibold btn-light-danger',
            },
          });
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        text: 'Fermeture annulée',
        toast: true,
        icon: 'info',
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        heightAuto: false,
      });
    }
  });
}
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }
      return { ouvFers,
        checkPermission,
       getAllOuvFers,
       deleteOuvFer,
       moddifier ,
       suppression,
       page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      updateStatut,
      separateur
    };
    },
  });
  </script>