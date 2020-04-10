const Menu = [
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
                name: 'Dodaj nową',
                path: {
                    pathname: '/mv/parcel/0',
                    state: {
                        from: '/mv/parcel/all'
                    }
                },
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
                name: 'Dodaj nową',
                path: {
                    pathname: '/mv/grapevine/0',
                    state: {
                        from: '/mv/grapevine/all'
                    }
                },
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
                name: 'Dodaj nowy',
                path: {
                    pathname: '/mv/harvest/0',
                    state: {
                        from: '/mv/harvest/all'
                    }
                },
                translate: 'sidebar.nav.element.ADD_NEW_HARVEST'
            }
        ]
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
                name: 'Dodaj nowy',
                path: {
                    pathname: '/mv/wine/0',
                    state: {
                        from: '/mv/wine/all'
                    }
                },
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
                path: {
                    pathname: '/mv/tank/0',
                    state: {
                        from: '/mv/tank/all'
                    }
                },
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
                name: 'Dodaj nowy',
                path: {
                    pathname: '/mv/ingredient/0',
                    state: {
                        from: '/mv/ingredient/all'
                    }
                },
                translate: 'sidebar.nav.element.ADD_NEW_INGREDIENT'
            }
        ]
    },
];

export default Menu;