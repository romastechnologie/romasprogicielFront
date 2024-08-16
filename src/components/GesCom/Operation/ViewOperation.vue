<template>
  <div class="row">
      <div class="col-md-12 col-xxl-12 col-sm-12 mb-10">
        <div class="card mb-25 border-0 rounded-0">
          <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
            <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
              <h4 class="position-relative text-black fw-bold mb-10">Informations générales</h4>
              <router-link to="/liste-operations" 
              class=" btn btn-primary transition border-0 lh-1 fw-medium">
              <i class="flaticon-left-arrow  lh-1 me-1 position-relative top-2"></i>
              <span class="position-relative"></span>Retour</router-link>
            </div>
            <table class="table">
              <tbody>
                <tr v-if="operation?.typeOperation">
                  <td>Type opération</td>
                  <td>{{ operation?.typeOperation }}</td>
                </tr>
                <tr v-if="operation?.nature">
                  <td>Nature de l'opération</td>
                  <td>{{ operation?.nature }}</td>
                </tr>
                <tr v-if="operation?.montant">
                  <td>Montant</td>
                  <td>{{ operation?.montant }}</td>
                </tr>
                <tr v-if="operation?.typeCompte">
                  <td>Type de compte</td>
                  <td v-if="operation?.typeCompte === 1">Compte dépôt vente</td>
                  <td v-if="operation?.typeCompte === 2">Compte vente à crédit</td>
                </tr>
                <tr v-if="operation?.compte">
                  <td>Compte</td>
                  <td>{{ operation?.compte.numCompte }}</td>
                </tr>
                <tr v-if="operation?.soldeInitial">
                  <td>Solde Initial</td>
                  <td>{{ operation.soldeInitial }}</td>
                </tr>
                <tr v-if="operation?.soldeActuel">
                  <td>Solde Actuel</td>
                  <td>{{ operation?.soldeActuel }}</td>
                </tr>
                <!-- <tr v-if="operation?.dateCreation">
                  <td>Date de création</td>
                  <td>{{ format_Date(operation.dateCreation) }}</td>
                </tr>
                <tr v-if="operation?.email">
                  <td>Email</td>
                  <td>{{ operation?.email }}</td>
                </tr>
                <tr v-if="operation?.telephone">
                  <td>Téléphone</td>
                  <td>{{ operation?.telephone }}</td>
                </tr>
                <tr v-if="operation?.ifu">
                  <td>Ifu</td>
                  <td>{{ operation?.ifu }}</td>
                </tr>
                <tr v-if="operation?.rccm">
                  <td>Rccm</td>
                  <td>{{ operation?.rccm }}</td>
                </tr>
                <tr v-if="operation?.sigle">
                  <td>Sigle</td>
                  <td>{{ operation?.sigle }}</td>
                </tr>
                <tr v-if="operation?.statut">
                  <td>Statut</td>
                  <td>{{ operation?.statut }}</td>
                </tr> -->
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
import { Operation } from "@/models/Operation";
import { error, format_Date, showModal } from "@/utils/utils";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewOperation",
  setup: () => {
    const route = useRoute();
    const operation = ref<Operation | null>(null);

    function getOperation(id: string) {
      return ApiService.get("/operations", id)
        .then(({ data }) => {
          operation.value = data.data; 
        })
        .catch(({ response }) => {
          error(response.data.message);
        });
    } 

    onMounted(() => {
      const id = route.params.id as string;
      getOperation(id);
    });

    return { 
      operation,
      getOperation,
      format_Date,
     };
  },
});
</script>
