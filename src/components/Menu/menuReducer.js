/**
* Creates menu array
* @param   {Object[]} layers Array of layers
* @returns {Object[]} Menu array with categories data, including layers IDs
*/
const menuReducer = (layers) => {
    let menu = []

    layers.forEach((layer) => {
        // creates menu item if it doesn't exists
        var menuFound = false
        menu.forEach((menuItem) => {
            if (menuItem.id === layer.menu2) {
                menuFound = true
            }
        })
        if (!menuFound) {
            if (layer.menu2.trim() !== "") {
                menu.push({
                    display: true,
                    id: layer.menu2,
                    title: layer.menu2,
                    layers: [],
                    idMenu: menu.length
                })
            }
        }

        // then add the layer ID to an array of its menu item
        menu.forEach((menuItem) => {
            if (menuItem.id === layer.menu2) {
                menuItem.layers.push(layer.key)
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
