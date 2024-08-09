<template>
  <div class="px-lg-4 p-md-3 p-3 text-start">
    <router-link to="/permissionps/ajouter-permissionp">
      <button class="btn btn-primary mb-3">
        <i class="fa fa-plus-circle mx-2"></i>
        Ajouter une permission
      </button>
    </router-link>
    <div class="d-flex justify-content-around">
      <button v-if="!onListe" class="btn btn-secondary mb-3" @click="onListe = true">
        Liste
      </button>
      <button v-if="onListe" class="btn btn-primary mb-3" @click="onListe = true">
        Liste
      </button>
      <button v-if="onListe" class="btn btn-secondary mb-3" @click="onListe = false">
        Calendrier
      </button>
      <button v-if="!onListe" class="btn btn-primary mb-3" @click="onListe = false">
        Calendrier
      </button>
    </div>
    <div v-if="!onListe" class="mb-5">
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <div v-if="onListe" class="col-12 mb-2 d-flex justify-content-around flex-wrap">
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
        <i class="fa fa-search mx-2"></i>
        <input type="search" class="form-control" @input="sortPermissionWithSearch($event.target)"
          placeholder="Rechercher par personnel">
      </div>
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
        <span class="mx-2"> Date </span>
        <input type="date" class="form-control" @input="sortPermissionWithDateDebut($event.target)" />
      </div>
    </div>
    <div v-if="onListe" class="card rounded rounded-4 px-2 pt-4 py-1 ">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col"> Personnel </th>
            <th scope="col"> Motif </th>
            <th scope="col"> Date de debut </th>
            <th scope="col"> Date de fin </th>
            <th scope="col"> Date de reprise </th>
            <th scope="col" class="text-end"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permission in filterPermission" :key="permission.id">
            <td> {{ permission.demande ? permission.demande.personnel.nom + " " +
              permission.demande.personnel.prenom : "null" }} </td>
            <td> {{ permission.motif }} </td>
            <td> {{ permission.dateDebut.toString().slice(0, 10) }} </td>
            <td> {{ permission.dateFin.toString().slice(0, 10) }} </td>
            <td> {{ permission.dateReprise.toString().slice(0, 10) }} </td>
            <td class="shadow-none lh-1 fw-medium text-black pe-0  text-end">
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">Actions</button>
              <ul class="dropdown-menu dropdown-block"
                style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                data-popper-placement="bottom-start">
                <li class="dropdown-item d-flex align-items-center">
                  <router-link :to="`/permissionps/edit-permissionp/${permission.id}`" class="text-decoration-none p-1">
                    <i class="fa fa-pencil lh-2 me-8 p-1 position-relative top-1"></i> Modifier
                  </router-link>
                </li>
                <li class="dropdown-item d-flex align-items-center">
                  <a @click="deletePermission(permission.id)">
                    <i class="fa fa-trash lh-2 me-8 p-1 position-relative top-1"></i>
                    Supprimé
                  </a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filterPermission.length == 0" class="fs-5 d-flex justify-content-center">
        La liste est vide
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import axios from 'axios';
import Swal from 'sweetalert2';

// -------------------------------------------------- START CALENDAR LIBRARY ----------------------------------------------
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import ApiService from '@/services/ApiService';

const permissions = ref([] as any[]);

let filterPermission = ref(permissions);

function sortPermissionWithDateDebut(choosedDate: any) {
  const presenceOnSelectedDate = permissions.value.filter(entry => {
    const entryDate = new Date(entry.dateDebut);
    const selectedDate = new Date(choosedDate.value);
    // Comparaison en ignorant les heures
    return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  });

  filterPermission.value = presenceOnSelectedDate;
}

function sortPermissionWithSearch(searchPermission: any) {
  if ((searchPermission.value as string).trim() === "") {
    filterPermission.value = permissions.value
  } else {
    filterPermission.value = permissions.value.filter(permission => (permission.demande.personnel.nom.toLowerCase()).startsWith((searchPermission.value as string).trim().toLowerCase()))
  }
}

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
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventClick: handleEventClick,
  locale: frLocale,
  events: permissions.value.map(permissions => ({
    id: permissions.id,
    title: permissions.motif,
    start: permissions.dateDebut,
    end: permissions.dateFin,
    allDay: true,
  }))
})

// Modification des options
function handleWeekendsToggle() {
  calendarOptions.value.weekends = !calendarOptions.value.weekends
}

function handleEventClick(clickInfo: any) {
  Swal.fire(clickInfo.event.title, "");
}

//  ----------------------------------------------- END CALENDAR LIBRARY ---------------------------------------------

const onListe = ref(true);

// ------------------------------------------------- DELETE --------------------------------------------

function deletePermission(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer cette permission?",
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: "Annuler"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.delete(`/permissionps/${id}`);
        getAllPermissions()
        Swal.fire("Permission supprimé avec succès!", "", "success");
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de la suppression de la permission:', error);
        throw error;
      }
    }
  });
}

// ------------------------------------------------- GET ------------------------------------------------
const getAllPermissions = async () => {
  try {
    const response = await ApiService.get('/permissionps');
    permissions.value = response.data;

    calendarOptions.value.events = permissions.value.map(permissions => {

      const endDate = new Date(permissions.dateFin);

      endDate.setDate(endDate.getDate() + 1);

      return {
        id: permissions.id,
        title: permissions.motif + " ===> " + permissions.demande.personnel.nom + " " + permissions.demande.personnel.prenom,
        start: permissions.dateDebut,
        end: endDate,
        allDay: true,
      }
    })
    console.log(response);
  } catch (error) {
    console.error('Erreur lors de la recupération des permissions:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPermissions()
})

</script>

<style>
td,
th {
  border: 1px solid gray;
}
</style>