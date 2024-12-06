<template>
  <div v-if="onListe" class="card rounded rounded-4 px-2 pt-4 py-1">
    <div class="px-lg-4 py-lg-3 p-md-3 p-3 text-start">
      <router-link to="/conges/ajouter-conge">
        <button class="btn btn-primary mb-3">
          <i class="fa fa-plus-circle mx-2"></i>
          Programmer un congé
        </button>
      </router-link>
      <div class="d-flex justify-content-around"></div>
      <div class="col-12 mb-2 d-flex justify-content-around align-items-center flex-wrap">
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
          <i class="fa fa-search mx-2"></i>
          <input
            type="search"
            class="form-control"
            @input="sortCongeWithSearch($event.target)"
            placeholder="Rechercher par intitulé"
          />
        </div>
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
          <span class="mx-2"> Date </span>
          <input
            type="date"
            class="form-control"
            @input="sortCongeWithDateDebut($event.target)"
          />
        </div>
      </div>
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col">Personnel</th>
            <th scope="col">Date de début</th>
            <th scope="col">Date de fin prévue</th>
            <th scope="col">Date de fin</th>
            <th scope="col">Date de reprise</th>
            <th scope="col">Statut</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="conge in filterConge" :key="conge.id">
            <td>
              {{ conge.personnel
                ? conge.personnel.nom + " " + conge.personnel.prenom
                : "null" }}
            </td>
            <td>{{ conge.dateDebut.toString().slice(0, 10) }}</td>
            <td>{{ conge.dateFinPrevu.toString().slice(0, 10) }}</td>
            <td>{{ conge.dateFin.toString().slice(0, 10) }}</td>
            <td>{{ conge.dateReprise.toString().slice(0, 10) }}</td>
            <td>
              <span
                v-if="conge.statut === 'Confirmé'"
                class="badge badge-success text-center"
              >
                Confirmé
              </span>
              <span
                v-else-if="conge.statut === 'Annulé'"
                class="badge badge-danger text-center"
              >
                Annulé
              </span>
              <span
                v-else-if="conge.statut === 'Interrompu'"
                class="badge badge-primary text-center"
              >
                Interrompu
              </span>
            </td>
            <!-- Colonne Actions -->
            <td>
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle btn-primary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Actions
                </button>
                <ul class="dropdown-menu">
                  <li
                    class="dropdown-item"
                    v-if="conge.statut !== 'Annulé' && conge.statut !== 'Interrompu'"
                  >
                    <a @click="pauseConge(conge.id)">
                      <i class="fa fa-pause me-2"></i> Interrompre
                    </a>
                  </li>
                  <li
                    class="dropdown-item"
                    v-if="conge.statut !== 'Annulé' && conge.statut !== 'Terminé'"
                  >
                    <a @click="cancelConge(conge.id)">
                      <i class="fa fa-times me-2"></i> Annuler
                    </a>
                  </li>
                  <li
                    class="dropdown-item"
                    v-if="conge.statut !== 'Annulé' && conge.statut !== 'Terminé'"
                  >
                    <router-link
                      :to="`/conges/edit-conge/${conge.id}`"
                      class="text-decoration-none"
                    >
                      <i class="fa fa-pencil me-2"></i> Modifier
                    </router-link>
                  </li>
                  <li class="dropdown-item">
                    <a @click="deleteConge(conge.id)">
                      <i class="fa fa-trash me-2"></i> Supprimé
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filterConge.length === 0" class="fs-5 d-flex justify-content-center">
        La liste est vide
      </div>
    </div>
  </div>
</template>

 
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios';
import Swal from 'sweetalert2';

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import ApiService from '@/services/ApiService';

const conges = ref([] as any[]);

const calendarOptions = ref({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    multiMonthPlugin,
    interactionPlugin
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listMonth'
  },
  initialView: 'dayGridMonth',
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventClick: handleEventClick,
  locale: frLocale,
  events: conges.value.map(conge => ({
    id: conge.conge.id,
    title: conge.personnel.nom + " " + conge.personnel.prenom,
    start: conge.conge.dateDebut,
    end: conge.conge.dateFin,
    allDay: true,
  }))
})

function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends
}

function handleEventClick(clickInfo: any) {
  Swal.fire(clickInfo.event.title, "");
}


const onListe = ref(true);

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const date = ref(formatDate(new Date()));

const changeConge = ref(true);

let filterConge = ref([] as any[]);


function sortCongeWithDateDebut(choosedDate: any) {
  const presenceOnSelectedDate = filterConge.value.filter(entry => {
    const entryDate = new Date(entry.dateDebut);
    const selectedDate = new Date(choosedDate.value);
    return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  });

  filterConge.value = presenceOnSelectedDate;
}

function sortCongeWithSearch(searchPresence: any) {
  const searchText = searchPresence.value.toLowerCase();
  
  filterConge.value = conges.value.filter(conge => {
    const nomMatch = conge.personnel && conge.personnel.nom.toLowerCase().includes(searchText);
    const prenomMatch = conge.personnel && conge.personnel.prenom.toLowerCase().includes(searchText);
    const startDateMatch = conge.dateDebut && conge.dateDebut.toLowerCase().includes(searchText);
    const endDateMatch = conge.dateFin && conge.dateFin.toLowerCase().includes(searchText);
    
    return nomMatch || prenomMatch || startDateMatch || endDateMatch;
  });
}

function deleteConge(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer ce congé?",
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: "Annuler"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.delete(`/conges/${id}`);
        Swal.fire("Congé supprimé avec succès!", "", "success");
        getAllconges()
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la suppression des congés:', error);
        throw error;
      }
    }
  });
}

function pauseConge(id: number) {

  Swal.fire({
    title: "Voulez-vraiment interrompre ce congé?",
    showCancelButton: true,
    confirmButtonText: "Interrompre",
    cancelButtonText: "Fermer"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { value: formValues } = await Swal.fire({
        title: "Selectionner la date de fin",
        html: `
          <input type="date" value=${date.value} id="swal-input1" class="swal2-input" placeholder="Heure d'arrivée">
      `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            (document.getElementById("swal-input1") as HTMLInputElement).value,
          ];
        }
      });
      if (formValues) {
        try {
          const response = await ApiService.put(`/conges/${id}`, {
            statut: "Interrompu",
            dateFin: formValues[0]
          });
          Swal.fire("Congé Interrompu avec succès!", "", "success");
          getAllconges()
          console.log(response);
        } catch (error) {
          console.error('Erreur lors de l\'interruption des congés:', error);
          throw error;
        }
      }
    }
  });
}

function cancelConge(id: number) {

  Swal.fire({
    title: "Voulez-vraiment annuler ce congé?",
    showCancelButton: true,
    confirmButtonText: "Annuler",
    cancelButtonText: "Fermer"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.put(`/conges/${id}`, {
          statut: "Annulé"
        });
        Swal.fire("Congé annulé avec succès!", "", "success");
        getAllconges()
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de l\'annulation du congé:', error);
        throw error;
      }
    }
  });
}



const getAllconges = async () => {
  try {
    const response = await ApiService.get('/conges');
    conges.value = response.data;
    filterConge.value = conges.value.filter(conge => conge.personnel); // Ensures personnel exists
    calendarOptions.value.events = conges.value.map(conge => ({
      id: conge.id,
      title: conge.personnel ? `${conge.personnel.nom} ${conge.personnel.prenom}` : 'Unknown',
      start: conge.dateDebut,
      end: new Date(new Date(conge.dateFinPrevu).getTime() + 24 * 60 * 60 * 1000), // Corrects end date for display
      allDay: true,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des congés:', error);
  }
};
onMounted(() => {
  getAllconges();
})

</script>

<style>
td,
th {
  border: 1px solid gray;
}

a {
  font-weight: bold;
  color: white;
  text-decoration: none;

  &.router-link-exact-active {
    color: white;
    background-color: #7A70BA
  }

  &.router-link-exact-active:hover {
    color: white;
  }

}

</style>


