













<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
  
  <div class="amortissement-page">
    <!-- Titre de la page -->
    <h1 class="page-title">Tableau d'Amortissement</h1>

    <!-- Tableau d'Amortissement -->
    <table class="table table-striped">
      <thead>
        <tr>
          
          <th>Année</th>
          <th>Taux Amortissement</th>
          <th>Amortissement</th>
          <th>Duree d'utilisation</th>
          <th>Valeur Nette Comptable</th>
          <th>Date d'Amortissement prévu</th>
          
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(amortissement, index) in bien?.amortissements" :key="index">
          <td>{{ amortissement.annee }}</td>
          <td>{{ amortissement.taux }}%</td>
          <td>{{ amortissement.amortissement }}</td>
          <td>{{ amortissement.dureeUtilisation }}</td>
          <td>{{ amortissement.valeurNetteComptable }}</td>
          <td>{{ format_date(amortissement.dateFin)  }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref} from "vue";
import ApiService from "@/services/ApiService";
import { Bien } from "@/models/Bien";
import { format_date , error, } from "@/utils/utils";

import PaginationComponent from '@/components/Utilities/Pagination.vue';
import { useRoute } from "vue-router";

export default defineComponent({
  name: "TableauAmortissement",
  components: {
    PaginationComponent
  },
  setup(){
    const bien = ref<Bien>();
    const route = useRoute();
    onMounted(() => {
      if(route.params.id) {
        console.log(route.params.id,"route.params.idroute.params.id")
        getBien(route.params.id);
      }
    });
    function getBien(id) {
       ApiService.get(`/biens/${id}`)
        .then(({data}) => {
          console.log(data,"bienbienbienbienbienbienbienbienbien");
          bien.value = data.data;
          return data.data;
        }).catch(({ response }) => {
            error(response.data.message)
        });
    }

    return {
      format_date,
      bien,
    };
  },
});


</script>

<style scoped>
.amortissement-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td {
  border: 1px solid #dddddd;
  padding: 8px;
  text-align: center;
}

.table th {
  background-color: #f2f2f2;
}
</style>
  
  