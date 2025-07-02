import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ApiService from '@/services/ApiService';
import ListeAttribution from "@/components/Attribution/ListeAttribution.vue";

import BodyView from "@/layout/BodyView.vue"
import AuthView from "@/components/common/block/auth/AuthView.vue"
import LoginPage from "@/components/common/block/auth/LoginPage.vue"
import indexDefault from "@/pages/dashbords/indexDefault.vue"
import indexProject from "@/pages/dashbords/indexProject.vue"
import loginSimple from "@/pages/authentication/loginSimple.vue"
import loginImage from "@/pages/authentication/loginImage.vue"
import loginImageTwo from "@/pages/authentication/loginImageTwo.vue"
import loginValidation from "@/pages/authentication/loginValidation.vue"
import loginTooltip from "@/pages/authentication/loginTooltip.vue"
import loginSweetalert from "@/pages/authentication/loginSweetalert.vue"
import registerSimple from "@/pages/authentication/registerSimple.vue"
import registerImage from "@/pages/authentication/registerImage.vue"
import registerImageTwo from "@/pages/authentication/registerImageTwo.vue"
import unlockUser from "@/pages/authentication/unlockUser.vue"
import forgetPassword from "@/pages/authentication/forgetPassword.vue"
import resetPassword from "@/pages/authentication/resetPassword.vue"
import maintenanceView from "@/pages/authentication/maintenanceView.vue"
import indexPagenation from "@/pages/advance/indexPagenation.vue"
import indexBreadcrumb from "@/pages/advance/indexBreadcrumb.vue"
import indexRange from "@/pages/advance/indexRange.vue"
import indexUserlist from "@/pages/users/indexUserlist.vue"
import indexCreateUser from "@/pages/users/indexCreateUser.vue"
import AddPermissionPage from "@/pages/Permission/AddPermissionPage.vue";
import ListePermissionPage from "@/pages/Permission/ListePermissionPage.vue";
// import ListeServicePage from "@/pages/Service/ListeServicePage.vue";
import ListeCategoriePage from "@/pages/GestionPersonnel/Categorie/ListeCategoriePage.vue";
import ListePostePage from "@/pages/GestionPersonnel/Poste/ListePostePage.vue";
import ListeTypeCongePage from "@/pages/GestionPersonnel/TypeConge/ListeTypeCongePage.vue";
import AddCongePage from "@/pages/GestionPersonnel/Conge/AddCongePage.vue";
import EditCongePage from '@/pages/GestionPersonnel/Conge/EditCongePage.vue'
import ListeCongePage from "@/pages/GestionPersonnel/Conge/ListeCongePage.vue";
import AddRolePage from "@/pages/Role/AddRolePage.vue";
import ListeRolePage from "@/pages/Role/ListeRolePage.vue";
import EditRolePage from "@/pages/Role/EditRolePage.vue";
import ViewRolePage from "@/pages/Role/ViewRolePage.vue";
import AddUserPage from '@/pages/Users/AddUserPage.vue';
import ListeUserPage from "@/pages/Users/ListeUserPage.vue";
import EditUserPage from "@/pages/Users/EditUserPage.vue";
import EditProfilePage from "@/pages/Users/EditProfilePage.vue";
import ViewUserPage from "@/pages/Users/ViewUserPage.vue";
import TableauBordPage from "@/pages/dashbords/TableauBordPage.vue"
import AddHeureSuppPage from '@/pages/GestionPersonnel/HeureSupp/AddHeureSuppPage.vue';
import EditHeureSuppPage from '@/pages/GestionPersonnel/HeureSupp/EditHeureSuppPage.vue'
import ListeHeureSuppPage from "@/pages/GestionPersonnel/HeureSupp/ListeHeureSuppPage.vue";
import AddJustificatifPage from '@/pages/GestionPersonnel/Justificatif/AddJustificatifPage.vue';
import EditJustificatifPage from '@/pages/GestionPersonnel/Justificatif/EditJustificatifPage.vue'
import ListeJustificatifPage from "@/pages/GestionPersonnel/Justificatif/ListeJustificatifPage.vue";
import AddPermissionPPage from '@/pages/GestionPersonnel/PermissionP/AddPermissionPPage.vue';
import EditPermissionPPage from '@/pages/GestionPersonnel/PermissionP/EditPermissionPPage.vue'
import ListePermissionPPage from "@/pages/GestionPersonnel/PermissionP/ListePermissionPPage.vue";
import AddDemandePage from '@/pages/GestionPersonnel/Demandes/AddDemandeModalPage.vue';
import ListeDemandePage from '@/pages/GestionPersonnel/Demandes/ListeDemandePage.vue';
import EditDemandePage from '@/pages/GestionPersonnel/Demandes/EditDemandePage.vue'
import AddPresencePage from '@/pages/GestionPersonnel/Presences/AddPresencePage.vue';
import ListePresencePage from '@/pages/GestionPersonnel/Presences/ListePresencePage.vue';
import EditPresencePage from '@/pages/GestionPersonnel/Presences/EditPresencePage.vue'
import AddPersonnelPage from '@/pages/GestionPersonnel/Personnels/AddPersonnelPage.vue';
import ListePersonnelPage from '@/pages/GestionPersonnel/Personnels/ListePersonnelPage.vue';
import EditPersonnelPage from '@/pages/GestionPersonnel/Personnels/EditPersonnelPage.vue';
import DetailsPersonnelPage from '@/pages/GestionPersonnel/Personnels/DetailsPersonnelPage.vue'

import AddOuvFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/AddOuvFerPage.vue'
import AddFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/AddFerPage.vue'
import ListeOuvFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/ListeOuvFerPage.vue'
import EditOuvFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/EditOuvFerPage.vue'
import ListeMonnaiePage from '@/pages/GestionTresorerie/Monnaie/ListeMonnaiePage.vue'
import ListeUserComptePage from '@/pages/GestionTresorerie/UserCompte/ListeUserComptePage.vue'
import ListeUserTresoreriePage from '@/pages/GestionTresorerie/UserTresorerie/ListeUserTresoreriePage.vue'
import AddBienPage from "@/pages/GestionImmobilisation/Bien/AddBienPage.vue";
import EditBienPage from "@/pages/GestionImmobilisation/Bien/EditBienPage.vue";
import ListeBienPage from "@/pages/GestionImmobilisation//Bien/ListeBienPage.vue";
import ViewBienPage from "@/pages/GestionImmobilisation//Bien/ViewBienPage.vue";
import RetourneBienPage from "@/pages/GestionImmobilisation//Bien/RetourneBienPage.vue";
//import ListeEcheancesPage from "@/pages/GestionPersonnel/Echeance/ListeEcheancesPage.vue";
import AddMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/AddMouvementBienPage.vue";
import EditMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/EditMouvementBienPage.vue";
import ListeMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/ListeMouvementBienPage.vue";
import AddAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/AddAmortissementPage.vue";
import EditAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/EditAmortissementPage.vue";
import ListeAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/ListeAmortissementPage.vue";
import ListeCategorieBienPage from "@/pages/GestionImmobilisation/CategorieBien/ListeCategorieBienPage.vue";
import ListeTypeBienPage from "@/pages/GestionImmobilisation/TypeBien/ListeTypeBienPage.vue";
import ListeMagasinPage from "@/pages/GestionImmobilisation/Magasin/ListeMagasinPage.vue";
import TableauAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/TableauAmortissementPage.vue";
import ListeFamillePage from "@/pages/GesCom/Familles/ListeFamillePage.vue";
import AddMediaPage from "@/pages/GesCom/Medias/AddMediaPage.vue";
import EditMediaPage from "@/pages/GesCom/Medias/EditMediaPage.vue";
import ListeMediaPage from "@/pages/GesCom/Medias/ListeMediaPage.vue";
import AddProduitPage from "@/pages/GesCom/Produit/AddProduitPage.vue";
import EditProduitPage from "@/pages/GesCom/Produit/EditProduitPage.vue";
import ListeProduitPage from "@/pages/GesCom/Produit/ListeProduitPage.vue";
import ViewProduitPage from "@/pages/GesCom/Produit/ViewProduitPage.vue";
import AddClientPage from "@/pages/GesCom/Client/AddClientPage.vue";
import EditClientPage from "@/pages/GesCom/Client/EditClientPage.vue";
import ListeClientPage from "@/pages/GesCom/Client/ListeClientPage.vue";
import ViewClientPage from "@/pages/GesCom/Client/ViewClientPage.vue";
import AddCaissePage from "@/pages/GesCom/Caisse/AddCaissePage.vue";
import EditCaissePage from "@/pages/GesCom/Caisse/EditCaissePage.vue";
import ListeCaissePage from "@/pages/GesCom/Caisse/ListeCaissePage.vue";
import ListeSuiviStockPage from "@/pages/GesCom/SuiviStock/ListeSuiviStockPage.vue";
import ListeMonaiePage from "@/pages/GesCom/Monaie/ListeMonaiePage.vue";
import ListeConditionnementPage from "@/pages/GesCom/Conditionnement/ListeConditionnementPage.vue";
import AddProduitConditionnePage from "@/pages/GesCom/ProduitConditionne/AddProduitConditionnePage.vue";
import EditProduitConditionnePage from "@/pages/GesCom/ProduitConditionne/EditProduitConditionnePage.vue";
import ListeProduitConditionnePage from "@/pages/GesCom/ProduitConditionne/ListeProduitConditionnePage.vue";
//import ListeMagasinPage from "@/pages/GesCom/Magasin/ListeMagasinPage.vue";
import AddInventairePage from "@/pages/GesCom/Inventaire/AddInventairePage.vue";
import ListeInventairePage from "@/pages/GesCom/Inventaire/ListeInventairePage.vue";
import ListeAdresseLivraisonPage from "@/pages/GesCom/AdresseLivraison/ListeAdresseLivraisonPage.vue";
import AddCommandeFournisseurPage from "@/pages/GesCom/CommandeFournisseur/AddCommandeFournisseurPage.vue";
import ListeCommandeFournisseurPage from "@/pages/GesCom/CommandeFournisseur/ListeCommandeFournisseurPage.vue";
import AddSocietePage from "@/pages/GesCom/Societe/AddSocietePage.vue";
import EditSocietePage from "@/pages/GesCom/Societe/EditSocietePage.vue";
import ListeSocietePage from "@/pages/GesCom/Societe/ListeSocietePage.vue";
import ViewSocietePage from "@/pages/GesCom/Societe/ViewSocietePage.vue";
import AddCommandeClientPage from "@/pages/GesCom/CommandeClient/AddCommandeClientPage.vue";
import EditCommandeClientPage from "@/pages/GesCom/CommandeClient/EditCommandeClientPage.vue";
import ListeCommandeClientPage from "@/pages/GesCom/CommandeClient/ListeCommandeClientPage.vue";
import AddPaiementPage from "@/pages/GesCom/Paiement/AddPaiementPage.vue";
import EditPaiementPage from "@/pages/GesCom/Paiement/EditPaiementPage.vue";
import ListePaiementPage from "@/pages/GesCom/Paiement/ListePaiementPage.vue";
import ListeModePaiementPage from "@/pages/GesCom/ModePaiement/ListeModePaiementPage.vue";
import AddBanquePage from "@/pages/GesCom/Banque/AddBanquePage.vue";
import EditBanquePage from "@/pages/GesCom/Banque/EditBanquePage.vue";
import ListeBanquePage from "@/pages/GesCom/Banque/ListeBanquePage.vue";
import AddPersonnellePage from "@/pages/GesCom/Personnel/AddPersonnellePage.vue";
import EditPersonnellePage from "@/pages/GesCom/Personnel/EditPersonnellePage.vue";
import EditPersonnellePage2 from "@/pages/GesCom/Personnel/EditPersonnellePage2.vue";
import ListePersonnellePage from "@/pages/GesCom/Personnel/ListePersonnellePage.vue";
import ViewPersonnellePage from "@/pages/GesCom/Personnel/ViewPersonnellePage.vue";
import AddPersonnelPostePage from "@/pages/GesCom/AddPersonnelPostePage/AddPersonnelPostePage.vue";
import EditPersonnelPostePage from "@/pages/GesCom/PersonnelPoste/EditPersonnelPostePage.vue";
import ListePersonnelPostePage from "@/pages/GesCom/PersonnelPoste/ListePersonnelPostePage.vue";
import ListeTaxePage from "@/pages/GesCom/Taxe/ListeTaxePage.vue";
import ListeTypeTaxePage from "@/pages/GesCom/TypeTaxe/ListeTypeTaxePage.vue";
import ListeTypeDepensePage from "@/pages/GesCom/TypeDepense/ListeTypeDepensePage.vue";
import ListeTypeOperationPage from "@/pages/GesCom/TypeOperation/ListeTypeOperationPage.vue";
import AddPointVentePage from "@/pages/GesCom/PointVente/AddPointVentePage.vue";
import EditPointVentePage from "@/pages/GesCom/PointVente/EditPointVentePage.vue";
import ListePointVentePage from "@/pages/GesCom/PointVente/ListePointVentePage.vue";
import AddVentePage from "@/pages/GesCom/Vente/AddVentePage.vue";
import ListeVentePage from "@/pages/GesCom/Vente/ListeVentePage.vue";
import AddLivraisonPage from "@/pages/GesCom/Livraison/AddLivraisonPage.vue";
import ListeLivraisonPage from "@/pages/GesCom/Livraison/ListeLivraisonPage.vue";
import AddComptePage from "@/pages/GesCom/Compte/AddComptePage.vue";
import EditComptePage from "@/pages/GesCom/Compte/EditComptePage.vue";
import ListeComptePage from "@/pages/GesCom/Compte/ListeComptePage.vue";
import AddTransactionPage from "@/pages/GesCom/Transaction/AddTransactionPage.vue";
import EditTransactionPage from "@/pages/GesCom/Transaction/EditTransactionPage.vue";
import ListeTransactionPage from "@/pages/GesCom/Transaction/ListeTransactionPage.vue";
import ViewTransactionPage from "@/pages/GesCom/Transaction/ViewTransactionPage.vue";
import AddSortiePage from "@/pages/GesCom/Sortie/AddSortiePage.vue";
import ListeSortiePage from "@/pages/GesCom/Sortie/ListeSortiePage.vue";
import AddModeleSignatairePage from "@/pages/GesCom/ModeleSignataire/AddModeleSignatairePage.vue";
import ListeModeleSignatairePage from "@/pages/GesCom/ModeleSignataire/ListeModeleSignatairePage.vue";
import ListeFacturePage from "@/pages/GesCom/Facture/ListeFacturePage.vue";
import AddDemandePrixPage from "@/pages/GesCom/DemandePrix/AddDemandePrixPage.vue";
import ListeDemandePrixPage from "@/pages/GesCom/DemandePrix/ListeDemandePrixPage.vue";
import AddDepensePage from "@/pages/GesCom/Depense/AddDepensePage.vue";
import ListeDepensePage from "@/pages/GesCom/Depense/ListeDepensePage.vue";
import AddDepotPage from "@/pages/GesCom/Depot/AddDepotPage.vue";
import ListeDepotPage from "@/pages/GesCom/Depot/ListeDepotPage.vue";
import AddFournisseurPage from "@/pages/GesCom/Fournisseur/AddFournisseurPage.vue";
import EditFournisseurPage from "@/pages/GesCom/Fournisseur/EditFournisseurPage.vue";
import ListeFournisseurPage from "@/pages/GesCom/Fournisseur/ListeFournisseurPage.vue";
import ViewFournisseurPage from "@/pages/GesCom/Fournisseur/ViewFournisseurPage.vue";
import AddOperationDepotPage from "@/pages/GesCom/Operation/AddOperationDepotPage.vue";
import AddOperationRetraitPage from "@/pages/GesCom/Operation/AddOperationRetraitPage.vue";
import EditOperationDepotPage from "@/pages/GesCom/Operation/EditOperationDepotPage.vue";
import EditOperationRetraitPage from "@/pages/GesCom/Operation/EditOperationRetraitPage.vue";
import ViewOperationPage from "@/pages/GesCom/Operation/ViewOperationPage.vue";
import ListeOperationPage from "@/pages/GesCom/Operation/ListeOperationPage.vue";
import ListeTypeComptePage from "@/pages/GesCom/TypeCompte/ListeTypeComptePage.vue";
import AddPersonnelNewPage from "@/pages/GesCom/Personnel/AddPersonnelNewPage.vue";



import ListeGroupeTaxePage from "@/pages/GesCom/GroupeTaxe/ListeGroupeTaxePage.vue";

//Fin GesCom/

//Gestion de la Paie
import ListeEthniePage from "@/pages/GestionPaie/Ethnie/ListeEthniePage.vue";
import ListeTypeRetenuePage from "@/pages/GestionPaie/TypeRetenue/ListeTypeRetenuePage.vue";
import ListeTypePrimePage from "@/pages/GestionPaie/TypePrime/ListeTypePrimePage.vue";
import ListeTypeContratPage from "@/pages/GestionPaie/TypeContrat/ListeTypeContratPage.vue";
import ListeModeTarificationPage from "@/pages/GestionPaie/ModeTarification/ListeModeTarificationPage.vue";
import ListeReligionPage from "@/pages/GestionPaie/Religion/ListeReligionPage.vue";
import AddContratPage from "@/pages/GestionPaie/Contrat/AddContratPage.vue";
import ListeContratPage from "@/pages/GestionPaie/Contrat/ListeContratPage.vue";
import ViewContratPage from "@/pages/GestionPaie/Contrat/ViewContratPage.vue";

import AddPaiePage from "@/pages/GestionPaie/Paie/AddPaiePage.vue";
import ListePaiePage from "@/pages/GestionPaie/Paie/ListePaiePage.vue";
import AddProcessusPage from "@/pages/GestionPaie/Processus/AddProcessusPage.vue";
import ListeProcessusPage from "@/pages/GestionPaie/Processus/ListeProcessusPage.vue";
import PersonnelDetailsPage from '@/pages/GesCom/Personnel/PersonnelDetailsPage.vue';
import ListeModeleContratPage from "@/pages/GestionPaie/ModeleContrat/ListeModeleContratPage.vue"
// import ListeBulletinPaiePage from "@/pages/GestionPaie/BulletinPaie/ListeBulletinPaiePage.vue"





// Gestion Archivages
import ListeFormatPage from "@/pages/GestionArchive/Format/ListeFormatPage.vue";
import ListeMouvementPage from "@/pages/GestionArchive/Mouvement/ListeMouvementPage.vue";
import ListeTagPage from "@/pages/GestionArchive/Tag/ListeTagPage.vue";
import ListeEmplacementPage from "@/pages/GestionArchive/Emplacement/ListeEmplacementPage.vue";
import ListeOrganisationPage from "@/pages/GestionArchive/Organisation/ListeOrganisationPage.vue";
import ListeTypeOrganisationPage from "@/pages/GestionArchive/TypeOrganisation/ListeTypeOrganisationPage.vue";
import AddDocumentPage from "@/pages/GestionArchive/Document/AddDocumentPage.vue";

import ListeDocumentPage from "@/pages/GestionArchive/Document/ListeDocumentPage.vue";
import EditDocumentPage from "@/pages/GestionArchive/Document/EditDocumentPage.vue"

import ViewDocumentPage from "@/pages/GestionArchive/Document/ViewDocumentPage.vue";


//gestion des zones
import ListeQuartierPage from "@/pages/Quartier/ListeQuartierPage.vue";
import ListeArrondissementPage from "@/pages/Arrondissement/ListeArrondissementPage.vue";
import ListeDepartementPage from "@/pages/Departement/ListeDepartementPage.vue";
import ListeCommunePage from "@/pages/Commune/ListeCommunePage.vue";


// Gestion Circuit
import AddCircuitPage from "@/pages/GestionCircuit/Circuit/AddCircuitPage.vue";
import EditCircuitPage from "@/pages/GestionCircuit/Circuit/EditCircuitPage.vue";
import ListeCircuitPage from "@/pages/GestionCircuit/Circuit/ListeCircuitPage.vue";
import ViewCircuitPage from "@/pages/GestionCircuit/Circuit/ViewCircuitPage.vue";

//import AddCircuitDemandePage from "@/pages/GestionPersonnel/CircuitDemande/AddCircuitDemandePage.vue";
import ListeCircuitDemandePage from "@/pages/GestionPersonnel/CircuitDemande/ListeCircuitDemandePage.vue";
//import AddEtapeValidationPage from "@/components/GestionCircuit/EtapeValidation/AddEtapeValidation.vue";
//import EditEtapeValidationPage from "@/components/GestionCircuit/EtapeValidation/EditEtapeValidation.vue";
//import ListeEtapeValidationPage from "@/components/GestionCircuit/EtapeValidation/ListeEtapeValidation.vue";
import ListeUserEtapesPage from "@/components/GestionCircuit/UserEtapes/ListeUserEtapes.vue";
//import ViewEtapeValidationPage from "@/components/GestionCircuit/EtapeValidation/WiewEtapeValidation.vue";

import ListeRoleEtapPage from "@/pages/GestionCircuit/RoleEtap/ListeRoleEtapPage.vue";
//import AddRoleEtapPage from "@/pages/GestionCircuit/RoleEtap/AddRoleEtapPage.vue";
//import EditRoleEtapPage from "@/pages/GestionCircuit/RoleEtap/EditRoleEtapPage.vue";


import ListeModelPage from "@/pages/GestionModel/Model/ListeModelPage.vue";
import AddModelPage from "@/pages/GestionModel/Model/AddModelPage.vue";
import EditModelPage from "@/pages/GestionModel/Model/EditModelPage.vue";

import ListeTypePage from "@/pages/GestionModel/Type/ListeTypePage.vue";


// Champs Libres Famille

import AddChampsLibreFamillePage from '@/pages/ChampsLibre/AddChampsLibreFamillePage.vue';
import EditChampsLibreFamillePage from '@/pages/ChampsLibre/EditChampsLibreFamillePage.vue';
import ListeChampsLibreFamillePage from '@/pages/ChampsLibre/ListeChampsLibreFamillePage.vue';

import AddHorairePage from "@/pages/GestionPersonnel/Horaire/AddHorairePage.vue";
import EditHorairePage from "@/pages/GestionPersonnel/Horaire/EditHorairePage.vue";
import ListeHorairePage from "@/pages/GestionPersonnel/Horaire/ListeHorairePage.vue";
import ListeDemandeAutrePage from '@/pages/GestionPersonnel/Demandes/ListeDemandeAutrePage.vue';
import ListeDemandePermissionPage from '@/pages/GestionPersonnel/Demandes/ListeDemandePermissionPage.vue';
import ListeDemandeCongePage from '@/pages/GestionPersonnel/Demandes/ListeDemandeCongePage.vue';
import ListeDemandeAttestationPage from '@/pages/GestionPersonnel/Demandes/ListeDemandeAttestationPage.vue';
import ViewDemandePage from '@/pages/GestionPersonnel/Demandes/ViewDemandePage.vue';
import ListeCongeCalendrierPage from '@/pages/GestionPersonnel/Conge/ListeCongeCalendrierPage.vue';
import ListeEquipePage from '@/pages/GesCom/Equipe/ListeEquipePage.vue';
import EditEquipePage from '@/pages/GesCom/Equipe/EditEquipePage.vue';
import AddEquipePage from '@/pages/GesCom/Equipe/AddEquipePage.vue';
import AddMouvementPage from '@/pages/GesCom/Mouvement/AddMouvementPage.vue';
import MiseAJourInventairePage from '@/pages/GesCom/Inventaire/MiseAJourInventairePage.vue';
import AddArchivagePage from '@/pages/GestionPersonnel/Demandes/AddArchivagePage.vue';
import ListeDemandePretPage from '@/pages/GestionPersonnel/Demandes/ListeDemandePretPage.vue';
import ListeValidationPage from '@/pages/Validation/ListeValidationPage.vue';
import AddValidationPage from '@/pages/Validation/AddValidationPage.vue';


import ListeDemandePermissionPageCopy from '@/pages/GestionPersonnel/Demandes/ListeDemandePermissionPage copy.vue';
// import EditChampsLibreFamillePage from "@/pages/ChampsLibre/EditChampsLibreFamillePage.vue"
// import ListeChampsLibreFamillePage from "@/pages/ChampsLibre/ListeChampsLibreFamillePage.vue"
// import AddChampsLibreFamillePage from "@/pages/ChampsLibre/AddChampsLibreFamillePage.vue"




const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: BodyView,
    meta: {
      title: 'Romas progiciel',
    },
    children: [
      {
        path: '',
        name: 'TableauBord',
        component: TableauBordPage,
        meta: {
          title: 'Romas progiciel',
        }
      }
    ]
  },
  {
    path: "/accueil",
    component: BodyView,
    children: [
      {
        path: "tableau-bord",
        name: "TableauBord",
        component: TableauBordPage,
        meta: {
          title: 'Tableau de bord',
        }
      },
    ]
  },
 
 
  /*{
    path: "/echeances",
    component: BodyView,
    children: [
      {
        path: "liste-echeances",
        name: "ListeEchances",
        component: ListeEcheancesPage,
        meta: {
          title: 'Ajouter une echeance',
        }
      },
    ]
  },*/
  {
    path: "/utilisateurs",
    component: BodyView,
    children: [
      {
        path: "ajouter-utilisateur",
        name: "AddUser",
        component: AddUserPage,
        meta: {
          title: 'Ajouter un utilisateur',
        }
      },
      {
        path: "liste-utilisateur",
        name: "ListeUser",
        component: ListeUserPage,
        meta: {
          title: 'Liste des utilisateurs',
        }
      },
      {
        path: "edit-utilisateur/:id",
        name: "EditUser",
        component: EditUserPage,
        meta: {
          title: 'Modifier un utilisateur',
        }
      },
      {
        path: "view-utilisateur/:id",
        name: "ViewUser",
        component: ViewUserPage,
        meta: {
          title: 'Détails d\'un utilisateur',
        }
      },
    ]
  },
  {
    path: "",
    component: BodyView,
    children: [
      {
        path: "profile",
        name: "EditProfile",
        component: EditProfilePage,
        meta: {
          title: 'Modifier mon profile',
        }
      }
    ]
  },
  {
    path: "/permissions",
    component: BodyView,
    children: [
      // {
      //   path: "ajouter-permission",
      //   name: "AddPermissionPage",
      //   component: AddPermissionPage,
      //   meta: {
      //     title: 'Ajouter une permission',
      //   }
      // },
      {
        path: "liste-permission",
        name: "ListePermissionPage",
        component: ListePermissionPage,
        meta: {
          title: 'Liste des permissions',
        }
      }
    ]
  },

  {
    path: "/ethnies",
    component: BodyView,
    children: [
      // {
      //   path: "ajouter-permission",
      //   name: "AddPermissionPage",
      //   component: AddPermissionPage,
      //   meta: {
      //     title: 'Ajouter une permission',
      //   }
      // },
      {
        path: "liste-ethnie",
        name: "ListeEthniePage",
        component: ListeEthniePage,
        meta: {
          title: 'Liste des ethnies',
        }
      }
    ]
  },

  {
    path: "/modeleContrat",
    component: BodyView,
    children: [
      
      {
        path: "liste-modeleContrat",
        name: "ListeModeleContratPage",
        component: ListeModeleContratPage,
        meta: {
          title: 'Liste des modeles contrats',
        }
      }
    ]
  },

  // {
  //   path: "/bulletinPaie",
  //   component: BodyView,
  //   children: [
      
  //     {
  //       path: "liste-bulletinPaie",
  //       name: "ListeBulletinPaiePage",
  //       component: ListeBulletinPaiePage,
  //       meta: {
  //         title: 'Liste des bulletins de paie',
  //       }
  //     }
  //   ]
  // },
  {
    path: "/contrats",
    component: BodyView,
    children: [
      {
        path: "ajouter-contrat",
        name: "AddContrat",
        component: AddContratPage,
        meta: {
          title: 'Ajouter un contrat',
        }
      },
      {
        path: "liste-contrats",
        name: "ListeContrat",
        component: ListeContratPage,
        meta: {
          title: 'Liste des contrats',
        }
      },
      {
        path: "view-contrat/:id",
        name: "ViewContrat",
        component: ViewContratPage,
        meta: {
          title: 'Détails d\'un Contrat',
        }
      },
    ]
  },
     
  {
    path: "/typeRetenues",
    component: BodyView,
    children: [
      // {
      //   path: "ajouter-permission",
      //   name: "AddPermissionPage",
      //   component: AddPermissionPage,
      //   meta: {
      //     title: 'Ajouter une permission',
      //   }
      // },
      {
        path: "liste-typeRetenue",
        name: "ListeTypeRetenuePage",
        component: ListeTypeRetenuePage,
        meta: {
          title: 'Liste des types de retenues',
        }
      }
    ]
  },

  {
    path: "/typePrimes",
    component: BodyView,
    children: [
      // {
      //   path: "ajouter-permission",
      //   name: "AddPermissionPage",
      //   component: AddPermissionPage,
      //   meta: {
      //     title: 'Ajouter une permission',
      //   }
      // },
      {
        path: "liste-typePrime",
        name: "ListeTypePrimePage",
        component: ListeTypePrimePage,
        meta: {
          title: 'Liste des types de primes',
        }
      }
    ]
  },
 
  {
    path: "/typeContrats",
    component: BodyView,
    children: [
      {
        path: "liste-typeContrat",
        name: "ListeTypeContratPage",
        component: ListeTypeContratPage,
        meta: {
          title: 'Liste des types de contrats',
        }
      }
    ]
  },

  

  {
    path: "/typeOrganisations",
    component: BodyView,
    children: [
     
      {
        path: "liste-typeOrganisation",
        name: "ListeTypeOrganisationPage",
        component: ListeTypeOrganisationPage,
        meta: {
          title: "Liste des types d'organisation",
        }
      }
    ]
  },
  {
    path: "/organisations",
    component: BodyView,
    children: [
     
      {
        path: "liste-organisation",
        name: "ListeOrganisationPage",
        component: ListeOrganisationPage,
        meta: {
          title: 'Liste des organisations',
        }
      }
    ]
  },
  
  
  {
    path: "/religions",
    component: BodyView,
    children: [
      // {
      //   path: "ajouter-permission",
      //   name: "AddPermissionPage",
      //   component: AddPermissionPage,
      //   meta: {
      //     title: 'Ajouter une permission',
      //   }
      // },
      {
        path: "liste-religion",
        name: "ListeReligionPage",
        component: ListeReligionPage,
        meta: {
          title: 'Liste des religions',
        }
      }
    ]
  },




    
  {
    path: "/roles",
    component: BodyView,
    children: [
      {
        path: "ajouter-role",
        name: "AddRolePage",
        component: AddRolePage,
        meta: {
          title: 'Ajouter un role',
        }
      },
      {
        path: "liste-role",
        name: "ListeRolePage",
        component: ListeRolePage,
        meta: {
          title: 'Liste des rôles',
        }
      },
      {
        path: "edit-role/:id",
        name: "EditRolePage",
        component: EditRolePage,
        meta: {
          title: 'Modifier un rôle',
        }
      },
      {
        path: "view-role/:id",
        name: "ViewRolePage",
        component: ViewRolePage,
        meta: {
          title: 'Détails du rôle',
        }
      }
    ]
  },
  {
    path: "/attributions",
    component: BodyView,
    children: [
      {
        path: "liste-attribution",
        name: "ListeAttributionPage",
        component: ListeAttribution,
        meta: {
          title: 'Liste des attributions',
        }
      },
    ]
  },
  {
    path: "/categories",
    component: BodyView,
    children: [
      {
        path: "liste-categorie",
        name: "ListeCategoriePage",
        component: ListeCategoriePage,
        meta: {
          title: 'Liste des categories',
        }
      },
    ]
  },
  {
    path: "/postes",
    component: BodyView,
    children: [
      {
        path: "liste-poste",
        name: "ListePostePage",
        component: ListePostePage,
        meta: {
          title: 'Liste des postes',
        }
      },
    ]
  },
  {
    path: "/typeConges",
    component: BodyView,
    children: [
      {
        path: "liste-typeConge",
        name: "ListeTypeCongePage",
        component: ListeTypeCongePage,
        meta: {
          title: 'Liste des types de congés',
        }
      },
    ]
  },
  {
    path: "/conges",
    component: BodyView,
    children: [
      {
        path: "ajouter-conge",
        name: "AddCongePage",
        component: AddCongePage,
        meta: {
          title: 'Programmer un congé',
        }
      },
      {
        path: "edit-conge/:id",
        name: "EditCongePage",
        component: EditCongePage,
        meta: {
          title: 'Modifier un conge',
        }
      },
      {
        path: "liste-conge",
        name: "ListeCongePage",
        component: ListeCongePage,
        meta: {
          title: 'Liste des congés',
        }
      },
      {
        path: "calendrier",
        name: "ListeCongeCalendrierPage",
        component: ListeCongeCalendrierPage,
        meta: {
          title: 'Calendrier des congés',
        }
      },
    ]
  },
  {
    path: "/heureSups",
    component: BodyView,
    children: [
      {
        path: "ajouter-heureSupp",
        name: "AddHeureSuppPage",
        component: AddHeureSuppPage,
        meta: {
          title: 'Ajouter une heure supplémentaire',
        }
      },
      {
        path: "edit-heureSupp/:id",
        name: "EditHeureSuppPage",
        component: EditHeureSuppPage,
        meta: {
          title: 'Modifier une heure supplémentaire',
        }
      },
      {
        path: "liste-heureSupp",
        name: "ListeHeureSuppPage",
        component: ListeHeureSuppPage,
        meta: {
          title: 'Liste des heures supplémentaires',
        }
      },
    ]
  },
  {
    path: "/justificatifs",
    component: BodyView,
    children: [
      {
        path: "ajouter-justificatif",
        name: "AddJustificatifPage",
        component: AddJustificatifPage,
        meta: {
          title: 'Ajouter un justificatif',
        }
      },
      {
        path: "edit-justificatif/:id",
        name: "EditJustificatifPage",
        component: EditJustificatifPage,
        meta: {
          title: 'Modifier un justificatif',
        }
      },
      {
        path: "liste-justificatif",
        name: "ListeJustificatifPage",
        component: ListeJustificatifPage,
        meta: {
          title: 'Liste des justificatifs',
        }
      },
    ]
  },
  {
    path: "/permissionps",
    component: BodyView,
    children: [
      {
        path: "ajouter-permissionp",
        name: "AddPermissionPPage",
        component: AddPermissionPPage,
        meta: {
          title: 'Ajouter une permission',
        }
      },
      {
        path: "edit-permissionp/:id",
        name: "EditPermissionPPage",
        component: EditPermissionPPage,
        meta: {
          title: 'Modifier une demande de permission',
        }
      },
      {
        path: "liste-permissionp",
        name: "ListePermissionPPage",
        component: ListePermissionPPage,
        meta: {
          title: 'Liste des permissionps',
        }
      }
    ]
    },
      {
    path: "/demandes",
    component: BodyView,
    children: [
      {
        path: "ajouter-demande",
        name: "AddDemandePage",
        component: AddDemandePage,
        meta: {
          title: 'Ajouter une demande',
        }
      },
      {
        path: "ajouter-archivage/:id",
        name: "AddArchivagePage",
        component: AddArchivagePage,
        meta: {
          title: 'Archiver une demande',
        }
      },
      {
        path: "liste-demande-permission",
        name: "ListeDemandePermissionPage",
        component: ListeDemandePermissionPage,
        meta: {
          title: 'Liste des demandes de permission',
        }
      },
      {
        path: "liste-demande-pret",
        name: "ListeDemandePretPage",
        component: ListeDemandePretPage,
        meta: {
          title: 'Liste des demandes de pret',
        }
      },
      {
        path: "liste-demande-conge",
        name: "ListeDemandeCongePage",
        component: ListeDemandeCongePage,
        meta: {
          title: 'Liste des demandes de congé',
        }
      },
      {
        path: "liste-demande-attestation",
        name: "ListeDemandeAttestationPage",
        component: ListeDemandeAttestationPage,
        meta: {
          title: 'Liste des demandes d\'attestation',
        }
      },
      {
        path: "liste-demande-autre",
        name: "ListeDemandeAutrePage",
        component: ListeDemandeAutrePage,
        meta: {
          title: 'Liste des autres demandes',
        }
      },
      {
        path: "liste-demande-validation",
        name: "ListeValidationPage",
        component: ListeValidationPage,
        meta: {
          title: 'Liste des validations',
        }
      },
      {
        path: "ajouter-validation",
        name: "AddValidationPage",
        component: AddValidationPage,
        meta: {
          title: 'Ajouter validations',
        }
      },
      {
        path: "view-demande/:id",
        name: "ViewDemandePage",
        component: ViewDemandePage,
        meta: {
          title: 'Voir les détails',
        }
      },
      {
        path: "liste-demande",
        name: "ListeDemandePage",
        component: ListeDemandePage,
        meta: {
          title: 'Liste des demandes',
        }
      },
      {
        path: "edit-demande/:id",
        name: "EditDemandePage",
        component: EditDemandePage,
        meta: {
          title: 'Modifier une demande',
        }
      }
    ]
  },
  {
    path: "/presences",
    component: BodyView,
    children: [
      {
        path: "ajouter-presence",
        name: "AddPresencePage",
        component: AddPresencePage,
        meta: {
          title: 'Ajouter une présence',
        }
      },
      {
        path: "liste-presence",
        name: "ListePresencePage",
        component: ListePresencePage,
        meta: {
          title: 'Liste des présences',
        }
      },
      {
        path: "edit-presence/:id",
        name: "EditPresencePage",
        component: EditPresencePage,
        meta: {
          title: 'Modifier une présence',
        }
      }
    ]
  },
  {
    path: "/personnelles",
    component: BodyView,
    children: [
      {
        path: "ajouter-personnel",
        name: "AddPersonnellePage",
        component: AddPersonnellePage,
        meta: {
          title: 'Ajouter un personnel',
        }
      },
      {
        path: "liste-personnel",
        name: "ListePersonnelPage",
        component: ListePersonnellePage,
        meta: {
          title: 'Liste des personnels',
        },
      },

      {
        path: "view-personnel/:id",
        name: "ViewPersonnellePage",
        component: ViewPersonnellePage,
        meta: {
          title: 'Détail du personnel',
        }
      },
      {
        path: "edit-personnel/:id",
        name: "EditPersonnellePage",
        component: EditPersonnellePage,
        meta: {
          title: 'Modifier un personnel',
        }
      },
      {
        path: "edit-personnel2/:id",
        name: "EditPersonnellePage2",
        component: EditPersonnellePage2,
        meta: {
          title: 'Modifier un personnel',
        }
      }
    ]
  },

 
 
  {
    path: "/horaires",
    component: BodyView,
    children: [
      // {
      //   path: "ajouter-horaire",
      //   name: "AddHoraire",
      //   component: AddHorairePage,
      //   meta: {
      //     title: 'Ajouter un horaire',
      //   }
      // },
      {
        path: "liste-horaire",
        name: "ListeHoraire",
        component: ListeHorairePage,
        meta: {
          title: 'Liste des horaires',
        }
      },
      {
        path: "editer-horaire",
        name: "EditHoraire",
        component: EditHorairePage,
        meta: {
          title: 'Modifier un horaire',
        }
      },
    ]
  },

 
 
 
  {
    path: "/circuits",
    component: BodyView,
    children: [
      {
        path: "ajouter-circuit",
        name: "AddCircuitPage",
        component: AddCircuitPage,
        meta: {
          title: 'Ajouter un circuit',
        }
      },
      /*{
        path: "ajouter-circuitdemande",
        name: "AddCircuitDemandePage",
        component: AddCircuitDemandePage,
        meta: {
          title: 'Ajouter un circuit de demande',
        }
      },*/
      {
        path: "modifier-circuit/:id",
        name: "EditCircuitPage",
        component: EditCircuitPage,
        meta: {
          title: 'Modifier un ciruit',
        }
      },
      {
        path: "liste-circuits",
        name: "ListeCircuitPage",
        component: ListeCircuitPage,
        meta: {
          title: 'Liste des circuits',
        }
      },
      {
        path: "liste-circuits-demandes",
        name: "ListeCircuitDemandePage",
        component: ListeCircuitDemandePage,
        meta: {
          title: 'Liste des circuits de demande',
        }
      },


      {
        path: "view-circuit/:id",
        name: "ViewCircuit",
        component: ViewCircuitPage,
        meta: {
          title: 'Détails d\'un circuit',
        }
      },
    ]
  },
  /*{
    path: "/etapeValidations",
    component: BodyView,
    children: [
      {
        path: "ajouter-etapeValidations",
        name: "AddEtapeValidationPage",
        component: AddEtapeValidationPage,
        meta: {
          title: 'Ajouter une Etape Validation',
        }
      },
      {
        path: "modifier-etapeValidation/:id",
        name: "EditEtapeValidationPage",
        component: EditEtapeValidationPage,
        meta: {
          title: 'Modifier une Etape Validation',
        }
      },
      {
        path: "liste-etapeValidations",
        name: "ListeEtapeValidationPage",
        component: ListeEtapeValidationPage,
        meta: {
          title: 'Liste des etapes de Validations',
        }
      },
      {
        path: "view-etapeValidations/:id",
        name: "ViewEtapeValidationPage",
        component: ViewEtapeValidationPage,
        meta: {
          title: 'Détails Etape Validation',
        }
      }
    ]
  },*/
  {
    path: "/userEtapes",
    component: BodyView,
    children: [
      {
        path: "liste-userEtapes",
        name: "liste-userEtapes",
        component: ListeUserEtapesPage,
        meta: {
          title: 'Liste UserEtapes',
        }
      },
    ]
  },


  {
    path: "/roleetaps",
    component: BodyView,
    children: [
    

    /*  {
        path: "ajouter-roleetap",
        name: "AddRoleEtapPage",
        component: AddRoleEtapPage,
        meta: {
          title: 'Ajouter  roleetape',
        }
      },
        {
        path: "modifier-roleetap/:id",
        name: "EditRoleEtapPage",
        component: EditRoleEtapPage,
        meta: {
          title: 'Modifier role etape',
        }
      },*/
     
      {
        path: "liste-roleetaps",
        name: "ListeRoleEtapPage",
        component: ListeRoleEtapPage,
        meta: {
          title: 'Liste des roles etapes',
        }
      },
    ]
  },



  




 

 
 
 
 
  {
    path: "/societes",
    component: BodyView,
    children: [
      {
        path: "ajouter-societe",
        name: "AddSociete",
        component: AddSocietePage,
        meta: {
          title: 'Ajouter une société',
        }
      },
      {
        path: "modifier-societe/:id",
        name: "EditSociete",
        component: EditSocietePage,
        meta: {
          title: 'Modifier une société',
        }
      },
      {
        path: "liste-societes",
        name: "ListeSociete",
        component: ListeSocietePage,
        meta: {
          title: 'Liste des sociétés',
        }
      },
      {
        path: "view-societe/:id",
        name: "ViewSociete",
        component: ViewSocietePage,
        meta: {
          title: 'Détails d\'une société',
        }
      },
    ]
  },
  
  {
    path: "/banques",
    component: BodyView,
    children: [
      {
        path: "ajouter-banque",
        name: "AddBanque",
        component: AddBanquePage,
        meta: {
          title: 'Ajouter une banque',
        }
      },
      {
        path: "modifier-banque/:id",
        name: "EditBanque",
        component: EditBanquePage,
        meta: {
          title: 'Modifier une banque',
        }
      },
      {
        path: "liste-banques",
        name: "ListeBanque",
        component: ListeBanquePage,
        meta: {
          title: 'Liste des banques',
        }
      },
    ]
  },
  {
    path: "/details",
    component: BodyView,
    children: [
      {
        path: "voir-personnel",
        name: "PersonnelDetailsContent",
        component: PersonnelDetailsPage,
        meta: {
          title: 'Voir les détails du  personnel',
        }
      },
    ]},
  {
    path: "/personnelles",
    component: BodyView,
    children: [
      {
        path: "ajouter-personnel",
        name: "AddPersonnel",
        component: AddPersonnellePage,
        meta: {
          title: 'Ajouter un personnel',
        }
      }
    ],
    },
      {
        path: "/personnels",
        component: BodyView,
        children: [
          {
            path: "ajouter-personnel",
            name: "AddPersonnelNew",
            component: AddPersonnelNewPage,
            meta: {
              title: 'Ajouter un personnel',
            }
          },
          
      {
        path: "modifier-personnel/:id",
        name: "EditPersonnel",
        component: EditPersonnellePage,
        meta: {
          title: 'Modifier un personnel',
        }
      },
      
      /*{
        path: "view-personnel/:id",
        name: "ViewPersonnel",
        component: ViewPersonnellePage,
        meta: {
          title: 'Détails du personnel',
        }
      },*/
      {
        path: "liste-personnels",
        name: "ListePersonnel",
        component: ListePersonnellePage,
        meta: {
          title: 'Liste des personnels',
        }
      },
    ]
  },
  // {
  //   path: "/personnel-fonctions",
  //   component: BodyView,
  //   children: [
  //     {
  //       path: "ajouter-personnel-fonction",
  //       name: "AddPersonnelFonction",
  //       component: AddPersonnelFonctionPage,
  //       meta: {
  //         title: 'Ajouter une fonction de personnel',
  //       }
  //     },
  //     {
  //       path: "modifier-personnel-fonction/:id",
  //       name: "EditPersonnelFonction",
  //       component: EditPersonnelFonctionPage,
  //       meta: {
  //         title: 'Modifier une fonction de personnel',
  //       }
  //     },
  //     {
  //       path: "liste-personnel-fonctions",
  //       name: "ListePersonnelFonction",
  //       component: ListePersonnelFonctionPage,
  //       meta: {
  //         title: 'Liste des fonctions du personnel',
  //       }
  //     },
  //   ]
  // },
  {
    path: "/postes",
    component: BodyView,
    children: [
      {
        path: "liste-postes",
        name: "ListePoste",
        component: ListePostePage,
        meta: {
          title: 'Liste des postes',
        }
      },
    ]
  },
 

  
 



 
  
  {
    path: "/",
    component: BodyView,
    children: [
      {
        path: "/zones/liste-quartiers",
        name: "ListeQuartierPage",
        component: ListeQuartierPage,
        meta: {
          title: 'Liste des quartiers',
        }
      },
      
      {
        path: "/zones/liste-arrondissements",
        name: "ListeArrondissementPage",
        component: ListeArrondissementPage,
        meta: {
          title: 'Liste des arrondissements',
        }
      },
      {
        path: "/zones/liste-communes",
        name: "ListeCommunePage",
        component: ListeCommunePage,
        meta: {
          title: 'Liste des communes',
        }
      },
      {
        path: "/zones/liste-departements",
        name: "ListeDepartementPage",
        component: ListeDepartementPage,
        meta: {
          title: 'Liste des départements',
        }
      },
    ]
  },  
  
  

  {
    path: "/auth",
    component: AuthView,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginPage,
        meta: {
          title: 'RomasProgiciel - Connexion',
        }
      }
    ]
  },
  {
    path: "/dashboards",
    component: BodyView,
    children: [
      {
        path: "dashboard_default",
        name: "default",
        component: indexDefault,
        meta: {
          title: 'Dashboards | Mofi - Premium Vue Admin Template',
        }
      },
      {
        path: "dashboard_project",
        name: "project",
        component: indexProject,
        meta: {
          title: 'Dashboards CRM | Mofi - Premium Vue Admin Template',
        }
      },
    ]
  },
  {
    path: "/authentication/simple",
    name: "loginsimple",
    component: loginSimple,
    meta: {
      title: 'Login Simple | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/one",
    name: "loginimage",
    component: loginImage,
    meta: {
      title: 'Login Image | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/two",
    name: "loginImagetwo",
    component: loginImageTwo,
    meta: {
      title: 'Login Image Two | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/validate",
    name: "loginValidation",
    component: loginValidation,
    meta: {
      title: 'Login Validation | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/tooltip",
    name: "loginTooltip",
    component: loginTooltip,
    meta: {
      title: 'Login Tooltip | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/login/sweetalert",
    name: "loginSweetalert",
    component: loginSweetalert,
    meta: {
      title: 'Login Sweetalert | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/register/two",
    name: "registerImagetwo",
    component: registerImageTwo,
    meta: {
      title: 'Register Image Two | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/auth/register",
    name: "registerSimple",
    component: registerSimple,
    meta: {
      title: 'Register | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/register/one",
    name: "registerImage",
    component: registerImage,
    meta: {
      title: 'Register Image | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/unlock_user",
    name: "unlockUser",
    component: unlockUser,
    meta: {
      title: 'Unlock User | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/forget_password",
    name: "forgetPassword",
    component: forgetPassword,
    meta: {
      title: 'Forget Password | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/reset_password",
    name: "resetPassword",
    component: resetPassword,
    meta: {
      title: 'Reset Password | Mofi - Premium Vue Admin Template',
    }
  },
  {
    path: "/authentication/maintenance",
    name: "maintenanceView",
    component: maintenanceView,
    meta: {
      title: 'Maintenance | Mofi - Premium Vue Admin Template',
    }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (typeof (to.meta.title) === 'string') {
    document.title = to.meta.title;
  }
  ApiService.setHeader();
  const path = ['/auth/login', '/auth/register'];
  if (path.includes(to.path) || localStorage.getItem('user')) {
    //next('/auth/login');
    return next();
  }
  //next();
  next('/auth/login');
});

export default router
