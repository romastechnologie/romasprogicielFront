<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <router-link class="btn btn-primary" to="/finances/ajouter-finance">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="flaticon-plus position-relative ms-5 fs-12"></i> -->
                    Faire une finacement
                </router-link>
                <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button"
        >
          Exporter
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button> -->
            </div>
            <!--<div class="d-flex align-items-center">
                <form class="search-box position-relative me-15" @submit.prevent="rechercher">
                    <input type="text" v-model="searchTerm" @keyup="rechercher"
                        class="form-control shadow-none text-black rounded-0 border-0"
                        placeholder="Rechercher un privilege" />
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
            </div>-->
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Piece de caisse</th>
                            <th scope="col">montant</th>
                            <th scope="col">Type de finance</th>
                            <th scope="col">Nom du bénéficiaire</th>
                            <th scope="col">Prenom du bénéficiaire</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="finance in financeList" :key="finance.id">
                            <th>{{ finance.id }}</th>
                            <th > <a :href="`http://localhost:3000/api/uploads/${finance.fichier}`" target="_blank">{{ finance.fichier }}</a> </th>
                            <th>{{ finance.montant }}</th>
                            <th>{{ finance.type }}</th>
                            <th>{{ finance.nomBeneficiaire }}</th>
                            <th>{{ finance.prenomBeneficiaire }}</th>
                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block"
                                    style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                                    data-popper-placement="bottom-start">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <router-link type="button" :to="`/finances/edit-finance/${finance.id}`">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1">
                                                Modifier
                                            </i>
                                        </router-link>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a type="button" @click="deleteFinance(finance.id)">
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

interface Finance {
    id: number
    fichier: string
    montant: string
    type: string
    nomBeneficiaire: number
    prenomBeneficiaire: string
    
}

import { onMounted, ref } from "vue";
import axios from "axios";
import ApiService from "@/services/ApiService";
import Swal from "sweetalert2";

    const financeList = ref<Finance[]>([])
   

    onMounted(() => {
        getFinance()
    })

    
    const getFinance = async () => {
        await axios.get<Finance[]>('/finances').then(res => {
            financeList.value = res.data
            console.log(financeList.value)
        })
    }
    
        const deleteFinance = async (id: number) => {
            Swal.fire({
            title: 'Etes-vous sûr?',
            text: "Vous voulez vraiment supprimer cette finance !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ddd',
            cancelButtonText: 'Non',
            confirmButtonText: 'Oui!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ApiService.delete('/finances/' + id + '').then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Finance supprimée avec succès!',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    getFinance();
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