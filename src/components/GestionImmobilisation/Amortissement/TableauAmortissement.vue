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
          <th>Valeur Nette Comptable</th>
          <th>Amortissement</th>
          <th>Duree d'utilisation</th>
          
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(amortissement, index) in amortissementData" :key="index">
          <td>{{ amortissement.annee | currency }}</td>
          <td>{{ amortissement.taux | currency }}</td>
          <td>{{ amortissement.valeurNetteComptable | currency }}</td>
          <td>{{ amortissement.amortissement | currency }}</td>
          <td>{{ amortissement.dureeUtilisation | currency }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      amortissementData: [
      { annee: 1, taux: 5, valeurNetteComptable: 9500, amortissement: 500, dureeUtilisation: 10 },
        { annee: 2, taux: 5, valeurNetteComptable: 9000, amortissement: 500, dureeUtilisation: 9 },
        { annee: 3, taux: 5, valeurNetteComptable: 8500, amortissement: 500, dureeUtilisation: 8 },
      ],
    };
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
    },
  },
};
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
  
  