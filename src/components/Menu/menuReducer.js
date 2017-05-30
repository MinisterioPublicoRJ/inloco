/**
* Creates menu array
* @param   {Object[]} layers Array of layers
* @returns {Object[]} Menu array with categories data, including layers IDs
*/
const menuReducer = (layers) => {
    let menu = []

    layers.forEach((layer) => {
        // creates top level menu item if it doesn't exists
        var menuTopLevelFound = false
        menu.forEach((menuItem) => {
            if (menuItem.id === layer.menu2[0]) {
                menuTopLevelFound = true
            }
        })
        if (!menuTopLevelFound) {
            if (layer.menu2 !== '' && layer.menu2[0].trim() !== '') {
                menu.push({
                    display: true,
                    id: layer.menu2[0],
                    title: layer.menu2[0],
                    layers: [],
                    idMenu: menu.length,
                    subMenu: []
                })
            }
        }

        // check if layer has submenu
        if (layer.menu2 !== '' && layer.menu2[1] && layer.menu2[1].trim() !== '') {

            // find menu element and add submenu to it
            menu.forEach((menuItem) => {
                if (menuItem.id === layer.menu2[0] ){

                    // found menu element, checking for submenu
                    let subMenuFound = false
                    menuItem.subMenu.forEach((subMenuItem) => {
                        if (subMenuItem.id === layer.menu2[1]) {
                            subMenuFound = true
                        }
                    })
                    if (!subMenuFound) {
                        menuItem.subMenu.push({
                            display: true,
                            id: layer.menu2[1],
                            title: layer.menu2[1],
                            layers: [],
                            idMenu: menuItem.subMenu.length
                        })
                    }
                }
            })
        }

        // then add the layer ID to an array of its menu item
        menu.forEach((menuItem) => {
            if (menuItem.id === layer.menu2[0]) {
                // first check if we should add to submenu
                if (layer.menu2[1] && menuItem.subMenu.length > 0) {
                    menuItem.subMenu.forEach((subMenuItem) => {
                        if (subMenuItem.id === layer.menu2[1]) {
                            subMenuItem.layers.push(layer.key)
                        }
                    })
                }
                // if not, add to menu
                else {
                    menuItem.layers.push(layer.key)
                }
            }
        })
    })

    // finally, sort menu categories in A-Z
    menu.sort((a, b)=>{
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
