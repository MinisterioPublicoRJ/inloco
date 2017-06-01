/**
* Creates menu array
* @param   {Object[]} layers Array of layers
* @returns {Object[]} Menu array with categories data, including layers IDs
*/
const menuReducer = (layers) => {
    let menu = []

    layers.forEach((layer) => {
        // creates menu item if it doesn't exists
        var menuAlreadyExists = false
        var subMenuAlreadyExists = false

        menu.forEach((menuItem) => {
            // check for menu existence
            if ( menuItem.id === layer.menu2[0] ) {
                menuAlreadyExists = true
            }

            // check for submenu existence
            if ( layer.menu2.length > 1 && menuItem.id === layer.menu2[1] ) {
                subMenuAlreadyExists = true
            }
        })

        // create new menu if needed
        if (!menuAlreadyExists) {
            // i'm sure it's a new item
            if (layer.menu2 !== '' && layer.menu2[0].trim() !== '') {
                // create menu item
                menu.push({
                    display: true,
                    id: layer.menu2[0],
                    title: layer.menu2[0],
                    layers: [],
                    idMenu: menu.length,
                    isSubMenu: false,
                    submenus: []
                })
            }
        }

        // then add the layer ID to an array of its menu item
        menu.forEach((menuItem) => {
            // make sure it has no submenu
            if ( layer.menu2.length === 1 && menuItem.id === layer.menu2[0]) {
                // add layer to this menu layers array
                menuItem.layers.push(layer.key)
            }
        })

        // new submenu
        if (!subMenuAlreadyExists) {
            // check if layer has submenu
            if (layer.menu2 !== '' && layer.menu2[1] && layer.menu2[1].trim() !== '') {
                // create submenu
                let thisSubmenuId = menu.length

                menu.push({
                    display: true,
                    id: layer.menu2[1],
                    title: layer.menu2[1],
                    layers: [],
                    idMenu: thisSubmenuId,
                    isSubMenu: true,
                    submenus: []
                })

                // include my submenu id to father menu submenus array
                menu.forEach((menuItem) => {
                    // find my father
                    if ( menuItem.id === layer.menu2[0] ) {
                        // add to submenus array
                        menuItem.submenus.push(thisSubmenuId)
                    }
                })
            }
        }

        // then add the layer ID to an array of its menu item
        if ( layer.menu2.length === 2 ) {
            // find submenu
            menu.forEach((menuItem) => {
                // find my submenu
                if ( menuItem.id === layer.menu2[1] ) {
                    // add layer to this submenu layers array
                    menuItem.layers.push(layer.key)
                }
            })
        }

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
