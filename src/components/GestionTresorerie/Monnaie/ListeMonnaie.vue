<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#AddMonnaieModal">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="fa fa-plus-circle"></i> -->
                    Ajouter une monnaie
                </a>
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
                        placeholder="Rechercher une monnaie" />
                    <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
                        <i class="flaticon-search-interface-symbol"></i>
                    </button>
                </form>
                <!-- <button
          class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
          type="button"
        >
          <i class="flaticon-dots"></i>
        </button> -->
            </div>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25">
            <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                    <thead>
                        <tr>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Id
                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Libelle

                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Valeur

                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                DATE DE CREATION

                            </th>
                            <th scope="col"
                                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0">Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(monnaie, index) in monnaies" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black">
                                {{ monnaie.id }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black">
                                {{ monnaie.libelle }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ monnaie.valeur }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ format_date(monnaie.created_at) }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block"
                                    style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                                    data-popper-placement="bottom-start">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a href="javascript:void(0);" @click="moddifier(monnaie)" data-bs-toggle="modal"
                                            data-bs-target="#AddMonnaieModal">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                                        </a>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a href="javascript:void(0);"
                                            @click="suppression(monnaie.id, monnaies, 'monnaies', `la monnaie ${monnaie.valeur}`)">
                                            <i class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
                                            Supprimer
                                        </a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
                <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
                    @paginate="handlePaginate" />
            </div>
        </div>
    </div>
    <AddMonnaieModal @get-all-monnaies="getAllMonnaies" :id="idmonnaie" @openmodal="showModalEdite" @close="recharger"
        @refreshMonnaies="refreshMonnaies" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtCategorie from "@/services/JwtService";
import { Monnaie } from "@/models/Monnaie";
import AddMonnaieModal from "./AddMonnaieModal.vue";



export default {
    name: "ListeMonnaie",
    components: {
        AddMonnaieModal,
        PaginationComponent
    },
    setup: () => {

        onMounted(() => {
            getAllMonnaies();
        });

        const monnaies = ref<Array<Monnaie>>([]);
        const idmonnaie = ref(0);
        // const monnaie = ref<Monnaie>();
        const loading = ref<boolean>(false);
        const router = useRouter();

        // BEGIN PAGINATE
        const searchTerm = ref('');
        const page = ref(1);
        const totalPages = ref(0);
        const limit = ref(10);
        const totalElements = ref(0);

        const handlePaginate = ({ page_, limit_ }: { page_: number, limit_: number }) => {
            try {
                page.value = page_;
                getAllMonnaies(page_, limit_);
            } catch (error) {
                //
            }
        };

        function rechercher() {
            getAllMonnaies(page.value, limit.value, searchTerm.value);
        }

        const recharger = () => {
            getAllMonnaies();
        };
        // END PAGINATE

        onMounted(() => {
            loading.value = false;
            getAllMonnaies();
        });

        const refreshMonnaies = () => {
            getAllMonnaies();
        };

        function getAllMonnaies(page = 1, limi = 10, searchTerm = '') {
            return ApiService.get(`/monnaies?page=${page}&limit=${limi}&mot=${searchTerm}&`).then((res) => {
                monnaies.value = res.data.data.data;
                console.log(monnaies.value)
                totalPages.value = res.data.data.totalPages;
                limit.value = res.data.data.limit;
                totalElements.value = res.data.totalElements;
            })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

        function moddifier(Editmonnaie: Monnaie) {
            idmonnaie.value = Editmonnaie.id;
        }

        function showModalEdite(model: any) {
            showModal(model);
            idmonnaie.value = 0;
        }

        const privileges = ref<Array<string>>(JwtCategorie.getPrivilege());

        const checkPermission = (name) => {
            return privileges.value.includes(name);
        }

        return {
            suppression,
            checkPermission,
            monnaies,
            format_date,
            getAllMonnaies,
            idmonnaie,
            moddifier,
            showModalEdite,
            page,
            totalPages,
            limit,
            totalElements,
            handlePaginate,
            searchTerm,
            rechercher,
            recharger,
            refreshMonnaies,
        };
    }
}

</script>