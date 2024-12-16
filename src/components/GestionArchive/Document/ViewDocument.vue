<template>
  <div class="document-details">
    <h1 class="text-center mb-4">Détails du Document</h1>

    <div class="position-relative mb-3" style="height: 50px; background-color: #f8f9fa;">
  <button class="btn btn-primary btn-sm" style="position: absolute; top: 10px; right: 10px;" @click="goBack">
    Retour
  </button>
</div>
    <!-- Bloc des informations générales -->
    <div class="card my-4">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Informations Générales</h2>
        <div class="row">
          <div class="col-md-6 mb-3">
            <strong>Date de conservation :</strong>
            <p>{{ format_date(document?.dateFinConservation) || 'Non renseigné' }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Catégorie :</strong>
            <p>
              <span v-for="(val, index) in document?.regleDocuments || []" :key="index" class="badge bg-info text-dark me-1">
                {{ val.regleType?.categoriedocument?.libelle || 'Non renseigné' }}
              </span>
            </p>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Type de document :</strong>
            <p>
              <span v-for="(val, index) in document?.regleDocuments || []" :key="index" class="badge bg-secondary text-light me-1">
                {{ val.regleType?.typeDocument?.nom || 'Non renseigné' }}
              </span>
            </p>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Référence :</strong>
            <p>{{ document?.refDoc || 'Non renseigné' }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Nom :</strong>
            <p>{{ document?.nom || 'Non renseigné' }}</p>
          </div>

          <div class="col-md-6 mb-3">
            <strong>Tag Document :</strong>
            <p>{{ document?.tagDoc?.libelle || 'Non renseigné' }}</p>
          </div>
          <div class="col-md-12 mb-3">
            <strong>Description :</strong>
            <p>{{ document?.description || 'Non renseigné' }}</p>
          </div>
        
        </div>
      </div>
    </div>

    <!-- Bloc des informations supplémentaires -->
    <div class="card my-4">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Informations Supplémentaires</h2>
        <div class="row">
          <div class="col-md-6 mb-3">
            <strong>Organisation :</strong>
            <p>{{ document?.organisation?.nom || 'Non renseigné' }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Emplacement :</strong>
            <p>{{ document?.emplacement?.code || 'Non renseigné' }}</p>
          </div>
          <div class="col-md-6 mb-3">
            <strong>Fichier :</strong>
            <p v-if="document?.fichier">
              <a :href="document.fichier" target="_blank" class="text-decoration-underline">
                Télécharger le fichier
              </a>
            </p>
            <p v-else>Non disponible</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ApiService from "@/services/ApiService";
import { error, format_date } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ViewDocument",
  setup() {
    const route = useRoute();
    const router = useRouter();
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
        goBack(); // Retourne si une erreur survient
      }
    }

    function goBack() {
      router.push({ name: "ListeDocumentPage" }); // Redirige vers la liste des documents
    }

    onMounted(() => {
      const id = route.params.id as string;
      if (id) {
        getDocument(id);
      } else {
        error("ID du document non spécifié.");
        goBack();
      }
    });

    return {
      document,
      format_date,
      goBack,
    };
  },
});
</script>

<style scoped>
.document-details {
  max-width: 900px;
  margin: auto;
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.badge {
  font-size: 0.9rem;
}
.button {
  z-index: 1000;
}
</style>
