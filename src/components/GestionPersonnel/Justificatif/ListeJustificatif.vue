<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link class="btn btn-primary" to="/justificatifs/ajouter-justificatif">
          <i class="fa fa-plus-circle"></i> Ajouter un justificatif
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un justificatif"
          />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Personnel</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Date Début</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Date Fin</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Justificatif</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">Statut</th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(justificatif, index) in justificatifs" :key="index">
              <td class="shadow-none lh-1 fw-medium">{{ justificatif?.personnel?.nom + " " + justificatif?.personnel?.prenom }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ justificatif.dateDebut }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ justificatif.dateFin }}</td>
              <td class="shadow-none lh-1 fw-medium">{{ justificatif.justificatif }}</td>
              <td class="shadow-none lh-1 fw-medium ">
                <button
                  :class="{
                    'btn btn-danger': !justificatif.statut,
                    'btn btn-success': justificatif.statut === 'Validé',
                    'btn btn-primary': justificatif.statut === 'Refusé'
                  }"
                  disabled
                >
                  {{ justificatif.statut || 'En attente' }}
                </button>
              </td>
              <td class="shadow-none lh-1 fw-medium text-body-tertiary pe-0">
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </button>
                  <ul class="dropdown-menu">
                    <li v-if="!justificatif.statut" class="dropdown-item d-flex align-items-center">
                      <a href="javascript:void(0);" @click="modifierStatut(justificatif.id, 'Validé')">
                        <i class="fa fa-check lh-1 me-8 position-relative top-1"></i> Valider
                      </a>
                    </li>
                    <li v-if="!justificatif.statut" class="dropdown-item d-flex align-items-center">
                      <a href="javascript:void(0);" @click="modifierStatut(justificatif.id, 'Refusé')">
                        <i class="fa fa-times lh-1 me-8 position-relative top-1"></i> Refuser
                      </a>
                    </li>
                    <li v-if="justificatif.statut" class="dropdown-item d-flex align-items-center">
                      <a href="javascript:void(0);" @click="suppression(justificatif.id, justificatifs, 'justificatifs', 'un justificatif')">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i> Supprimer
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Justificatif } from "@/models/Justificatif";
import { format_date, suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeJustificatif",
  components: {
    PaginationComponent
  },
  setup() {
    onMounted(() => {
      getAllJustificatifs();
    });

    const justificatifs = ref<Array<Justificatif>>([]);
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllJustificatifs(page_, limit_);
      } catch (error) {
        //
      }
    };

    function rechercher() {
      getAllJustificatifs(page.value, limit.value, searchTerm.value);
    }

    function getAllJustificatifs(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/justificatifs?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          justificatifs.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    function modifierStatut(id: number, statut: string) {
      console.log(`Appel de la fonction modifierStatut avec ID : ${id} et statut : ${statut}`);
      
      ApiService.put(`/justificatifs/${id}`, { statut })
        .then(() => {
          console.log(`Statut du justificatif mis à jour avec succès en : ${statut}`);
          getAllJustificatifs(page.value, limit.value, searchTerm.value);
        })
        .catch(({ response }) => {
          console.error("Erreur lors de la mise à jour du statut :", response.data.message);
          error(response.data.message);
        });
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    };

    return {
      justificatifs,
      getAllJustificatifs,
      checkPermission,
      format_date,
      suppression,
      modifierStatut,
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
