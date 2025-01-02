<template>
  <div class="card">
    <div class="row product-page-main">
      <div class="col-sm-12">
        <!-- Profile Section -->
        <div class="profile-section mb-4 p-3 border rounded">
          <div class="d-flex align-items-start justify-content-between">
            <!-- Profile Image -->
            <div class="d-flex align-items-center">
              <img :src="personnel?.imageUrl|| 'https://img.freepik.com/vecteurs-premium/portrait-homme-generique-avatar-masculin-par-defaut_20334121.jpg'" alt="Profile" class="img-thumbnail" style="width: 120px; height: 120px;">
              <div class="ms-3">
                <!-- General Information -->
                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Nom:</strong> {{ personnel?.nom || 'Nom inconnu' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Prénom:</strong> {{ personnel?.prenom || 'Prénom inconnu' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Situation Matrimoniale:</strong> {{ personnel?.situationMatrimoniale || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Civilité:</strong> {{ personnel?.civilite || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Date de Naissance:</strong> {{ personnel?.birthdate || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Date d'Embauche:</strong> {{ personnel?.dateEmbauche || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Numéro Sécu Sociale:</strong> {{ personnel?.numeroSecuriteSociale || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Nationalité:</strong> {{ personnel?.nationalite || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Religion:</strong> {{ personnel?.religion || 'Non renseigné' }}</p>
                  </div>
                  <div class="col-md-6">
                    <p><strong>Ethnie:</strong> {{ personnel?.ethnie || 'Non renseigné' }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="align-self-start">
              <button type="button" class="btn btn-primary">Consulter </button>
            </div>
          </div>
        </div>


        <!-- Tabs -->
        <ul class="nav nav-tabs border-tab nav-primary mb-3" id="top-tab" role="tablist">
        <!--<li class="nav-item">
            <a class="nav-link active" id="general-info-tab" data-bs-toggle="tab" href="#general-info" role="tab" aria-controls="general-info" aria-selected="true">
              <strong>Informations générales</strong>
            </a>
          </li>--> 
          <li class="nav-item">
            <a class="nav-link active" id="contact-info-tab" data-bs-toggle="tab" href="#contact-info" role="tab" aria-controls="contact-info" aria-selected="true">
              <strong>Adresse et contact</strong>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="family-info-tab" data-bs-toggle="tab" href="#family-info" role="tab" aria-controls="family-info" aria-selected="false">
              <strong>Conjoint et enfant</strong>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="health-info-tab" data-bs-toggle="tab" href="#health-info" role="tab" aria-controls="health-info" aria-selected="false">
              <strong>Santé physique</strong>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="bank-info-tab" data-bs-toggle="tab" href="#bank-info" role="tab" aria-controls="bank-info" aria-selected="false">
              <strong>Informations bancaires</strong>
            </a>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content" id="top-tabContent">
          <!-- General Information -->
        <!-- <div class="tab-pane fade show active" id="general-info" role="tabpanel" aria-labelledby="general-info-tab">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th><strong>Nom</strong></th>
                  <td>{{ personnel?.nom || 'Non renseigné' }}</td>
                  <th><strong>Prénom</strong></th>
                  <td>{{ personnel?.prenom || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Situation matrimoniale</strong></th>
                  <td>{{ personnel?.situationMatrimoniale || 'Non renseigné' }}</td>
                  <th><strong>Civilité</strong></th>
                  <td>{{ personnel?.civilite || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Date de naissance</strong></th>
                  <td>{{ personnel?.birthdate ? formatDate(personnel.birthdate) : 'Non renseigné' }}</td>
                  <th><strong>Date d'embauche</strong></th>
                  <td>{{ personnel?.dateEmbauche ? formatDate(personnel.dateEmbauche) : 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Numéro de sécurité sociale</strong></th>
                  <td>{{ personnel?.numeroSecuriteSociale || 'Non renseigné' }}</td>
                  <th><strong>Pays de résidence</strong></th>
                  <td>{{ personnel?.nationalite || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Religion</strong></th>
                  <td>{{ personnel?.religion || 'Non renseigné' }}</td>
                  <th><strong>Ethnie</strong></th>
                  <td>{{ personnel?.ethnie || 'Non renseigné' }}</td>
                </tr>
              </tbody>
            </table>
          </div>--> 

          <!-- Contact Information -->
          <div class="tab-pane fade show active" id="contact-info" role="tabpanel" aria-labelledby="contact-info-tab">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th><strong>Boîte postale</strong></th>
                  <td>{{ personnel?.boitePostale || 'Non renseigné' }}</td>
                  <th><strong>Téléphone 1</strong></th>
                  <td>{{ personnel?.telephone || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Téléphone 2</strong></th>
                  <td>{{ personnel?.telephone2 || 'Non renseigné' }}</td>
                  <th><strong>Email</strong></th>
                  <td>{{ personnel?.email || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Département</strong></th>
                  <td>{{ personnel?.departement || 'Non renseigné' }}</td>
                  <th><strong>Commune</strong></th>
                  <td>{{ personnel?.commune || 'Non renseigné' }}</td>
                </tr>
                  <tr>
                  <th><strong>Quartier</strong></th>
                  <td>{{ personnel?.quartier || 'Non renseigné' }}</td>
                  <th><strong>Adresse</strong></th>
                  <td>{{ personnel?.adresse || 'Non renseigné' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="tab-pane fade" id="family-info" role="tabpanel" aria-labelledby="family-info-tab">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th><strong>Nom conjoint</strong></th>
                  <td> {{ personnel?.nomConjoint || 'Non renseigné' }}</td>
                  <th><strong>Prénom conjoint</strong></th>
                  <td> {{ personnel?.prenomConjoint || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Date de naissance du conjoint</strong></th>
                  <td> {{ personnel?.birthdateConjoint ? formatDate(personnel.birthdateConjoint) : 'Non renseigné' }}</td>
                  <th><strong>Nationalité du conjoint</strong></th>
                  <td>{{ personnel?.nationaliteConjoint || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Passeport conjoint</strong></th>
                  <td> {{ personnel?.passeportConjoint || 'Non renseigné' }}</td>
                  <th><strong>Religion conjoint</strong></th>
                  <td>{{ personnel?.religionConjoint || 'Non renseigné' }}</td>
                  </tr>
                  <tr>
                  <th><strong>Ethnie</strong></th>
                  <td>{{ personnel?.ethnieConjoint || 'Non renseigné' }}</td>
                  <th><strong>Nombres d'enfants</strong></th>
                  <td>{{ personnel?.nombreEnfant || 'Non renseigné' }}</td>
                </tr>
              </tbody>
            </table>
          </div>



          <div class="tab-pane fade" id="health-info" role="tabpanel" aria-labelledby="health-info-tab">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th><strong>Taille</strong></th>
                  <td>   {{ personnel?.taille || 'Non renseigné' }}</td>
                  <th><strong>Poids</strong></th>
                  <td> {{ personnel?.poids || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Groupe sanguin</strong></th>
                  <td> {{ personnel?.groupeSanguin || 'Non renseigné' }}</td>
                  <th><strong>Vision gauche</strong></th>
                  <td> {{ personnel?.visionGauche || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Vision droite</strong></th>
                  <td> {{ personnel?.visionDroite || 'Non renseigné' }}</td>
                  <th><strong>Audience gauche</strong></th>
                  <td> {{ personnel?.auditionGauche || 'Non renseigné' }}</td>
                </tr>
                
                <tr>
                  <th><strong>Audience droite</strong></th>
                  <td>{{ personnel?.auditionDroite || 'Non renseigné' }}</td>
                  <th><strong>Main gauche</strong></th>
                  <td>{{ personnel?.mainGauche || 'Non renseigné' }}</td>
                </tr>
                
                <tr>
                  <th><strong>Main droite</strong></th>
                  <td>{{ personnel?.mainDroite || 'Non renseigné' }}</td>
                  <th><strong>Jambe gauche</strong></th>
                  <td>  {{ personnel?.jambeGauche || 'Non renseigné' }}</td>
                  <th><strong>Jambe droite</strong></th>
                </tr>
               
                <tr>
                  <th><strong>Jambe droite</strong></th>
                  <td>{{ personnel?.jambeDroite || 'Non renseigné' }}</td>
                </tr>
              </tbody>
            </table>
          </div>


          
          <div class="tab-pane fade" id="bank-info" role="tabpanel" aria-labelledby="bank-info-tab">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th><strong>Banque</strong></th>
                  <td>   {{ personnel?.banque || 'Non renseigné' }}</td>
                  <th><strong>Numéro de compte bancaire</strong></th>
                  <td> {{ personnel?.numeroCompte || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Code iban</strong></th>
                  <td> {{ personnel?.codeIban || 'Non renseigné' }}</td>
                  <th><strong>Code swift </strong></th>
                  <td>  {{ personnel?.codeSwift || 'Non renseigné' }}</td>
                </tr>
                <tr>
                  <th><strong>Nom personne a contacter</strong></th>
                  <td> {{ personnel?.nomContact || 'Non renseigné' }}</td>
                  <th><strong>Telephone personne a contacter</strong></th>
                  <td>   {{ personnel?.telephoneContact || 'Non renseigné' }}</td>
                </tr>
                
                <tr>
                  <th><strong>Relation</strong></th>
                  <td>{{ personnel?.auditionDroite || 'Non renseigné' }}</td>
                </tr>
                
             
              </tbody>
            </table>
          </div>


        </div>

        <!-- Action Buttons -->
        <div class="mt-3">
          <router-link to="/personnels/ajouter-personnel/" class="btn btn-primary">Ajouter personnel</router-link>
          <router-link to="/personnelles/liste-personnel/" class="btn btn-danger mx-1">Retour</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import { error } from "@/utils/utils";

export default defineComponent({
  name: "ViewPersonnel",
  setup() {
    const personnel = ref(null);
    const route = useRoute();

    const getPersonnel = async (id: number) => {
      try {
        const { data } = await ApiService.get(`/personnel/${id}`);
        console.log("data",data);
        personnel.value = data.data;
      } catch (err) {
        error(err.response?.data?.message || "Erreur lors de la récupération des données.");
      }
    };

    const formatDate = (dateString: string) => {
      if (!dateString) return "Non spécifiée";
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Format invalide" : date.toLocaleDateString("fr-FR");
    };

    onMounted(() => {
      if (route.params.id) {
        getPersonnel(parseInt(route.params.id as string));
      }
    });

    return { personnel, formatDate };
  },
});
</script>
