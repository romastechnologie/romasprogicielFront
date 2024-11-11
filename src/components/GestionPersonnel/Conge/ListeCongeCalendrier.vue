<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <h2 class="mb-0">Gestion des Congés</h2>
    </div>
    <div class="px-lg-4 py-lg- p-md-3 p-3 text-start">
      <div v-if="!onListe" class="mb-5">
        <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
          <template v-slot:eventContent='arg'>
            <div :style="{ backgroundColor: arg.event.extendedProps.backgroundColor, padding: '5px', borderRadius: '5px' }">
              <span class="event-title">{{ arg.event.title }}</span>
            </div>
          </template>
        </FullCalendar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
const onListe = ref(false);

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
  events: []
});

function handleEventClick(clickInfo: any) {
  const fullName = clickInfo.event.extendedProps.fullName;
  const startDate = clickInfo.event.extendedProps.startDate;
  const endDate = clickInfo.event.extendedProps.endDate;

  Swal.fire({
    title: fullName,
    html: `<p><strong>Date de début :</strong> ${startDate}</p>
           <p><strong>Date de fin :</strong> ${endDate}</p>`,
    icon: 'info'
  });
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getAllConges = async () => {
  try {
    const response = await ApiService.get('/conges');
    conges.value = response.data;

    calendarOptions.value.events = conges.value.map(conge => {
      const today = formatDate(new Date());

      let backgroundColor = 'purple';

      if (conge.dateDebut === today) {
        backgroundColor = 'green';
      } else if (conge.dateFin === today) {
        backgroundColor = 'red';
      }

      return {
        id: conge.id,
        title: conge.personnel.prenom,
        start: conge.dateDebut,
        end: conge.dateFin,
        allDay: true,
        extendedProps: {
          fullName: conge.personnel.nom + " " + conge.personnel.prenom,
          startDate: conge.dateDebut,
          endDate: conge.dateFin,
          backgroundColor: backgroundColor
        }
      };
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des congés:', error);
    throw error;
  }
};

onMounted(() => {
  getAllConges();
})
</script>

<style scoped>
.demo-app-calendar {
  max-width: 900px;
  margin: 40px auto;
}

.event-title {
  font-size: 1.1em;
  font-weight: bold;
  color: white;
}
</style>
