<template>
  <div class="px-lg-4 py-lg- p-md-3 p-3 text-start">
    <a 
               class="btn btn-primary mb-3"
               href="#"
               data-bs-toggle="modal"
             data-bs-target="#AddCongeModal"
           >
           <i class="fa fa-plus-circle mx-2"></i>
             Programmer un congé 
           </a>


    <div v-if="!onListe" class="mb-5">
      <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <!-- <div class="d-flex justify-content-center mb-2">
        <button class="btn btn-secondary" v-if="changeConge == true" @click="changeConge = false"> Congé sans demande
        </button>
        <button class="btn btn-secondary" v-if="changeConge == false" @click="changeConge = true"> Congé avec demande
        </button>
      </div> -->
    <!-- <div v-if="!changeConge" class="col-12 mb-2 d-flex justify-content-around align-items-center flex-wrap">
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
          <span class="material-symbols-outlined mx-2">
            search
          </span>
          <input type="search" class="form-control" @input="sortCongeDemandeWithSearch($event.target)"
            placeholder="Rechercher par personnel">
        </div>
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
          <span class="mx-2"> Date </span>
          <input type="date" class="form-control" @input="sortCongeDemandeWithDateDebut($event.target)" />
        </div>
      </div> -->
    <!-- <div v-if="!changeConge" class="card rounded rounded-4 px-2 pt-4 py-1 overflow-auto">
        <table class="table m-0">
          <thead>
            <tr>
              <th scope="col"> Type de congé </th>
              <th scope="col"> Personnel </th>
              <th scope="col"> Date de debut </th>
              <th scope="col"> Date de fin prévue </th>
              <th scope="col"> Date de fin </th>
              <th scope="col"> Date de reprise </th>
              <th scope="col"> Statut </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="personnelConge in filterCongeDemande" :key="personnelConge.id">
              <td> {{ personnelConge.conge.type ? personnelConge.conge.type.libelle : "null" }} </td>
              <td> {{ personnelConge.personnel ? personnelConge.personnel.nom + " " + personnelConge.personnel.prenom : "null" }} </td>
              <td> {{ personnelConge.conge.dateDebut.toString().slice(0, 10) }} </td>
              <td> {{ personnelConge.conge.dateFinPrevu.toString().slice(0, 10) }} </td>
              <td> {{ personnelConge.conge.dateFin.toString().slice(0, 10) }} </td>
              <td> {{ personnelConge.conge.dateReprise.toString().slice(0, 10) }} </td>
              <td v-if="personnelConge.conge.statut === 'Confirmé'" class="text-center"> Confirmé </td>
              <td v-else-if="personnelConge.conge.statut === 'Annulé'" class="text-center"> Annulé </td>
              <td v-else-if="personnelConge.conge.statut === 'Interrompu'" class="text-center"> Interrompu </td>
              <td v-else-if="personnelConge.conge.statut === 'Terminé'" class="text-center"> Terminé </td>
              <td>
                <div class="d-flex justify-content-center">
                  <span @click="pauseConge(personnelConge.conge.id)" type="button"
                    v-if="personnelConge.conge.statut != 'Annulé' && personnelConge.conge.statut != 'Interrompu' && personnelConge.conge.statut != 'Terminé'"
                    class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger text-center"
                    >
                    pause
                  </span>
                  <span @click="cancelConge(personnelConge.conge.id)" type="button"
                    v-if="personnelConge.conge.statut != 'Interrompu' && personnelConge.conge.statut != 'Annulé' && personnelConge.conge.statut != 'Terminé'"
                    class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger text-center"
                    >
                    cancel
                  </span>
                  <router-link :to="`/updateConge/${personnelConge.conge.id}`" class="text-decoration-none"
                    v-if="personnelConge.conge.statut != 'Interrompu' && personnelConge.conge.statut != 'Annulé' && personnelConge.conge.statut != 'Terminé'">
                    <span type="button"
                      class="material-symbols-outlined card fs-3 d-flex justify-content-center align-items-center text-success text-center"
                      >
                      update
                    </span>
                  </router-link>
                  <span @click="deleteConge(conge.id)" type="button" 
                    class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger text-center"
                    >
                    delete
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filterCongeDemande.length == 0" class="fs-5 d-flex justify-content-center">
          La liste est vide
        </div>
      </div> -->

    <div v-if="onListe" class="col-12 mb-2 d-flex justify-content-around align-items-center flex-wrap">
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
        <i class="fa fa-search mx-2"></i>
        <input type="search" class="form-control" @input="sortCongeWithSearch($event.target)"
          placeholder="Rechercher par intitulé">
      </div>
      <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
        <span class="mx-2"> Date </span>
        <input type="date" class="form-control" @input="sortCongeWithDateDebut($event.target)" />
      </div>
    </div>
    <div v-if="onListe" class="card rounded rounded-4 px-2 pt-4 py-1">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col"> Personnel </th>
            <th scope="col"> Date de debut </th>
            <th scope="col"> Date de fin prévue </th>
            <th scope="col"> Date de fin </th>
            <th scope="col"> Date de reprise </th>
            <th scope="col"> Statut </th>
            <th scope="col"> Actions </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="personnelConge in filterConge" :key="personnelConge.personnel">
            <td> {{ personnelConge.personnel ? personnelConge.personnel.nom + " " + personnelConge.personnel.prenom :
              "null"
              }} </td>
            <td> {{ personnelConge.dateDebut.toString().slice(0, 10) }} </td>
            <td> {{ personnelConge.dateFinPrevu.toString().slice(0, 10) }} </td>
            <td> {{ personnelConge.dateFin.toString().slice(0, 10) }} </td>
            <td> {{ personnelConge.dateReprise.toString().slice(0, 10) }} </td>
            <td v-if="personnelConge.statut === 'Confirmé'" class="text-center"> <span
                class="badge badge-success">Confirmé</span>
            </td>
            <td v-else-if="personnelConge.statut === 'Annulé'" class="text-center"> <span
                class="badge badge-danger">Annulé</span>
            </td>
            <td v-else-if="personnelConge.statut === 'Interrompu'" class="text-center"> <span
                class="badge badge-primary">Interrompu</span>
            </td>
            <!-- <td v-else-if="personnelConge.statut === 'Terminé'" class="text-center"> <span class="badge badge-danger">Terminé</span>
            </td> -->
            <!-- <td>
              <div class="d-flex justify-content-center">
                <span @click="pauseConge(personnelConge.id)" type="button"
                  v-if="personnelConge.statut != 'Annulé' && personnelConge.statut != 'Interrompu' && personnelConge.statut != 'Terminé'"
                  class="material-symbols-outlined card fs-6 mx-1 d-flex justify-content-center align-items-center text-danger text-center">
                  pause
                </span>
                <span @click="cancelConge(personnelConge.id)" type="button"
                  v-if="personnelConge.statut != 'Interrompu' && personnelConge.statut != 'Annulé' && personnelConge.statut != 'Terminé'"
                  class="material-symbols-outlined card fs-6 mx-1 d-flex justify-content-center align-items-center text-danger text-center">
                  cancel
                </span>
                <router-link :to="`/conges/edit-conge/${personnelConge.id}`" class="text-decoration-none"
                  v-if="personnelConge.statut != 'Interrompu' && personnelConge.statut != 'Annulé' && personnelConge.statut != 'Terminé'">
                  <span type="button"
                    class="material-symbols-outlined card fs-6 d-flex justify-content-center align-items-center text-success text-center">
                    update
                  </span>
                </router-link>
                <span @click="deleteConge(personnelConge.id)" type="button"
                  class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger text-center">
                  delete
                </span>
              </div>
            </td> -->
            <td class="shadow-none lh-1 fw-medium text-black pe-0  text-end">
              <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                aria-expanded="false" v-if="personnelConge.statut != 'Annulé'">Actions</button>
              <ul class="dropdown-menu dropdown-block"
                style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                data-popper-placement="bottom-start">
                <li class="dropdown-item d-flex align-items-center"
                  v-if="personnelConge.statut != 'Annulé' && personnelConge.statut != 'Interrompu' && personnelConge.statut != 'Terminé'">
                  <a @click="pauseConge(personnelConge.id)" type="button">
                    <i class="fa fa-pause lh-2 me-8 p-1 position-relative top-1"></i>
                    Interrompre
                  </a>
                </li>
                <li class="dropdown-item d-flex align-items-center"
                  v-if="personnelConge.statut != 'Interrompu' && personnelConge.statut != 'Annulé' && personnelConge.statut != 'Terminé'">
                  <a @click="cancelConge(personnelConge.id)">
                    <i class="fa fa-check lh-2 me-8 p-1 position-relative top-1"></i>
                    Accepté
                  </a>
                </li>
                <li class="dropdown-item d-flex align-items-center"
                  v-if="personnelConge.statut != 'Interrompu' && personnelConge.statut != 'Annulé' && personnelConge.statut != 'Terminé'">
                  <router-link :to="`/conges/edit-conge/${personnelConge.id}`" class="text-decoration-none p-1">
                    <i class="fa fa-pencil lh-2 me-8 p-1 position-relative top-1"></i> Modifier
                  </router-link>
                </li>
                <li class="dropdown-item d-flex align-items-center">
                  <a @click="deleteConge(personnelConge.id)">
                    <i class="fa fa-trash lh-2 me-8 p-1 position-relative top-1"></i>
                    Supprimé
                  </a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="filterConge.length == 0" class="fs-5 d-flex justify-content-center">
        La liste est vide
      </div>
    </div>
  </div>
  <AddCongeModal :item="selectedItem"   @close="recharger"/>
</template>
 
<script setup lang="ts">
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
import { defineComponent, onMounted, ref  } from "vue";
import AddCongeModal from "./AddCongeModal.vue";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import { Conge } from "@/models/Conge";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
       name: "ListeConge",
       components: {
         AddCongeModal,
         PaginationComponent
     },
     setup: () => {
       const modules = {
     
       };
       
const conges = ref<Array<Conge>>([]);
       const conge = ref<Conge>();
       const addCongeModalRef = ref<null | HTMLElement>(null);
       const selectedItem = ref(0);
   

       const searchTerm = ref('');
       const page = ref(1);
       const totalPages = ref(0);
       const limit = ref(10);
       const totalElements = ref(0);

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
  // editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  weekends: true,
  eventClick: handleEventClick,
  locale: frLocale,
  events: conges.value.map(personnelConge => ({
    id: personnelConge.conge.id,
    title: personnelConge.personnel.nom + " " + personnelConge.personnel.prenom,
    start: personnelConge.conge.dateDebut,
    end: personnelConge.conge.dateFin,
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
// let filterCongeDemande = ref([] as any[]);

// function sortCongeDemandeWithDateDebut(choosedDate: any) {
//   const presenceOnSelectedDate = filterCongeDemande.value.filter(entry => {
//     const entryDate = new Date(entry.dateDebut);
//     const selectedDate = new Date(choosedDate.value);
//     // Comparaison en ignorant les heures
//     return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
//   });

//   filterCongeDemande.value = presenceOnSelectedDate;
// }

// function sortCongeDemandeWithSearch(searchPresence: any) {
//   // if ((searchPresence.value as string).trim() === "") {
//   //   filterCongeDemande.value = conges.value.filter(conge => conge.intitule === "");
//   // } else {
//   //   filterCongeDemande.value = conges.value.filter(conge => 
//   //     conge.personnel && conge.personnel.nom && 
//   //     (conge.personnel.nom.toLowerCase()).startsWith((searchPresence.value as string).trim().toLowerCase())
//   //   );
//   // }
// }

function sortCongeWithDateDebut(choosedDate: any) {
  const presenceOnSelectedDate = filterConge.value.filter(entry => {
    const entryDate = new Date(entry.dateDebut);
    const selectedDate = new Date(choosedDate.value);
    // Comparaison en ignorant les heures
    return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
  });

  filterConge.value = presenceOnSelectedDate;
}

function sortCongeWithSearch(searchPresence: any) {
  // if ((searchPresence.value as string).trim() === "") {
  //   filterConge.value = filterConge.value.filter(conge => conge.intitule !== null);
  // } else {
  //   filterConge.value = filterConge.value.filter(conge => (conge.intitule.toLowerCase()).startsWith((searchPresence.value as string).trim().toLowerCase()))
  // }
}

// ------------------------------------------------- ACTION --------------------------------------------

function deleteConge(id: number) {

  Swal.fire({
    title: "Voulez-vraiment suprimer ce congé?",
    showCancelButton: true,
    confirmButtonText: "Supprimer",
    cancelButtonText: "Annuler"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.delete(`/personnelConges/${id}`);
        Swal.fire("Congé supprimé avec succès!", "", "success");
        getAllPersonnelConges()
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
          const response = await ApiService.put(`/personnelConges/${id}`, {
            statut: "Interrompu",
            dateFin: formValues[0]
          });
          Swal.fire("Congé Interrompu avec succès!", "", "success");
          getAllPersonnelConges()
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
        const response = await ApiService.put(`/personnelConges/${id}`, {
          statut: "Annulé"
        });
        Swal.fire("Congé annulé avec succès!", "", "success");
        getAllPersonnelConges()
        console.log(response);
      } catch (error) {
        console.error('Erreur lors de l\'annulation du congé:', error);
        throw error;
      }
    }
  });
}

// const getAllConges = async () => {
//   try {
//     const response = await ApiService.get('/conges');
//     conges.value = response.data;
//     filterCongeDemande.value = conges.value.filter(conge => conge.intitule === "");
//     filterConge.value = conges.value.filter(conge => conge.intitule !== "");

//     calendarOptions.value.events = conges.value.map(conge => {
//       const endDate = new Date(conge.dateFin);
//       const endDate1 = new Date(conge.dateFinPrevu);

//       endDate.setDate(endDate.getDate() + 1);
//       endDate1.setDate(endDate1.getDate() + 1);

//       return {
//         id: conge.id,
//         title: (conge.intitule === "") ? conge.type.libelle + " ===> " + conge.personnel.nom + " " + conge.personnel.prenom : conge.intitule,
//         start: conge.dateDebut,
//         end: (conge.dateFin) ? endDate :  endDate1,
//         allDay: true,
//       };
//     });


//   } catch (error) {
//     console.error('Erreur lors de la recupération des congés:', error);
//     throw error;
//   }
// }

const getAllPersonnelConges = async () => {
  try {
    const response = await ApiService.get('/personnelConges');
    conges.value = response.data;
    // filterCongeDemande.value = conges.value.filter(personnelConge => personnelConge.conge.demande === undefined);
    filterConge.value = conges.value.filter(personnelConge => personnelConge.conge.demande !== "");

    calendarOptions.value.events = conges.value.map(personnelConge => {
      const endDate = new Date(personnelConge.dateFin);
      const endDate1 = new Date(personnelConge.dateFinPrevu);

      endDate.setDate(endDate.getDate() + 1);
      endDate1.setDate(endDate1.getDate() + 1);

      return {
        id: personnelConge.id,
        title: personnelConge.personnel.nom + " " + personnelConge.personnel.prenom,
        start: personnelConge.dateDebut,
        end: endDate1,
        allDay: true,
      };
    });

  } catch (error) {
    console.error('Erreur lors de la recupération des congés:', error);
    throw error;
  }
}

onMounted(() => {
  getAllPersonnelConges();
})

return { modules,
         checkPermission,
               selectedItem,
               conges,
               recharger,
               suppression, 
               moddifier, 
               page, 
               totalPages,
               limit,
               totalElements,
               getAllConge,
               handlePaginate,
               searchTerm,
               rechercher, 
               addCongeModalRef,
               getAllPersonnelConges,
               pauseConge,
       };

},
});

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