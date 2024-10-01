<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <a
          class="btn btn-primary"
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#AddMagasinModal"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter un magasin
        </a>
        <!-- <button
          class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
          type="button">
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
            placeholder="Rechercher un magasin"
          />
          <button type="submit" ref="" class="bg-transparent text-primary transition p-0 border-0">
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
                Code
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom du Magasin
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Magasinier
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Adresse 
              </th>
              
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(magasin, index) in magasins" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin.code }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin.nomMagasin }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin?.personnel?.nom }} {{ magasin?.personnel?.prenom }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ magasin.adresse }}
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
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);"
                        data-bs-toggle="modal"
                        data-bs-target="#AddMagasinModal"
                        @click="moddifier(magasin)"
                      ><i class="flaticon-pen lh-1 me-8 position-relative top-1" ></i>
                        Modifier
                      </a>
                    </li>
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center"
                        href="javascript:void(0);" @click="suppression(magasin.id,magasins,'magasins','la magasin')"
                      >
                        <i
                          class="fa fa-trash-o lh-1 me-8 position-relative top-1" 
                        ></i>
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
  <AddMagasinModal :item="selectedItem" @close="recharger"/>

</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from "vue";
import Swal from "sweetalert2";
import { Magasin } from "@/models/Magasin";
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import AddMagasinModal from "./AddMagasinModal.vue";

export default defineComponent({
  name: "ListeMagasin",
  components: {
    PaginationComponent,
    AddMagasinModal
  },
  setup(){
    
    onMounted(() => {
      getAllMagasins();
    });

    const magasins = ref<Array<Magasin>>([]);   
    const magasin = ref<Magasin>();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    const selectedItem = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllMagasins(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllMagasins(page.value, limit.value, searchTerm.value );
    }

    // END PAGINATE

    const recharger = () => {
      getAllMagasins();
    };

    function getAllMagasins(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/magasins?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          magasins.value = data.data.data;
          console.log('rhht', data.data.data)
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }
    
    function moddifier(EditMagasin:Magasin) {
      magasin.value = EditMagasin;
      selectedItem.value = EditMagasin.id;
    }

    const deleteMagasin = (id: number) => {
      ApiService.delete(`/magasins/${id}`)
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

      for(let i = 0; i < magasins.value.length; i++) {
        if (magasins.value[i].id === id) {
          magasins.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return { 
      magasins,
      checkPermission,
      getAllMagasins,
      deleteMagasin,
      moddifier ,
      suppression,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      rechercher,
      searchTerm,
      selectedItem,
      recharger
  };
  },
});
</script>