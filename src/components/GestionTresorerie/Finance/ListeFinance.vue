<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
            class="btn btn-primary"
            to="/finances/ajouter-finance"
          >
            <i class="fa fa-plus-circle"></i>
            Faire un financement
          </router-link>
      
        </div>
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher financement"
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
                          <th scope="col">id</th>
                            <th scope="col">Piece de caisse</th>
                            <th scope="col">montant</th>
                            <th scope="col">Type de finance</th>
                            <th scope="col">Nom du bénéficiaire</th>
                            <th scope="col">Prenom du bénéficiaire</th>
                          
              
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(finance, index) in finances" :key="index">
                             <th>{{ finance.id }}</th>
                            <th > <a :href="`http://localhost:3008/api/uploads/${finance.fichier}`" target="_blank">{{ finance.fichier }}</a> </th>
                            <th>{{ finance.montant }}</th>
                            <th>{{ finance.type }}</th>
                            <th>{{ finance.nomBeneficiaire }}</th>
                            <th>{{ finance.prenomBeneficiaire }}</th>
             
                <td
                  class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
                >
                <div class="dropdown">
                    <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions
                        <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                    </span>
                    <ul class="dropdown-menu">
                      <li >
                        <router-link :to="{ name: 'EditFinancePage', params: { id:finance.id } }" 
                            class="dropdown-item d-flex align-items-center"><i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>Modifier</router-link>
                      </li>
                    
                      <li >
                        <a
                          class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(finance.id,finances,'finances',`Finance ${finance.id}`)">
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
  import { Finance } from "@/models/Finance";
  import ApiService from "@/services/ApiService";
  import { suppression, error } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeFinance",
    components: {
      PaginationComponent
    },
    setup(){
      
      onMounted(() => {
        getAllFinances();
      });
  
      const finances = ref<Array<Finance>>([]);   
      const finance = ref<Finance>();
  
      // BEGIN PAGINATE
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllFinances(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllFinances(page.value, limit.value, searchTerm.value );
      }
      
  
      // END PAGINATE
  
      function getAllFinances(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/finance/?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            console.log("données", data)
            finances.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
        
      }
      
      function moddifier(Editfinances:Finance) {
        finance.value = Editfinances;
      }
  
      const deleteFinance = (id: number) => {
        ApiService.delete(`/finances/${id}`)
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
  
        for(let i = 0; i < finances.value.length; i++) {
          if (finances.value[i].id === id) {
             finances.value.splice(i, 1);
          }
        }
      };
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }
  
      return { finances,
        checkPermission,
       getAllFinances,
       deleteFinance,
       moddifier ,
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