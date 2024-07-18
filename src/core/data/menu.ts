interface MenuItem {
    headTitle1?: string;
    headTitle2?: string;
    title?: string;
    icon?: string;
    icon1?: string;
    type: string;
    badgeType?: string;
    active?: boolean;
    isPinned?: boolean;
    path?: string;
    children?: MenuItem[];
    bookmark?: boolean;
}

export const menu: MenuItem[] = [
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
        headTitle2: "Demandes, Permissions, Congés, Présences, Justificatifs et Heures supplémentaires",
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
                path: "/personnels/liste-personnel",
                title: "Liste des personnels",
                type: "link"
            }
        ]
    },
    {
        title: "Demandes",
        icon: "stroke-file",
        icon1: "fill-file",
        type: "link",
        badgeType: "light-primary",
        path: "/demandes/liste-demande",
        active: false,
        isPinned: false
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
    {
        title: "Services",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/services/liste-service",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Categories",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/categories/liste-categorie",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Fonctions",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/fonctions/liste-fonction",
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
                path: "/heureSupps/ajouter-heureSupp",
                title: "Ajouter une heure supplémentaire",
                type: "link"
            },
            {
                path: "/heureSupps/liste-heureSupp",
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
    {
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
                title: "Liste des permission",
                type: "link"
            },
        ]
    },

    {
        headTitle1: "Gestion de trésorerie",
        headTitle2: "Tresorerie, TypeTresorerie, Transfert, Finance, UserCompte et Ouverture/Fermeture de caisse",
        type: "headtitle"
    },

    {
        title: "Tresorerie",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/tresoreries/ajouter-tresorerie",
                title: "Ajouter une tresorerie ",
                type: "link"
            },
            {
                path: "/tresoreries/liste-tresorerie",
                title: "Liste des tresoreries",
                type: "link"
            },
        ]
    },

    {
        title: "Type de Tresorerie",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/typeTresoreries/liste-typeTresorerie",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },

    {
        title: "Transfert",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/transferts/ajouter-transfert",
                title: "Faire un transfert ",
                type: "link"
            },
            {
                path: "/transferts/liste-transfert",
                title: "Liste des transferts",
                type: "link"
            },
        ]
    },

    {
        title: "Finance",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/finances/ajouter-finance",
                title: "Faire un financement ",
                type: "link"
            },
            {
                path: "/finances/liste-finance",
                title: "Liste des financements",
                type: "link"
            },
        ]
    },

    {
        headTitle1: "Gestion des immobilisations",
        headTitle2: "Bien, Amortissement,Mouvement des biens,Fournisseur,Type de Bien, Catégorie de Bien ",
        type: "headtitle"
    },
    {
        title: "Bien",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/biens/ajouter-bien",
                title: "Ajouter un bien",
                type: "link"
            },
            {
                path: "/biens/liste-biens",
                title: "Liste des biens",
                type: "link"
            }
        ]
    },
    {
        title: "Amortissement",
        icon: "stroke-to-do",
        icon1: "fill-to-do",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/amortissements/ajouter-amortissement",
                title: "Ajouter un amortissement",
                type: "link"
            },
            {
                path: "/amortissements/liste-amortissements",
                title: "Liste des amortissements",
                type: "link"
            }
        ]
    },
    {
        title: "Mouvement des biens",
        icon: "stroke-to-do",
        icon1: "fill-to-do",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/mouvementBiens/ajouter-mouvementbien",
                title: "Ajouter un mouvement de bien",
                type: "link"
            },
            {
                path: "/mouvementBiens/liste-mouvementbiens",
                title: "Liste des mouvements",
                type: "link"
            }
        ]
    },
    {
        title: "Type de Bien",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/typeBiens/liste-typebiens",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Categorie des Biens",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/categorieBiens/liste-categoriebiens",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Fournisseur",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/fournisseurs/ajouter-fournisseur",
                title:"Ajouter un fournisseur",
                type: "link"
            },
            {
                path: "/fournisseurs/liste-fournisseurs",
                title: "Liste des fournisseurs",
                type: "link"
             },
        ]
    },
    

    {
        title: "Ouverture/Fermeture de caisse",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/ouv_fers/ajouter-ouv_fer",
                title: "Faire une ouverture de caisse ",
                type: "link"
            },
            {
                path: "/ouv_fers/liste-ouv_fer",
                title: "Liste des ouvertures/fermetures",
                type: "link"
            },
        ]
    },

    {
        title: "Monnaie",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/monnaies/liste-monnaie",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },

    {
        title: "User Compte",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/userComptes/liste-userCompte",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },


    

    // {
    //     title: "Users",
    //     icon: "stroke-user",
    //     icon1: "fill-user",
    //     type: "sub",
    //     active: false,
    //     isPinned: false,
    //     children: [
    //         {
    //             path: "/users/profile",
    //             title: "Users Profile",
    //             type: "link"
    //         },
    //         {
    //             path: "/users/edit",
    //             title: "Users Edit",
    //             type: "link"
    //         },
    //         {
    //             path: "/users/cards",
    //             title: "Users Cards",
    //             type: "link"
    //         }
    //     ]
    // },
   
    // {
    //     title: "Animation",
    //     icon: "stroke-animation",
    //     icon1: "fill-animation",
    //     type: "sub",
    //     isPinned: false,
    //     active: false,
    //     children: [
    //         {
    //             path: "/animation/animate",
    //             title: "Animate",
    //             type: "link"
    //         },
    //         {
    //             path: "/animation/aos_animation",
    //             title: "AOS Animation",
    //             type: "link"
    //         }
    //     ]
    // },
    // {
    //     title: "Icons",
    //     icon: "stroke-icons",
    //     icon1: "fill-icons",
    //     type: "sub",
    //     isPinned: false,
    //     active: false,
    //     children: [
    //         {
    //             path: "/icons/flag",
    //             title: "Flag Icon",
    //             type: "link"
    //         },
    //         {
    //             path: "/icons/fontawesome",
    //             title: "Fontawesome Icon",
    //             type: "link"
    //         },
    //         {
    //             path: "/icons/ico",
    //             title: "Ico Icon",
    //             type: "link"
    //         },
    //         {
    //             path: "/icons/themify",
    //             title: "Themify Icon",
    //             type: "link"
    //         },
    //         {
    //             path: "/icons/feather_icon",
    //             title: "Feather Icon",
    //             type: "link"
    //         },
    //         {
    //             path: "/icons/whether",
    //             title: "Whether Icon",
    //             type: "link"
    //         }
    //     ]
    // },
]