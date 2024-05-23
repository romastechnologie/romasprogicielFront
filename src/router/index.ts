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
import ListeCategoriePage from "@/pages/Categorie/ListeCategoriePage.vue";
import ListeFonctionPage from "@/pages/Fonction/ListeFonctionPage.vue";
import ListeTypeCongePage from "@/pages/TypeConge/ListeTypeCongePage.vue";
import AddCongePage from "@/pages/Conge/AddCongePage.vue";
import ListeCongePage from "@/pages/Conge/ListeCongePage.vue";
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
import AddHeureSuppPage from '@/pages/HeureSupp/AddHeureSuppPage.vue';
import ListeHeureSuppPage from "@/pages/HeureSupp/ListeHeureSuppPage.vue";
import AddJustificatifPage from '@/pages/Justificatif/AddJustificatifPage.vue';
import ListeJustificatifPage from "@/pages/Justificatif/ListeJustificatifPage.vue";
import AddPermissionPPage from '@/pages/PermissionP/AddPermissionPPage.vue';
import ListePermissionPPage from "@/pages/PermissionP/ListePermissionPPage.vue";
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
        name: 'defaultRoot',
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
          title: 'Ajouter un congé',
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
        path: "liste-justificatifs",
        name: "ListeJustificatifPage",
        component: ListeJustificatifPage,
        meta: {
          title: 'Liste des justificatifs',
        }
      },
    ]
  },
  {
    path: "/prmissionsp",
    component: BodyView,
    children: [
      {
        path: "ajouter-permissionp",
        name: "AddPermissionPage",
        component: AddPermissionPage,
        meta: {
          title: 'Ajouter une permission',
        }
      },
      {
        path: "liste-permissionps",
        name: "ListePermissionPage",
        component: ListePermissionPage,
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
