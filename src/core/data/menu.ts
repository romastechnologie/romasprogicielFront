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
        headTitle1: "Gestion du personnel",
        headTitle2: "Demandes, Permissions, Congés, Présences, Justificatifs et Heures supplémentaires",
        type: "headtitle"
    },
    {
        title: "Demandes",
        icon: "file",
        icon1: "fill-task",
        type: "sub",
        badgeType: "light-primary",
        active: false,
        isPinned: false,
        children: [
            // {
            //     path: "/demandes/ajouter-demande",
            //     title: "Ajouter une demande",
            //     type: "link"
            // },
            {
                path: "/demandes/liste-demande",
                title: "Liste des demandes",
                type: "link"
            }
        ]
    },
    {
        title: "Présences",
        icon: "file",
        icon1: "fill-task",
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
        title: "Personnels",
        icon: "file",
        icon1: "fill-task",
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
    }
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