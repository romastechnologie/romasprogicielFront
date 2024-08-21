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
        headTitle1: "Gestion de la Paie",
        headTitle2: "Contrat,Religions, Type Retenue,Type Prime,Mode Tarification,Ethnie,Type Contrat ",
        type: "headtitle"
    },
    {
        title: "Contrat",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/contrats/ajouter-contrat",
                title: "Ajouter un contrat",
                type: "link"
            },
            {
                path: "/contrats/liste-contrats",
                title: "Liste des contrats",
                type: "link"
            }
        ]
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
            // {
            //     path: "/permissions/ajouter-permission",
            //     title: "Ajouter une permission",
            //     type: "link"
            // },
            {
                path: "/religions/liste-religion",
                title: "Liste des religions",
                type: "link"
            },
        ]
    },

    {
        title: "Type Retenue",
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
                path: "/typeRetenues/liste-typeRetenue",
                title: "Liste des types de retenues",
                type: "link"
            },
        ]
    },

    {
        title: "Type Prime",
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
                path: "/typePrimes/liste-typePrime",
                title: "Liste des types de primes",
                type: "link"
            },
        ]
    },

    {
        title: "Type Contrat",
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
                path: "/typeContrats/liste-typeContrat",
                title: "Liste des types de contrats",
                type: "link"
            },
        ]
    },
    {
        title: "Mode Tarification",
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
                path: "/modeTarifications/liste-modeTarification",
                title: "Liste des modes de tarifications",
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
            // {
            //     path: "/permissions/ajouter-permission",
            //     title: "Ajouter une permission",
            //     type: "link"
            // },
            {
                path: "/ethnies/liste-ethnie",
                title: "Liste des ethnies",
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
           /* {
                path: "/mouvementBiens/ajouter-mouvementbien",
                title: "Ajouter un mouvement de bien",
                type: "link"
            },*/
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


    {
        headTitle1: "GesCom",
        headTitle2: "GesCom",
        type: "headtitle"
    },
    {
        title: "Vente",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/ventes/ajouter-vente",
                title: "Ajouter une vente",
                type: "link"
            },
            {
                path: "/ventes/liste-ventes",
                title: "Liste des ventes",
                type: "link"
            }
        ]
    },
    {
        title: "Stock",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/inventaires/liste-inventaires",
                title: "Liste des inventaires",
                type: "link"
            },
            {
                path: "/suivi-stock/liste-suivi-stock",
                title: "Suivi du stock",
                type: "link"
            },
            {
                path: "/sorties/liste-sorties",
                title: "Liste des sorties",
                type: "link"
            },
            {
                path: "/transferts/liste-transferts",
                title: "Liste des transferts",
                type: "link"
            },
            {
                path: "/approvisionnements/liste-approvisionnements",
                title: "Liste des approvisionnements",
                type: "link"
            },
            {
                path: "/livraisons/liste-livraisons",
                title: "Liste des livraisons",
                type: "link"
            }
        ]
    },
    {
        title: "Portefeuilles",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/comptes/liste-comptes",
                title: "Liste des comptes",
                type: "link"
            },
            {
                path: "/transactions/liste-transactions",
                title: "Liste des transactions",
                type: "link"
            },
            {
                path: "/operations/ajouter-operation-depot",
                title: "Ajouter une opération de dépôt",
                type: "link"
            },
            {
                path: "/operations/ajouter-operation-retrait",
                title: "Ajouter une opération de retrait",
                type: "link"
            },
            {
                path: "/operations/liste-operations",
                title: "Liste des opérations",
                type: "link"
            },
        ]
    },
    {
        title: "Caisses",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/caisses/liste-caisses",
                title: "Liste des caisses",
                type: "link"
            },
            {
                path: "/depenses/liste-depenses",
                title: "Liste des dépenses",
                type: "link"
            },
            {
                path: "/depots/liste-depots",
                title: "Liste des dépôts",
                type: "link"
            },
            {
                path: "/paiements/liste-paiements",
                title: "Liste des paiements",
                type: "link"
            }
        ]
    },
    {
        title: "Fournisseurs",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/commande-fournisseurs/liste-commande-fournisseurs",
                title: "Liste des commandes fournisseurs",
                type: "link"
            },
            {
                path: "/fournisseurs/liste-fournisseurs",
                title: "Liste des fournisseurs",
                type: "link"
            },
            {
                path: "/demandes-prix/liste-demande-prix",
                title: "Liste des demandes de prix",
                type: "link"
            },
        ]
    },
    {
        title: "Factures",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/factures/liste-factures",
                title: "Liste des factures",
                type: "link"
            },
            {
                path: "/factures/liste-facture-proformas",
                title: "Liste des factures proforma",
                type: "link"
            }
        ]
    },
    {
        title: "Paramètres",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/produits/liste-produits",
                title: "Liste des produits",
                type: "link"
            },
            {
                path: "/clients/liste-clients",
                title: "Liste des clients",
                type: "link"
            },
            {
                path: "/familles/liste-familles",
                title: "Liste des familles",
                type: "link"
            },
            // {
            //     path: "/medias/liste-medias",
            //     title: "Liste des médias",
            //     type: "link"
            // },
            // {
            //     path: "/produit-conditionnes/liste-produit-conditionnes",
            //     title: "Liste des produits conditionnés",
            //     type: "link"
            // },
            {
                path: "/magasins/liste-magasins",
                title: "Liste des magasins",
                type: "link"
            },
            {
                path: "/monnaies/liste-monnaies",
                title: "Liste des monnaies",
                type: "link"
            },
            {
                path: "/magasins/liste-magasins",
                title: "Liste des magasins",
                type: "link"
            },
            {
                path: "/magasins/liste-magasins",
                title: "Liste des magasins",
                type: "link"
            },
            {
                path: "/conditionnements/liste-conditionnements",
                title: "Liste des conditionnements",
                type: "link"
            },
            {
                path: "/societes/liste-societes",
                title: "Liste des sociétés",
                type: "link"
            },
            {
                path: "/banques/liste-banques",
                title: "Liste des banques",
                type: "link"
            },
            {
                path: "/personnels/liste-personnels",
                title: "Liste des personnels",
                type: "link"
            },
            {
                path: "/personnel-fonctions/liste-personnel-fonctions",
                title: "Liste des fonctions du personnel",
                type: "link"
            },
            {
                path: "/fonctions/liste-fonctions",
                title: "Liste des fonctions",
                type: "link"
            },
            {
                path: "/adresse-livraisons/liste-adresse-livraisons",
                title: "Liste des adresses de livraison",
                type: "link"
            },
            {
                path: "/taxes/liste-type-taxes",
                title: "Liste des types de taxes",
                type: "link"
            },
            {
                path: "/type-operations/liste-type-operations",
                title: "Liste des types d'opérations",
                type: "link"
            },
            {
                path: "/type-depenses/liste-type-depenses",
                title: "Liste des types de dépenses",
                type: "link"
            },
            {
                path: "/point-ventes/liste-point-ventes",
                title: "Liste des points de vente",
                type: "link"
            },
            {
                path: "/type-comptes/liste-typecompte",
                title: "Liste des types de compte",
                type: "link"
            },
            {
                path: "/modele-signataires/liste-modele-signataire",
                title: "Liste des modèles de signataires",
                type: "link"
            },
            {
                path: "/paiements/liste-mode-paiement",
                title: "Liste des mods de paiement",
                type: "link"
            },
            {
                path: "/commandes-clients/liste-commande-client/",
                title: "Liste des commandes clients",
                type: "link"
            }
        ]
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