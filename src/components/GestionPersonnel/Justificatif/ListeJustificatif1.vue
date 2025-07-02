<template>
  <div class="px-lg-4 py-lg-5 p-md-3 p-3 text-start">
    <router-link to="/justificatifs/ajouter-justificatif" class="btn btn-primary my-1">
      <i class="fa fa-plus-circle"></i>
      Ajouter un justificatif
    </router-link>
    <div class="col-12 mb-2 d-flex justify-content-around flex-wrap">
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
        <i class="fa fa-search mx-2"></i>
        <input type="search" class="form-control" @input="sortJustificatifWithSearch($event.target)"
          placeholder="Rechercher par personnel">
      </div>
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
        <span class="mx-2"> Date </span>
        <input type="date" class="form-control" @input="sortJustificatifWithDateDebut($event.target)" />
      </div>
    </div>
    <div class="card rounded rounded-4 px-2 pt-4 py-1">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col"> Personnel </th>
            <th scope="col"> Date de debut </th>
            <th scope="col"> Date de fin </th>
            <th scope="col"> Preuve </th>
            <th scope="col"> Statut </th>
            <th scope="col"> Actions </th>
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
            <td v-if="justificatif.statut === 'Acceptée'" class="text-center">
              <span class="badge badge-success">Acceptée</span>
            </td>
            <td v-else-if="justificatif.statut === 'Refusée'" class="text-center">
              <span class="badge badge-danger">Refusée</span>
            </td>
            <td v-else-if="justificatif.statut === 'En cours de traitement'" class="text-center">
              <span class="badge badge-primary">En cours</span>
            </td>
            <td class="shadow-none lh-1 fw-medium text-body-tertiary pe-0">
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                aria-expanded="false" v-if="justificatif.statut != 'Refusée'">Actions</button>
              <ul class="dropdown-menu dropdown-block"
                style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                data-popper-placement="bottom-start">
                <li class="dropdown-item d-flex align-items-center" v-if="justificatif.statut != 'Refusée'">
                  <a v-if="justificatif.statut != 'Refusée'" href="#" @click="refusedJustificatif(justificatif.id)">
                    <i class="fa fa-close lh-2 me-8 p-1 position-relative top-1"></i>
                    Refusé
                  </a>
                </li>
                <li class="dropdown-item d-flex align-items-center"
                  v-if="justificatif.statut != 'Refusée' && justificatif.statut != 'Acceptée'">
                  <a v-if="justificatif.statut != 'Refusée' && justificatif.statut != 'Acceptée'" href="#"
                    @click="acceptedJustificatif(justificatif.id, justificatif.presence.id)">
                    <i class="fa fa-check lh-2 me-8 p-1 position-relative top-1"></i>
                    Accepté
                  </a>
                </li>
                <li class="dropdown-item d-flex align-items-center">
                  <router-link :to="`/justificatifs/edit-justificatif/${justificatif.id}`"
                    class="text-decoration-none p-1"
                    v-if="justificatif.statut != 'Refusée' && justificatif.statut != 'Acceptée'">
                    <i class="fa fa-pencil lh-2 me-8 p-1 position-relative top-1"></i> Modifier
                  </router-link>
                </li>
                <li class="dropdown-item d-flex align-items-center" v-if="justificatif.statut != 'Refusée'">
                  <a v-if="justificatif.statut != 'Refusée'" href="#" @click="deleteJustificatif(justificatif.id)">
                    <i class="fa fa-trash lh-2 me-8 p-1 position-relative top-1"></i>
                    Supprimé
                  </a>
                </li>
              </ul>
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