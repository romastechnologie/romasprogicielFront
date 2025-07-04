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
<<<<<<< HEAD
=======
        headTitle1: "Gestion de la Paie",
        headTitle2: "Contrat,Paie, Religions, Type Retenue,Type Prime,Mode Tarification,Ethnie,Type Contrat ",
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
        title: "Paie",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/paies/ajouter-paie",
                title: "Ajouter une paie",
                type: "link"
            },
            {
                path: "/paies/liste-paies",
                title: "Liste des paies",
                type: "link"
            }
        ]
    },
    {
        title: "Processus",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/processus/ajouter-processus",
                title: "Ajouter un processus",
                type: "link"
            },
            {
                path: "/processus/liste-processus",
                title: "Liste des processus",
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
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
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
<<<<<<< HEAD
=======
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
        title: "Categories de demandes",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/categories/liste-categorie",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
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
<<<<<<< HEAD
=======
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
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
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
<<<<<<< HEAD
=======
        title: "Horaires",
        icon: "stroke-to-do",
        icon1: "fill-to-do",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            // {
            //     path: "/horaires/ajouter-horaire",
            //     title: "Ajouter un horaire",
            //     type: "link"
            // },
            {
                path: "/horaires/liste-horaire",
                title: "Liste des horaires",
                type: "link"
            }
        ]
    },
    {
        headTitle1: "Gestion de trésorerie et des dépenses",
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
        title: "Point de Tresorerie",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/pointtresoreries/ajouter-pointtresorerie",
                title: "Ajouter un point tresorerie ",
                type: "link"
            },
            {
                path: "/pointtresoreries/liste-pointtresorerie",
                title: "Liste des points tresoreries",
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
                title: "Ouverture de caisse ",
                type: "link"
            },
            // {
            //     path: "/ouv_fers/ajouter-fermeture",
            //     title: "Fermeture de caisse ",
            //     type: "link"
            // },
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
    // {
    //     title: "User Compte",
    //     icon: "stroke-animation",
    //     icon1: "fill-animation",
    //     type: "link",
    //     path: "/userComptes/liste-userCompte",
    //     badgeType: "light-primary",
    //     active: false,
    //     isPinned: false
    // },
    {
        title: "User Tresorerie",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/userTresoreries/liste-userTresorerie",
        badgeType: "light-primary",
        active: false,
        isPinned: false
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
                title: "Décaissement ",
                type: "link"
            },
            {
                path: "/finances/ajouter-finance2",
                title: "Encaissement ",
                type: "link"
            },
            {
                path: "/finances/liste-finance",
                title: "Liste des financements",
                type: "link"
            },
            {
                path: "/finances/point-finance",
                title: "Point des financements",
                type: "link"
            },
        ]
    },
    {
        headTitle1: "Gestion des Archives",
        headTitle2: "Document, Format,Mouvement, Tag, Emplacement,Organisation,TypeOrganisation,CategorieDocument,TypeDocument,TypeEmplacement,RegleConservation",
        type: "headtitle"
    },
    {
        title: "Document",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/documents/ajouter-document",
                title: "Ajouter un document",
                type: "link"
            },
            {
                path: "/documents/liste-document",
                title: "Liste des documents",
                type: "link"
            }
        ]
    },
    {
        title: "Format",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/formats/liste-format",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Mouvement",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/mouvements/liste-mouvement",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Emplacement",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/emplacements/liste-emplacement",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Tag",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "link",
        path: "/tags/liste-tag",
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
        title: "CategorieDocument",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "link",
        path: "/categoriedocument/liste-categoriedocument",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
    },
    /* {
         title: "RegleTypeDocument",
         icon: "stroke-user",
         icon1: "fill-user",
         type: "link",
         path: "/reglestypes/liste-reglestypes",
         badgeType: "light-primary",
         active: false,
         isPinned: false,
     },*/
    {
        title: "TypeArchivage",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/typedocument/liste-typedocument",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
    },
    {
        title: "TypeDocument",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/typedoc/liste-typedoc",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
    },
    {
        title: "TypeEmplacement",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "link",
        path: "/typeemplacement/liste-typeemplacement",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
    },
    {
        title: "Regle de gestion",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/regleconservation/liste-regleconservation",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
    },
    {
        headTitle1: "Gestion des Champs Libres",
        headTitle2: "Champs Libres",
        type: "headtitle"
    },
    {
        title: "Champs Libres",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/champsLibres/ajouter-champsLibre",
                title: "Ajouter un champ libre",
                type: "link"
            },
            {
                path: "/champsLibres/liste-champsLibre",
                title: "Liste des champs libres",
                type: "link"
            },
        ]
    },
    {
        title: "Champs Libres Famille",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/champsLibreFamille/ajouter-champsLibreFamille",
                title: "Ajouter un champ libre et Famille",
                type: "link"
            },
            // {
            //     path: "/champsLibreFamille/editer-champsLibreFamille",
            //     title: "Editer un champ libre Famille",
            //     type: "link"
            // },
            {
                path: "/champsLibreFamille/liste-champsLibreFamille",
                title: "Liste des champs libres et Familles",
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
        title: "Type Bien",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/typeBiens/liste-typeBiens",
                title: "Liste des types de biens",
                type: "link"
            },
        ]
    },
    {
        title: "Magasin",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/magasins/liste-magasins",
                title: "Liste des magasins",
                type: "link"
            },
        ]
    },
    {
        title: "Categorie Bien",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/categorieBiens/liste-categorieBiens",
                title: "Liste des catégories de biens",
                type: "link"
            },
        ]
    },
    {
        title: "Fournisseurs",
        icon: "stroke-calendar",
        icon1: "fill-calendar",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/fournisseurs/ajouter-fournisseur",
                title: "Ajouter un fournisseur",
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
        title: "Etats",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/etats/produits-disponibles",
                title: "Liste des produits disponibles",
                type: "link"
            },
            {
                path: "/etats/produits-vendus",
                title: "Liste des produits vendus",
                type: "link"
            },
            {
                path: "/etats/produits-livres",
                title: "Liste des produits livres",
                type: "link"
            },
            {
                path: "/etats/produits-rupture",
                title: "Liste des prosuits en rupture de stock",
                type: "link"
            },
            {
                path: "/etats/point-commande",
                title: "Liste du point des commandes",
                type: "link"
            },
            {
                path: "/etats/etat-produits-entree",
                title: "Liste des produits entrées",
                type: "link"
            },
            {
                path: "/etats/etats-produits-sorties",
                title: "Liste des produits sorties",
                type: "link"
            },
            {
                path: "/etats/etat-nmbre-pro",
                title: 'Nombre du produits vendus par période',
                type: "link"
            },
            {
                path: "/etats/ca-client",
                title: `Chiffre d'affaire par cient`,
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
                path: "/inventaires/miseajour-inventaire",
                title: "Mise à jour des inventaires",
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
                title: "commandes fournisseurs",
                type: "link"
            },
            {
                path: "/fournisseurs/liste-fournisseurs",
                title: "fournisseurs",
                type: "link"
            },
            {
                path: "/demandes-prix/liste-demande-prix",
                title: " demandes de prix",
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
                title: " factures",
                type: "link"
            },
            {
                path: "/factures/liste-facture-proformas",
                title: " factures proforma",
                type: "link"
            }
        ]
    },
    {
        title: "Equipe",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/equipes/ajouter-equipe",
                title: "Ajouter une équipe",
                type: "link"
            },
            /* {
                 path: "/equipes/modifier-equipe",
                 title: "Modifier une équipe",
                 type: "link"
             },
             {
                 path: "/equipes/liste-equipes",
                 title: "Liste des équipes",
                 type: "link"
             }*/
        ]
    },
    {
        title: "Mouvement",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/mouvements/ajouter-mouvement",
                title: "Ajouter un mouvement",
                type: "link"
            },
            /* {
                 path: "/equipes/modifier-equipe",
                 title: "Modifier une équipe",
                 type: "link"
             },
             {
                 path: "/equipes/liste-equipes",
                 title: "Liste des équipes",
                 type: "link"
             }*/
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
                title: " produits",
                type: "link"
            },
            {
                path: "/clients/liste-clients",
                title: "clients",
                type: "link"
            },
            {
                path: "/familles/liste-familles",
                title: "familles",
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
                title: "magasins",
                type: "link"
            },
            {
                path: "/monaies/liste-monnaies",
                title: " monnaies",
                type: "link"
            },
            // {
            //     path: "/magasins/liste-magasins",
            //     title: "Liste des magasins",
            //     type: "link"
            // },
            // {
            //     path: "/magasins/liste-magasins",
            //     title: "Liste des magasins",
            //     type: "link"
            // },
            {
                path: "/conditionnements/liste-conditionnements",
                title: "conditionnements",
                type: "link"
            },
            {
                path: "/societes/liste-societes",
                title: "sociétés",
                type: "link"
            },
            {
                path: "/banques/liste-banques",
                title: "banques",
                type: "link"
            },
            // {
            //     path: "/personnelles/liste-personnels",
            //     title: "personnels",
            //     type: "link"
            // },
            // {
            //     path: "/personnel-fonctions/liste-personnel-fonctions",
            //     title: "fonctions du personnel",
            //     type: "link"
            // },
            {
                path: "/postes/liste-postes",
                title: " postes",
                type: "link"
            },
            {
                path: "/adresse-livraisons/liste-adresse-livraisons",
                title: "adresses de livraison",
                type: "link"
            },
            {
                path: "/taxes/liste-taxes",
                title: "taxes",
                type: "link"
            },
            {
                path: "/taxes/liste-groupe-taxes",
                title: "groupe de taxes",
                type: "link"
            },
            {
                path: "/type-operations/liste-type-operations",
                title: "types d'opérations",
                type: "link"
            },
            {
                path: "/type-depenses/liste-type-depenses",
                title: " types de dépenses",
                type: "link"
            },
            {
                path: "/point-ventes/liste-point-ventes",
                title: "points de vente",
                type: "link"
            },
            {
                path: "/type-comptes/liste-typecompte",
                title: "types de compte",
                type: "link"
            },
            {
                path: "/modele-signataires/liste-modele-signataires",
                title: "modèles de signataires",
                type: "link"
            },
            {
                path: "/paiements/liste-mode-paiement",
                title: " mode de paiement",
                type: "link"
            },
            {
                path: "/commandes-clients/liste-commande-client/",
                title: "commandes clients",
                type: "link"
            }
        ]
    },
    {
        headTitle1: "GesPack",
        headTitle2: "GesPack",
        type: "headtitle"
    },
    {
        title: "Course",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/courses/ajouter-course",
                title: "Ajouter une course",
                type: "link"
            },
            {
                path: "/courses/liste-courses",
                title: "Liste des courses",
                type: "link"
            }
        ]
    },
    {
        title: "Entretien",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/entretiens/ajouter-entretien",
                title: "Ajouter un entretien",
                type: "link"
            },
            {
                path: "/entretiens/liste-entretiens",
                title: "Liste des entretiens",
                type: "link"
            }
        ]
    },
    {
        title: "Planification Réparation",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/planificationReparations/ajouter-planificationReparation",
                title: "Declarer entretien",
                type: "link"
            },
            {
                path: "/planificationReparations/ajouter-planificationReparation2",
                title: "Planifier panne ",
                type: "link"
            },
            {
                path: "/planificationReparations/liste-planificationReparations",
                title: "Liste ",
                type: "link"
            }
        ]
    },
    {
        title: "Panne",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/pannes/liste-panne",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Type d'entretiens",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/typeEntretiens/ajouter-typeEntretien",
                title: "Ajouter un type d'entretien",
                type: "link"
            },
            {
                path: "/typeEntretiens/liste-typeEntretien",
                title: "Liste des types d'entretiens",
                type: "link"
            }
        ]
    },
    {
        title: "Type Moyen Roulant",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/TypeMoyenRoulant/listeTypeMoyenRoulant",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        title: "Packing",
        icon: "stroke-learning",
        icon1: "fill-learning",
        type: "link",
        path: "/Packing/listePacking",
        badgeType: "light-primary",
        active: false,
        isPinned: false
    },
    {
        headTitle1: "Gestion des depenses",
        headTitle2: "Depenses,TypesDepenses, CategoriesDepenses",
        type: "headtitle"
    },
    {
        title: "Depenses",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/Depenses/ajouter-depenses",
                title: "Ajouter une depense",
                type: "link"
            },
            {
                path: "/Depenses/liste-depenses",
                title: 'liste des depenses',
                type: "link"
            }
        ]
    },
    {
        title: "TypesDepenses",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/typesdepenses/liste-typesdepenses",
                title: "Liste des types depenses",
                type: "link"
            }
        ]
    },
    {
        title: "CategoriesDepenses",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/categoriesDepenses/liste-categoriesdepenses",
                title: "Liste des  categories depenses",
                type: "link"
            }
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
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
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
<<<<<<< HEAD
        headTitle1: "Gestion des Adresses",
        headTitle2: "Arrondissement,Commune, Département,Quartier",
        type: "headtitle"
    },
    {
        title: "Arrondissement",
=======
        headTitle1: "Gestion Model",
        headTitle2: "Model,Type",
        type: "headtitle"
    },
    {
        title: "Model",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
<<<<<<< HEAD
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
=======
                path: "/models/ajouter-model",
                title: "Ajouter un model",
                type: "link"
            },
            {
                path: "/models/liste-models",
                title: "Liste des models",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
                type: "link"
            },
        ]
    },
    {
<<<<<<< HEAD
        title: "Département",
=======
        title: "Type",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
<<<<<<< HEAD
                path: "/zones/liste-departements",
                title: "Liste des departements",
=======
                path: "/types/liste-types",
                title: "Liste des types",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
                type: "link"
            },
        ]
    },
    {
<<<<<<< HEAD
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
=======
        headTitle1: "Gestion Mission",
        headTitle2: "Mission,Rapport",
        type: "headtitle"
    },
    {
        title: "Mission",
        icon: "stroke-user",
        icon1: "fill-user",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
<<<<<<< HEAD
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
=======
                path: "/missions/ajouter-mission",
                title: "Ajouter une mission",
                type: "link"
            },
            {
                path: "/missions/liste-missions",
                title: "Liste des missions",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
                type: "link"
            },
        ]
    },
    {
<<<<<<< HEAD
        title: "Ethnies",
        icon: "stroke-task",
        icon1: "fill-task",
=======
        title: "NoteMission",
        icon: "stroke-user",
        icon1: "fill-user",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
<<<<<<< HEAD
                path: "/ethnies/liste-ethnie",
                title: "Liste des ethnies",
=======
                path: "/noteMissions/ajouter-noteMissions",
                title: "Ajouter une note mission",
                type: "link"
            },
            {
                path: "/noteMissions/liste-noteMissions",
                title: "Liste des notes missions",
                type: "link"
            },
        ]
    },
    {
        title: "Rapport",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/rapports/liste-rapports",
                title: "Liste des rapports",
>>>>>>> a90d9b0087b6b22d50f7dda4f1e9c654e288df52
                type: "link"
            },
        ]
    },
];
//# sourceMappingURL=menu.js.map