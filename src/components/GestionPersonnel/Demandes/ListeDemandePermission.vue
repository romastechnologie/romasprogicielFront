<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="d-sm-flex align-items-center">
        <router-link class="btn btn-primary" to="/Demandes/ajouter-demandes">
          <i class="fa fa-plus-circle"></i>
          Ajouter une demande
        </router-link>
      
      </div>
      <div class="d-flex align-items-center">
        <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input type="text" v-model="searchTerm" @keyup="rechercher"
            class="form-control shadow-none text-black" placeholder="Rechercher une demande" />
          <button type="submit" class="bg-transparent text-primary transition p-0 border-0">
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
              <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date Demande
                </th>
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
                  Motif de demande
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                >Actions</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(demande, index) in demandes" :key="index">  
              <td class="shadow-none lh-1 fw-medium ">{{ demande.dateDemande }} </td>              
                  <td class="shadow-none lh-1 fw-medium ">{{ demande.personnel?.nom }}&nbsp;{{ demande.personnel?.prenom }} </td>  
                  <td class="shadow-none lh-1 fw-medium">{{ demande.motifDemande }} </td>
                 
              <td class="shadow-none lh-1 fw-medium">
  <span :class="getEtatBadge(demande.statut).badgeClass">
    {{ getEtatBadge(demande.statut).text }}
  </span>
</td>

<td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
  <div class="dropdown">
    <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      Actions
    </button>
    <ul class="dropdown-menu">
      <!-- Bouton Valider : affiché seulement si la demande n'est pas validée -->
      <li v-if="!demande.statut && demande.statut !== false" class="dropdown-item d-flex align-items-center">
        <a href="javascript:void(0);" data-bs-target="#create-task" data-bs-toggle="modal" @click="openModal(demande.id)">
          <i class="fa fa-check-circle lh-1 me-8 position-relative top-1"></i>
          Traiter
        </a>
      </li>
      <li class="dropdown-item d-flex align-items-center">
                          <router-link
                            
                            :to="{ name: 'ViewDemandePage',params: { id: demande.id } }"
                          >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Détails
                          </router-link>
                        </li>
                        <li class="dropdown-item d-flex align-items-center">
                          <router-link
                            
                            :to="{ name: 'AddArchivagePage',params: { id: demande.id }}"
                          >
                            <i class="flaticon-pen lh-1 me-8 position-relative top-1"></i>
                            Archiver
                          </router-link>
                        </li>
      <!-- Bouton Supprimer : toujours affiché -->
      <li class="dropdown-item d-flex align-items-center">
        <a href="javascript:void(0);" @click="suppression(demande.id, demandes, 'demandes', 'une demande')">
          <i class="fa fa-trash-o lh-1 me-8 position-relative top-1"></i>
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



  <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Voulez-vous traiter cette demande ?</h6>
        <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <Form
          ref="demandesForm"
          @submit="addDemandes"
          :validation-schema="demandesSchema"
        >
          <div class="row gy-2">
            <div class="col-md-4-3">
              <label class="d-block fw-semibold mb-10">
                Observation<span class="text-danger"></span>
              </label>
              <Field
                name="observation"
                as="textarea"
                placeholder="Entrer l'observation"
                class="form-control shadow-none rounded-0 text-black"
              />
              <ErrorMessage name="observation" class="text-danger" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Valider</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="rejectDemandes"
              aria-label="Close"
            >
              Rejeter
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</div>

      <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
        <PaginationComponent :page="page" :totalPages="totalPages" :totalElements="totalElements" :limit="limit"
          @paginate="handlePaginate" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { Form, Field, ErrorMessage } from 'vee-validate';
import { Demande } from "@/models/Demande";
import { format_date, showModal, hideModal, suppression, error,success  } from "@/utils/utils";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import { useRoute, useRouter } from 'vue-router';
import * as Yup from 'yup';


export default defineComponent({
  name: "ListeDemandes",
  components: {
    PaginationComponent,
    Form,
        Field,
        ErrorMessage
  },
  setup(){
    onMounted(() => {
      getAllDemandes();
    });

    const demandesSchema = Yup.object().shape({
      observation: Yup.string().required("L'observation est obligatoire"),
    });
    const demandesForm = ref(null);
    const demandes = ref<Array<Demande>>([]);
    const demande = ref<Demande>();
      const router = useRouter();
    const route = useRoute();
    // BEGIN PAGINATE
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllDemandes(page_, limit_);
      } catch (error) {
        //
      }
    };
    const demandeii = ref();
    const openModal = (id: number) => {
      demandeii.value = id;
    };
    function rechercher() {
      getAllDemandes(page.value, limit.value, searchTerm.value);
    }
    // END PAGINATE
    function getAllDemandes(page = 1, limi = 10, searchTerm = '') {
      return ApiService.get(`/all/demandes?page=${page}&limit=${limi}&mot=${searchTerm}&`)
        .then(({ data }) => {
          demandes.value = data.data.data;
          totalPages.value = data.data.totalPages;
          limit.value = data.data.limit;
          totalElements.value = data.data.totalElements;
          return data.data;
        })
        .catch(({ response }) => {
          error(response.data.message)
        });
    }

    const getEtatBadge = (statut: boolean | null) => {
  if (statut === true) {
    return {
      text: "Validé",
      badgeClass: "badge bg-success text-white",
    };
  } else if (statut === false) {
    return {
      text: "Rejeté",
      badgeClass: "badge bg-danger text-white", // Classe rouge pour "Rejeté"
    };
  }
  return {
    text: "En attente",
    badgeClass: "badge bg-warning text-white", // Classe jaune ou autre pour "En attente"
  };
};


function triggerButtonClick(buttonId: string) {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    button.click(); // Simule un clic
  } else {
    console.error(`Button with ID "${buttonId}" not found.`);
  }
}

// Déclenchement automatique après un certain temps
/**setTimeout(() => {
  
}, 2000);*/ // 2 secondes
// Utilisation
    const addDemandes = async (values, { resetForm }) => {
  values["id"] = demandeii.value;
  values["statut"] = true;

  ApiService.put("/demandes/" + values.id, values)
    .then(({ data }) => {
      console.log('demande', data);
      if (data.code === 200) {
        success(data.message);
        resetForm();
        getAllDemandes();
        triggerButtonClick("close-modal");
        
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};

const rejectDemandes = async () => {
  const values = {
    id: demandeii.value,
    statut: false, // État pour rejeter
    observation: demandesForm.value?.values?.observation || '', // Récupération de l'observation si remplie
  };

  ApiService.put("/demandes/" + values.id, values)
    .then(({ data }) => {
      if (data.code === 200) {
        success(data.message);
        demandesForm.value?.resetForm(); // Réinitialiser le formulaire
        getAllDemandes(); // Rafraîchir les données
        triggerButtonClick("close-modal"); // Fermer le modal
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};



    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }
    return {
      demande,
      openModal,
      demandesForm,
      checkPermission,
      suppression,
      format_date,
      demandes,
      page,
      totalPages,
      limit,
      totalElements,
      handlePaginate,
      searchTerm,
      rechercher,
      addDemandes,
      demandesSchema,
      getEtatBadge,
      rejectDemandes
      
    };
  },
});
</script>