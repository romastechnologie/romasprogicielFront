export const menu = [
    {
        title: "Accueil",
        icon: "stroke-home",
        icon1: "fill-home",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/accueil/tableau-bord",
                title: "Tableau de bord",
                type: "link"
            },
        ]
    },
    {
        headTitle1: "Gestion des utilisateurs",
        headTitle2: "Utilisateurs, Rôles et permissions",
        type: "headtitle"
    },
    {
        title: "Utilisateurs",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/utilisateurs/ajouter-utilisateur",
                title: "Ajouter un utilisateur",
                type: "link"
            },
            {
                path: "/utilisateurs/liste-utilisateur",
                title: "Liste des utilisateurs",
                type: "link"
            },
        ]
    },
    {
        title: "Rôles",
        icon: "stroke-editors",
        icon1: "fill-editors",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/roles/ajouter-role",
                title: "Ajouter un rôle",
                type: "link"
            },
            {
                path: "/roles/liste-role",
                title: "Liste des rôles",
                type: "link"
            },
        ]
    },
    {
        title: "Permissions",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            // {
            //     path: "/permissions/ajouter-permission",
            //     title: "Ajouter une permission",
            //     type: "link"
            // },
            {
                path: "/permissions/liste-permission",
                title: "Liste des permissions",
                type: "link"
            },
        ]
    },
    {
        headTitle1: "Gestion du personnel",
        headTitle2: "Demandes, Permissions, Congés, Présences, Justificatifs et Heures supplémentaires,Horaires",
        type: "headtitle"
    },
    {
        title: "Personnels",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/personnels/ajouter-personnel",
                title: "Ajouter un personnel",
                type: "link"
            },
            {
                path: "/personnelles/liste-personnel",
                title: "Liste des personnels",
                type: "link"
            }
        ]
    },
    {
        title: "Demande",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/demandes/ajouter-demande",
                title: "Ajouter une demande",
                type: "link"
            },
            {
                path: "/demandes/liste-demande-conge",
                title: "Liste des demandes de congés",
                type: "link"
            },
            {
                path: "/demandes/liste-demande-permission",
                title: "Liste des demandes de permission",
                type: "link"
            },
            {
                path: "/demandes/liste-demande-attestation",
                title: "Liste des demandes d'attestation",
                type: "link"
            },
            {
                path: "/demandes/liste-demande-pret",
                title: "Liste des demandes de pret",
                type: "link"
            },
            {
                path: "/demandes/liste-demande-autre",
                title: "Liste des autres demandes",
                type: "link"
            },
            {
                path: "/demandes/liste-demande-validation",
                title: "Liste des validations",
                type: "link"
            },
        ]
    },
    {
        title: "Présences",
        icon: "stroke-to-do",
        icon1: "fill-to-do",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/presences/ajouter-presence",
                title: "Ajouter une présence",
                type: "link"
            },
            {
                path: "/presences/liste-presence",
                title: "Liste des présences",
                type: "link"
            }
        ]
    },
    /*
    {
        title: "Echeances",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/echeances/liste-echeances",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    }, */
    {
        title: "Demande de conge",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/conges/ajouter-conge",
                title: "Programmer un congé",
                type: "link"
            },
            {
                path: "/conges/liste-conge",
                title: "Liste des congés",
                type: "link"
            },
            {
                path: "/conges/calendrier",
                title: "Calendrier de programmation",
                type: "link"
            },
        ]
    },
    {
        title: "HeureSupp",
        icon: "stroke-form",
        icon1: "fill-form",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/heureSups/liste-heureSupp",
                title: "Liste des heures supplémentaires",
                type: "link"
            },
        ]
    },
    {
        title: "Justificatif",
        icon: "stroke-table",
        icon1: "fill-table",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/justificatifs/ajouter-justificatif",
                title: "Ajouter un justificatif",
                type: "link"
            },
            {
                path: "/justificatifs/liste-justificatif",
                title: "Liste des justificatifs",
                type: "link"
            },
        ]
    },
    /* {
         title: "Demande de permission",
         icon: "stroke-calendar",
         icon1: "fill-calendar",
         type: "sub",
         badgeType: "light-primary",
         active: false,
         isPinned: false,
         children: [
             {
                 path: "/permissionps/ajouter-permissionp",
                 title: "Ajouter une permission ",
                 type: "link"
             },
             {
                 path: "/permissionps/liste-permissionp",
                 title: "Liste des permissions",
                 type: "link"
             },
         ]
     },*/
    {
        headTitle1: "Gestion Circuit",
        headTitle2: "Circuit,Validation",
        type: "headtitle"
    },
    {
        title: "Circuit",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/circuits/ajouter-circuit",
                title: "Ajouter un circuit",
                type: "link"
            },
            {
                path: "/circuits/liste-circuits",
                title: "Liste des circuits",
                type: "link"
            },
            {
                path: "/circuits/liste-circuits-demandes",
                title: "Liste des circuits de demandes",
                type: "link"
            },
        ]
    },
    /*{
      //  title: "EtapeValidation",
       // icon: "stroke-user",
       // icon1: "fill-user",
        //type: "sub",
        //badgeType: "light-primary",
       // active: false,
       // isPinned: false,
       // children: [
           /* {
                path: "/etapeValidations/ajouter-etapeValidations",
                title: "Ajouter une etape validation",
                type: "link"
            },
            {
                path: "/etapeValidations/liste-etapeValidations",
                title: "Liste des etapes validations",
                type: "link"
            },
        ]
    },*/
    // {
    //     title: "UserEtapes",
    //     icon: "stroke-user",
    //     icon1: "fill-user",
    //     type: "sub",
    //     badgeType: "light-primary",
    //     active: false,
    //     isPinned: false,
    //     children: [
    //         {
    //             path: "/userEtapes/liste-userEtapes",
    //             title: "Liste des UserEtapes",
    //             type: "link"
    //         },
    //     ]
    // },
    {
        title: "Role Etape",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/roleetaps/liste-roleetaps",
                title: "Liste des role etapes",
                type: "link"
            },
        ]
    },
    {
        headTitle1: "Gestion des Adresses",
        headTitle2: "Arrondissement,Commune, Département,Quartier",
        type: "headtitle"
    },
    {
        title: "Arrondissement",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/zones/liste-arrondissements",
                title: "Liste des arrondissements",
                type: "link"
            }
        ]
    },
    {
        title: "Commune",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/zones/liste-communes",
                title: "Liste des communes",
                type: "link"
            },
        ]
    },
    {
        title: "Département",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/zones/liste-departements",
                title: "Liste des departements",
                type: "link"
            },
        ]
    },
    {
        title: "Quartier",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/zones/liste-quartiers",
                title: "Liste des quartiers",
                type: "link"
            },
        ]
    },
    {
        headTitle1: "Paramètres",
        headTitle2: "Paramètres",
        type: "headtitle"
    },
    {
        title: "Horaires",
        icon: "stroke-to-do",
        icon1: "fill-to-do",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/horaires/liste-horaire",
                title: "Liste des horaires",
                type: "link"
            }
        ]
    },
    {
        title: "Attributions",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/attributions/liste-attribution",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Postes",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/postes/liste-poste",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Type Organisation",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/typeOrganisations/liste-typeOrganisation",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Organisation",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/organisations/liste-organisation",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Categories de demandes",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/categories/liste-categorie",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "TypeConge",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "link",
        path: "/typeConges/liste-typeConge",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Religons",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/religions/liste-religion",
                title: "Liste des religions",
                type: "link"
            },
        ]
    },
    {
        title: "Ethnies",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/ethnies/liste-ethnie",
                title: "Liste des ethnies",
                type: "link"
            },
        ]
    },
];
//# sourceMappingURL=menu.js.map