<template>
    <div class="px-lg-4 py-lg-5 p-md-3 p-3 text-start">
      <div class="col-12 mb-2 d-flex justify-content-around flex-wrap">
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center mb-2">
          <span class="material-symbols-outlined mx-2">
            search
          </span>
          <input type="search" class="form-control" @input="sortHeureSupWithSearch($event.target)"
            placeholder="Rechercher par personnel">
        </div>
        <div class="col-lg-4 col-md-4 col-10 d-flex align-items-center">
          <span class="mx-2"> Date </span>
          <input type="date" class="form-control" @input="sortHeureSupWithDateDebut($event.target)" />
        </div>
      </div>
      <div class="card rounded rounded-4 px-2 pt-4 py-1 overflow-auto">
        <table class="table m-0">
          <thead>
            <tr>
              <th scope="col"> Personnel </th>
              <th scope="col"> Date </th>
              <th scope="col"> Durée </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="heureSup in filterHeureSup" :key="heureSup.id">
              <td> {{ heureSup.personnel ? heureSup.personnel.nom + " " +
                heureSup.personnel.prenom : "null" }} </td>
              <td> {{ heureSup.date.toString().slice(0, 10) }} </td>
              <td> {{ heureSup.duree }} </td>
              <td>
                <div class="d-flex justify-content-center">
                  <router-link :to="`/updateHeureSup/${heureSup.id}`" class="text-decoration-none">
                    <span type="button"
                      class="material-symbols-outlined card fs-3 d-flex justify-content-center align-items-center text-success text-center"
                      style="height: 40px; width: 40px;">
                      update
                    </span>
                  </router-link>
                  <!-- <span @click="deleteHeureSup(heureSup.id)" type="button"
                    class="material-symbols-outlined card fs-3 mx-1 d-flex justify-content-center align-items-center text-danger text-center"
                    style="height: 40px; width: 40px;">
                    delete
                  </span> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="filterHeureSup.length == 0" class="fs-5 d-flex justify-content-center">
          La liste est vide
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue'
  import axios from 'axios';
  import Swal from 'sweetalert2';
import router from '@/router';
import ApiService from '@/services/ApiService';
  
  const heuresups = ref([] as any[]);
  
  let filterHeureSup = ref(heuresups);
  
  function sortHeureSupWithDateDebut(choosedDate: any) {
    const presenceOnSelectedDate = heuresups.value.filter(entry => {
      const entryDate = new Date(entry.dateDebut);
      const selectedDate = new Date(choosedDate.value);
      // Comparaison en ignorant les heures
      return entryDate.toISOString().slice(0, 10) === selectedDate.toISOString().slice(0, 10);
    });
  
    filterHeureSup.value = presenceOnSelectedDate;
  }
  
  function sortHeureSupWithSearch(searchPresence: any) {
    if ((searchPresence.value as string).trim() === "") {
      filterHeureSup.value = heuresups.value
    } else {
      filterHeureSup.value = heuresups.value.filter(heuresup => (heuresup.personnel.nom.toLowerCase()).startsWith((searchPresence.value as string).trim().toLowerCase()))
    }
  }
  // ------------------------------------------------- DELETE --------------------------------------------
  function deleteHeureSup(id: number) {
  
    Swal.fire({
      title: "Voulez-vraiment supprimer cette heure supplémentaire?",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await ApiService.delete(`/heureSups/${id}`);
          getAllHeureSup()
          Swal.fire("Heure supplémentaire supprimé avec succès!", "", "success");
          console.log(response);
        } catch (error) {
          console.error('Erreur lors de la suppression de l heure supplémentaire:', error);
          throw error;
        }
      }
    });
  }
  
  // -------------------------------------------------- GET ------------------------------------------------
  const getAllHeureSup = async () => {
    try {
      const response = await ApiService.get('/heureSups');
      heuresups.value = response.data;
  
    } catch (error) {
      console.error('Erreur lors de la recupération des heures supplementaires:', error);
      throw error;
    }
  }
  
  onMounted(()=>{
    getAllHeureSup()
  })
  
  </script>
  
  <style>
  td,
  th {
    border: 1px solid gray;
  }
  </style>