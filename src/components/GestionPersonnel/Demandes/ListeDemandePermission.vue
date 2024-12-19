<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
           class="btn btn-primary"
            to="/demandes/ajouter-demande"
          >
          <i class="fa fa-plus-circle"></i>
            Ajouter une demande
          </router-link>
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
              placeholder="Rechercher une demande"
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
          <table  class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date Demande
                </th>
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
                  Motif de demande
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  Statut
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for ="(demande, index) in demandes" :key="index">
                  <td class="shadow-none lh-1 fw-medium ">{{ demande.dateDemande }} </td>              
                  <td class="shadow-none lh-1 fw-medium ">{{ demande.personnel?.nom }}&nbsp;{{ demande.personnel?.prenom }} </td>  
                  <td class="shadow-none lh-1 fw-medium">{{ demande.motifDemande }} </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                    <div class="dropdown">
                      <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>

                        <ul class="dropdown-menu">                        
                          <li class="dropdown-item d-flex align-items-center">
                          <router-link
                            
                            :to="{ name: 'ViewDemandePage',params: { id: demande.id } }"
                          >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Détails
                          </router-link>
                        </li>
                        <!-- <li class="dropdown-item d-flex align-items-center">
                          <router-link
                            
                            :to="{ name: 'PermissionPPage',params: { id: demande.id } }"
                          >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Traiter
                          </router-link>
                        </li>-->
                    <!-- <li  v-if="de.typeDemande.id == 4 " >
                      <a v-if="de.status =='En attente' && checkPermission('CheckEtatAttestation')"
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="accept(de)"
                      >
                        <i
                          class="flaticon-view lh-1 me-8 position-relative top-1"
                        ></i>
                        Accepter 
                      </a>
                      <a
                          v-else-if="de.status =='Acceptée' && checkPermission('MakeAttestation')"
                          class="dropdown-item d-flex align-items-center"
                          @click="produireAttestation(de)"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Générer une attestation
                      </a>
                    </li>
                    <li  v-if="de.typeDemande.id == 1">
                      <a v-if="de.status =='En attente'"
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="produireAttestation(de)"
                      >
                        <i
                          class="flaticon-view lh-1 me-8 position-relative top-1"
                        ></i>
                        Accordée
                      </a>
                      <router-link 
                          v-else-if="de.status =='Accepté' && agenceId == de.abonnement.bureau?.id"
                          :to="{ name: 'AddAbonnementPage', params: { id:de.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Produire Abonnement
                      </router-link>
                    </li>
                    <li  v-if="de.typeDemande.id ==7">
                      <router-link 
                          v-if="de.status =='En attente' && agenceId == de.abonnement.bureau?.id"
                          :to="{ name: 'AccepterChangementClePage', params: { id:de.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Acceptée
                      </router-link>
                      <a 
                          v-else-if="de.status =='Acceptée' && agenceId == de.abonnement.bureau?.id"
                          class="dropdown-item d-flex align-items-center"
                          href="javascript:void(0);"
                          @click="traiterChangementDeCle(de)"
                        >
                          <i class="flaticon-pen lh-1 me-8 position-relative top-1" ></i>
                          Traitée
                    </a>
                    </li>
                    <li v-else-if="de.typeDemande.id == 5">
                      <router-link 
                          v-if="de.status == 'En attente' && checkPermission('ManageResiliation') && agenceId == de.abonnement.bureau?.id"
                          :to="{ name: 'TraitementResiliationPage', params: { id:de.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Traiter
                      </router-link>
                    </li>
                    <li v-else-if="de.typeDemande.id == 8">
                      <router-link 
                          v-if="de.status == 'En attente' && checkPermission('ManageReclamation') && agenceId == de.abonnement.bureau?.id"
                          :to="{ name: 'TraitementReclamationPage', params: { id:de.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Traiter
                      </router-link>
                    </li>
                    <li v-else-if="de.typeDemande.id == 2">
                      <a v-if="(de.status =='En attente' && checkPermission('AcceptTransfert') && agenceId == de.abonnement.bureau?.id) || (de.status =='En attente' && role == 'Super Admin')"
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        @click="accept(de)"
                      >
                        <i
                          class="flaticon-view lh-1 me-8 position-relative top-1"
                        ></i>
                        Acceptée
                      </a>
                      <router-link 
                      :to="{ name: 'AddTransfertMpostBoxPage', params: { demande:de.id } }"
                       v-else-if="(de.status =='Acceptée' && checkPermission('ValidTransfert') && agenceId == de.nouvelleAgence?.id) || (de.status =='Acceptée' && role == 'Super Admin')"
                        class="dropdown-item d-flex align-items-center"
                      >
                        <i
                          class="flaticon-view lh-1 me-8 position-relative top-1"
                        ></i>
                        Valider
                      </router-link>
                    </li>
                    <li  v-else-if="de.status !=='Acceptée'">
                      <router-link 
                          v-if="de.status == 'En attente' && checkPermission('CheckCession') && agenceId == de.abonnement.bureau?.id"
                          :to="{ name: 'AcceptationCessionPage', params: { id:de.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Vérification
                      </router-link>
                      <router-link 
                      v-if="de.status == 'Acceptée' && checkPermission('ValidCession') && agenceId == de.abonnement.bureau?.id"

                          :to="{ name: 'AddCessionPage', params: { id:de.id } }"
                          class="dropdown-item d-flex align-items-center"
                        >
                          <i
                            class="flaticon-pen lh-1 me-8 position-relative top-1"
                          ></i>
                          Valider
                        </router-link>
                    </li>
                    <li v-if="checkPermission('RejetDemande')">
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AddAnnulationMotifModal"
                        @click="annuleId(de.id)"
                      >
                        <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>
                        Rejetée
                      </a>
                    </li>
                    <li>
                      <a @click="openNewWindow_(de)" type="button"
                        class="dropdown-item d-flex align-items-center" >
                        <i class="flaticon-send lh-1 me-8 position-relative top-1" ></i>
                         Reçu de paiement
                      </a>
                    </li>-->
                          
                          <li  class="dropdown-item d-flex align-items-center">
                            <a
                             
                              href="javascript:void(0);"
                              @click="suppression(demande.id, demandes, 'demandes', 'la demande')"
                            >
                              <i
                                class="fa fa-trash-o lh-1 me-8 position-relative top-1"
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
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref} from "vue";
  import ApiService from "@/services/ApiService";
  import { Demande } from "@/models/Demande";
  import { format_date, suppression, error, } from "@/utils/utils";
  
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  
  export default defineComponent({
    name: "ListeDemandePermission",
    components: {
      PaginationComponent
    },
    setup(){
      onMounted(() => {
        getAllDemandes();
      });
  
      const demandes = ref<Array<Demande>>([]);
      const demande = ref<Demande>();
  
      // BEGIN PAGINATE
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
  
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllDemandes(page_, limit_);
        } catch (error) {
          //
        }
      };
  
       function rechercher(){
        getAllDemandes(page.value, limit.value, searchTerm.value );
      }
  
  
      // END PAGINATE
  
      function getAllDemandes(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/demandes?page=${page}&limit=${limi}&mot=${searchTerm}&cat=1&`)
          .then(({ data }) => {
            demandes.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
      }
  
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  
  const checkPermission = (name) => {
    return privileges.value.includes(name);
  }
  
      return {demandes,
        checkPermission,
        format_date,
        suppression,
        demande,
        page, 
        totalPages,
        limit,
        totalElements,
        handlePaginate,
        searchTerm,
        rechercher
      };
    },
  });
  </script>