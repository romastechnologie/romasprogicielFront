<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
      class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
    <div class="card-header">
                <h5 class="">Liste des validations</h5>
                <!----><!----><!---->
              </div>
      <div class="d-sm-flex align-items-center">
      <!-- <router-link
          class="btn btn-primary"
          to="/demandes/ajouter-validation"
        >
          <i class="fa fa-plus-circle"></i>
          Ajouter validation
        </router-link>--> 
    
      </div>
      <div class="d-flex align-items-center">
       <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
          <input
            type="text"
            v-model="searchTerm"
            @keyup="rechercher"
            class="form-control shadow-none text-black"
            placeholder="Rechercher validation"
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
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Date notification
              </th>
              
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Demande
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Demandeur
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Commentaire
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Validateur
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
               Date validation
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Statut
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Fichier
              </th>
  
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0  pe-0"
              >ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(validation, index) in validations" :key="index">
              <td>{{ format_date(validation?.dateNotification) }}</td>
              <td>{{ validation?.demande?.categorie?.libelle }}</td>
              <td>{{ validation?.demande?.personnel?.nom + ' ' + validation?.demande?.personnel?.prenom }}</td>
              <td>{{ validation?.commentaire }}</td>
              <td>  {{ validation?.validateur ? validation.validateur.nom + ' ' + validation.validateur.prenom : '' }}
              </td>
              <td>
                {{
                  validation.dateValidation
                    ? format_date(validation.dateValidation, true)
                    : '—'
                }}
              </td>
          <td class="shadow-none lh-1 fw-medium text-black-emphasis">
          <span
            class="badge"
            :class="validation.statut === 'Validé' ? 'bg-success' : validation.statut === 'Rejeté' ? 'bg-danger' : 'bg-warning text-white'"
          >
            {{ validation.statut === 'Validé'? 'Validé' : validation.statut === 'Rejeté'? 'Rejeté' : 'En attente' }}
          </span>
        </td>
        <td>  <a
        v-if="validation?.demande?.photoDemande"
        :href="getUrlApiForFiles(validation.demande.photoDemande, 'Demandes')"
        target="_blank"
        download
      >
        <i class="fa fa-download me-1"></i> 
      </a>
        </td>



              <td
                class="shadow-none lh-1 fw-medium text-body-tertiary pe-0"
              >
              <div class="dropdown">
                <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Actions
                </button>
                  <ul class="dropdown-menu">
                  <!--  <li >
                      <router-link :to="{ name: 'EditValidationPage', params: { id:validation.id } }" 
                          class="dropdown-item d-flex align-items-center"><i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                        ></i>Modifier</router-link>
                    </li>-->
                    <li v-if="validation.statut  === 'En attente'" class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);" data-bs-target="#create-task" data-bs-toggle="modal" @click="openModal(validation)">
                      <i class="fa fa-check-circle lh-1 me-8 position-relative top-1"></i>
                      Traiter
                    </a>
                  </li>

                    <li >
                      <a
                        class="dropdown-item d-flex align-items-center" href="javascript:void(0);" @click="suppression(validation.id,validations,'validations',`Validation ${validation.id}`)">
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


      <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Voulez-vous traiter cette validation?</h6>
        <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <Form
          ref="validationsForm"
          @submit="addValidations"
          :validation-schema="validationsSchema"
        >
          <div class="row gy-2">
            <div class="col-md-4-3">
              <label class="d-block fw-semibold mb-10">
                Commentaire<span class="text-danger"></span>
              </label>
              <Field
                name="commentaire"
                as="textarea"
                placeholder="Entrer l'observation"
                class="form-control shadow-none rounded-0 text-black"
              />
              <ErrorMessage name="commentaire" class="text-danger" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Valider</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="rejectValidations"
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
import { Validation } from "@/models/Validation";
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from "@/services/ApiService";
import PaginationComponent from '@/components/Utilities/Pagination.vue';
import JwtService from "@/services/JwtService";
import { format_date, showModal, hideModal, suppression, error,success, getUrlApiForFiles  } from "@/utils/utils";
import * as Yup from 'yup';



export default defineComponent({
  name: "ListeValidation",
  components: {
    PaginationComponent,
        Form,
        Field,
        ErrorMessage
  },
  setup(){
    
    onMounted(() => {
      getAllValidations();
    });

    const validations = ref<Array<Validation>>([]);   
    const validation = ref<Validation>();
      const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);

    const handlePaginate = ({ page_, limit_ }) => {
      try {
        page.value = page_;
        getAllValidations(page_, limit_);
      } catch (error) {
        //
      }
    };

    const validationsSchema = Yup.object().shape({
      commentaire: Yup.string().required("Le commentaire est obligatoire"),
    });
    const validationsForm = ref(null);

    const validationii = ref();
    const openModal = (id: number) => {
      validationii.value = id;
    };

    function triggerButtonClick(buttonId: string) {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    button.click(); // Simule un clic
  } else {
    console.error(`Button with ID "${buttonId}" not found.`);
  }
}
const addValidations = async (values, { resetForm }) => {
  values["demandeId"] = validationii.value?.demande?.id;
  values["statut"] = 'Validé';
  values["etapevalidation"] = validationii.value?.etapevalidation?.id; 
  console.log("valeur", values);
  Swal.fire({
    title: 'Veuillez patienter...',
    text: 'Validation en cours...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  ApiService.post("/validations", values)
    .then(({ data }) => {
      Swal.close(); 

      if (data.code === 201) {
        success(data.message);
        resetForm();
        getAllValidations();
        triggerButtonClick("close-modal");
      }
    })
    .catch(({ response }) => {
      Swal.close(); 
      error(response.data.message);
    });
};

const rejectValidations = async () => {
  const isValid = await validationsForm.value?.validate();
  if (!isValid) return; 

  const values = {
    demandeId: validationii.value?.demande?.id,
    statut: 'Rejeté',
    commentaire: validationsForm.value?.values?.commentaire,
    etapevalidation: validationii.value?.etapevalidation?.id,
  };
  Swal.fire({
    title: 'Veuillez patienter...',
    text: 'Rejet en cours...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
  ApiService.post("/validations/", values)
    .then(({ data }) => {
      Swal.close(); 
      if (data.code === 201) {
        success(data.message);
        validationsForm.value?.resetForm();
        getAllValidations();
        triggerButtonClick("close-modal");
      }
    })
    .catch(({ response }) => {
      Swal.close(); 
      error(response.data.message);
    });
};


     function rechercher(){
      getAllValidations(page.value, limit.value, searchTerm.value );
    }

  function getAllValidations(page = 1, limi = 10, searchTerm = '') {
  return ApiService.get(`/all/validationcircuits?page=${page}&limit=${limi}&mot=${searchTerm}&`)
    .then(({ data }) => {
      const rawData = data.data.data;
      const statutOrder = { 'En attente': 0, 'Validé': 1, 'Rejeté': 2 };
      rawData.sort((a, b) => {
        const statutA = statutOrder[a.statut] ?? 99;
        const statutB = statutOrder[b.statut] ?? 99;
        return statutA - statutB;
      });

      validations.value = rawData;
      totalPages.value = data.data.totalPages;
      limit.value = data.data.limit;
      totalElements.value = data.data.totalElements;
      return data.data;
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
}

    
    function moddifier(Editvalidations:Validation) {
      validation.value = Editvalidations;
    }

    const deleteValidation = (id: number) => {
      ApiService.delete(`/validations/${id}`)
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

      for(let i = 0; i < validations.value.length; i++) {
        if (validations.value[i].id === id) {
           validations.value.splice(i, 1);
        }
      }
    };

    const privileges = ref<Array<string>>(JwtService.getPrivilege());

    const checkPermission = (name) => {
      return privileges.value.includes(name);
    }

    return { validations,
      checkPermission,
     getAllValidations,
     deleteValidation,
     moddifier ,
     suppression,
     page, 
    totalPages,
    limit,
    totalElements,
    handlePaginate,
    rechercher,
    searchTerm,
    openModal,
    validationsForm,
    addValidations,
    validationsSchema,
    rejectValidations,
    format_date,
    getUrlApiForFiles
  };
  },
});
</script>