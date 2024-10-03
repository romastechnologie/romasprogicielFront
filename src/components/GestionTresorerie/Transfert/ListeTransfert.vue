<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <router-link class="btn btn-primary" to="/transferts/ajouter-transfert">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="fa fa-plus-circle"></i> -->
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
                            <th>{{ transfert.tresorerie?.nom }}</th>
                            <th>{{ transfert.tresorerie2?.nom }}</th>
                            <th>{{ transfert.montant }}</th>
                            <th>{{ format_date(transfert.created_at) }}</th>
                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block"
                                    style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                                    data-popper-placement="bottom-start">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <router-link type="button" :to="`/transferts/edit-transfert/${transfert.id}`">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1">
                                                Modifier
                                            </i>
                                        </router-link>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a type="button" @click="deleteTransfert(transfert.id)">
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

import { Transfert } from "@/models/Transfert";

import { onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import { format_date } from "@/utils/utils";

const transfertList = ref<Transfert[]>([])


onMounted(() => {
    getTransfert()
})


const getTransfert = async () => {
    await axios.get<Transfert[]>('/transferts/').then(res => {
        transfertList.value = res.data
        console.log(transfertList.value)
    })
}

const deleteTransfert = async (id: any) => {
    Swal.fire({
        title: 'Etes-vous sûr?',
        text: "Vous voulez vraiment supprimer cet transfert !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#ddd',
        cancelButtonText: 'Non',
        confirmButtonText: 'Oui!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await ApiService.delete('/transferts/' + id + '').then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Transfert supprimé avec succès!',
                    showConfirmButton: false,
                    timer: 1000
                });
                getTransfert();
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