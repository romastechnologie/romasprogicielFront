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
        headTitle1: "Paramètres",
        headTitle2: "Parametre",
        type: "headtitle"
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
  
   
   /* {
         title: "Personnels",
        icon: "stroke-user",
        icon1: "fill-user",
        type: "link",
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
*/


/* {
        headTitle1: "Gestion du personnel",
        headTitle2: "Demandes, Permissions, Congés, Présences, Justificatifs et Heures supplémentaires,Horaires",
        type: "headtitle"
    },*/
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

    
]


