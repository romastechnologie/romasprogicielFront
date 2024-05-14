<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link v-if="checkPermission('AddUser')"
          class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
          to="/ajouter-user"
        >
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
          Ajouter un utilisateur
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
            placeholder="Rechercher un utilisateur"
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
        <table v-if="users.length > 0" class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Nom et Prénom
              </th>
              <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                Téléphone
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Email
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Rôle
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Sexe
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Statut
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text pe-0"
              >Date création</th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
              >Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr  v-for ="(user, index) in users" :key="index">
                <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                  {{ user.nomComplet }}
                </th>
                <td class="shadow-none lh-1 fw-medium ">{{ user.telephone }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ user.email }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ user?.role?.nom }} </td>
                <td class="shadow-none lh-1 fw-medium ">{{ user.sexe }} </td>
                <td class="shadow-none lh-1 fw-medium"><span class="badge text-outline-success">Actif</span></td>
                <td class="shadow-none lh-1 fw-medium">{{ format_date(user.createdAt) }} </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                  <div class="dropdown">
                      <span class="badge text-white bg-primary fs-15 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          Actions
                          <i class="flaticon-chevron-2 position-relative ms-5 top-2 fs-15"></i>
                      </span>
                      <ul class="dropdown-menu">
                        <!-- <li v-if="checkPermission('AssignAgenceUser')">
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#EditUserAgenceModal"
                            @click="openEditAgenceModal(user)"
                          >
                          <i class="flaticon-compare lh-1 me-8 position-relative top-1"></i>
                            Affecter une agence
                          </a>
                        </li> -->
                        <li v-if="checkPermission('EditPasswordUser')">
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#EditUserPassModal"
                            @click="openEditPassModal(user)"
                          >
                          <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Modifier le mot de passe
                          </a>
                        </li>
                        <li v-if="checkPermission('EditUser')">
                          <router-link
                            class="dropdown-item d-flex align-items-center"
                            :to="{ name: 'EditUserPage',params: { id: user.id } }"
                          >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Modifier les informations
                          </router-link>
                        </li>
                        <li v-if="checkPermission('DeleteUser')">
                          <a
                            class="dropdown-item d-flex align-items-center"
                            href="javascript:void(0);"
                            @click="suppression(user.id, users, 'users', 'un utilisateur')"
                          >
                            <i
                              class="flaticon-delete lh-1 me-8 position-relative top-1"
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
<EditUserAgenceModal :selectedUser="selectedUser" @close="rechercher"/>
<EditUserPassModal :selectedUser="selectedUser"/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref} from "vue";
import ApiService from "@/services/ApiService";
import { User } from "@/models/users";
import { format_date, suppression, error, } from "@/utils/utils";
import EditUserAgenceModal from "./EditUserAgenceModal.vue";
import EditUserPassModal from "./EditUserPassModal.vue";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeUser",
  components: {
    EditUserAgenceModal,
    EditUserPassModal,
    PaginationComponent
  },
  setup(){
    onMounted(() => {
      getAllUsers();
    });

    const users = ref<Array<User>>([]);
    const user = ref<User>();

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllUsers(page_, limit_);
      } catch (error) {
        //
      }
    };

     function rechercher(){
      getAllUsers(page.value, limit.value, searchTerm.value );
    }


    // END PAGINATE

    function getAllUsers(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/users?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          users.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
      });
    }

    const selectedUser = ref<User | undefined>(undefined);

  const openEditAgenceModal = (user: User) => {
    selectedUser.value = { ...user };
  };

  const openEditPassModal = (user: User) => {
    selectedUser.value = { ...user };
  };

  const privileges = ref<Array<string>>(JwtService.getPrivilege());

  const checkPermission = (name) => {
    return privileges.value.includes(name);
  }

    return {users,
      checkPermission,
      format_date,
      suppression,
      user,
      selectedUser,
      openEditAgenceModal,
      openEditPassModal,
      page, 
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher
    };
  },
});
</script>