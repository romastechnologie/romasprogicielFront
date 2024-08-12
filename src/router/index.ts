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
import AddFournisseurPage from "@/pages/GestionImmobilisation/Fournisseur/AddFournisseurPage.vue";
import EditFournisseurPage from "@/pages/GestionImmobilisation/Fournisseur/EditFournisseurPage.vue";
import ListeFournisseurPage from "@/pages/GestionImmobilisation/Fournisseur/ListeFournisseurPage.vue";
import AddMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/AddMouvementBienPage.vue";
import EditMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/EditMouvementBienPage.vue";
import ListeMouvementBienPage from "@/pages/GestionImmobilisation/MouvementBien/ListeMouvementBienPage.vue";
import AddAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/AddAmortissementPage.vue";
import EditAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/EditAmortissementPage.vue";
import ListeAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/ListeAmortissementPage.vue";
import AddCategorieBienPage from "@/pages/GestionImmobilisation/CategorieBien/AddCategorieBienPage.vue";
import EditCategorieBienPage from "@/pages/GestionImmobilisation/CategorieBien/EditCategorieBienPage.vue";
import ListeCategorieBienPage from "@/pages/GestionImmobilisation/CategorieBien/ListeCategorieBienPage.vue";
import AddTypeBienPage from "@/pages/GestionImmobilisation/TypeBien/AddTypeBienPage.vue";
import ListeTypeBienPage from "@/pages/GestionImmobilisation/TypeBien/ListeTypeBienPage.vue";
import EditTypeBienPage from "@/pages/GestionImmobilisation/TypeBien/EditTypeBienPage.vue";
import TableauAmortissementPage from "@/pages/GestionImmobilisation/Amortissement/TableauAmortissementPage.vue";



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
              path: "ajouter-categorieBien",
              name: "AddCategorieBien",
              component: AddCategorieBienPage,
              meta: {
                title: 'Ajouter une catégorie de biens',
              }
            },
            {
              path: "liste-categoriebiens",
              name: "ListeCategorieBien",
              component: ListeCategorieBienPage,
              meta: {
                title: 'Liste des catégories de biens',
              }
            },
            {
              path: "edit-categorieBien/:id",
              name: "EditCategorieBien",
              component: EditCategorieBienPage,
              meta: {
                title: 'Modifier une catégorie de bien',
              }
            },
          ]
          },

          {
            path: "/typebiens",
            component: BodyView,
            children: [
              {
                path: "ajouter-typeBien",
                name: "AddTypeBien",
                component: AddTypeBienPage,
                meta: {
                  title: 'Ajouter un type de bien',
                }
              },
              {
                path: "liste-typebiens",
                name: "ListeTypeBien",
                component: ListeTypeBienPage,
                meta: {
                  title: 'Liste des types de biens',
                }
              },
              {
              path: "modifier-typeBien",
              name: "EditTypeBien",
              component: EditTypeBienPage,
              meta: {
                title: 'Modifier un type de bien',
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
    path: "/personnels",
    component: BodyView,
    children: [
      {
        path: "ajouter-personnel",
        name: "AddPersonnelPage",
        component: AddPersonnelPage,
        meta: {
          title: 'Ajouter un personnel',
        }
      },
      {
        path: "liste-personnel",
        name: "ListePersonnelPage",
        component: ListePersonnelPage,
        meta: {
          title: 'Liste des personnels',
        },
        children: [
          {
            path: ':id',
            name: 'id',
            component: DetailsPersonnelPage,
            meta: {
              title: 'Details du personnel',
            }
          }
        ]
      },
      {
        path: "edit-personnel/:id",
        name: "EditPersonnelPage",
        component: EditPersonnelPage,
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
