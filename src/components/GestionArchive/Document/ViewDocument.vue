<template>
  <div class="row">
    <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
      <div class="card mb-25 border-0 rounded-0">
        <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Informations Générales</h4>
            <router-link
              to="/documents/liste-document"
              class="btn btn-primary transition border-0 lh-1 fw-medium"
            >
              <i class="flaticon-left-arrow lh-1 me-1 position-relative top-2"></i>
              Retour
            </router-link>
          </div>

          <table class="table">
            <tbody>
              <tr>
                <td>Date de conservation</td>
                <td>{{ format_date(document?.regleDocuments?.dateFinConservation) || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Catégorie</td>
                <td>
                  <span
                    v-for="(val, index) in document?.regleDocuments || []"
                    :key="index"
                    class="badge bg-info text-dark me-1"
                  >
                    {{ val.regleType?.categoriedocument?.libelle || 'Non renseigné' }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Type de document</td>
                <td>
                  <span
                    v-for="(val, index) in document?.regleDocuments || []"
                    :key="index"
                    class="badge bg-secondary text-light me-1"
                  >
                    {{ val.regleType?.typeDocument?.nom || 'Non renseigné' }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Référence</td>
                <td>{{ document?.refDoc || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Nom</td>
                <td>{{ document?.nom || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Tag Document</td>
                <td>{{ document?.tagDoc?.libelle || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{{ document?.description || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Fichier</td>
                <td>
                  <a v-if="document?.photoDocument" :href="getUrlApiForFiles(document.photoDocument, 'Documents')" target="_blank">
                    <img
                      :src="getUrlApiForFiles(document.photoDocument, 'Documents')"
                      alt="Document Image"
                      class="img-thumbnail"
                      style="width: 120px; height: 120px;"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Organisation et Emplacement</h4>
          </div>

          <table class="table">
            <tbody>
              <tr>
                <td>Organisation</td>
                <td>{{ document?.organisation?.nom || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Emplacement</td>
                <td>{{ document?.emplacement?.code || 'Non renseigné' }}</td>
              </tr>
              <tr>
                <td>Fichier</td>
                <td>
                  <p v-if="document?.fichier">
                    <a :href="getUrlApiForFiles(document.fichier)" target="_blank" class="text-decoration-underline">
                      Télécharger le fichier
                    </a>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <h4 class="position-relative text-black fw-bold mb-10">Règle de Conservation</h4>
          </div>

          <table class="table">
            <tbody>
              <tr>
                <td>Type</td>
                <td>
                  <span
                    v-for="(val, index) in document?.regleDocuments || []"
                    :key="index"
                    class="badge bg-secondary text-light me-1"
                  >
                    {{ val.regleType?.typeDocument?.nom || 'Non renseigné' }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Durée</td>
                <td>
                  <span
                    v-for="(val, index) in document?.regleDocuments || []"
                    :key="index"
                    class="badge bg-info text-dark me-1"
                  >
                    {{
                      val.regleType?.regleConservation?.dureeConservation + ' ' +
                      val.regleType?.regleConservation?.typeDuree || 'Non renseigné'
                    }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Sort final</td>
                <td>
                  <span
                    v-for="(val, index) in document?.regleDocuments || []"
                    :key="index"
                    class="badge bg-info text-dark me-1"
                  >
                    {{ val.regleType?.regleConservation?.sortFinal || 'Non renseigné' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_date, getUrlApiForFiles } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewDocument",
  setup() {
    const route = useRoute();
    const document = ref<any | null>(null);

    async function getDocument(id: string) {
      try {
        const { data } = await ApiService.get(`/documents/${id}`);
        if (data?.data) {
          document.value = data.data;
        } else {
          throw new Error("Données du document non trouvées.");
        }
      } catch (err) {
        error(err instanceof Error ? err.message : "Erreur lors de la récupération du document.");
      }
    }

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getDocument(id);
      } else {
        error("ID du document non spécifié.");
      }
    });

    return {
      document,
      format_date,
      getUrlApiForFiles,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.table .badge {
  font-size: 0.9rem;
}
</style>
