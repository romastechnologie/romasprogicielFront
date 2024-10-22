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
             data-bs-target="#AddRapportModal"
           >
           <i class="fa fa-plus-circle"></i>
             Ajouter un rapport
           </a>
         
         </div>
         <div class="d-flex align-items-center">
           
           <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
             <input
               type="text"
               v-model="searchTerm"
               @keyup="rechercher"
               class="form-control shadow-none text-black"
               placeholder="Rechercher un rapport "
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
              Contenu
                 </th>
            
                 <th
                   scope="col"
                   class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                 >
                Mission
                 </th>
                 <th
                   scope="col"
                   class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                 >Actions</th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="(rapport, index) in rapports" :key="index">
                 <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                   {{ rapport.contenu }}
                 </td>
                
                 <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                   {{ rapport.mission.description }}
                 </td>
                 <td
                   class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                 >
                 <div class="dropdown">
                   <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                     <ul class="dropdown-menu">
                       <li >
                         <a
                           class="dropdown-item d-flex align-items-center"
                           href="javascript:void(0);"
                           data-bs-toggle="modal"
                           data-bs-target="#AddRapportModal"
                           @click="moddifier(rapport)"
                         >
                           <i
                             class="flaticon-pen lh-1 me-8 position-relative top-1"
                           ></i>
                           Modifier
                         </a>
                       </li>
                       <li >
                         <a
                           class="dropdown-item d-flex align-items-center"
                           href="javascript:void(0);" @click="suppression(rapport.id,rapports,'rapports','rapport')"
                         >
                           <i
                             class="flaticon-delete lh-1 me-8 position-relative top-1" 
                           ></i>
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
     <AddRapportModal :item="selectedItem"   @close="recharger"/>
   </template>
   <script lang="ts">
   
   import { defineComponent, onMounted, ref  } from "vue";
  import AddRapportModal from "./AddRapportModal.vue";
  import ApiService from "@/services/ApiService";
  import { format_date, showModal, suppression, error, } from "@/utils/utils";
  import { useRouter } from "vue-router";
  import { Rapport } from "@/models/Rapport";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
   
   export default defineComponent({
       name: "ListeRapport",
       components: {
         AddRapportModal,
         PaginationComponent
     },
     setup: () => {
       const modules = {
     
       };
       
       const rapports = ref<Array<Rapport>>([]);
       const rapport = ref<Rapport>();
       const addRapportModalRef = ref<null | HTMLElement>(null);
       const selectedItem = ref(0);
   
       const searchTerm = ref('');
       const page = ref(1);
       const totalPages = ref(0);
       const limit = ref(10);
       const totalElements = ref(0);
   
       const handlePaginate = ({ page_, limit_ }) => {
         try {
           page.value = page_;
           getAllRapport(page_, limit_);
         } catch (error) {
           //
         }
       };
   
       function rechercher(){
         getAllRapport(page.value, limit.value, searchTerm.value );
       }
   
       // END PAGINATE
   
       function getAllRapport(page = 1, limi = 10, searchTerm = '') {
         return ApiService.get(`rapportmissions?page=${page}&limit=${limi}&mot=${searchTerm}&`)
         .then(({ data }) => {
          console.log(data); 
           rapports.value = data.data.data;
           totalPages.value = data.data.totalPages;
           limit.value = data.data.limit;
           totalElements.value = data.data.totalElements;
         })
         .catch(({ response }) => {
           error(response.data.message)
         });
       } 
   
       onMounted(() => {
         getAllRapport();
       });
   
       function moddifier(EditRapport:Rapport) {
         rapport.value = EditRapport;
         selectedItem.value = EditRapport.id;
       }
       const recharger = () => {
         getAllRapport();
       };
   
       const privileges = ref<Array<string>>(JwtService.getPrivilege());
   
       const checkPermission = (name) => {
         return privileges.value.includes(name);
       }
   
   
       return { modules,
         checkPermission,
               selectedItem,
               rapports,
               recharger,
               suppression, 
               moddifier, 
               page, 
               totalPages,
               limit,
               totalElements,
               getAllRapport,
               handlePaginate,
               searchTerm,
               rechercher, 
               addRapportModalRef
       };
     },
   });
   </script>
   @/models/Rapport