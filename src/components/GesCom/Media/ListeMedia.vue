<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/ajouter-media"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un media
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
       <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0"
            placeholder="Rechercher un media"
          />
          <button
            type="submit"
            class="bg-transparent text-primary transition p-0 border-0"
          >
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
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Type Media
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Extension
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom table
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Id table
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(media, index) in medias" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ media.nomMedia }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ media.typeMedia }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ media.extension }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ media.nomTable }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ media.idTable }}
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text pe-0"
              >
              <div class="dropdown">
                  <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      Actions
                      <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                  </span>
                  <ul class="dropdown-menu">
                    <li >
                      <router-link :to="{ name: 'EditMediaPage', params: { id: media.id } }" 
                          class="dropdown-item d-flex align-items-center"><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>Modifier</router-link>
                    </li>
                    <!-- <li>
                        <router-link :to="{ name: 'ViewMediaPage', params: { id: media.id } }" class="dropdown-item d-flex align-items-center">
                            <i class="flaticon-eye lh-1 me-8 position-relative top-1"></i>Détails
                        </router-link>
                    </li> -->
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(media.id,medias,'medias',`l\'media ${media.id}`)">
                        <i class="fa fa-trash-o lh-1 me-8 position-relative top-1" ></i>
                         Supprimer
                      </a>
                    </li>
                  </ul>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center"
      >
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit" @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from "vue";
import Swal from "sweetalert2";
import { Media } from "@/models/Media";
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeMedia",
  components: {
    PaginationComponent
  },
  setup(){
    
    onMounted(() => {
      getAllMedias();
    });

    const medias = ref<Array<Media>>([]);   
    const media = ref<Media>();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllMedias(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllMedias(page.value, limit.value, searchTerm.value );
    }

    // END PAGINATE

    function getAllMedias(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/medias?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          medias.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(Editmedias:Media) {
      media.value = Editmedias;
    }

    const deleteMedia = (id: number) => {
      ApiService.delete(`/medias/${id}`)
      .then(({ data }) => {
        Swal.fire({
          text: data.message,
          toast: true,
          icon: 'success',
          title: 'General Title',
          animation: false,
          position: 'top-right',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          heightAuto: false
        });
      })
      .catch(({ response }) => {
        Swal.fire({
          text: response.data.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Réssayer à nouveau!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
      });

      for(let i = 0; i < medias.value.length; i++) {
        if (medias.value[i].id === id) {
          medias.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return { medias,
      checkPermission,
     getAllMedias,
     deleteMedia,
     moddifier ,
     suppression,
     page, 
    totalPages,
    limit,
    totalElements,
    handlePaginate,
    rechercher,
    searchTerm
  };
  },
});
</script>