<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/contrats/ajouter-contrat"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un contrat
        </router-link>
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            name="mot"
            class="form-control shadow-none text-black"
            placeholder="Rechercher"
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
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date Début
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
                Salaire
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Employé
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Heures travaillées
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                STATUT
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contrat, index) in contrats" :key="index">
              <td class="shadow-none lh-1 fw-medium ">{{ format_Date(contrat?.datePriseFonction) }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ format_Date(contrat.dateFin) }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ contrat.salaireBase }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ contrat?.personnel?.nom ?? 'N/A' }} </td>
              <td class="shadow-none lh-1 fw-medium ">{{ contrat.nobreheuresTravail }} </td>
              <td class="shadow-none lh-1 fw-medium">
                  <span :class="contrat.estResilie ? 'badge bg-success text-white' : 'badge bg-danger text-white'">
                    {{ contrat.estResilie ? 'Resilier' : 'Actif' }}
                  </span>
              </td>
              <td class="shadow-none lh-1 fw-medium">{{ format_Date(contrat.createdAt) }}</td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
              >
                <div class="dropdown">
                  <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                  <ul class="dropdown-menu">
                    <li class="dropdown-item d-flex align-items-center">
                      <router-link :to="{ name: 'ViewContrat', params: { id: contrat.id } }"
                        class="dropdown-item d-flex align-items-center">
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        <!-- <p><strong></strong></p> -->
                        Détails
                      </router-link>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(contrat.id, contrats, 'contrats', `Contrat ${contrat.id}`)">
                        <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>
                        Supprimer
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="resilierContrat(contrat.id)">
                        <i class="flaticon-close lh-1 me-8 position-relative top-1"></i>
                        Résilier ce contrat
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
import { defineComponent, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { Contrat } from "@/models/Contrat";
import ApiService from "@/services/ApiService";
import { format_date, suppression, error, format_Date } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeContrat",
  components: {
    PaginationComponent
  },
  setup() {
    onMounted(() => {
      getAllContrats();
    });
    const contrats = ref<Array<Contrat>>([]);
    const contrat = ref<Contrat>();
    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllContrats(page_, limit_);
      } catch (error) {
      }
    };
    function rechercher() {
      getAllContrats(page.value, limit.value, searchTerm.value);
    }
    function getAllContrats(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/contrats?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          contrats.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }
    function moddifier(Editcontrats: Contrat) {
      contrat.value = Editcontrats;
    }
    const deleteContrat = (id: number) => {
      ApiService.delete(`/contrats/${id}`)
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

      for (let i = 0; i < contrats.value.length; i++) {
        if (contrats.value[i].id === id) {
          contrats.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    };

    // Nouvelle fonction pour résilier un contrat
    const resilierContrat = async (id: number) => {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Voulez-vous résilier ce contrat ? Cette action est irréversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, résilier !',
        cancelButtonText: 'Annuler',
        heightAuto: false
      });

      if (result.isConfirmed) {
        try {
          const response = await ApiService.resilierContrat(id);
          if (response.status === 200) {
            Swal.fire({
              text: 'Contrat résilié avec succès.',
              toast: true,
              icon: 'success',
              title: 'Succès',
              animation: false,
              position: 'top-right',
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              heightAuto: false
            });
            // Rafraîchir la liste des contrats
            await getAllContrats(page.value, limit.value, searchTerm.value);
          }
        } catch (err) {
          Swal.fire({
            text: 'Une erreur est survenue lors de la résiliation du contrat.',
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Réessayer à nouveau!',
            heightAuto: false,
            customClass: {
              confirmButton: 'btn fw-semobold btn-light-danger',
            },
          });
          console.error('Erreur lors de la résiliation:', err);
        }
      }
    };

    return {
      contrats,
      format_date,
      checkPermission,
      getAllContrats,
      deleteContrat,
      moddifier,
      suppression,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      format_Date,
      resilierContrat
    };
  },
});
</script>