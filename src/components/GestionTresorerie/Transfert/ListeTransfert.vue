<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
            class="btn btn-primary"
            to="/transferts/ajouter-transfert"
          >
            <i class="fa fa-plus-circle"></i>
            Faire un transfert
          </router-link>
      
        </div>
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher transfert"
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
                           
                            <th scope="col">Source</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Date de Transfert</th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transfert, index) in transferts" :key="index">
                            
                             <th>{{ transfert.tresorerie?.nom}}</th>
                             <td>{{ transfert.tresorerie2?.nom}}</td>
                            <td>{{ separateur(transfert.montant) }}</td>
                            <td>{{ format_date(transfert.dateDeTransfert) }}</td>
             
                <td
                  class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
                >
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </button>
                    <ul class="dropdown-menu">
                     <!-- <li >
                        <router-link :to="{ name: 'EditTransfertPage', params: { id:transfert.id } }" 
                            class="dropdown-item d-flex align-items-center"><i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>Modifier</router-link>
                      </li>-->
                    
                    <!--  <li >
                        <a
                          class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(transfert.id,transferts,'transferts',`Transfert ${transfert.id}`)">
                          <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                           Supprimer
                        </a>
                      </li>-->
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
  import { Transfert } from "@/models/Transfert";
  import ApiService from "@/services/ApiService";
  import {format_date,suppression, error,separateur } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeTransfert",
    components: {
      PaginationComponent
    },
    setup(){
      
      onMounted(() => {
        getAllTransferts();
      });
  
      const transferts = ref<Array<Transfert>>([]);   
      const transfert = ref<Transfert>();
  
      // BEGIN PAGINATE
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllTransferts(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllTransferts(page.value, limit.value, searchTerm.value );
      }
      
  
      // END PAGINATE
  
      function getAllTransferts(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`all/transferts?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            transferts.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
        
      }
      
      function moddifier(Edittransferts:Transfert) {
        transfert.value = Edittransferts;
      }
  
      const deleteTransfert = (id: number) => {
        ApiService.delete(`/transferts/${id}`)
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
  
        for(let i = 0; i < transferts.value.length; i++) {
          if (transferts.value[i].id === id) {
             transferts.value.splice(i, 1);
          }
        }
      };
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }
  
      return { transferts,
        checkPermission,
        format_date,
       getAllTransferts,
       deleteTransfert,
       moddifier ,
       suppression,
       page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      separateur,
      searchTerm
    };
    },
  });
  </script>