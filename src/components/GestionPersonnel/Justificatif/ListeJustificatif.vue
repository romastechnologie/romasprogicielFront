<template>
  <div class="px-lg-4 py-lg-5 p-md-3 p-3 text-start">
    <div class="col-12 mb-2 d-flex justify-content-around flex-wrap">
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
        <span class="material-symbols-outlined mx-2">
          search
        </span>
        <input type="search" class="form-control" @input="sortJustificatifWithSearch($event.target)"
          placeholder="Rechercher par personnel">
      </div>
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
        <span class="mx-2"> Date </span>
        <input type="date" class="form-control" @input="sortJustificatifWithDateDebut($event.target)" />
      </div>
    </div>
    <div class="card rounded rounded-4 px-2 pt-4 py-1 overflow-auto">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col"> Personnel </th>
            <th scope="col"> Date de debut </th>
            <th scope="col"> Date de fin </th>
            <th scope="col"> Preuve </th>
            <th scope="col"> Statut </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="justificatif in filterJustificatifs" :key="justificatif.id">
            <td> {{ justificatif.personnel ? justificatif.personnel.nom + " " +
              justificatif.personnel.prenom : "null" }} </td>
            <td> {{ justificatif.dateDebut ? justificatif.dateDebut.toString().slice(0, 10) : '' }} </td>
            <td> {{ justificatif.dateFin ? justificatif.dateFin.toString().slice(0, 10) : '' }} </td>
            <td>
              <a :href="'/upload/' + justificatif.preuveFileName" target="_blank"> {{ justificatif.preuveFileName
                }}
              </a>
            </td>
            <td v-if="justificatif.statut === 'Acceptée'" class="text-center"> ✅ Acceptée</td>
            <td v-else-if="justificatif.statut === 'Refusée'" class="text-center"> ❌ Refusée</td>
            <td v-else-if="justificatif.statut === 'En cours de traitement'" class="text-center"> 🔄 En cours de
              traitement
            </td>
            <td>
              <div class="d-flex justify-content-center">
                <span type="button" v-if="justificatif.statut != 'Refusée'"
                  class="material-symbols-outlined card fs-3 d-flex justify-content-center align-items-center text-danger"
                  @click="refusedJustificatif(justificatif.id)" style="height: 40px; width: 40px;">
                  close
                </span>
                <span type="button" v-if="justificatif.statut != 'Refusée' && justificatif.statut != 'Acceptée' "
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-success"
                  @click="acceptedJustificatif(justificatif.id, justificatif.presence.id)" style="height: 40px; width: 40px;">
                  check
                </span>
                <router-link :to="`/updateJustificatif/${justificatif.id}`" class="text-decoration-none" v-if="justificatif.statut != 'Refusée' && justificatif.statut != 'Acceptée' ">
                  <span type="button"
                    class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-primary text-center"
                    style="height: 40px; width: 40px;">
                    update
                  </span>
                </router-link>
                <!-- <span @click="deleteJustificatif(justificatif.id)" type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger text-center"
                  style="height: 40px; width: 40px;">
                  delete
                </span> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filterJustificatifs.length == 0" class="fs-5 d-flex justify-content-center">
        La liste est vide
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import Swal from 'sweetalert2';
import ApiService from '@/services/ApiService';

const justificatifs = ref([] as any[]);

let filterJustificatifs = ref(justificatifs);

function sortJustificatifWithDateDebut(choosedDate: any) {
  const presenceOnSelectedDate = justificatifs.value.filter(entry => {
    const entryDate = new Date(entry.dateDebut);
    const selectedDate = new Date(choosedDate.value);
    // Comparaison en ignorant les heures
    return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  });

  filterJustificatifs.value = presenceOnSelectedDate;
}

function sortJustificatifWithSearch(searchPresence: any) {
  if ((searchPresence.value as string).trim() === "") {
    filterJustificatifs.value = justificatifs.value
  } else {
    filterJustificatifs.value = justificatifs.value.filter(justificatif => (justificatif.personnel.nom.toLowerCase()).startsWith((searchPresence.value as string).trim().toLowerCase()))
  }
}

// ------------------------------------------------- DELETE --------------------------------------------
function deleteJustificatif(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer ce justificatif?",
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: "Annuler",
    icon: "question",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.delete(`/justificatifs/${id}`);
        getAllJustificatif()
        Swal.fire("Justificatif supprimé avec succès!", "", "success");
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la suppression du justificatif:', error);
        throw error;
      }
    }
  });
}

// --------------------------------------------------- REFUSED ----------------------------------------------------
const refusedJustificatif = (id: number) => {

  Swal.fire({
    title: "Voulez-vous vraiment refuser ce justificatif?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Retour"
  }).then(async (result) => {
    if (result.isConfirmed) {

      try {
        const response = await ApiService.put(`/justificatifs/${id}/${id}/${id}`, {
          statut: "Refusée"
        });
        Swal.fire("Justificatif refusée avec succès", "", "success");
        getAllJustificatif()
      } catch (error) {
        console.error('Erreur lors de la mise à jour du justificatif:', error);
        throw error;
      }

    } else if (result.isDenied) {
      Swal.fire("Refus annuler avec succès ", "", "info");
    }
  });

}

// --------------------------------------------------- REFUSED ----------------------------------------------------
const acceptedJustificatif = (id: number, presenceId: number) => {

  Swal.fire({
    title: "Voulez-vous vraiment accepter ce justificatif?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Oui",
    cancelButtonText: "Retour"
  }).then(async (result) => {
    if (result.isConfirmed) {

      try {
        const response = await ApiService.put(`/justificatifs/${id}/${presenceId}`, {
          statut: "Acceptée"
        });
        Swal.fire("Justificatif acceptée avec succès", "", "success");
        getAllJustificatif()
      } catch (error) {
        console.error('Erreur lors de la mise à jour du justificatif:', error);
        throw error;
      }

    } else if (result.isDenied) {
      Swal.fire("Refus annuler avec succès ", "", "info");
    }
  });

}

// ---------------------------------------------------- GET -------------------------------------------------------
const getAllJustificatif = async () => {
  try {
    const response = await ApiService.get('/justificatifs');
    justificatifs.value = response.data;
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des justificatifs:', error);
    throw error;
  }
}

onMounted(() => {
  getAllJustificatif()
})

</script>

<style>
td,
th {
  border: 1px solid gray;
}
</style>