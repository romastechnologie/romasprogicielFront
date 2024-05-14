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
                path: "/users/ajouter-user",
                title: "Ajouter un utilisateur",
                type: "link"
            },
            {
                path: "/users/liste-user",
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
        title: "Users",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "sub",
        active: false,
        isPinned: false,
        children: [
            {
                path: "/users/profile",
                title: "Users Profile",
                type: "link"
            },
            {
                path: "/users/edit",
                title: "Users Edit",
                type: "link"
            },
            {
                path: "/users/cards",
                title: "Users Cards",
                type: "link"
            }
        ]
    },
   
    {
        title: "Animation",
        icon: "stroke-animation",
        icon1: "fill-animation",
        type: "sub",
        isPinned: false,
        active: false,
        children: [
            {
                path: "/animation/animate",
                title: "Animate",
                type: "link"
            },
            {
                path: "/animation/aos_animation",
                title: "AOS Animation",
                type: "link"
            }
        ]
    },
    {
        title: "Icons",
        icon: "stroke-icons",
        icon1: "fill-icons",
        type: "sub",
        isPinned: false,
        active: false,
        children: [
            {
                path: "/icons/flag",
                title: "Flag Icon",
                type: "link"
            },
            {
                path: "/icons/fontawesome",
                title: "Fontawesome Icon",
                type: "link"
            },
            {
                path: "/icons/ico",
                title: "Ico Icon",
                type: "link"
            },
            {
                path: "/icons/themify",
                title: "Themify Icon",
                type: "link"
            },
            {
                path: "/icons/feather_icon",
                title: "Feather Icon",
                type: "link"
            },
            {
                path: "/icons/whether",
                title: "Whether Icon",
                type: "link"
            }
        ]
    },
]