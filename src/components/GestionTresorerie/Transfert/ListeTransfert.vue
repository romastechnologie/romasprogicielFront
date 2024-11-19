<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <router-link class="btn btn-primary" to="/transferts/ajouter-transfert">
                    <i class="fa fa-plus-circle"></i>
                    Faire un transfert
                </router-link>     
            </div>
            <div class="d-flex align-items-center">
                <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
                    <input type="text" v-model="searchTerm" @keyup="rechercher"
                        class="form-control shadow-none text-black"
                        placeholder="Rechercher un transfert" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                        <i class="flaticon-search-interface-symbol"></i>
                    </button>
                </form>
                <button
                    class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
                    type="button">
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
                            <th scope="col">Source</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Date de Transfert</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="transfert in transfertList" :key="transfert.id">
                            <th>{{ transfert.id }}</th>
                            <td>{{ transfert.source }}</td>
                            <td>{{ transfert.destination }}</td>
                            <td>{{ transfert.montant }}</td>
                            <td>{{ format_date(transfert.dateDeTransfert) }}</td>
                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <router-link :to="`/transferts/edit-transfert/${transfert.id}`">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1"> Modifier</i>
                                        </router-link>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a @click="deleteTransfert(transfert.id)">
                                            <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"> Supprimer</i>
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
import { onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { format_date } from "@/utils/utils";
import { Transfert } from "@/models/Transfert";

const transfertList = ref<Transfert[]>([]);
const searchTerm = ref("");

onMounted(() => {
    getTransfert();
});

const getTransfert = async () => {
    try {
        const res = await axios.get<Transfert[]>('/all/transferts');
        transfertList.value = res.data;
        console.log(transfertList.value);
    } catch (error) {
        console.error("Erreur lors de la récupération des transferts:", error);
    }
};

const deleteTransfert = async (id: number) => {
    Swal.fire({
        title: 'Etes-vous sûr?',
        text: "Vous voulez vraiment supprimer ce transfert !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ddd',
        cancelButtonText: 'Non',
        confirmButtonText: 'Oui!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await ApiService.delete(`/transferts/${id}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Transfert supprimé avec succès!',
                    showConfirmButton: false,
                    timer: 1000
                });
                getTransfert();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur de suppression!',
                    showConfirmButton: false,
                    timer: 1000
                });
                console.error('Erreur détectée pendant la suppression:', error);
            }
        }
    });
};

const rechercher = () => {
    // Logique de recherche en fonction de `searchTerm`
    // Filtrer transfertList pour afficher les résultats correspondant au terme recherché
};
</script>
