<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
    </div>
    <div class="px-lg-4 py-lg- p-md-3 p-3 text-start">
       
      </div>
      <div v-if="!onListe" class="mb-5">
        <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
          <template v-slot:eventContent='arg'>
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </FullCalendar>
      </div>
      
      <div v-if="onListe" class="col-12 mb-2 d-flex justify-content-around align-items-center flex-wrap">
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
          <i class="fa fa-search mx-2"></i>
          <input type="search" class="form-control" @input="sortCongeWithSearch($event.target)"
            placeholder="Rechercher par intitulé">
        </div>
        
      </div>
      <div v-if="onListe" class="card rounded rounded-4 px-2 pt-4 py-1">
      </div>
        
      </div>
  </template>
   
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
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
  
  //  ----------------------------------------------- END CALENDAR LIBRARY ---------------------------------------------
  
  const onListe = ref(false);
  
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