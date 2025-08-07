<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
            class="btn btn-primary"
            to="/societes/ajouter-societe"
          >
            <i class="fa fa-plus-circle"></i>
            Ajouter société
          </router-link>
      
        </div>
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher société"
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
                Sigle
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Rccm
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Raison sociale
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Téléphone
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Nom représentant
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Prénom représentant
              </th>
              
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(societe, index) in societes" :key="index">
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.sigle }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.rccm }}
                </td>
                   <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.raisonSocial}}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.telephone }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.nomRep }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ societe.prenomRep }}
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
                        <router-link :to="{ name: 'EditSocietePage', params: { id:societe.id } }" 
                            class="dropdown-item d-flex align-items-center"><i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>Modifier</router-link>
                      </li>
                    
                      <li >
                        <a
                          class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(societe.id,societes,'societes',`Societe ${societe.id}`)">
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
  import { Societe } from "@/models/Societe";
  import ApiService from "@/services/ApiService";
  import { suppression, error } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeSociete",
    components: {
      PaginationComponent
    },
    setup(){
      
      onMounted(() => {
        getAllSocietes();
      });
  
      const societes = ref<Array<Societe>>([]);   
      const societe = ref<Societe>();
        const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllSocietes(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllSocietes(page.value, limit.value, searchTerm.value );
      }

      function getAllSocietes(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/societes?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            console.log("donnée société",data);
            societes.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
        
      }
      
      function moddifier(Editsocietes:Societe) {
        societe.value = Editsocietes;
      }
  
      const deleteSociete = (id: number) => {
        ApiService.delete(`/societes/${id}`)
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
  
        for(let i = 0; i < societes.value.length; i++) {
          if (societes.value[i].id === id) {
             societes.value.splice(i, 1);
          }
        }
      };
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }
  
      return { societes,
        checkPermission,
       getAllSocietes,
       deleteSociete,
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