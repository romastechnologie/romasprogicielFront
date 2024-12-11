<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
            class="btn btn-primary"
            to="/missions/ajouter-mission"
          >
            <i class="fa fa-plus-circle"></i>
            Ajouter mission
          </router-link>
      
        </div>
        <div class="d-flex align-items-center">
         <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher mission"
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
                 Description
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                Destination
                </th>

                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                Date debut
                </th>
              
                
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                Date fin
                </th>
              
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
                >ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mission, index) in missions" :key="index">
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ mission.description }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ mission.destination }}
                </td>
             
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ format_date(mission.dateDebut) }}
                </td>

                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ format_date(mission.dateFin) }}

                </td>

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
                        <router-link :to="{ name: 'EditMissionPage', params: { id:mission.id } }" 
                            class="dropdown-item d-flex align-items-center"><i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>Modifier</router-link>
                      </li>
                    
                      <li >
                        <a
                          class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(mission.id,missions,'missions',`Mission ${mission.id}`)">
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
  import { Mission } from "@/models/Mission";
  import ApiService from "@/services/ApiService";
  import { format_date, suppression, error } from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";

  export default defineComponent({
    name: "ListeMission",
    components: {
      PaginationComponent
    },
    setup(){
      
      onMounted(() => {
        getAllMissions();
      });
  
      const missions = ref<Array<Mission>>([]);   
      const mission = ref<Mission>();
  
      // BEGIN PAGINATE
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllMissions(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllMissions(page.value, limit.value, searchTerm.value );
      }
      
  
      // END PAGINATE
  
      function getAllMissions(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`all/missions?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            missions.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
        
      }
      
      function moddifier(Editmissions:Mission) {
        mission.value = Editmissions;
      }
  
      const deleteMission = (id: number) => {
        ApiService.delete(`/missions/${id}`)
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
  
        for(let i = 0; i < missions.value.length; i++) {
          if (missions.value[i].id === id) {
             missions.value.splice(i, 1);
          }
        }
      };
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
      const checkPermission = (name) => {
        return privileges.value.includes(name);
      }
  
      return { missions,
        checkPermission,
       getAllMissions,
       deleteMission,
       moddifier ,
       suppression,
       page, 
      totalPages,
      limit,
      format_date,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm
    };
    },
  });
  </script>