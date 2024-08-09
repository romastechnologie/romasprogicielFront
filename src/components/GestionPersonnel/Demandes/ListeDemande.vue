<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#AddDemandeModal">
          <i class="fa fa-plus-circle"></i>
          <!-- <i class="flaticon-plus position-relative ms-5 fs-12"></i> -->
          Ajouter une demande
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
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0" placeholder="Rechercher une demande" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Categorie
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Fichier
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Personnel
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Statut
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0">Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="demande in filterDemande" :key="demande.personnel">
              <td> {{ demande.create_at.toString().slice(0, 10) }} </td>
              <td> {{ demande.categorie ? demande.categorie.libelle : "null" }} </td>
              <td> <a :href="'http://localhost:3001/uploads/' + demande.demandeFileName" target="_blank"> {{
                demande.demandeFileName }}
                </a>
              </td>
              <td> {{ demande.personnel ? demande.personnel.nom + " " + demande.personnel.prenom : "null" }} </td>
              <td v-if="demande.statut === 'Acceptée'" class="text-center"> <span
                  class="badge badge-success">Acceptée</span> </td>
              <td v-else-if="demande.statut === 'Refusée'" class="text-center"> <span
                  class="badge badge-danger">Refusée</span></td>
              <td v-else-if="demande.statut === 'En cours de traitement'" class="text-center"> <span
                  class="badge badge-primary">En cours</span>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary pe-0">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false" v-if="demande.statut != 'Refusée'">Actions</button>
                <ul class="dropdown-menu dropdown-block"
                  style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                  data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center" v-if="demande.statut != 'Refusée'">
                    <a href="#" @click="refusedDemande(demande.id)">
                      <i class="fa fa-close lh-2 me-8 p-1 position-relative top-1"></i>
                      Refusé
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center"
                    v-if="demande.statut != 'Refusée' && demande.statut != 'Acceptée'">
                    <a @click="acceptedDemande(demande.id)">
                      <i class="fa fa-check lh-2 me-8 p-1 position-relative top-1"></i>
                      Accepté
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center"
                      v-if="demande.statut != 'Refusée' && demande.statut != 'Acceptée'">
                    <router-link :to="{ name: 'EditDemandePage', params: { id: demande.id } }"
                      class="text-decoration-none p-1">
                      <i class="fa fa-pencil lh-2 me-8 p-1 position-relative top-1"></i> Modifier
                    </router-link>
                  </li>
                  <li class="dropdown-item d-flex align-items-center" v-if="demande.statut != 'Refusée' && demande.statut != 'Acceptée'">
                    <a href="#" @click="deleteDemande(demande.id)">
                      <i class="fa fa-trash lh-2 me-8 p-1 position-relative top-1"></i>
                      Supprimé
                    </a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>

  <AddDemandeModal />
</template>

<script lang="ts">
import axios from 'axios';
import { onBeforeMount, onMounted, ref, defineComponent, defineProps } from 'vue'
import { format_date, suppression, error, success, } from "@/utils/utils";
import Swal from 'sweetalert2';
// import { useRouter } from 'vue-router';
import AddDemandeModal from './AddDemandeModal.vue';
import ApiService from '@/services/ApiService';

export default defineComponent({
  name: "ListeDemande",
  components: {
    AddDemandeModal,
  },
  setup() {



    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }: { page_: number, limit_: number }) => {
      try {
        page.value = page_;
        //getAllDemande(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      //getAllDemande(page.value, limit.value, searchTerm.value );
    }


    // END PAGINATE

    let demande = ref([] as any[]);

    let filterDemande = ref(demande);
    const admin = ref(window.localStorage.getItem("adminOnline"));
    // let filterDemandeToRefused = ref();

    function sortDemandeWithCategorie(selected: any) {
      switch (selected.value) {
        case "tout":
          filterDemande.value = demande.value
          break;
        case "conge":
          filterDemande.value = demande.value.filter(demande => demande.categorie.libelle === "Congé")
          break;
        case "permission":
          filterDemande.value = demande.value.filter(demande => demande.categorie.libelle === "Permission")
          break;
        default:
          break;
      }
    }

    function sortDemandeWithStatut(selected: any) {
      switch (selected.value) {
        case "tout":
          filterDemande.value = demande.value
          break;
        case "acceptée":
          filterDemande.value = demande.value.filter(demande => demande.statut === "Acceptée")
          break;
        case "refusée":
          filterDemande.value = demande.value.filter(demande => demande.statut === "Refusée")
          break;
        case "traitement":
          filterDemande.value = demande.value.filter(demande => demande.statut === "En cours de traitement")
          break;
        default:
          break;
      }
    }

    // ------------------------------------------------- DELETE --------------------------------------------
    function deleteDemande(id: number) {

      Swal.fire({
        title: "Voulez-vraiment suprimer cette demande?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        cancelButtonText: "Annuler"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await ApiService.delete(`/demandes/${id}`);
            getAllDemande()
            Swal.fire("Demande supprimé avec succès!", "", "success");
            console.log(response);
          } catch (error) {
            console.error('Erreur lors de la suppression des demandes:', error);
            throw error;
          }
        }
      });
    }

    // ------------------------------------------------- REFUSED ------------------------------------------
    const refusedDemande = (id: any) => {

      Swal.fire({
        title: "Voulez-vous vraiment refuser cette demande?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Retour"
      }).then(async (result) => {
        if (result.isConfirmed) {

          try {
            const response = await ApiService.patch(`/demandes/${id}`, {
              statut: "Refusée"
            });
            Swal.fire("Demande refusée avec succès", "", "success");
            getAllDemande()
          } catch (error) {
            console.error('Erreur lors de la création du congé:', error);
            throw error;
          }

        } else if (result.isDenied) {
          Swal.fire("Refus annuler avec succès ", "", "info");
        }
      });

    }

    // -------------------------------------------------- ACCEPT ACCEPT --------------------------------
    const acceptedDemande = (id: any) => {

      Swal.fire({
        title: "Voulez-vous vraiment accepter cette demande?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Oui",
        cancelButtonText: "Retour"
      }).then(async (result) => {
        if (result.isConfirmed) {

          try {
            const response = await ApiService.patch(`/demandes/${id}`, {
              statut: "Acceptée"
            });
            Swal.fire("Demande acceptée avec succès", "", "success");
            getAllDemande()
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la demande:', error);
            throw error;
          }

        } else if (result.isDenied) {
          Swal.fire("Refus annuler avec succès ", "", "info");
        }
      });

    }

    // -------------------------------------------------- GET ---------------------------------------------

    function sortProductWithSearch(searchDemande: any) {
      if ((searchDemande.value as string).trim() === "") {
        filterDemande.value = demande.value
      } else {
        filterDemande.value = demande.value.filter(demande => (demande.personnel.nom.toLowerCase()).startsWith((searchDemande.value as string).trim().toLowerCase()))
      }
    }

    const getAllDemande = async () => {
      try {
        const response = await ApiService.get("/demandes");
        demande.value = response.data;

      } catch (error) {
        console.error('Erreur lors de la recupération des demandes:', error);
        throw error;
      }
    }

    onMounted(() => {
      getAllDemande()
    })



    return {
      sortProductWithSearch,
      sortDemandeWithCategorie,
      sortDemandeWithStatut,
      refusedDemande,
      acceptedDemande,
      deleteDemande,
      demande,
      filterDemande,
      admin,
      format_date,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
    }

  }

})
</script>

<style>
td,
th {
  border: 1px solid gray;
}
</style>