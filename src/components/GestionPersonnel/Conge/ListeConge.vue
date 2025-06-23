<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
          class="btn btn-primary"
          to="/conges/ajouter-conge"
        >
          <i class="fa fa-plus-circle"></i>
          Programmer un congé
        </router-link>
       
      </div>
      <div class="d-flex align-items-center">
       <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher un conge"
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

      <div class="col-md-12">
        <div class="container py-4 px-3">
        <div class="row gx-4"> 
          <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
              Date debut 
              </label>
              <Field 
                style="max-height: 42px;"
                v-model="dateDebut"
                name="dateDebut" 
                type="date" 
                aria-disabled="true"
                class="form-control shadow-none fs-md-15 text-black" 
               >
              </Field>
            </div>
          </div>

              <div class="col-md-4 mt-3">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black mb-10">
              Date fin 
              </label>
              <Field 
                style="max-height: 42px;"
                v-model="dateFin"
                name="dateFin" 
                type="date" 
                aria-disabled="true"
                class="form-control shadow-none fs-md-15 text-black" 
               >
              </Field>
            </div>
          </div>

           </div>
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
                Personnel
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date de debut 
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date de fin 
              </th>
               <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Date de reprise
              </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Statut
              </th>
           
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(conge, index) in conges" :key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{  conge.personnel
                ? conge.personnel.nom + " " + conge.personnel.prenom
                : "null" }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ conge.dateDebut }}
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ conge.dateFin }}
              </td>
               <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                {{ conge.dateReprise }}
              </td>
               <td class="shadow-none lh-1 fw-medium text-black-emphasis">
               <span
                class="badge"
                :class="{
                  'bg-success': conge.statut === 'Validé',
                  'bg-danger': conge.statut === 'Annulé',
                  'bg-warning text-dark': conge.statut === 'Interrompu'
                }"
              >
                {{ conge.statut }}
              </span>
              </td>
              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary pe-0"
              >
              <div class="dropdown">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Actions
                  </button>
                  <ul class="dropdown-menu">

                   <li  v-if="conge.statut !== 'Interrompu' && conge.statut !== 'Annulé'">
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      @click="pauseConge(conge.id)"
                    >
                      <i class="fa fa-pause lh-1 me-8 position-relative top-1"></i>
                      Interrompre
                    </a>
                  </li>
                  <li  v-if="conge.statut !== 'Interrompu' && conge.statut !== 'Annulé'">
                    <a
                      class="dropdown-item d-flex align-items-center"
                      href="javascript:void(0);"
                      @click="cancelConge(conge.id)"
                    >
                      <i class="fa fa-ban lh-1 me-8 position-relative top-1"></i>
                      Annuler
                    </a>
                  </li>

                    <li v-if="conge.statut !== 'Interrompu' && conge.statut !== 'Annulé'" >
                      <router-link :to="{ name: 'EditCongePage', params: { id: conge.id } }" 
                          class="dropdown-item d-flex align-items-center"><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>Modifier</router-link>
                    </li>
                  
                    
                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(conge.id,conge,'conges',`Le conge ${conge.id}`)">
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
import { defineComponent, onMounted, ref,watch,} from "vue";
import Swal from "sweetalert2";
import { Conge } from "@/models/Conge";
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from "@/services/ApiService";
import { suppression, error } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";

export default defineComponent({
  name: "ListeConge",
  components: {
    PaginationComponent,
    Field,
    Form
  },
  setup(){
    
    onMounted(() => {
      getAllConges();
    });

    const conges = ref<Array<Conge>>([]);   
    const conge = ref<Conge>();
     const dateFin = ref('');
      const dateDebut = ref('');

    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllConges(page_, limit_);
      } catch (error) {
        //
      }
    };

    

     watch(dateFin, () => {
      rechercher();
    });
     watch(dateDebut, () => {
      rechercher();
    });

    // END PAGINATE

    function pauseConge(id: number) {
  Swal.fire({
    title: "Voulez-vous vraiment interrompre ce congé ?",
    showCancelButton: true,
    confirmButtonText: "Interrompre",
    cancelButtonText: "Fermer",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const { value: formValues } = await Swal.fire({
        title: "Sélectionnez la nouvelle date de fin",
        html: `
          <input type="date" id="swal-input1" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return [
            (document.getElementById("swal-input1") as HTMLInputElement).value,
          ];
        },
      });

      if (formValues && formValues[0]) {
        try {
          const response = await ApiService.put(`/conges/${id}`, {
            statut: "Interrompu",
            dateFin: formValues[0],
          });
          Swal.fire("Congé interrompu avec succès !", "", "success");
          getAllConges(page.value, limit.value, searchTerm.value);
        } catch (error) {
          console.error("Erreur lors de l'interruption du congé :", error);
        }
      }
    }
  });
}

function cancelConge(id: number) {
  Swal.fire({
    title: "Voulez-vous vraiment annuler ce congé ?",
    showCancelButton: true,
    confirmButtonText: "Annuler",
    cancelButtonText: "Fermer",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await ApiService.put(`/conges/${id}`, {
          statut: "Annulé",
        });
        Swal.fire("Congé annulé avec succès !", "", "success");
        getAllConges(page.value, limit.value, searchTerm.value);
      } catch (error) {
        console.error("Erreur lors de l'annulation du congé :", error);
      }
    }
  });
}


    
      function rechercher()  {
  getAllConges(page.value, limit.value,dateDebut.value,dateFin.value,searchTerm.value);
};
    function getAllConges(page = 1, limi = 10,dateDebut = '' , dateFin = '' ,searchTerm = '',) {
      return ApiService.get(`/conges?page=${page}&limit=${limi}&dateDebut=${dateDebut}&dateFin=${dateFin}&mot=${searchTerm}&`)
        .then(({ data }) => {
          console.log("conge recupéré",data);
          conges.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          console.log('dataNouveau',data.data);
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    }

    function moddifier(Editconges:Conge) {
      conge.value = Editconges;
    }

    const deleteConge = (id: number) => {
      ApiService.delete(`/conges/${id}`)
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

      for(let i = 0; i < conges.value.length; i++) {
        if (conges.value[i].id === id) {
          conges.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return { conges,
      checkPermission,
     getAllConges,
     deleteConge,
     moddifier ,
     suppression,
     page, 
    totalPages,
    limit,
    totalElements,
    handlePaginate,
    rechercher,
    searchTerm,
    pauseConge,
    cancelConge,
    dateDebut,
    dateFin

  };
  },
});
</script>