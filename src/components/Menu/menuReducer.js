/**
* Creates menu array
* @param   {Object[]} layers Array of layers
* @returns {Object[]} Menu array with categories data, including layers IDs
*/
const menuReducer = (layers) => {
    const menu = []

    layers.forEach(layer => {
        if (layer.menu2) {
            // creates menu item if it doesn't exists
            const menuAlreadyExists = menu.some(menuItem => (layer.menu2[0] && menuItem.id === layer.menu2[0]))
            const subMenuAlreadyExists = menu.some(menuItem => (layer.menu2[1] && menuItem.id === layer.menu2[1]))

            // creates menu item if it doesn't exists
            if (!menuAlreadyExists && layer.menu2[0].trim()) {
                // create menu item
                menu.push({
                    display: true,
                    id: layer.menu2[0],
                    title: layer.menu2[0],
                    layers: [],
                    idMenu: menu.length,
                    isSubMenu: false,
                    submenus: [],
                });
            }

            // new submenu
            if (!subMenuAlreadyExists && layer.menu2[1] && layer.menu2[1].trim()) {
                // create submenu
                const thisSubmenuId = menu.length

                menu.push({
                    display: true,
                    id: layer.menu2[1],
                    title: layer.menu2[1],
                    layers: [],
                    idMenu: thisSubmenuId,
                    isSubMenu: true,
                    submenus: [],
                })

                // include my submenu id to father menu submenus array
                menu.forEach((menuItem) => {
                    // find my father
                    if (menuItem.id === layer.menu2[0]) {
                        // add to submenus array
                        menuItem.submenus.push(thisSubmenuId)
                    }
                })
            }

            // then add the layer ID to an array of its menu item
            menu.forEach((menuItem) => {
                // make sure it has no submenu
                if (layer.menu2.length === 1 && menuItem.id === layer.menu2[0]) {
                    // add layer to this menu layers array
                    menuItem.layers.push(layer.key)
                }

                // then add the layer ID to an array of its menu item
                if (layer.menu2.length === 2 && menuItem.id === layer.menu2[1]) {
                    // add layer to this submenu layers array
                    menuItem.layers.push(layer.key)
                }

            })
        }
    })

    // finally, sort menu categories in A-Z
    menu.sort((a, b) => {
        if (a.title < b.title) {
            return -1
        }
        if (a.title > b.title) {
            return 1
        }
        return 0
    })

    return menu
}

export default menuReducer
