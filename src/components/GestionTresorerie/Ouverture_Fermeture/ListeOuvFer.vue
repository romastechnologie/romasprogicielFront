<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <router-link class="btn btn-primary" to="/ouv_fers/ajouter-ouv_fer">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="fa fa-plus-circle"></i> -->
                    Add ouverture
                </router-link>
                <router-link class="btn btn-primary" to="/ouv_fers/ajouter-fermeture">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="fa fa-plus-circle"></i> -->
                    Add fermeture
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
                    <input type="text" v-model="searchTerm" @keyup="rechercher"
                        class="form-control shadow-none text-black"
                        placeholder="Rechercher une Ouverture ou fermeture" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                        <i class="flaticon-search-interface-symbol"></i>
                    </button>
                </form>
                 <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
        </button> 
            </div>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Fond de roulement</th>
                            <th scope="col">Caisse</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ouvFer in ouvFerList" :key="ouvFer.id">
                            <th>{{ ouvFer.id }}</th>
                            <th>{{ ouvFer.fondDeRoulement }}</th>
                            <th>{{ ouvFer.tresorerie?.nom }} ({{ ouvFer.tresorerie.status }})</th>
                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block"
                                    style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                                    data-popper-placement="bottom-start">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <router-link type="button" :to="`/ouv_fers/edit-ouv_fer/${ouvFer.id}`">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1">
                                                Modifier
                                            </i>
                                        </router-link>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a type="button" @click="deleteouvFer(ouvFer.id)">
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

        </div>
    </div>
</template>

<script setup lang="ts">

import { Ouv_Fer } from "@/models/OuvFer";
import { Tresorerie } from "@/models/Tresorerie";
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import ApiService from "@/services/ApiService";
import Swal from "sweetalert2";

    const ouvFerList = ref<Ouv_Fer[]>([])
    const tresorerieList = ref<Tresorerie[]>([])
   

    onMounted(() => {
        getouvFer(),
        getTresorerie()
    })

    const caisses = computed(() => {
        return tresorerieList.value.filter(entity => entity.nom?.toLowerCase().includes('caisse'))
    })


    const getTresorerie = () => {
        ApiService.get('/tresoreries')
            .then(res => {
                tresorerieList.value = res.data
                console.log(res)
            })
    }
    
    const getouvFer = async () => {
        await axios.get<Ouv_Fer[]>('/ouv_fers').then(res => {
            ouvFerList.value = res.data
            console.log(ouvFerList.value)
        })
    }
    
    const deleteouvFer = async (id: any) => {
        Swal.fire({
            title: 'Etes-vous sûr?',
            text: "Vous voulez vraiment supprimer cette ouverture !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ddd',
            cancelButtonText: 'Non',
            confirmButtonText: 'Oui!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ApiService.delete('/ouv_fers/' + id + '').then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ouverture supprimée avec succès!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    getTresorerie();
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
        })
    }

    
    

</script>