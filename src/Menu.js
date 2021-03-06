const Menu = [
    {
        heading: 'Start',
        translate: 'sidebar.heading.START',
    },
    {
        name: 'Panel',
        icon: 'icon-layers',
        translate: 'sidebar.nav.BOARD',
        path: '/mv/board',
    },
    {
        heading: 'Winnica',
        translate: 'sidebar.heading.VINEYARD'
    },
    {
        name: 'Działki ewidencyjne',
        icon: 'icon-picture',
        translate: 'sidebar.nav.PARCELS',
        submenu: [{
            name: 'Lista działek',
            path: '/mv/parcel/all',
            translate: 'sidebar.nav.element.PARCEL_LIST'
        },
            {
                name: 'Zarchiwizowane',
                path: '/mv/parcel/archived',
                translate: 'sidebar.nav.element.ARCHIVED'
            },
            {
                name: 'Dodaj nową',
                path: '/mv/parcel/e/0',
                translate: 'sidebar.nav.element.ADD_NEW'
            }
        ]
    },
    {
        name: 'Winorośla',
        icon: 'icon-grid',
        translate: 'sidebar.nav.GRAPEVINES',
        submenu: [{
            name: 'Lista winorośli',
            path: '/mv/grapevine/all',
            translate: 'sidebar.nav.element.GRAPEVINE_LIST'
        },
            {
                name: 'Zarchiwizowane',
                path: '/mv/grapevine/archived',
                translate: 'sidebar.nav.element.ARCHIVED'
            },
            {
                name: 'Dodaj nową',
                path: '/mv/grapevine/e/0',
                translate: 'sidebar.nav.element.ADD_NEW'
            }
        ]
    },
    {
        name: 'Zbiory',
        icon: 'icon-basket-loaded',
        translate: 'sidebar.nav.HARVESTS',
        submenu: [{
            name: 'Lista zbiorów',
            path: '/mv/harvest/all',
            translate: 'sidebar.nav.element.HARVEST_LIST'
        },
            {
                name: 'Zarchiwizowane',
                path: '/mv/harvest/archived',
                translate: 'sidebar.nav.element.ARCHIVED'
            },
            {
                name: 'Dodaj nowy',
                path: '/mv/harvest/e/0',
                translate: 'sidebar.nav.element.ADD_NEW_HARVEST'
            }
        ]
    },
    {
        heading: 'Winiarnia',
        translate: 'sidebar.heading.WINERY'
    },
    {
        name: 'Nastawy',
        icon: 'icon-drop',
        translate: 'sidebar.nav.WINES',
        submenu: [{
            name: 'Lista nastawów',
            path: '/mv/wine/all',
            translate: 'sidebar.nav.element.WINE_LIST'
        },
            {
                name: 'Zarchiwizowane',
                path: '/mv/wine/archived',
                translate: 'sidebar.nav.element.ARCHIVED'
            },
            {
                name: 'Dodaj nowy',
                path: '/mv/wine/e/0',
                translate: 'sidebar.nav.element.ADD_NEW_HARVEST'
            }
        ]
    },
    {
        name: 'Zbiorniki',
        icon: 'icon-screen-smartphone',
        translate: 'sidebar.nav.TANKS',
        submenu: [{
            name: 'Lista zbiorników',
            path: '/mv/tank/all',
            translate: 'sidebar.nav.element.TANKS_LIST'
        },
            {
                name: 'Dodaj nowy',
                path:'/mv/tank/0',
                translate: 'sidebar.nav.element.ADD_NEW_TANK'
            }
        ]
    },
    {
        name: 'Dodatki',
        icon: 'icon-chemistry',
        translate: 'sidebar.nav.INGREDIENTS',
        submenu: [{
            name: 'Lista dodatków',
            path: '/mv/ingredient/all',
            translate: 'sidebar.nav.element.INGREDIENTS_LIST'
        },
            {
                name: 'Zarchiwizowane',
                path: '/mv/ingredient/archived',
                translate: 'sidebar.nav.element.ARCHIVED'
            },
            {
                name: 'Dodaj nowy',
                path: '/mv/ingredient/e/0',
                translate: 'sidebar.nav.element.ADD_NEW_INGREDIENT'
            }
        ]
    },
];

export default Menu;