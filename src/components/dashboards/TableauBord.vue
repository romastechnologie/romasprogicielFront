<template>
  <div class="dashboard-page">
    <!-- Bandeau de bienvenue amélioré -->
    <div class="header-banner position-relative text-center text-white">
      <img
        class="w-100 header-bg"
        src="@/assets/images/knowledgebase/bg_1.jpg"
        alt="loginpage"
      />
      <div class="header-overlay d-flex flex-column align-items-center justify-content-center">
        <h1 class="fw-bold display-5 mb-2 animate__animated animate__fadeInDown">Bienvenue, {{ userName }} {{ userLastName }}</h1>
        <p class="lead mb-0 text-light animate__animated animate__fadeInUp animate__delay-1s">
          <i class="ri-dashboard-line me-2"></i>Tableau de bord des ressources humaines
        </p>
      </div>
    </div>

    <!-- Contenu du tableau de bord -->
    <div class="container my-5">
      <!-- Ligne des KPIs principaux avec animations -->
      <div class="row g-4 mb-2">
        <div class="col-md-2 animate__animated animate__fadeIn">
          <div class="card shadow-lg border-0 rounded-4 text-center p-4 h-100 hover-effect">
            <div class="icon-wrapper bg-primary-light mb-3">
              <i class="ri-team-line text-primary fs-2"></i>
            </div>
            <h5 class="text-muted">Total Personnel</h5>
            <h2 class="fw-bold text-primary mt-2 counter">{{ stats.totalPersonnel }}</h2>
          </div>
        </div>
               
        <div class="col-md-2 animate__animated animate__fadeIn animate__delay-2s">
          <div class="card shadow-lg border-0 rounded-4 text-center p-4 h-100 hover-effect">
            <div class="icon-wrapper bg-info-light mb-3">
              <i class="ri-file-text-line text-info fs-2"></i>
            </div>
            <h5 class="text-muted">Contrats Actifs</h5>
            <h2 class="fw-bold text-info mt-2 counter">{{ stats.contratStats?.actifs || 0 }}</h2>
            <small class="text-secondary">Inactifs : {{ stats.contratStats?.inactifs || 0 }}</small>
          </div>
        </div>
        
        <!-- Nouveau KPI pour les demandes -->
        <div class="col-md-2 animate__animated animate__fadeIn animate__delay-3s">
          <div class="card shadow-lg border-0 rounded-4 text-center p-4 h-100 hover-effect">
            <div class="icon-wrapper bg-warning-light mb-3">
              <i class="ri-inbox-line text-warning fs-2"></i>
            </div>
            <h5 class="text-muted">Demandes en attente</h5>
            <h2 class="fw-bold text-warning mt-2 counter">{{ stats.demandeStats?.enAttente || 0 }}</h2>
            <div class="d-flex justify-content-around mt-2">
              <small class="text-success">
                <i class="ri-check-line"></i> {{ stats.demandeStats?.valides || 0 }}
              </small>
              <small class="text-danger">
                <i class="ri-close-line"></i> {{ stats.demandeStats?.refusees || 0 }}
              </small>
            </div>
          </div>
        </div>

            <div class="col-lg-6 animate__animated animate__fadeInRight">
          <div class="card shadow-lg border-0 rounded-4 p-4 h-100">
            <h5 class="fw-bold mb-3">
              <i class="ri-bar-chart-line me-2"></i>Statistiques clés
            </h5>
            
            <div class="row">
              <!-- Contrats -->
              <div class="col-md-6 mb-4">
                <div class="stat-card bg-primary-light p-3 rounded-3 h-100">
                  <div class="d-flex align-items-center mb-2">
                    <i class="ri-file-text-line text-primary me-2"></i>
                    <h6 class="mb-0">Contrats</h6>
                  </div>
                  <div class="progress mb-2" style="height: 6px;">
                    <div class="progress-bar bg-primary" 
                         :style="{width: calculatePercentage(stats.contratStats?.actifs, stats.contratStats?.total)}"></div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Actifs: {{ stats.contratStats?.actifs || 0 }}</span>
                    <span>Total: {{ stats.contratStats?.total || 0 }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Personnel -->
              <div class="col-md-6 mb-4">
                <div class="stat-card bg-success-light p-3 rounded-3 h-100">
                  <div class="d-flex align-items-center mb-2">
                    <i class="ri-team-line text-success me-2"></i>
                    <h6 class="mb-0">Personnel</h6>
                  </div>
                  <div class="progress mb-2" style="height: 6px;">
                    <div class="progress-bar bg-success" 
                         :style="{width: calculatePercentage(stats.personnelStats?.actifs, stats.totalPersonnel)}"></div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Actifs: {{ stats.personnelStats?.actifs || 0 }}</span>
                    <span>Total: {{ stats.totalPersonnel }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Demandes -->
              <div class="col-md-6">
                <div class="stat-card bg-warning-light p-3 rounded-3 h-100">
                  <div class="d-flex align-items-center mb-2">
                    <i class="ri-inbox-line text-warning me-2"></i>
                    <h6 class="mb-0">Demandes</h6>
                  </div>
                  <div class="progress mb-2" style="height: 6px;">
                    <div class="progress-bar bg-warning" 
                         :style="{width: calculatePercentage(stats.demandeStats?.enAttente, stats.demandeStats?.total)}"></div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>En attente: {{ stats.demandeStats?.enAttente || 0 }}</span>
                    <span>Total: {{ stats.demandeStats?.total || 0 }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Répartition par sexe -->
              <div class="col-md-6">
                <div class="stat-card bg-info-light p-3 rounded-3 h-100">
                  <div class="d-flex align-items-center mb-2">
                    <i class="ri-user-line text-info me-2"></i>
                    <h6 class="mb-0">Répartition par sexe</h6>
                  </div>
                  <div class="d-flex flex-wrap gap-2 mt-2">
                    <span v-for="(item, index) in stats.sexeStats" :key="index" class="badge bg-info">
                      {{ item.sexe || 'Non renseigné' }}: {{ item.count }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Première ligne : Graphiques et stats -->
      <div class="row g-4 mb-4">
        <!-- Graphique des demandes par catégorie -->
        <div class="col-lg-6 animate__animated animate__fadeInLeft">
          <div class="card shadow-lg border-0 rounded-4 p-4 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0">
                <i class="ri-pie-chart-line me-2"></i>Répartition des demandes
              </h5>
              <div class="badge bg-primary">Total: {{ stats.demandeStats?.total || 0 }}</div>
            </div>
            <apexchart 
              type="donut" 
              height="300" 
              :options="demandeChartOptions" 
              :series="demandeSeries"
            ></apexchart>
          </div>
        </div>
     
         <div class="col-lg-6 animate__animated animate__fadeInUp animate__delay-2s">
    <div class="card shadow-lg border-0 rounded-4 p-4 h-100">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">
          <i class="ri-organization-chart me-2"></i>Répartition par organisation
        </h5>
        <div class="badge bg-primary">Total: {{ totalEffectif }}</div>
      </div>
      
      <apexchart 
        type="bar" 
        height="350" 
        :options="orgChartOptions" 
        :series="orgSeries"
      ></apexchart>
    </div>
  </div>
      </div>

      <!-- Deuxième ligne : Dernières demandes et contrats -->
      <div class="row g-4 mb-4">
        <!-- Dernières demandes -->
        <div class="col-lg-6 animate__animated animate__fadeInUp">
          <div class="card shadow-lg border-0 rounded-4 p-4 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0">
                <i class="ri-time-line me-2"></i>Dernières demandes
              </h5>
              <router-link to="/demandes" class="btn btn-sm btn-outline-primary">
                Voir tout <i class="ri-arrow-right-line ms-1"></i>
              </router-link>
            </div>
            
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Référence</th>
                    <th>Type</th>
                    <th>Statut</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(demande, index) in stats.demandeStats?.dernieres" :key="index" 
                      class="animate__animated animate__fadeIn" :style="{'animation-delay': `${index * 0.1}s`}">
                    <td>{{ demande.refDemande }}</td>
                    <td>{{ demande.categorie?.libelle }}</td>
                    <td>
                      <span :class="{
                        'badge bg-warning': demande.statut === 'En attente',
                        'badge bg-success': demande.statut === 'Validé',
                        'badge bg-danger': demande.statut === 'Rejeté'
                      }">
                        {{ demande.statut }}
                      </span>
                    </td>
                    <td>{{ formatDate(demande.dateDemande) }}</td>
                  </tr>
                  <tr v-if="!stats.demandeStats?.dernieres?.length">
                    <td colspan="4" class="text-center text-muted py-4">
                      Aucune demande récente
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Derniers contrats -->
        <div class="col-lg-6 animate__animated animate__fadeInUp animate__delay-1s">
          <div class="card shadow-lg border-0 rounded-4 p-4 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold mb-0">
                <i class="ri-contract-line me-2"></i>Derniers contrats
              </h5>
              <router-link to="/contrats" class="btn btn-sm btn-outline-primary">
                Voir tout <i class="ri-arrow-right-line ms-1"></i>
              </router-link>
            </div>
            
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Référence</th>
                    <th>Personnel</th>
                    <th>Statut</th>
                    <th>Date Début</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contrat, index) in stats.contratStats?.derniers" :key="index" 
                      class="animate__animated animate__fadeIn" :style="{'animation-delay': `${index * 0.1}s`}">
                    <td>{{ contrat.reference }}</td>
                    <td>{{ contrat.personnel.nom }} {{ contrat.personnel.prenom }}</td>
                    <td>
                      <span :class="contrat.estResilie ? 'badge bg-danger' : 'badge bg-success'">
                        {{ contrat.estResilie ? 'Résilié' : 'Actif' }}
                      </span>
                    </td>
                    <td>{{ formatDate(contrat.datePriseFonction) }}</td>
                  </tr>
                  <tr v-if="!stats.contratStats?.derniers?.length">
                    <td colspan="4" class="text-center text-muted py-4">
                      Aucun contrat récent
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted,computed  } from "vue";
import stateStore from "@/utils/store";
import JwtService from "@/services/JwtService";
import { useRouter } from "vue-router";
import { useAuthStore, User } from "@/services/auth";
import ApiService from "@/services/ApiService";
import { format } from 'date-fns';
import 'animate.css';
import VueApexCharts from "vue3-apexcharts";
import 'animate.css';

export default defineComponent({
  name: "TableauBord",
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const stateStoreInstance = stateStore;
    const router = useRouter();
    const store = useAuthStore();

    const user = ref<User>();
    const userName = ref("");
    const userLastName = ref("");
    const userEmail = ref("");

    // Stats
    const stats = ref<any>({
      totalPersonnel: 0,
      sexeStats: [],
      situationMatrimonialeStats: [],
      organisationStats: [],
      enfantsStats: [],
      tauxAvecConjoint: { avecConjoint: 0, sansConjoint: 0 },
      averageAge: "N/A",
      contratStats: {
        types: [],
        total: 0,
        actifs: 0,
        inactifs: 0,
        parAnnee: [],
        derniers: []
      },
      personnelStats: {
        actifs: 0,
        inactifs: 0,
        derniers: []
      },
      demandeStats: {
        total: 0,
        enAttente: 0,
        valides: 0,
        refusees: 0,
        parCategorie: [],
        dernieres: []
      }
    });

 const demandeChartOptions = ref({
  chart: {
    type: 'donut',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  labels: [], // Les labels seront remplis dynamiquement
  colors: ['#5D87FF', '#6FD39B', '#FF8C00', '#FF6347', '#FFD166', '#F4A261'],
  legend: {
    position: 'bottom',
    formatter: function(seriesName: string, opts: any) {
      // Affiche directement le nom de la catégorie
      return demandeChartOptions.value.labels[opts.seriesIndex];
    }
  },
  tooltip: {
    y: {
      formatter: function(value: number, { seriesIndex }: any) {
        return `${demandeChartOptions.value.labels[seriesIndex]}: ${value}`;
      }
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 300
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
});
    const demandeSeries = ref<number[]>([]);

    const totalEffectif = computed(() => {
  return stats.value.organisationStats?.reduce((acc: number, org: any) => acc + parseInt(org.count), 0) || 0;
});

// Séries pour le graphique des organisations
const orgSeries = ref([{
  name: 'Effectif',
  data: [] as number[]
}]);

    const orgChartOptions = ref({
      chart: {
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        },
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '70%',
          distributed: false,
          dataLabels: {
            position: 'center'
          }
        }
      },
      colors: ['#5D87FF'],
      dataLabels: {
        enabled: true,
        formatter: function(val: number, opts: any) {
          const orgName = opts.w.globals.labels[opts.dataPointIndex];
          const percentage = ((val / totalEffectif.value) * 100).toFixed(1);
          return [`${orgName}`, `${val} employés (${percentage}%)`];
        },
        style: {
          fontSize: '12px',
          colors: ['#fff']
        },
        background: {
          enabled: true,
          foreColor: '#333',
          padding: 4,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#ddd',
          opacity: 0.9,
          dropShadow: {
            enabled: false
          }
        },
        offsetX: 0,
        dropShadow: {
          enabled: false
        }
      },
      xaxis: {
        categories: [] as string[],
        title: {
          text: 'Effectif total',
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        },
        labels: {
          formatter: function(val: string) {
            return val;
          }
        }
      },
      yaxis: {
        title: {
          text: 'Organisations',
          style: {
            fontSize: '14px',
            fontWeight: 'bold'
          }
        },
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
      tooltip: {
        enabled: false // Désactivé car les infos sont déjà dans les dataLabels
      },
      responsive: [{
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              barHeight: '50%'
            }
          },
          dataLabels: {
            style: {
              fontSize: '10px'
            },
            formatter: function(val: number, opts: any) {
              const orgName = opts.w.globals.labels[opts.dataPointIndex];
              return [`${orgName}`, `${val} (${((val / totalEffectif.value) * 100).toFixed(1)}%)`];
            }
          }
        }
      }]
    });

    const getContratType = (type: number) => {
      const types = {
        1: 'CDI',
        2: 'CDD',
        3: 'Stage',
        4: 'Intérim'
      };
      return types[type] || `Type ${type}`;
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return 'N/A';
      try {
        return format(new Date(dateString), 'dd/MM/yyyy');
      } catch {
        return dateString;
      }
    };

    const calculatePercentage = (part: number, total: number) => {
      if (!total) return '0%';
      return `${(part / total) * 100}%`;
    };

const loadStats = async () => {
  try {
    const { data } = await ApiService.get("/personnelstat");
    if (data.code === 200) {
      stats.value = data.data;
      
      if (data.data.demandeStats?.parCategorie) {
        // Utilisez les libellés complets des catégories
        demandeChartOptions.value.labels = data.data.demandeStats.parCategorie.map((d: any) => d.categorie);
        demandeSeries.value = data.data.demandeStats.parCategorie.map((d: any) => parseInt(d.count));
      }
      
      if (data.data.organisationStats) {
        // Tri des organisations par effectif décroissant
        const sortedOrgs = [...data.data.organisationStats].sort((a, b) => b.count - a.count);
        
        orgChartOptions.value = {
          ...orgChartOptions.value,
          xaxis: {
            ...orgChartOptions.value.xaxis,
            categories: sortedOrgs.map(org => org.organisation || 'Non spécifié')
          }
        };
        
        orgSeries.value = [{
          name: 'Effectif',
          data: sortedOrgs.map(org => parseInt(org.count))
        }];
      }
    }
  } catch (err) {
    console.error("Erreur chargement stats :", err);
  }
};
    // Animation des compteurs
    onMounted(() => {
      if (JwtService.getUser()) {
        userName.value = JwtService.getUserName()!;
        userLastName.value = JwtService.getUserLastName()!;
        userEmail.value = JwtService.getUserEmail() || JwtService.getUserPhone()!;
      }
      user.value = store.user;

      loadStats();

      // Animation des compteurs
      const counters = document.querySelectorAll('.counter');
      const speed = 200;
      
      counters.forEach(counter => {
        const target = +counter.textContent!;
        const count = +counter.textContent!;
        const increment = target / speed;
        
        if (count < target) {
          counter.textContent = '0';
          const updateCount = () => {
            const currentCount = +counter.textContent!;
            const newCount = Math.ceil(currentCount + increment);
            if (newCount < target) {
              counter.textContent = newCount.toString();
              setTimeout(updateCount, 1);
            } else {
              counter.textContent = target.toString();
            }
          };
          updateCount();
        }
      });
    });

    return { 
      userEmail, 
      userName, 
      userLastName, 
      stateStoreInstance, 
      user, 
      stats,
      getContratType,
      formatDate,
      calculatePercentage,
      demandeChartOptions,
      demandeSeries,
      orgChartOptions,
      orgSeries,
      totalEffectif
    };
  },
});
</script>

<style scoped>
.header-banner {
  height: 260px;
  overflow: hidden;
  position: relative;
}

.header-bg {
  object-fit: cover;
  height: 100%;
  filter: brightness(0.5);
  transition: transform 0.5s ease;
}

.header-banner:hover .header-bg {
  transform: scale(1.05);
}

.header-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
}

.header-banner:hover .header-overlay {
  background: rgba(0, 0, 0, 0.2);
}

/* Effet de survol pour les cartes */
.hover-effect {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  border-color: rgba(93, 135, 255, 0.2);
}

/* Style pour les icônes */
.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.bg-primary-light {
  background-color: rgba(93, 135, 255, 0.1);
}

.bg-success-light {
  background-color: rgba(73, 190, 0, 0.1);
}

.bg-warning-light {
  background-color: rgba(255, 171, 0, 0.1);
}

.bg-info-light {
  background-color: rgba(0, 184, 217, 0.1);
}

/* Style pour les cartes de stats */
.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

/* Animation pour les lignes des tableaux */
@keyframes fadeInRow {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.table tbody tr {
  animation: fadeInRow 0.5s ease forwards;
}

/* Style pour les badges */
.badge {
  font-size: 0.75em;
  padding: 0.35em 0.65em;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .header-banner {
    height: 200px;
  }
  
  .header-overlay h1 {
    font-size: 1.8rem;
  }
  
  .header-overlay p {
    font-size: 1rem;
  }
}
</style>