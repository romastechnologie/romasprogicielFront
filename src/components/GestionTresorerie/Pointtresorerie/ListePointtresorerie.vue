<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/pointtresoreries/ajouter-pointtresorerie"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un point de trésorerie
        </router-link>
    
      </div>
      <div class="d-flex align-items-center">
       <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher "
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
               Personnel
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Trésorerie
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Date début
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Date fin
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Date exécution
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pointtresorerie, index) in pointtresoreries" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ pointtresorerie.personnel?.nom}} {{ pointtresorerie.personnel?.prenom}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ pointtresorerie.tresorerie?.nom}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{  format_Date(pointtresorerie.dateDebut)}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{  format_Date(pointtresorerie.dateFin)}}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_Date( pointtresorerie.dateExecution)}}
              </td>       
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary pe-0"
              >
              <div class="dropdown">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Actions
                </button>
                  <ul class="dropdown-menu">
                    <li >
                      <router-link :to="{ name: 'EditPointtresoreriePage', params: { id:pointtresorerie.id } }" 
                          class="dropdown-item d-flex align-items-center"><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>Detail</router-link>
                    </li>
                  
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(pointtresorerie.id,pointtresoreries,'pointtresoreries',`Pointtresorerie ${pointtresorerie.id}`)">
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
import { Pointtresorerie } from "@/models/Pointtresorerie";
import ApiService from "@/services/ApiService";
import { format_Date, suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
export default defineComponent({
  name: "ListePointtresorerie",
  components: {
    PaginationComponent
  },
  setup(){
    onMounted(() => {
      getAllPointtresoreries();
    });
    const pointtresoreries = ref<Array<Pointtresorerie>>([]);   
    const pointtresorerie = ref<Pointtresorerie>();
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllPointtresoreries(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllPointtresoreries(page.value, limit.value, searchTerm.value );
    }    
    function getAllPointtresoreries(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/pointtresoreries?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          pointtresoreries.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });    
    }    
    function moddifier(Editpointtresoreries:Pointtresorerie) {
      pointtresorerie.value = Editpointtresoreries;
    }
    const deletePointtresorerie = (id: number) => {
      ApiService.delete(`/pointtresoreries/${id}`)
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
      for(let i = 0; i < pointtresoreries.value.length; i++) {
        if (pointtresoreries.value[i].id === id) {
           pointtresoreries.value.splice(i, 1);
        }
      }
    };
    const privileges = ref<Array<string>>(JwtService.getPrivilege());
    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }
    return { pointtresoreries,
      checkPermission,
     getAllPointtresoreries,
     deletePointtresorerie,
     moddifier ,
     format_Date,
     suppression,
     page, 
    totalPages,
    limit,
    totalElements,
    handlePaginate,
    rechercher,
    searchTerm
  };
  },
});
</script>