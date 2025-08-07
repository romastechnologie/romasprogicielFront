<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
      >
        <div class="d-sm-flex align-items-center">
          <router-link
           class="btn btn-primary"
            to="/processus/ajouter-processus"
          >
          <i class="fa fa-plus-circle"></i>
            Ajouter un processus
          </router-link>
        </div>
        <div class="d-flex align-items-center">
          <form class="search-bg svg-color pt-3" @submit.prevent="rechercher">
            <input
              type="text"
              v-model="searchTerm"
              @keyup="rechercher"
              class="form-control shadow-none text-black"
              placeholder="Rechercher un processus"
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
          <table  class="table text-nowrap align-middle mb-0">
            <thead>
              <tr>           
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
             
                  Date Debut du Processus
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Date Fin du Processus
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  Période
                </th>
                 <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  statut
                </th>
                <th
                  scope="col"
                  class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for ="(processus, index) in processuss" :key="index">
                  <!-- <td class="shadow-none lh-1 fw-medium ">{{ format_date(processus?.dateProcessus)}} </td> -->
                  <td class="shadow-none lh-1 fw-medium ">{{ format_date(processus.dateDebutProcessus) }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ format_date(processus.dateFinProcessus) }} </td>
                  <td class="shadow-none lh-1 fw-medium ">{{ format_monthYear(processus.periodePaie) }} </td>
                  <td class="shadow-none lh-1 fw-medium ">
                    <span
                      class="badge"
                      :class="processus.statut ? 'bg-success text-white' : 'bg-danger text-white'"
                    >
                      {{ processus.statut ? 'Actif' : 'Clôturé' }}
                    </span>
                  </td>

                  <td class="shadow-none lh-1 fw-medium ">
                    <div class="dropdown">
                      <button class="btn dropdown-toggle btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>
                        <ul class="dropdown-menu">      
                          
                            <li   v-if="processus.statut"
                             class="dropdown-item d-flex align-items-center">
                    <a href="javascript:void(0);" data-bs-target="#create-task" data-bs-toggle="modal" @click="openModal(processus.id)">
                      <i class="fa fa-check-circle lh-1 me-8 position-relative top-1"></i>
                      Cloturer
                    </a>
                  </li>

              <li class="dropdown-item d-flex align-items-center">
                <a href="javascript:void(0);" @click="genererEtatProcessusGlobal(processus.id)">
                  <i class="fa fa-file-text me-2 text-info"></i>
                  Générer état global
                </a>
              </li>

               <li class="dropdown-item d-flex align-items-center">
                <a href="javascript:void(0);" @click="viewMergedPdf(processus.id)">
                  <i class="fa fa-file-pdf-o me-2 text-danger"></i>
                  Aperçu 
                </a>
              </li>

             <li v-if="!processus.statut" class="dropdown-item d-flex align-items-center">
              <a href="javascript:void(0);" @click="genererEtatProcessus(processus.id)">
                <i class="fa fa-download me-2 text-primary"></i>
                Générer état
              </a>
            </li>

                      <li v-if="!processus.statut" class="dropdown-item d-flex align-items-center">
            <a href="javascript:void(0);" @click="sendPaiemail(processus.id)">
              <i class="fa fa-envelope me-2 text-success"></i>
              Envoyer les fiches
            </a>
          </li>
                          <li  class="dropdown-item d-flex align-items-center">
                            <a                          
                              href="javascript:void(0);"
                              @click="suppression(processus.id, processus, 'paie', 'un processus')"
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


                     <div class="modal fade" id="create-task" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">Voulez-vous cloturer ce processus?</h6>
        <button type="button" id="close-modal" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4">
        <Form
          ref="processusForm"
          @submit="addProcessus"
          :processus-schema="processusSchema"
        >
          <div class="row gy-2">
            <div class="col-md-4-3">
              <label class="d-block fw-semibold mb-10">
                Motif<span class="text-danger"></span>
              </label>
              <Field
                name="motif"
                as="textarea"
                placeholder="Entrer le motif"
                class="form-control shadow-none rounded-0 text-black"
              />
              <ErrorMessage name="motif" class="text-danger" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Cloturer</button>
           <button
    type="button"
    class="btn btn-danger"
    data-bs-dismiss="modal"
    aria-label="Close"
  >
    Annuler
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
  import ApiService from "@/services/ApiService";
  import { Processus } from "@/models/Processus";
  import { suppression, error, format_date,success,showModal, hideModal,getUrlApiForFiles    } from "@/utils/utils";
  //import { , suppression, error,} from "@/utils/utils";
  import PaginationComponent from '@/components/Utilities/Pagination.vue';
  import JwtService from "@/services/JwtService";
  import Swal from 'sweetalert2';
  import * as Yup from 'yup';
  import { Form, Field, ErrorMessage } from 'vee-validate';


  export default defineComponent({
    name: "ListeProcessus",
    components: {
      PaginationComponent,
       Form,
        Field,
        ErrorMessage
    },
    setup(){
      onMounted(() => {
        getAllProcessuss();
      });
      const processuss = ref<Array<Processus>>([]);
      const processus = ref<Processus>();
      const searchTerm = ref('');
      const page = ref(1);
      const totalPages = ref(0);
      const limit = ref(10);
      const totalElements = ref(0);
        const processusSchema = Yup.object().shape({
      motif: Yup.string().required("Le motif est obligatoire"),
    });
    const processusForm = ref(null);
      const handlePaginate = ({ page_, limit_ }) => {
        try {
          page.value = page_;
          getAllProcessuss(page_, limit_);
        } catch (error) {
        }
      };
       function rechercher(){
        getAllProcessuss(page.value, limit.value, searchTerm.value );
      }
       const processusii = ref();
    const openModal = (id: number) => {
      processusii.value = id;
    };
    function triggerButtonClick(buttonId: string) {
  const button = document.getElementById(buttonId) as HTMLButtonElement;
  if (button) {
    button.click(); // Simule un clic
  } else {
    console.error(`Button with ID "${buttonId}" not found.`);
  }
}

const sendPaiemail = async (processusId: number) => {
  try {
    const { value: formValues, isConfirmed } = await Swal.fire({
      title: 'Envoyer les fiches de paie',
      html: `
        <div class="text-start">
          <div class="mb-3">
            <label class="form-label">Message personnalisé (optionnel)</label>
            <textarea id="swal-message" class="form-control" placeholder="Entrez un message à inclure..."></textarea>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Envoyer',
      cancelButtonText: 'Annuler',
      focusConfirm: false,
      preConfirm: () => {
        return {
          message: (document.getElementById('swal-message') as HTMLTextAreaElement).value,
          testMode: (document.getElementById('swal-test-mode') as HTMLInputElement).checked
        };
      }
    });

    if (isConfirmed) {
      // Supprimez la progression simulée et montrez simplement l'indicateur de chargement
      Swal.fire({
        title: 'Envoi en cours...',
        text: 'Veuillez patienter pendant que les emails sont envoyés',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await ApiService.post(`processusmail/${processusId}`, {
        messagePersonnalise: formValues.message,
        testMode: formValues.testMode
      });

      Swal.fire({
        title: 'Envoi terminé',
        html: `
          <div class="text-start">
            <p class="text-success">${response.data.totalEnvoyes} emails envoyés avec succès</p>
            ${response.data.totalEchecs > 0 ? 
              `<p class="text-danger">${response.data.totalEchecs} échecs</p>` : ''}
          </div>
        `,
        icon: response.data.totalEchecs > 0 ? 'warning' : 'success'
      });
    }
  } catch (error) {
    console.error('Erreur:', error);
    Swal.fire('Erreur', 'Une erreur est survenue lors de l\'envoi des emails', 'error');
  }
};
  const addProcessus  = async (values, { resetForm }) => {
  values["id"] = processusii.value;
  values["statut"] = 0;
  console.log ("donnée processus", values)
  ApiService.put("/processuspaies/" + values.id, values)
    .then(({ data }) => {
      if (data.code === 200) {
          success(data.message);
        processusForm.value?.resetForm();
        getAllProcessuss();
        triggerButtonClick("close-modal");    
      }
    })
    .catch(({ response }) => {
      error(response.data.message);
    });
};

function format_monthYear(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
}

const genererEtatProcessusGlobal = async (id: number) => {
  try {
    const loadingAlert = Swal.fire({
      title: 'Génération en cours...',
      text: 'Veuillez patienter pendant que l\'état global est généré.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    const response = await ApiService.get(`/etat-processustotal/${id}`);
    const fichiers = response.data.fichiers;
    
    if (!fichiers || fichiers.length === 0) {
      await Swal.fire({
        title: 'Aucun fichier généré',
        text: 'Aucun fichier PDF n\'a été généré.',
        icon: 'warning'
      });
      return;
    }
    
    await Swal.close();
    
    // Ouvrir le PDF dans un nouvel onglet
    const url = getUrlApiForFiles(`etat-processus/${fichiers[0]}`);
    window.open(url, '_blank');
    
    await Swal.fire({
      title: 'Génération terminée',
      text: 'L\'état global a été généré avec succès.',
      icon: 'success',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false 
    });
  } catch (err) {
    console.error(err);
    await Swal.close();
    error("Erreur lors de la génération de l'état global.");
  }
};

const genererEtatProcessus = async (id: number) => {
  try {
    const loadingAlert = Swal.fire({
      title: 'Génération en cours...',
      text: 'Veuillez patienter pendant que les fichiers sont générés.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const response = await ApiService.get(`/etat-processus/${id}`);
    const fichiers = response.data.fichiers;
    if (!fichiers || fichiers.length === 0) {
      await Swal.fire({
        title: 'Aucun fichier généré',
        text: 'Aucun fichier PDF n\'a été généré.',
        icon: 'warning'
      });
      return;
    }
    await Swal.close();
    fichiers.forEach((fichier: string, index: number) => {
      setTimeout(() => {
        const url = getUrlApiForFiles(`etat-processus/${fichier}`);
        window.open(url, '_blank');
      }, index * 300);
    });
    await Swal.fire({
      title: 'Génération terminée',
      text: `${fichiers.length} fichier(s) PDF ont été générés et ouverts dans de nouveaux onglets.`,
      icon: 'success',
      timer: 3000, // Ferme automatiquement après 3 secondes
      timerProgressBar: true,
      showConfirmButton: false 
    });
  } catch (err) {
    console.error(err);
    await Swal.close();
    error("Erreur lors de la génération des fichiers PDF.");
  }
};

const viewMergedPdf = async (processusId: number) => {
  try {
    Swal.fire({
      title: 'Préparation du PDF',
      text: 'Veuillez patienter...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const { data } = await ApiService.get(`/merge-processus-paie/${processusId}`);
    
    if (data.success && data.fileName) {
      const pdfUrl = getUrlApiForFiles(`paie/${data.fileName}`);
      Swal.close();
      window.open(pdfUrl, '_blank');
    } else {
      throw new Error(data.message || "Échec de la génération");
    }
  } catch (err) {
    Swal.close();
    console.error("Erreur:", err);
    error(err.message || "Erreur lors de l'accès au PDF fusionné");
  }
};
      function getAllProcessuss(page = 1, limi = 10, searchTerm = '') {
        return ApiService.get(`/all/processuspaies?page=${page}&limit=${limi}&mot=${searchTerm}&`)
          .then(({ data }) => {
            console.log("longprocessus",data);
            processuss.value = data.data.data;
            totalPages.value = data.data.totalPages;
            limit.value = data.data.limit;
            totalElements.value = data.data.totalElements;
            return data.data;
          })
          .catch(({ response }) => {
            error(response.data.message)
        });
      }
      const privileges = ref<Array<string>>(JwtService.getPrivilege());
  const checkPermission = (name) => {
    return privileges.value.includes(name);
  }
      return {processuss,
        checkPermission,
        format_date,
        suppression,
        processus,
        page, 
        totalPages,
        limit,
        totalElements,
        handlePaginate,
        searchTerm,
        rechercher,
       getUrlApiForFiles,
       genererEtatProcessus,
          openModal,
    processusForm,
    addProcessus,
    processusSchema,
    format_monthYear,
    viewMergedPdf,
    genererEtatProcessusGlobal,
    sendPaiemail
      };
    },
  });
  </script>