<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div
            class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <div class="d-sm-flex align-items-center">
                <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#AddTypeTresorerieModal">
                    <i class="fa fa-plus-circle"></i>
                    <!-- <i class="fa fa-plus-circle"></i> -->
                    Ajouter un type de trésorerie
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
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un type de trésorerie"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
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
                                Code

                            </th>
                            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                                Libelle

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
                        <tr v-for="(typeTresorerie, index) in typeTresoreries" :key="index">
                            <td class="shadow-none lh-1 fw-medium text-black">
                                {{ typeTresorerie.id }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black">
                                {{ typeTresorerie.code }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ typeTresorerie.libelle }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                                {{ format_date(typeTresorerie.created_at) }}
                            </td>
                            <td class="shadow-none lh-1 fw-medium text-black pe-0">
                                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">Actions</button>
                                <ul class="dropdown-menu dropdown-block"
                                    style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                                    data-popper-placement="bottom-start">
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a href="javascript:void(0);" @click="moddifier(typeTresorerie)" data-bs-toggle="modal"
                                            data-bs-target="#AddTypeTresorerieModal">
                                            <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                                        </a>
                                    </li>
                                    <li class="dropdown-item d-flex align-items-center">
                                        <a href="javascript:void(0);"
                                            @click="suppression(typeTresorerie.id, typeTresoreries, 'monnaies', `le type de tresorerie ${typeTresorerie.libelle}`)">
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
    <AddTypeTresorerieModal @get-all-typeTresoreries="getAllTypeTresoreries" :id="idtypeTresorerie" @openmodal="showModalEdite" @close="recharger"
        @refreshTypeTresoreries="refreshTypeTresoreries" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, error, } from "@/utils/utils";
import { useRouter } from "vue-router";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtCategorie from "@/services/JwtService";
import AddTypeTresorerieModal from "./AddTypeTresorerieModal.vue";
import { TypeTresorerie } from "@/models/TypeTresorerie";



export default {
    name: "ListeTypeTresorerie",
    components: {
        AddTypeTresorerieModal,
        PaginationComponent
    },
    setup: () => {

        onMounted(() => {
            getAllTypeTresoreries();
        });

        const typeTresoreries = ref<Array<TypeTresorerie>>([]);
        const idtypeTresorerie = ref(0);
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
                getAllTypeTresoreries(page_, limit_);
            } catch (error) {
                //
            }
        };

        function rechercher() {
            getAllTypeTresoreries(page.value, limit.value, searchTerm.value);
        }

        const recharger = () => {
            getAllTypeTresoreries();
        };
        // END PAGINATE

        onMounted(() => {
            loading.value = false;
            getAllTypeTresoreries();
        });

        const refreshTypeTresoreries = () => {
            getAllTypeTresoreries();
        };

        function getAllTypeTresoreries(page = 1, limi = 10, searchTerm = '') {
            return ApiService.get(`/typeTresoreries?page=${page}&limit=${limi}&mot=${searchTerm}&`)
            //return ApiService.get('/typeTresoreries')
            .then((data) => {
                typeTresoreries.value = data.data.data;
                console.log(typeTresoreries.value)
                totalPages.value = data.data.totalPages;
                limit.value = data.data.limit;
                totalElements.value = data.data.totalElements;
                return data.data;
            })
                .catch(({ response }) => {
                    error(response.data.message)
                });
        }

       
      

        function moddifier(EdittypeTresorerie: TypeTresorerie) {
            idtypeTresorerie.value = EdittypeTresorerie.id;
        }

        function showModalEdite(model: any) {
            showModal(model);
            idtypeTresorerie.value = 0;
        }

        const privileges = ref<Array<string>>(JwtCategorie.getPrivilege());

        const checkPermission = (name) => {
            return privileges.value.includes(name);
        }

        return {
            suppression,
            checkPermission,
            typeTresoreries,
            format_date,
            getAllTypeTresoreries,
            idtypeTresorerie,
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
            refreshTypeTresoreries,
        };
    }
};

</script>