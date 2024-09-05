import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
import ListeServicePage from "@/pages/Service/ListeServicePage.vue";
import ListeCategoriePage from "@/pages/GestionPersonnel/Categorie/ListeCategoriePage.vue";
import ListeFonctionPage from "@/pages/GestionPersonnel/Fonction/ListeFonctionPage.vue";
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
import EditPersonnelPage from '@/pages/GestionPersonnel/Personnels/EditPersonnelPage.vue'
import DetailsPersonnelPage from '@/pages/GestionPersonnel/Personnels/DetailsPersonnelPage.vue'
import AddTresoreriePage from '@/pages/GestionTresorerie/Tresorerie/AddTresoreriePage.vue'
import ListeTresoreriePage from '@/pages/GestionTresorerie/Tresorerie/ListeTresoreriePage.vue'
import EditTresoreriePage from '@/pages/GestionTresorerie/Tresorerie/EditTresoreriePage.vue'
import ListeTypeTresoreriePage from '@/pages/GestionTresorerie/TypeTresorerie/ListeTypeTresoreriePage.vue'
import AddTransfertPage from '@/pages/GestionTresorerie/Transfert/AddTransfertPage.vue'
import ListeTransfertPage from '@/pages/GestionTresorerie/Transfert/ListeTransfertPage.vue'
import EditTransfertPage from '@/pages/GestionTresorerie/Transfert/EditTransfertPage.vue'
import AddFinancePage from '@/pages/GestionTresorerie/Finance/AddFinancePage.vue'
import ListeFinancePage from '@/pages/GestionTresorerie/Finance/ListeFinancePage.vue'
import EditFinancePage from '@/pages/GestionTresorerie/Finance/EditFinancePage.vue'
import AddOuvFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/AddOuvFerPage.vue'
import AddFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/AddFerPage.vue'
import ListeOuvFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/ListeOuvFerPage.vue'
import EditOuvFerPage from '@/pages/GestionTresorerie/Ouverture_Fermeture/EditOuvFerPage.vue'
import ListeMonnaiePage from '@/pages/GestionTresorerie/Monnaie/ListeMonnaiePage.vue'
import ListeUserComptePage from '@/pages/GestionTresorerie/UserCompte/ListeUserComptePage.vue'
import AddBienPage from "@/pages/GestionImmobilisation/Bien/AddBienPage.vue";
import EditBienPage from "@/pages/GestionImmobilisation/Bien/EditBienPage.vue";
import ListeBienPage from "@/pages/GestionImmobilisation//Bien/ListeBienPage.vue";
//import AddFournisseurPage from "@/pages/GestionImmobilisation/Fournisseur/AddFournisseurPage.vue";
//import EditFournisseurPage from "@/pages/GestionImmobilisation/Fournisseur/EditFournisseurPage.vue";
//import ListeFournisseurPage from "@/pages/GestionImmobilisation/Fournisseur/ListeFournisseurPage.vue";
import AddMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/AddMouvementBienPage.vue";
import EditMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/EditMouvementBienPage.vue";
import ListeMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/ListeMouvementBienPage.vue";
import AddAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/AddAmortissementPage.vue";
import EditAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/EditAmortissementPage.vue";
import ListeAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/ListeAmortissementPage.vue";
import ListeCategorieBienPage from "@/pages/GestionImmobilisation/CategorieBien/ListeCategorieBienPage.vue";
import ListeTypeBienPage from "@/pages/GestionImmobilisation/TypeBien/ListeTypeBienPage.vue";
import TableauAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/TableauAmortissementPage.vue";

//Gescom

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
import ListeMagasinPage from "@/pages/GesCom/Magasin/ListeMagasinPage.vue";
// import AddTransfertPage from "@/pages/GesCom/Transfert/AddTransfertPage.vue";
// import EditTransfertPage from "@/pages/GesCom/Transfert/EditTransfertPage.vue";
// import ListeTransfertPage from "@/pages/GesCom/Transfert/ListeTransfertPage.vue";
import AddInventairePage from "@/pages/GesCom/Inventaire/AddInventairePage.vue";
import ListeInventairePage from "@/pages/GesCom/Inventaire/ListeInventairePage.vue";
import ListeAdresseLivraisonPage from "@/pages/GesCom/AdresseLivraison/ListeAdresseLivraisonPage.vue";
import AddCommandeFournisseurPage from "@/pages/GesCom/CommandeFournisseur/AddCommandeFournisseurPage.vue";
import ListeCommandeFournisseurPage from "@/pages/GesCom/CommandeFournisseur/ListeCommandeFournisseurPage.vue";
import AddApprovisionnementPage from "@/pages/GesCom/Approvisionnement/AddApprovisionnementPage.vue";
import ListeApprovisionnementPage from "@/pages/GesCom/Approvisionnement/ListeApprovisionnementPage.vue";
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
import ListePersonnellePage from "@/pages/GesCom/Personnel/ListePersonnellePage.vue";
import ViewPersonnellePage from "@/pages/GesCom/Personnel/ViewPersonnellePage.vue";
// import ListeFonctionPage from "@/pages/GesCom/Fonction/ListeFonctionPage.vue";
import AddPersonnelFonctionPage from "@/pages/GesCom/PersonnelFonction/AddPersonnelFonctionPage.vue";
import EditPersonnelFonctionPage from "@/pages/GesCom/PersonnelFonction/EditPersonnelFonctionPage.vue";
import ListePersonnelFonctionPage from "@/pages/GesCom/PersonnelFonction/ListePersonnelFonctionPage.vue";
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
import ListeFactureProformaPage from "@/pages/GesCom/FactureProforma/ListeFactureProformaPage.vue";
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

//Etats
import EtatProduitsDisponibles from "@/pages/GesCom/Etats/EtatProduitsDisponibles.vue";
import EtatProduitsRupturePage from "@/pages/GesCom/Etats/EtatProduitsRupturePage.vue";
import EtatPointCommandePage from "@/pages/GesCom/Etats/EtatPointCommandePage.vue";
import EtatProduitsEntreePage from "@/pages/GesCom/Etats/EtatProduitsEntreePage.vue";
import EtatProduitsSortiesPage from "@/pages/GesCom/Etats/EtatProduitsSortiesPage.vue";
import AddGroupeTaxePage from "@/pages/GesCom/GroupeTaxe/AddGroupeTaxePage.vue";
import EtatPointVentePage from "@/pages/GesCom/Etats/EtatPointVentePage.vue";
import EtatPointProduitLivraisonPage from "@/pages/GesCom/Etats/EtatPointProduitLivraisonPage.vue";
import EtatNombreProduitVenduPage from "@/pages/GesCom/Etats/EtatNombreProduitVenduPage.vue";
import EtatChiffreAffaireClientPage from "@/pages/GesCom/Etats/EtatChiffreAffaireClientPage.vue";
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
import AddPaiePage from "@/pages/GestionPaie/Paie/AddPaiePage.vue";
import ListePaiePage from "@/pages/GestionPaie/Paie/ListePaiePage.vue";
import AddProcessusPage from "@/pages/GestionPaie/Processus/AddProcessusPage.vue";
import ListeProcessusPage from "@/pages/GestionPaie/Processus/ListeProcessusPage.vue";
import PersonnelDetailsPage from '@/pages/GesCom/Personnel/PersonnelDetailsPage.vue';

// Gestion Pack

import ListeTypeEntretienPage from "@/pages/GestionPack/TypeEntretien/ListeTypeEntretienPage.vue";
import ListePackingPage from '@/pages/GestionPack/Packing/ListePackingPage.vue';
import ListeTypeMoyenRoulantPage from '@/pages/GestionPack/TypeMoyenRoulant/ListeTypeMoyenRoulantPage.vue';
import ListeCoursePage from '@/pages/GestionPack/Course/ListeCoursePage.vue';
import AddCoursePage from '@/pages/GestionPack/Course/AddCoursePage.vue';
import EditCoursePage from '@/pages/GestionPack/Course/EditCoursePage.vue';
import ListePannePage from '@/pages/GestionPack/Panne/ListePannePage.vue';
import ListeEntretienPage from '@/pages/GestionPack/Entretien/ListeEntretienPage.vue';
import AddEntretienPage from '@/pages/GestionPack/Entretien/AddEntretienPage.vue';
import EditEntretienPage from '@/pages/GestionPack/Entretien/EditEntretienPage.vue';
import AddPlanificationReparationPage from '@/pages/GestionPack/PlanificationReparation/AddPlanificationReparationPage.vue';
import EditPlanificationReparationPage from '@/pages/GestionPack/PlanificationReparation/EditPlanificationReparationPage.vue';
import ListePlanificationReparationPage from '@/pages/GestionPack/PlanificationReparation/ListePlanificationReparationPage.vue';


// Gestion Depenses
import AddDepensesPage from '@/components/GestionDepenses/Depenses/AddDepenses.vue';
import EditDepensesPage from '@/components/GestionDepenses/Depenses/EditDepenses.vue';
import ListeDepensesPage from '@/components/GestionDepenses/Depenses/ListeDepenses.vue';
import ListeTypesDepensesPage from '@/components/GestionDepenses/TypesDepenses/ListeTypesDepenses.vue'
import ListeCategoriesDepensesPage from '@/components/GestionDepenses/CategoriesDepenses/ListeCategoriesDepenses.vue'

// Gestion Archivages

<<<<<<< HEAD
import ListeCategorieDocumentPage from '@/components/GestionArchivages/CategorieDocument/ListeCategorieDocument.vue';
import ListeTypeDocumentPage from '@/components/GestionArchivages/TypeDocument/ListeTypeDocument.vue';
import ListeTypeEmplacementPage from '@/components/GestionArchivages/TypeEmplacement/ListeTypeEmplacement.vue';
import ListeRegleConservationPage from '@/components/GestionArchivages/RegleConservation/ListeRegleConservation.vue';
=======
import ListeCategorieDocumentPage from '@/components/GestionArchivages/CategorieDocument/ListeCategorieDocument.vue'
import ListeTypeDocumentPage from '@/components/GestionArchivages/TypeDocument/ListeTypeDocument.vue'
import ListeTypeEmplacementPage from '@/components/GestionArchivages/TypeEmplacement/ListeTypeEmplacement.vue'
import ListeRegleConservationPage from '@/components/GestionArchivages/RegleConservation/ListeRegleConservation.vue'
>>>>>>> d5bd425a8514f4e685a92ddf6973968c3cb8249f
import ListeFormatPage from "@/pages/GestionArchive/Format/ListeFormatPage.vue";
import ListeTagPage from "@/pages/GestionArchive/Tag/ListeTagPage.vue";
import ListeEmplacementPage from "@/pages/GestionArchive/Emplacement/ListeEmplacementPage.vue";
import ListeOrganisationPage from "@/pages/GestionArchive/Organisation/ListeOrganisationPage.vue";
import ListeTypeOrganisationPage from "@/pages/GestionArchive/TypeOrganisation/ListeTypeOrganisationPage.vue";
import AddDocumentPage from "@/pages/GestionArchive/Document/AddDocumentPage.vue";
import ListeDocumentPage from "@/pages/GestionArchive/Document/ListeDocumentPage.vue";



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
  {
    path: "/TypeEntretien",
    component: BodyView,
    children: [
      {
        path: "listeTypeEntretien",
        name: "listeTypeEntretien",
        component: ListeTypeEntretienPage,
        meta: {
          title: 'Liste Type Entretien',
        }
      },
    ]
  },

  {
    path: "/TypeMoyenRoulant",
    component: BodyView,
    children: [
      {
        path: "listeTypeMoyenRoulant",
        name: "listeTypeMoyenRoulant",
        component: ListeTypeMoyenRoulantPage,
        meta: {
          title: 'Liste Type Moyen Roulant',
        }
      },
    ]
  },
  {
    path: "/Packing",
    component: BodyView,
    children: [
      {
        path: "listePacking",
        name: "listePacking",
        component: ListePackingPage,
        meta: {
          title: 'Liste Packing',
        }
      },
    ]
  },
  {
    path: "/Depenses",
    component: BodyView,
    children: [
      {
        path: "ajouter-depenses",
        name: "AddDepenses",
        component: AddDepensesPage,
        meta: {
          title: 'ajouter depenses',
        }
      },
      {
        path: "editer-depenses",
        name: "EditDepenses",
        component: EditDepensesPage,
        meta: {
          title: 'editer une depense',
        }
      },
      {
        path: "liste-depenses",
        name: "ListeDepenses",
        component: ListeDepensesPage,
        meta: {
          title: 'Liste des depenses',
        }
      },
    ]
  },
  {
    path: "/typesDepenses",
    component: BodyView,
    children: [
      {
        path: "liste-typesdepenses",
        name: "ListeTypesDepenses",
        component: ListeTypesDepensesPage,
        meta: {
          title: 'ajouter un type de depense',
        }
      },
    ]
  },
  
  {
    path: "/categoriesDepenses",
    component: BodyView,
    children: [
      {
        path: "liste-categoriesdepenses",
        name: "ListeCategorliesDepenses",
        component: ListeCategoriesDepensesPage,
        meta: {
          title: 'Ajouter une categorie de depense',
        }
      },
    ]
  },
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
    ]
  },
      {
        path: "/paies",
        component: BodyView,
        children: [
          {
            path: "ajouter-paie",
            name: "AddPaie",
            component: AddPaiePage,
            meta: {
              title: 'Ajouter une paie',
            }
          },
          {
            path: "liste-paies",
            name: "ListePaie",
            component: ListePaiePage,
            meta: {
              title: 'Liste des financements',
            },
          }
        ]
      },
      {
        path: "/processus",
        component: BodyView,
        children: [
          {
            path: "ajouter-processus",
            name: "AddProcessus",
            component: AddProcessusPage,
            meta: {
              title: 'Ajouter un processus',
            }
          },
          {
            path: "liste-processus",
            name: "ListeProcessus",
            component: ListeProcessusPage,
            meta: {
              title: 'Liste des processus',
            },
          }
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
    path: "/pannes",
    component: BodyView,
    children: [
      
      {
        path: "liste-panne",
        name: "ListePannePage",
        component: ListePannePage,
        meta: {
          title: 'Liste des pannes',
        }
      }
    ]
  },
  {
    path: "/courses",
    component: BodyView,
    children: [
       {
         path: "ajouter-course",
         name: "AddCoursePage",
         component: AddCoursePage,
        meta: {
          title: 'Ajouter une course',
       }
      },
      {
        path: "editer-course",
        name: "EditCoursePage",
        component: EditCoursePage,
       meta: {
         title: 'Editer une course',
      }
     },
      {
        path: "liste-courses",
        name: "ListeCoursePage",
        component: ListeCoursePage,
        meta: {
          title: 'Liste des courses',
        }
      }
    ]
  },
  {
    path: "/planificationReparations",
    component: BodyView,
    children: [
       {
         path: "ajouter-planificationReparation",
         name: "AddPlanificationReparationPage",
         component: AddPlanificationReparationPage,
        meta: {
          title: 'Ajouter une planification de réparation',
       }
      },
      {
        path: "editer-planificationReparation",
        name: "EditPlanificationReparationPage",
        component: EditPlanificationReparationPage,
       meta: {
         title: 'Editer une planification de réparation',
      }
     },
      {
        path: "liste-planificationReparations",
        name: "ListePlanificationReparationPage",
        component: ListePlanificationReparationPage,
        meta: {
          title: 'Liste des planifications de réparation',
        }
      }
    ]
  },
  {
    path: "/entretiens",
    component: BodyView,
    children: [
       {
         path: "ajouter-entretien",
         name: "AddEntretienPage",
         component: AddEntretienPage,
        meta: {
          title: 'Ajouter un entretien',
       }
      },
      {
        path: "editer-entretien",
        name: "EditEntretienPage",
        component: EditEntretienPage,
       meta: {
         title: 'Editer un entretien',
      }
     },
      {
        path: "liste-entretiens",
        name: "ListeEntretienPage",
        component: ListeEntretienPage,
        meta: {
          title: 'Liste des entretiens',
        }
      }
    ]
  },

  {
    path: "/typeContrats",
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
    path: "/formats",
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
        path: "liste-format",
        name: "ListeFormatPage",
        component: ListeFormatPage,
        meta: {
          title: 'Liste des formats',
        }
      }
    ]
  },
  {
    path: "/tags",
    component: BodyView,
    children: [
     
      {
        path: "liste-tag",
        name: "ListeTagPage",
        component: ListeTagPage,
        meta: {
          title: 'Liste des tags',
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
    path: "/documents",
    component: BodyView,
    children: [
       {
       path: "ajouter-document",
         name: "AddDocumentPage",
         component: AddDocumentPage,
         meta: {
           title: 'Ajouter un document',
        }
       },
      {
        path: "liste-document",
        name: "ListeDocumentPage",
        component: ListeDocumentPage,
        meta: {
          title: 'Liste des documents',
        }
      }
    ]
  },
  {
    path: "/emplacements",
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
        path: "liste-emplacement",
        name: "ListeEmplacementPage",
        component: ListeEmplacementPage,
        meta: {
          title: 'Liste des emplacements',
        }
      }
    ]
  },
  
  {
    path: "/modeTarifications",
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
        path: "liste-modeTarification",
        name: "ListeModeTarificationPage",
        component: ListeModeTarificationPage,
        meta: {
          title: 'Liste des modes de tarifications',
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
    path: "/biens",
    component: BodyView,
    children: [
      {
        path: "ajouter-bien",
        name: "AddBien",
        component: AddBienPage,
        meta: {
          title: 'Ajouter un bien',
        }
      },
      {
        path: "liste-biens",
        name: "ListeBien",
        component: ListeBienPage,
        meta: {
          title: 'Liste des biens',
        }
      },
      {
        path: "tableau-amortissements/:id",
        name: "TableauAmortissement",
        component: TableauAmortissementPage,
        meta: {
          title: 'Tableau des amortissements',
        }
      },
      {
        path: "edit-bien/:id",
        name: "EditBien",
        component: EditBienPage,
        meta: {
          title: 'Modifier un bien',
        }
      }
      // {
      //   path: "view-utilisateur/:id",
      //   name: "ViewUser",
      //   component: ViewUserPage,
      //   meta: {
      //     title: 'Détails d\'un utilisateur',
      //   }
      // },
    ]
  },
  {
    path: "/amortissements",
    component: BodyView,
    children: [
      {
        path: "ajouter-amortissement",
        name: "AddAmortissement",
        component: AddAmortissementPage,
        meta: {
          title: 'Ajouter un amortissement',
        }
      },
      {
        path: "liste-amortissements",
        name: "ListeAmortissement",
        component: ListeAmortissementPage,
        meta: {
          title: 'Liste des amortissements',
        }
      },
      {
        path: "edit-amortissement/:id",
        name: "EditAmortissement",
        component: EditAmortissementPage,
        meta: {
          title: 'Modifier un amortissement',
        }
      },
    ]
    },
    {
      path: "/mouvementBiens",
      component: BodyView,
      children: [
      {
          path: "ajouter-mouvementbien/:id",
          name: "AddMouvementBien",
          component: AddMouvementBienPage,
          meta: {
            title: 'Ajouter un mouvement',
          }
        },
        {
          path: "liste-mouvementbiens",
          name: "ListeMouvementBien",
          component: ListeMouvementBienPage,
          meta: {
            title: 'Liste des mouvements',
          }
        },
        {
          path: "edit-mouvementBien/:id",
          name: "EditMouvementBien",
          component: EditMouvementBienPage,
          meta: {
            title: 'Modifier un mouvement',
          }
        },
      ]
      },

      {
        path: "/fournisseurs",
        component: BodyView,
        children: [
          {
            path: "ajouter-fournisseur",
            name: "AddFournisseur",
            component: AddFournisseurPage,
            meta: {
              title: 'Ajouter un fournisseur',
            }
          },
          {
            path: "liste-fournisseurs",
            name: "ListeFournisseur",
            component: ListeFournisseurPage,
            meta: {
              title: 'Liste des fournisseurs',
            }
          },
          {
            path: "edit-fournisseur/:id",
            name: "EditFournisseur",
            component: EditFournisseurPage,
            meta: {
              title: 'Modifier un fournisseur',
            }
          },
        ]
        },
  
        {
          path: "/categorieBiens",
          component: BodyView,
          children: [
            {
              path: "liste-categorieBiens",
              name: "ListeCategorieBien",
              component: ListeCategorieBienPage,
              meta: {
                title: 'Liste des catégories de biens',
              }
            },
          ]
          },

          {
            path: "/typeBiens",
            component: BodyView,
            children: [
              
              {
                path: "liste-typebiens",
                name: "ListeTypeBien",
                component: ListeTypeBienPage,
                meta: {
                  title: 'Liste des types de biens',
                }
              },
              
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
    path: "/services",
    component: BodyView,
    children: [
      {
        path: "liste-service",
        name: "ListeServicePage",
        component: ListeServicePage,
        meta: {
          title: 'Liste des services',
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
    path: "/fonctions",
    component: BodyView,
    children: [
      {
        path: "liste-fonction",
        name: "ListeFonctionPage",
        component: ListeFonctionPage,
        meta: {
          title: 'Liste des fonctions',
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
    ]
  },
  {
    path: "/heureSupps",
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
        children: [
          {
            path: ':id',
            name: 'id',
            component: ViewPersonnellePage,
            meta: {
              title: 'Details du personnel',
            }
          }
        ]
      },
      {
        path: "edit-personnel/:id",
        name: "EditPersonnellePage",
        component: EditPersonnellePage,
        meta: {
          title: 'Modifier un personnel',
        }
      }
    ]
  },

  {
    path: "/tresoreries",
    component: BodyView,
    children: [
      {
        path: "ajouter-tresorerie",
        name: "AddTresoreriePage",
        component: AddTresoreriePage,
        meta: {
          title: 'Ajouter une tresorerie',
        }
      },
      {
        path: "liste-tresorerie",
        name: "ListeTresoreriePage",
        component: ListeTresoreriePage,
        meta: {
          title: 'Liste des tresoreries',
        },
      },
      {
        path: "edit-tresorerie/:id",
        name: "EditTresoreriePage",
        component: EditTresoreriePage,
        meta: {
          title: 'Modifier une tresorerie',
        }
      }
    ]
  },

  {
    path: "/typeTresoreries",
    component: BodyView,
    children: [
      {
        path: "liste-typeTresorerie",
        name: "ListeTypeTresoreriePage",
        component: ListeTypeTresoreriePage,
        meta: {
          title: 'Liste des types de trésorerie',
        }
      },
    ]
  },

  {
    path: "/transferts",
    component: BodyView,
    children: [
      {
        path: "ajouter-transfert",
        name: "AddTransfertPage",
        component: AddTransfertPage,
        meta: {
          title: 'Faire un transfert',
        }
      },
      {
        path: "liste-transfert",
        name: "ListeTransfertPage",
        component: ListeTransfertPage,
        meta: {
          title: 'Liste des transferts',
        },
      },
      {
        path: "edit-transfert/:id",
        name: "EditTransfertPage",
        component: EditTransfertPage,
        meta: {
          title: 'Modifier un transfert',
        }
      }
    ]
  },

  {
    path: "/finances",
    component: BodyView,
    children: [
      {
        path: "ajouter-finance",
        name: "AddFinancePage",
        component: AddFinancePage,
        meta: {
          title: 'Faire un financement',
        }
      },
      {
        path: "liste-finance",
        name: "ListeFinancePage",
        component: ListeFinancePage,
        meta: {
          title: 'Liste des financements',
        },
      },
      {
        path: "edit-finance/:id",
        name: "EditFinancePage",
        component: EditFinancePage,
        meta: {
          title: 'Modifier un financement',
        }
      }
    ]
  },

  {
    path: "/monnaies",
    component: BodyView,
    children: [
      {
        path: "liste-monnaie",
        name: "ListeMonnaiePage",
        component: ListeMonnaiePage,
        meta: {
          title: 'Liste des monnaies',
        }
      },
    ]
  },

  {
    path: "/userComptes",
    component: BodyView,
    children: [
      {
        path: "liste-userCompte",
        name: "ListeUserComptePage",
        component: ListeUserComptePage,
        meta: {
          title: 'Liste des compte de trésorerie',
        }
      },
    ]
  },

  {
    path: "/ventes",
    component: BodyView,
    children: [
      {
        path: "ajouter-vente",
        name: "AddVente",
        component: AddVentePage,
        meta: {
          title: 'Ajouter une vente',
        }
      },
      {
        path: "liste-ventes",
        name: "ListeVente",
        component: ListeVentePage,
        meta: {
          title: 'Liste des ventes',
        }
      }
    ]
  },

  {
    path: "/familles",
    component: BodyView,
    children: [
      {
        path: "liste-familles",
        name: "ListeFamille",
        component: ListeFamillePage,
        meta: {
          title: 'Liste des familles',
        }
      },
    ]
  },
  {
    path: "/etats",
    component: BodyView,
    children: [
      {
        path: "produits-disponibles",
        name: "EtatProduitsDisponibles",
        component: EtatProduitsDisponibles,
        meta: {
          title: 'Liste des produits disponibles',
        }
      },
      {
        path: "produits-livres",
        name: "EtatPointProduitLivraisonPage",
        component: EtatPointProduitLivraisonPage,
        meta: {
          title: 'Liste des produits livrés',
        }
      },
      {
        path: "etat-nmbre-pro",
        name: "EtatNombreProduitVenduPage",
        component: EtatNombreProduitVenduPage,
        meta: {
          //Nombre du produit(parceque c'est le nombre de ce produit il faut) vendus par période
          title: 'Nombre du produits vendus par période',
        }
      },
      {
        path: "ca-client",
        name: "EtatChiffreAffaireClientPage",
        component: EtatChiffreAffaireClientPage,
        meta: {
          title: `Chiffre d'affaire par cient`,
        }
      },
      {
        path: "produits-vendus",
        name: "EtatPointVentePage",
        component: EtatPointVentePage,
        meta: {
          title: 'Liste des produits en vendus',
        }
      },
      {
        path: "produits-rupture",
        name: "EtatProduitsRupturePage",
        component: EtatProduitsRupturePage,
        meta: {
          title: 'Liste des produits en rupture de stock',
        }
      },
      {
        path: "point-commande",
        name: "EtatPointCommandePage",
        component: EtatPointCommandePage,
        meta: {
          title: 'Liste du point des commandes',
        }
      },
      {
        path: "etat-produits-entree",
        name: "EtatProduitsEntreePage",
        component: EtatProduitsEntreePage,
        meta: {
          title: 'Liste des produits entrées',
        }
      },
      {
        path: "etats-produits-sorties",
        name: "EtatProduitsSortiesPage",
        component: EtatProduitsSortiesPage,
        meta: {
          title: 'Liste des produits sorties',
        }
      },
    ]
  },
  {
    path: "/medias",
    component: BodyView,
    children: [
      {
        path: "ajouter-media",
        name: "AddMedia",
        component: AddMediaPage,
        meta: {
          title: 'Ajouter un média',
        }
      },
      {
        path: "modifier-media/:id",
        name: "EditMedia",
        component: EditMediaPage,
        meta: {
          title: 'Modifier un média',
        }
      },
      {
        path: "liste-medias",
        name: "ListeMedia",
        component: ListeMediaPage,
        meta: {
          title: 'Liste des médias',
        }
      },
    ]
  },
  {
    path: "/produits",
    component: BodyView,
    children: [
      {
        path: "ajouter-produit",
        name: "AddProduit",
        component: AddProduitPage,
        meta: {
          title: 'Ajouter un produit',
        }
      },
      {
        path: "modifier-produit/:id",
        name: "EditProduit",
        component: EditProduitPage,
        meta: {
          title: 'Modifier un produit',
        }
      },
      {
        path: "view-produit/:id",
        name: "ViewProduit",
        component: ViewProduitPage,
        meta: {
          title: 'Détails d\'un produit',
        }
      },
      {
        path: "liste-produits",
        name: "ListeProduit",
        component: ListeProduitPage,
        meta: {
          title: 'Liste des produits',
        }
      },
    ]
  },
  {
    path: "/clients",
    component: BodyView,
    children: [
      {
        path: "ajouter-client",
        name: "AddClient",
        component: AddClientPage,
        meta: {
          title: 'Ajouter un client',
        }
      },
      {
        path: "modifier-client/:id",
        name: "EditClient",
        component: EditClientPage,
        meta: {
          title: 'Modifier un client',
        }
      },
      {
        path: "liste-clients",
        name: "ListeClient",
        component: ListeClientPage,
        meta: {
          title: 'Liste des clients',
        }
      },
      {
        path: "view-client/:id",
        name: "ViewClient",
        component: ViewClientPage,
        meta: {
          title: 'Détails d\'un client',
        }
      },
    ]
  },
  {
    path: "/commande-fournisseurs",
    component: BodyView,
    children: [
      {
        path: "liste-commande-fournisseurs",
        name: "ListeCommandeFournisseur",
        component: ListeCommandeFournisseurPage,
        meta: {
          title: 'Liste des commandes fournisseurs',
        }
      },
      {
        path: "ajouter-commande-fournisseur",
        name: "AddCommandeFournisseur",
        component: AddCommandeFournisseurPage,
        meta: {
          title: 'Ajouter une commande fournisseur',
        }
      },
    ]
  },
  {
    path: "/caisses",
    component: BodyView,
    children: [
      {
        path: "ajouter-caisse",
        name: "AddCaisse",
        component: AddCaissePage,
        meta: {
          title: 'Ajouter une caisse',
        }
      },
      {
        path: "modifier-caisse/:id",
        name: "EditCaisse",
        component: EditCaissePage,
        meta: {
          title: 'Modifier une caisse',
        }
      },
      {
        path: "liste-caisses",
        name: "ListeCaisse",
        component: ListeCaissePage,
        meta: {
          title: 'Liste des caisses',
        }
      },
    ]
  },
  {
    path: "/suivi-stock",
    component: BodyView,
    children: [
      {
        path: "liste-suivi-stock",
        name: "ListeSuiviStock",
        component: ListeSuiviStockPage,
        meta: {
          title: 'Liste de suivi de stock',
        }
      },
    ]
  },
  {
    path: "/fournisseurs",
    component: BodyView,
    children: [
      {
        path: "ajouter-fournisseur",
        name: "AddFournisseur",
        component: AddFournisseurPage,
        meta: {
          title: 'Ajouter un fournisseur',
        }
      },
      {
        path: "modifier-fournisseur/:id",
        name: "EditFournisseur",
        component: EditFournisseurPage,
        meta: {
          title: 'Modifier un fournisseur',
        }
      },
      {
        path: "view-fournisseur/:id",
        name: "ViewFournisseur",
        component: ViewFournisseurPage,
        meta: {
          title: 'Détails d\'un fournisseur',
        }
      },
      {
        path: "liste-fournisseurs",
        name: "ListeFournisseur",
        component: ListeFournisseurPage,
        meta: {
          title: 'Liste des fournisseurs',
        }
      },
    ]
  },
  {
    path: "/produit-conditionnes",
    component: BodyView,
    children: [
      {
        path: "ajouter-produit-conditionne",
        name: "AddProduitConditionne",
        component: AddProduitConditionnePage,
        meta: {
          title: 'Ajouter un produit conditionné',
        }
      },
      {
        path: "modifier-produit-conditionne/:id",
        name: "EditProduitConditionne",
        component: EditProduitConditionnePage,
        meta: {
          title: 'Modifier un produit conditionné',
        }
      },
      {
        path: "liste-produit-conditionnes",
        name: "ListeProduitConditionne",
        component: ListeProduitConditionnePage,
        meta: {
          title: 'Liste des produits conditionnés',
        }
      },
    ]
  },
  {
    path: "/magasins",
    component: BodyView,
    children: [
      {
        path: "liste-magasins",
        name: "ListeMagasin",
        component: ListeMagasinPage,
        meta: {
          title: 'Liste des magasins',
        }
      },
    ]
  },
  {
    path: "/transferts",
    component: BodyView,
    children: [
      {
        path: "ajouter-transfert",
        name: "AddTransfert",
        component: AddTransfertPage,
        meta: {
          title: 'Ajouter un transfert',
        }
      },
      {
        path: "modifier-transfert/:id",
        name: "EditTransfert",
        component: EditTransfertPage,
        meta: {
          title: 'Modifier un transfert',
        }
      },
      {
        path: "liste-transferts",
        name: "ListeTransfert",
        component: ListeTransfertPage,
        meta: {
          title: 'Liste des transferts',
        }
      },
    ]
  },
  {
    path: "/monaies",
    component: BodyView,
    children: [
      {
        path: "liste-monnaies",
        name: "ListeMonaie",
        component: ListeMonaiePage,
        meta: {
          title: 'Liste des monnaies',
        }
      },
    ]
  },
  {
    path: "/inventaires",
    component: BodyView,
    children: [
      {
        path: "ajouter-inventaire",
        name: "AddInventaire",
        component: AddInventairePage,
        meta: {
          title: 'Ajouter un inventaire',
        }
      },
      {
        path: "liste-inventaires",
        name: "ListeInventaire",
        component: ListeInventairePage,
        meta: {
          title: 'Liste des inventaires',
        }
      },
    ]
  },
  {
    path: "/conditionnements",
    component: BodyView,
    children: [
      {
        path: "liste-conditionnements",
        name: "ListeConditionnement",
        component: ListeConditionnementPage,
        meta: {
          title: 'Liste des conditionnements',
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
        path: "/tests",
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
      
      {
        path: "view-personnel/:id",
        name: "ViewPersonnel",
        component: ViewPersonnellePage,
        meta: {
          title: 'Détails du personnel',
        }
      },
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
    path: "/fonctions",
    component: BodyView,
    children: [
      {
        path: "liste-fonctions",
        name: "ListeFonction",
        component: ListeFonctionPage,
        meta: {
          title: 'Liste des fonctions',
        }
      },
    ]
  },
  {
    path: "/adresse-livraisons",
    component: BodyView,
    children: [
      {
        path: "liste-adresse-livraisons",
        name: "ListeAdresseLivraison",
        component: ListeAdresseLivraisonPage,
        meta: {
          title: 'Liste des adresses de livraison',
        }
      },
    ]
  },
  {
    path: "/taxes",
    component: BodyView,
    children: [
      {
        path: "liste-taxes",
        name: "ListeTaxe",
        component: ListeTaxePage,
        meta: {
          title: 'Liste des taxes',
        }
      },
      {
        path: "liste-type-taxes",
        name: "ListeTypeTaxe",
        component: ListeTypeTaxePage,
        meta: {
          title: 'Liste des types de taxes',
        }
      },
    ]
  },
  {
    path: "/type-operations",
    component: BodyView,
    children: [
      {
        path: "liste-type-operations",
        name: "ListeTypeOperation",
        component: ListeTypeOperationPage,
        meta: {
          title: 'Liste des types d\'opérations',
        }
      },
    ]
  },
  {
    path: "/type-depenses",
    component: BodyView,
    children: [
      {
        path: "liste-type-depenses",
        name: "ListeTypeDepense",
        component: ListeTypeDepensePage,
        meta: {
          title: 'Liste des types de dépenses',
        }
      },
    ]
  },

  {
    path: "/categoriedocument",
    component: BodyView,
    children: [
      {
        path: "liste-categoriedocument",
        name: "ListeCategorieDocument",
        component: ListeCategorieDocumentPage,
        meta: {
          title: 'Liste des categories documents',
        }
      },
    ]
  },
  {
    path: "/typedocument",
    component: BodyView,
    children: [
      {
        path: "liste-typedocument",
        name: "ListeTypeDocument",
        component: ListeTypeDocumentPage,
        meta: {
          title: 'Liste des types documents',
        }
      },
    ]
  },
  {
    path: "/typeemplacement",
    component: BodyView,
    children: [
      {
        path: "liste-typeemplacement",
        name: "ListeTypeEmplacement",
        component: ListeTypeEmplacementPage,
        meta: {
          title: 'Liste des types emplacements',
        }
      },
    ]
  },
  {
    path: "/regleconservation",
    component: BodyView,
    children: [
      {
        path: "liste-regleconservation",
        name: "ListeRegleConservation",
        component: ListeRegleConservationPage,
        meta: {
          title: 'Liste des regles conservations',
        }
      },
    ]
  },
  {
    path: "/point-ventes",
    component: BodyView,
    children: [
      {
        path: "ajouter-point-vente",
        name: "AddPointVente",
        component: AddPointVentePage,
        meta: {
          title: 'Ajouter un point de vente',
        }
      },
      {
        path: "modifier-point-vente/:id",
        name: "EditPointVente",
        component: EditPointVentePage,
        meta: {
          title: 'Modifier un point de vente',
        }
      },
      {
        path: "liste-point-ventes",
        name: "ListePointVente",
        component: ListePointVentePage,
        meta: {
          title: 'Liste des points de vente',
        }
      },
    ]
  },
  {
    path: "/approvisionnements",
    component: BodyView,
    children: [
      {
        path: "ajouter-approvisionnement",
        name: "AddApprovisionnement",
        component: AddApprovisionnementPage,
        meta: {
          title: 'Ajouter un approvisionnement',
        }
      },
      {
        path: "liste-approvisionnements",
        name: "ListeApprovisionnement",
        component: ListeApprovisionnementPage,
        meta: {
          title: 'Liste des approvisionnements',
        }
      },
    ]
  },

  {
    path: "/livraisons",
    component: BodyView,
    children: [
      {
        path: "ajouter-livraison",
        name: "AddLivraison",
        component: AddLivraisonPage,
        meta: {
          title: 'Ajouter une livraison',
        }
      },
      {
        path: "liste-livraisons",
        name: "ListeLivraison",
        component: ListeLivraisonPage,
        meta: {
          title: 'Liste des livraisons',
        }
      },
    ]
  },
  {
    path: "/comptes",
    component: BodyView,
    children: [
      {
        path: "ajouter-compte",
        name: "AddCompte",
        component: AddComptePage,
        meta: {
          title: 'Ajouter un compte',
        }
      },
      {
        path: "modifier-compte/:id",
        name: "EditCompte",
        component: EditComptePage,
        meta: {
          title: 'Modifier un compte',
        }
      },
      {
        path: "liste-comptes",
        name: "ListeCompte",
        component: ListeComptePage,
        meta: {
          title: 'Liste des comptes',
        }
      },
    ]
  },
  {
    path: "/transactions",
    component: BodyView,
    children: [
      {
        path: "ajouter-transaction",
        name: "AddTransaction",
        component: AddTransactionPage,
        meta: {
          title: 'Ajouter une transaction',
        }
      },
      {
        path: "modifier-transaction/:id",
        name: "EditTransaction",
        component: EditTransactionPage,
        meta: {
          title: 'Modifier une transaction',
        }
      },
      {
        path: "liste-transactions",
        name: "ListeTransaction",
        component: ListeTransactionPage,
        meta: {
          title: 'Liste des transactions',
        }
      },
      {
        path: "view-transaction/:id",
        name: "ViewTransaction",
        component: ViewTransactionPage,
        meta: {
          title: 'Détails de la transaction',
        }
      },
    ]
  },
  {
    path: "/operations",
    component: BodyView,
    children: [
      {
        path: "ajouter-operation-depot",
        name: "AddOperationDepot",
        component: AddOperationDepotPage,
        meta: {
          title: 'Ajouter une opération de dépôt',
        }
      },
      {
        path: "ajouter-operation-retrait",
        name: "AddOperationRetrait",
        component: AddOperationRetraitPage,
        meta: {
          title: 'Ajouter une opération de retrait',
        }
      },
      {
        path: "modifier-operation-depot/:id",
        name: "EditOperationDepot",
        component: EditOperationDepotPage,
        meta: {
          title: 'Modifier une opération de dépôt',
        }
      },
      {
        path: "modifier-operation-retrait/:id",
        name: "EditOperationRetrait",
        component: EditOperationRetraitPage,
        meta: {
          title: 'Modifier une opération de retrait',
        }
      },
      {
        path: "liste-operations",
        name: "ListeOperation",
        component: ListeOperationPage,
        meta: {
          title: 'Liste des opérations',
        }
      },
      {
        path: "view-operation/:id",
        name: "ViewOperation",
        component: ViewOperationPage,
        meta: {
          title: 'Détails de l\'opération',
        }
      },
    ]
  },
  {
    path: "/type-comptes",
    component: BodyView,
    children: [
      {
        path: "liste-typecompte",
        name: "ListeTypeCompte",
        component: ListeTypeComptePage,
        meta: {
          title: 'Liste des types de comptes',
        }
      },
    ]
  },
  {
    path: "/sorties",
    component: BodyView,
    children: [
      {
        path: "ajouter-sortie",
        name: "AddSortie",
        component: AddSortiePage,
        meta: {
          title: 'Ajouter une sortie',
        }
      },
      {
        path: "liste-sorties",
        name: "ListeSortie",
        component: ListeSortiePage,
        meta: {
          title: 'Liste des sorties',
        }
      },
    ]
  },
  {
    path: "/modele-signataires",
    component: BodyView,
    children: [
      {
        path: "ajouter-modele-signataire",
        name: "AddModeleSignataire",
        component: AddModeleSignatairePage,
        meta: {
          title: 'Ajouter un modèle de signataire',
        }
      },
      {
        path: "liste-modele-signataires",
        name: "ListeModeleSignataire",
        component: ListeModeleSignatairePage,
        meta: {
          title: 'Liste des modèles de signataires',
        }
      },
    ]
  },
  {
    path: "/factures",
    component: BodyView,
    children: [
      {
        path: "liste-factures",
        name: "ListeFacture",
        component: ListeFacturePage,
        meta: {
          title: 'Liste des factures',
        }
      },
      {
        path: "liste-facture-proformas",
        name: "ListeFactureProforma",
        component: ListeFactureProformaPage,
        meta: {
          title: 'Liste des factures proformas',
        }
      },
    ]
  },
  {
    path: "/demandes-prix",
    component: BodyView,
    children: [
      {
        path: "liste-demande-prix",
        name: "ListeDemandePrix",
        component: ListeDemandePrixPage,
        meta: {
          title: 'Liste des demandes de prix',
        }
      },
      {
        path: "ajouter-demande-prix",
        name: "AddDemandePrix",
        component: AddDemandePrixPage,
        meta: {
          title: 'Ajouter une demande de prix',
        }
      },
    ]
  },
  {
    path: "/depenses",
    component: BodyView,
    children: [
      {
        path: "liste-depenses",
        name: "ListeDepense",
        component: ListeDepensePage,
        meta: {
          title: 'Liste des dépenses',
        }
      },
      {
        path: "ajouter-depense",
        name: "AddDepense",
        component: AddDepensePage,
        meta: {
          title: 'Ajouter une dépense',
        }
      },
    ]
  },
  {
    path: "/depots",
    component: BodyView,
    children: [
      {
        path: "liste-depots",
        name: "ListeDepot",
        component: ListeDepotPage,
        meta: {
          title: 'Liste des dépôts',
        }
      },
      {
        path: "ajouter-depot",
        name: "AddDepot",
        component: AddDepotPage,
        meta: {
          title: 'Ajouter un dépôt',
        }
      },
    ]
  },
  {
    path: "/paiements",
    component: BodyView,
    children: [
      {
        path: "ajouter-paiement",
        name: "AddPaiement",
        component: AddPaiementPage,
        meta: {
          title: 'Ajouter un paiement',
        }
      },
      {
        path: "modifier-paiement/:id",
        name: "EditPaiement",
        component: EditPaiementPage,
        meta: {
          title: 'Modifier un paiement',
        }
      },
      {
        path: "liste-paiements",
        name: "ListePaiement",
        component: ListePaiementPage,
        meta: {
          title: 'Liste des paiements',
        }
      },
      {
        path: "liste-mode-paiement",
        name: "ListeModePaiement",
        component: ListeModePaiementPage,
        meta: {
          title: 'Liste des modes de paiement',
        }
      },
    ]
  },
  {
    path: "/commandes-clients",
    component: BodyView,
    children: [
      {
        path: "ajouter-commande-client",
        name: "AddCommandeClient",
        component: AddCommandeClientPage,
        meta: {
          title: 'Ajouter une commande client',
        }
      },
      {
        path: "modifier-commande-client/:id",
        name: "EditCommandeClient",
        component: EditCommandeClientPage,
        meta: {
          title: 'Modifier une commande client',
        }
      },
      {
        path: "liste-commande-client",
        name: "EditCommandeClient",
        component: ListeCommandeClientPage,
        meta: {
          title: 'Liste des commandes client',
        }
      },
    ]
  },  

  {
    path: "/ouv_fers",
    component: BodyView,
    children: [
      {
        path: "ajouter-ouv_fer",
        name: "AddOuvFerPage",
        component: AddOuvFerPage,
        meta: {
          title: 'Faire une ouverture de caisse',
        }
      },
      {
        path: "ajouter-fermeture",
        name: "AddFerPage",
        component: AddFerPage,
        meta: {
          title: 'Faire une fermeture de caisse',
        }
      },
      {
        path: "liste-ouv_fer",
        name: "ListeOuvFerPage",
        component: ListeOuvFerPage,
        meta: {
          title: 'Liste des ouvertures',
        },
      },
      {
        path: "edit-ouv_fer/:id",
        name: "EditOuvFerPage",
        component: EditOuvFerPage,
        meta: {
          title: 'Modifier une ouverture',
        }
      }
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
  const path = ['/auth/login', '/auth/register'];
  if (path.includes(to.path) || localStorage.getItem('user')) {
    return next();
  }
  next('/auth/login');
});

export default router
