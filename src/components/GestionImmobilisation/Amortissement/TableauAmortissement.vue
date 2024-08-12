<template>
    <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
  
    <div class="text-center mb-3">
        <h2>
          Tableau d'amortissement
        </h2>
    </div>

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
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ligne, index) in amortissementData" :key="index">
          <td>{{ ligne.annee }}</td>
          <td>{{ ligne.taux | currency }}</td>
          <td>{{ ligne.interet | currency }}</td>
          <td>{{ ligne.amortissement | currency }}</td>
          <td>{{ ligne.capitalRestant | currency }}</td>
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
        // Exemple de données d'amortissement
        { periode: 1, capitalInitial: 10000, interet: 500, amortissement: 1000, capitalRestant: 9000 },
        { periode: 2, capitalInitial: 9000, interet: 450, amortissement: 1000, capitalRestant: 8000 },
        // Ajoutez d'autres lignes ici...
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
  
  