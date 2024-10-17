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
            data-bs-target="#AddUserEtapesModal"
          >
            <i class="fa fa-plus-circle"></i>
            Ajouter un User Etape
          </a>
          <!-- <button
            class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
            type="button"
          >
            Exporter
            <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
          </button> -->
        </div>
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher un User Etape"
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
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  User Etape 
                </th>
                
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(userEtape, index) in userEtapes" :key="index">
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ userEtape.libelle }}
                </td>
                
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ userEtape.description }}
                </td>
                <td
                  class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
                >
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                    <ul class="dropdown-menu dropdown-block" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);" data-popper-placement="bottom-start">
                      
                      <li class="dropdown-item d-flex align-items-center">
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          data-bs-toggle="modal"
                          data-bs-target="#AddUserEtapesModal"
                          @click="moddifier(userEtape)"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Modifier
                        </a>
                      </li>
                      <li class="dropdown-item d-flex align-items-center">
                        <a
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);" @click="suppression(userEtape.id,userEtapes,'userEtapes','le userEtape')"
                        >
                          <i
                            class="fa fa-trash-o lh-1 me-8 position-relative top-1" 
                          ></i>
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
          class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
        >
          <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
        </div>
      </div>
    </div>
    <AddUserEtapesModal :item="selectedItem" @close="recharger"/>
  
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref} from "vue";
  import Swal from "sweetalert2";
  import { UserEtapes } from "@/models/UserEtapes";
  import ApiService from "@/services/ApiService";
  import { suppression, error } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  import AddUserEtapesModal from "./AddUserEtapesModal.vue";
  import { useRouter } from "vue-router";
  
  export default defineComponent({
    name: "ListeUserEtapes",
    components: {
      PaginationComponent,
      AddUserEtapesModal
    },
    setup(){
      
      onMounted(() => {
        getAllUserEtapes();
      });
      const iduserEtape = ref(0);
        const loading = ref<boolean>(false);
        const router = useRouter(); 
      const userEtapes = ref<Array<UserEtapes>>([]);   
      const userEtape = ref<UserEtapes>();
  
      // BEGIN PAGINATE
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
      const selectedItem = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllUserEtapes(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllUserEtapes(page.value, limit.value, searchTerm.value );
      }
  
      // END PAGINATE
  
      const recharger = () => {
        getAllUserEtapes();
      };
  
      function getAllUserEtapes(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/userEtapes?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            userEtapes.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
        
      }
      
      function moddifier(EditUserEtape:UserEtapes) {
        userEtape.value = EditUserEtape;
        selectedItem.value = EditUserEtape.id;  
      }
  
      const deleteUserEtape = (id: number) => {
        ApiService.delete(`/userEtapes/${id}`)
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
  
        for(let i = 0; i < userEtapes.value.length; i++) {
          if (userEtapes.value[i].id === id) {
            userEtapes.value.splice(i, 1);
          }
        }
      };
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }
  
      return { userEtapes,
        checkPermission,
       getAllUserEtapes,
       deleteUserEtape,
       moddifier ,
       suppression,
       page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      selectedItem,
      recharger
    };
    },
  });
  </script>