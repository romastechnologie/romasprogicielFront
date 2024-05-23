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
        headTitle1: "Acceuil",
        headTitle2: "Accueil, Tableau de bord",
        type: "headtitle"
    },
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
        title: "Services",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/services/liste-service",
                title: "Liste des services",
                type: "link"
            },
        ]
    },
    {
        title: "Categories",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/categories/liste-categorie",
                title: "Liste des categories",
                type: "link"
            },
        ]
    },
    {
        title: "Fonctions",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/fonctions/liste-fonction",
                title: "Liste des fonctions",
                type: "link"
            },
        ]
    },
    {
        title: "TypeConge",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/typeConges/liste-typeConge",
                title: "Liste des types de conges",
                type: "link"
            },
        ]
    },
    
    {
        title: "Conge",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/conges/ajouter-conge",
                title: "Ajouter un congé",
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
        icon: "stroke-task",
        icon1: "fill-task",
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
        icon: "stroke-task",
        icon1: "fill-task",
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
        title: "Permission",
        icon: "stroke-task",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/permissionsp/ajouter-permissionp",
                title: "Ajouter une permission ",
                type: "link"
            },
            {
                path: "/permissionsp/liste-permissionp",
                title: "Liste des permissions",
                type: "link"
            },
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