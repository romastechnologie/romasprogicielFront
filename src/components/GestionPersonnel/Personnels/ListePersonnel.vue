<template>
  <div class="d-sm-flex align-items-center">
    <router-link to="/personnels/ajouter-personnel" class="btn btn-primary my-1">
      <i class="fa fa-plus-circle"></i>
      Ajouter un personnel
    </router-link>
  </div>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="d-lg-flex d-md-flex d-none flex-lg-row " style="height: 530px;">
      <div class="col-lg-4 col-md-4 shadow rounded-0 bg-light px-2 py-1">
        <div class="card m-2 p-1 d-flex flex-row align-items-center rounded rounded-pill">
          <i class="fa fa-search mx-2"></i>
          <input type="search" class="form-control border-0 rounded rounded-pill"
            @input="sortPersonnelWithSearch($event.target)" placeholder="Rechercher par personnel">
        </div>
        <div class="overflow-auto" style="height: 465px;">
          <template v-for="personnel in filterPersonnel" :key="personnel.id">
            <template v-for="poste in personnel.personnel_service_postes" :key="poste.id">
              <router-link v-if="poste.statut == 'Actif'" :to="'/personnels/liste-personnel/' + personnel.id"
                class="card border border-secondary d-flex flex-row justify-content-start align-items-center px-3 py- mb-2 mx-md-2">
                <img :src="personnel.image"
                  class="rounded rounded-circle m-2 card d-flex flex-row justify-content-center align-items-center"
                  style=" height: 40px; width: 40px" />
                <div class="d-flex flex-column m-2">
                  <span> {{ personnel.nom + ' ' + personnel.prenom }} </span>
                  <span id="poste" style="font-size: 10px;"> {{ poste ? poste.service_poste.fonction.libelle : 'Pas de poste' }} </span>
                </div>
              </router-link>
            </template>
          </template>
          
        </div>


      </div>
      <div class="col overflow-auto">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, onMounted, ref, defineComponent, defineProps } from 'vue'
// import { format_date, suppression, error, success, } from "@/utils/utils";
import Swal from 'sweetalert2';
import ApiService from '@/services/ApiService';
import { useRouter } from "vue-router";


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


const router = useRouter()
const personnels = ref([] as any[]);

let filterPersonnel = ref(personnels);

function sortPersonnelWithSearch(searchDemande: any) {
  if ((searchDemande.value as string).trim() === "") {
    filterPersonnel.value = personnels.value
  } else {
    filterPersonnel.value = personnels.value.filter(personnel => (personnel.nom.toLowerCase()).startsWith((searchDemande.value as string).trim().toLowerCase()))
  }
}

// ------------------------------------------ GET DATA --------------------------------
const getAllPersonnel = async () => {
  try {
    console.log("nous somme ici");
    const response = await ApiService.get('/all/personnels');
    personnels.value = response.data;
    console.log("personnels reccuperer avec succes",response);
  } catch (error) {
    console.error('Erreur lors de la recupération des personnels:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPersonnel()
})

</script>

<style>
td,
th {
  border: 1px solid gray;
}
</style>