<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <a class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#AddServiceModal">
          <i class="fa fa-plus-circle"></i>
          Ajouter un service
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
        <form class="search-box position-relative me-15" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher"
            class="form-control shadow-none text-black rounded-0 border-0" placeholder="Rechercher un service" />
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
                CODE
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                LIBELLE
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Date
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end">
                Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in services" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black">
                {{ service.code }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ service.libelle }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ format_date(service.createdAt) }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black pe-0 text-end">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">Actions</button>
                <ul class="dropdown-menu dropdown-block"
                  style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(267px, 305px);"
                  data-popper-placement="bottom-start">
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);" @click="moddifier(service)" data-bs-toggle="modal"
                      data-bs-target="#AddServiceModal">
                      <i class="fa fa-pencil lh-2 me-8 position-relative top-1"></i> Modifier
                    </a>
                  </li>
                  <li class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);"
                      @click="suppression(service.id, services, 'services', `le service ${service.libelle}`)"> <i
                        class="fa fa-trash-o lh-2 me-8 position-relative top-1"></i>
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
  <AddServiceModal @get-all-services="getAllServices" :id="idservice" @openmodal="showModalEdite" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddServiceModal from "./AddServiceModal.vue";
import ApiService from "@/services/ApiService";
import { format_date, showModal, suppression, separateur, error, } from "../../utils/utils";
import { Service } from "@/models/Service";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeService",
  components: {
    AddServiceModal,
    PaginationComponent
  },
  setup: () => {

    onMounted(() => {
      getAllServices();
    });

    const services = ref<Array<Service>>([]);
    const idservice = ref(0);

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllServices(page_, limit_);
      } catch (error) {
        //

      }
    };
    function rechercher() {
      getAllServices(page.value, limit.value, searchTerm.value);
    }
    // END PAGINATE

    function getAllServices(page = 1, limi = 10, searchTerm = '') {
      // return ApiService.get(`/all/services?page=${page}&limit=${limi}&mot=${searchTerm}&`)
      return ApiService.get('/services')
        .then(({ data }) => {
          services.value = data.data.data;
          // totalPages.value = data.data.totalPages;
          // limit.value = data.data.limit;
          // totalElements.value = data.data.totalElements;
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    // function moddifier(obj:Service) {
    //   idservice.value = obj.id;
    // }

    function moddifier(Editservice: Service) {
      idservice.value = Editservice.id;
    }

    function showModalEdite(el) {
      showModal(el);
      idservice.value = 0;
    }

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }


    return {
      suppression,
      checkPermission,
      services,
      format_date,
      getAllServices,
      idservice,
      moddifier,
      showModalEdite,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      separateur,
      rechercher
    };
  },


});
</script>