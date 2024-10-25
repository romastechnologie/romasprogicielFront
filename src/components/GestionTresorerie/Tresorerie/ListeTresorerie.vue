<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <router-link class="btn btn-primary" to="/tresoreries/ajouter-tresorerie">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="fa fa-plus-circle"></i> -->
                    Ajouter une trésorerie
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
            placeholder="Rechercher une trésorerie"
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
                            <th scope="col">Id</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Date de création</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tresorerie in tresorerieList" :key="tresorerie.id">
                            <th class="shadow-none lh-1 fw-medium text-black-emphasis">{{ tresorerie.id }}</th>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ tresorerie.nom }}</td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ tresorerie.montant }}</td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ format_date(tresorerie.dateCreation)}}</td>

                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block"
                                    style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                                    data-popper-placement="bottom-start">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <router-link type="button" :to="`/tresoreries/edit-tresorerie/${tresorerie.id}`">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1">
                                                Modifier
                                            </i>
                                        </router-link>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a type="button" @click="deleteTresorerie(tresorerie.id)">
                                            <i class="fa fa-trash-o lh-2 me-8 position-relative top-1">
                                                Supprimer
                                            </i>
                                        </a>
                                    </li>
                                </ul>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div>
                <ul>
                    <li>
                        <h1> Tresorerie Général: {{ total() }}</h1>
                    </li>
                    <!--<li v-for="tresorerie in tresorerieList" :key="tresorerie.id">
                            {{ tresorerie.nom }} - Montant Total: {{
                                calculerMontantTresorerie(tresorerie) }} 
                        </li>-->
                </ul>
                <!--<ul>
                        <li v-for="typeTresorerie in typeTresorerieList" :key="typeTresorerie.id">
                            {{ typeTresorerie.libelle }} - Montant: {{ calculerMontantType(typeTresorerie) }}
                        </li>
                    </ul>
                    <ul>
                        <div  v-for="typeTresorerie in typeTresorerieList" :key="typeTresorerie.id">
                            <li v-if="typeTresorerie.tresorerie && typeTresorerie.tresorerie.length > 0">
                                
                                {{ typeTresorerie.libelle }} - Montant: {{ calculerMontantType(typeTresorerie) }}
                            </li>
                        </div>

                    </ul>-->
            </div>


        </div>


    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
import ApiService from '@/services/ApiService';
import { format_date } from "@/utils/utils";

const tresorerieList = ref([]);  // Initialize as an empty array
const page = ref(1);
const limit = ref(10);
const searchTerm = ref('');
const totalPages = ref(0);
const totalElements = ref(0);

const getAllTresoreries = (page = 1, limi = 10, searchTerm = '') => {
  return ApiService.get(`/all/tresoreries?page=${page}&limit=${limi}&mot=${searchTerm}&`)
    .then(({ data }) => {
      tresorerieList.value = data.data.data;
      totalPages.value = data.data.totalPages;
      totalElements.value = data.data.totalElements;
      limit.value = data.data.limit;
      return data.data;
    })
    .catch(({ response }) => {
      console.error(response.data.message);
    });
};

const rechercher = () => {
  getAllTresoreries(page.value, limit.value, searchTerm.value);
};

const deleteTresorerie = async (id: any) => {
  Swal.fire({
    title: 'Etes-vous sûr?',
    text: "Vous voulez vraiment supprimer cette tresorerie !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#ddd',
    cancelButtonText: 'Non',
    confirmButtonText: 'Oui!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      await ApiService.delete(`/tresoreries/${id}`).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur supprimé avec succès!',
          showConfirmButton: false,
          timer: 1000
        });
        rechercher();
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de suppression!',
          showConfirmButton: false,
          timer: 1000
        });
        console.error('Erreur détectée pendant la suppression:', error);
      });
    }
  });
};

onMounted(() => {
  getAllTresoreries();
});

const total = () => {
  return tresorerieList.value.reduce((sum, tresorerie) => sum + tresorerie.montant, 0);
};

</script>
