<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
      <div class="card-body p-15 p-sm-20 p-md-25">
        <!-- Sélection Trésorerie -->
        <div class="mb-3">
          <div class="form-group mb-15 mb-sm-20 mb-md-25">
            <label class="d-block text-black mb-10">
              Trésorerie <span class="text-danger">*</span>
            </label>
            <Field name="tresorerie" type="text" v-slot="{ field }">
              <Multiselect
                v-model="field.value"
                v-bind="field"
                :options="tresorerieOptions"
                :preserve-search="true"
                :multiple="false"
                :searchable="true"
                placeholder="Sélectionner la trésorerie"
                label="label"
                track-by="value"
                @input="handleTresorerieSelection"
              />
            </Field>
            <ErrorMessage name="tresorerie" class="text-danger" />
          </div>
        </div>

        <!-- Affichage des Détails de la Trésorerie -->
        <div v-if="tresorerieDetails" class="mt-3">
          <!-- Vérification des données financières -->
          <div v-if="!tresorerieDetails.recettes.length && !tresorerieDetails.depenses.length" class="alert alert-warning">
            Aucun financement n'a été effectué pour cette trésorerie.
          </div>

          <!-- Section des Recettes -->
          <div v-if="tresorerieDetails.recettes.length" class="row">
            <div class="col-md-6">
              <div class="card border-primary">
                <div class="card-header bg-primary text-white">
                  <h5>Recettes</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group">
                    <li v-for="recette in tresorerieDetails.recettes" :key="recette.id" class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <strong>Montant:</strong> {{ recette.montant }} <br>
                          <strong>Mode de Paiement:</strong> {{ recette.modepaiement }} <br>
                          <strong>Personnel/Bénéficiaire:</strong> {{ recette.personnel || recette.beneficiaire }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Section des Dépenses -->
            <div class="col-md-6">
              <div class="card border-danger">
                <div class="card-header bg-danger text-white">
                  <h5>Dépenses</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group">
                    <li v-for="depense in tresorerieDetails.depenses" :key="depense.id" class="list-group-item">
                      <div class="d-flex justify-content-between">
                        <div>
                          <strong>Montant Dépensé:</strong> {{ depense.montantDepense }} <br>
                          <strong>Mode de Paiement:</strong> {{ depense.modepaiement }} <br>
                          <strong>Personnel/Bénéficiaire:</strong> {{ depense.personnel || depense.beneficiaire }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Écart -->
          <div v-if="tresorerieDetails.ecart !== undefined" class="mt-4">
            <div class="card border-info">
              <div class="card-header bg-info text-white">
                <h5>Écart</h5>
              </div>
              <div class="card-body">
                <p><strong>Écart:</strong> {{ tresorerieDetails.ecart }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '@/services/ApiService';
import Multiselect from '@vueform/multiselect/src/Multiselect';

export default defineComponent({
  name: "AddDepenses",
  components: {
    Form,
    Field,
    ErrorMessage,
    Multiselect,
  },
  setup() {
    const tresorerieOptions = ref([]);
    const tresorerieDetails = ref(null);

    // Fonction pour récupérer toutes les trésoreries
    const getAllTresoreries = async () => {
      console.log('Récupération des trésoreries...');
      try {
        const response = await ApiService.get('all/tresoreries');
        console.log('Trésoreries récupérées:', response.data);
        const tresoreriesData = response.data.data.data;
        tresorerieOptions.value = tresoreriesData.map((tresorerie) => ({
          value: tresorerie.id,
          label: tresorerie.nom,
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des trésoreries', error);
      }
    };

    // Fonction pour récupérer les détails de la trésorerie sélectionnée
    const getTresorerieDetails = async (tresorerieId: number) => {
      console.log('Récupération des détails pour la trésorerie ID:', tresorerieId);
      tresorerieDetails.value = null;  // Réinitialiser les données précédentes

      try {
        const response = await ApiService.get(`point/tresorerie/${tresorerieId}`);
        console.log('Détails de la trésorerie récupérés:', response.data);
        tresorerieDetails.value = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Aucun financement trouvé pour cette trésorerie.');
          tresorerieDetails.value = { recettes: [], depenses: [], ecart: undefined };
        } else {
          console.error('Erreur lors de la récupération des détails de la trésorerie', error);
        }
      }
    };

    // Fonction exécutée lors de la sélection d'une trésorerie
    const handleTresorerieSelection = (selectedTresorerie: any) => {
      console.log('Trésorerie sélectionnée:', selectedTresorerie);
      if (selectedTresorerie) {
        getTresorerieDetails(selectedTresorerie);
      }
    };

    // Récupération des trésoreries au montage du composant
    onMounted(() => {
      console.log('Composant monté, récupération des trésoreries...');
      getAllTresoreries();
    });

    return { 
      tresorerieOptions,
      tresorerieDetails,
      handleTresorerieSelection
    };
  },
});
</script>

<style scoped>
.card-header h5 {
  margin: 0;
  font-size: 1.25rem;
}

.card-body ul {
  padding-left: 0;
}

.list-group-item {
  border: none;
}

.card-body {
  padding: 15px;
}

.card-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  padding: 10px;
  font-weight: bold;
}

.card {
  margin-bottom: 1rem;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
}
</style>
