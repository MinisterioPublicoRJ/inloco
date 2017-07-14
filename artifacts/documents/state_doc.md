# State Documentation
## Attributes Index
- [currentLevel](#currentLevel)

- [layers](#layers)
    - [bbox](#bbox)
    - [caops](#caops)
    - [description](#description)
    - [display](#display)
    - [id](#id)
    - [key](#key)
    - [layerName](#layerName)
    - [match](#match)
    - [menu](#menu)
    - [menu2](#menu2)
    - [name](#name)
    - [restricted](#restricted)
    - [selected](#selected)
    - [selectedLayerStyleId](#selectedLayerStyleId)
    - [showDescription](#showDescription)
    - [styles](#styles)
    - [title](#title)
    - [workspace](#workspace)

- [mapProperties](#mapProperties)

- [menuItems](#menuItems)
    - [displayMenuItems](#display)
    - [idMenuItems](#id)
    - [idMenu](#idMenu)
    - [isSubMenu](#isSubMenu)
    - [layersMenuItems](#layersMenuItems)
    - [matchMenuItems](#matchMenuItems)
    - [submenus](#submenus)
    - [titleMenuItems](#titleMenuItems)
    

- [searchString](#searchString)

- [showMenu](#showMenu)

- [showSidebarRight](#showSidebarRight)

- [tooltip](#tooltip)
    - [show](#showTooltip)
    - [sidebarLeftWidth](#sidebarLeftWidthTooltip)
    - [text](#textTooltip)
    - [top](#topTooltip)

## <a name="currentLevel"></a> currentLevel
**Type**: Number.

**Description**: represents the current level of the sidebar left menu.

**Example**: When sidebar left menu is first opened, the `currentLevel` attribute is 0. This is the starting level. When the user selects a category, for instance, "Educação", the `currentLevel` attribute changes to 1. And if the user selects a sub category, for instance "Ideb por município", the `currentLevel` attribute changes to 2.

## <a name="layers"></a> layers
**Type**: Array[Object].

**Description**: represents the array of layers provided by the geoserver, that are shown on the sidebar left menu. This attribute never changes.

### <a name="bbox"></a> bbox
**Type**: String.

**Description**: bbox stands for bounding box, and is a geoserver parameter. It is automatically determined by taking the union of the bounds of the specified layers.

### <a name="caops"></a> caops
**Type**: Array[String].

**Description**: CAOP stands for "Centro de Apoio Operacional às Promotorias", which is portuguese for Prosecution Operational Support Center. This attribute contains a list of CAOPs related to the layer.

### <a name="description"></a> description
**Type**: String.

**Description**: It represents the layer description.

### <a name="display"></a> display
**Type**: Boolean.

**Description**: It is an attribute created when the system receives the layer from the server. It is always true and it seems that the system doesn't use it anywhere. Maybe we should remove it.

### <a name="id"></a> id
**Type**: String.

**Description**: It represents the id of the layer, defined by a geoserver parameter. It contains a prefix string representing the workspace attribute from geoserver, separated by "_" character.

### <a name="key"></a> key
**Type**: Number.

**Description**: It represents the original position of each layer on the layers' array.

### <a name="layerName"></a> layerName
**Type**: String.

**Description**: Represents the layer name defined by the geoserver. It contains a prefix string representing the workspace attribute from geoserver, separated by ":" character.

### <a name="match"></a> match
**Type**: Boolean.

**Description**: Represents if a layer matches the user search. Initially, it is true for all layers.

### <a name="menu"></a> menu
**Type**: String.

**Description**: Represents to which menu that layer is contained.

### <a name="menu2"></a> menu2
**Type**: Array[String].

**Description**: Represents to which menu and submenus that layer is contained.

### <a name="name"></a> name
**Type**: String.

**Description**: It represents a name defined by the geoserver.

### <a name="restricted"></a> restricted
**Type**: Boolean.

**Description**: It represents layers that are restricted from public access. It could happen because the layer is not ready yet for publishing or because it should not be presented to the public at all.

### <a name="selected"></a> selected
**Type**: Boolean.

**Description**: It represents if a layer is selected by the user or not.

### <a name="selectedLayerStyleId"></a> selectedLayerStyleId
**Type**: Number.

**Description**: It contains the index of the style that is currently selected by the user. The default value is 0, since it is the firs style.

### <a name="showDescription"></a> showDescription
**Type**: Boolean.

**Description**: It represents if a layer should show it's tooltip description or not. This attribute is true for a layer when the user is hovering it.

### <a name="styles"></a> styles
**Type**: Array[Object].

**Description**: It contains an array style objects. These styles are defined by the geoserver and are displayed in the system for the user to choose.

### <a name="title"></a> title
**Type**: String.

**Description**: It represents the title that is presented on the menu.

### <a name="workspace"></a> workspace
**Type**: String.

**Description**: It represents the workspace attribute defined by geoserver.

## <a name="mapProperties"></a> mapProperties
**Type**: Object.

**Description**: This object contains the map's initial coordinates, lat, lng and zoom.

## <a name="menuItems"></a> menuItems
**Type**: Array[Object].

**Description**: It represents a list of menu items.

### <a name="displayMenuItems"></a> display
**Type**: Boolean.

**Description**: It is a value defined by menuReducer that is not used in the system. We should remove it.

### <a name="idMenuItems"></a> id
**Type**: String.

**Description**: Represents the id of a menu item.

### <a name="idMenu"></a> idMenu
**Type**: Number.

**Description**: Represents the original position of a menu item in the array returned by GeoServer.

### <a name="isSubMenu"></a> isSubMenu
**Type**: Boolean.

**Description**: Indicates if this menu is a submenu or not.

### <a name="layersMenuItems"></a> layers
**Type**: Array[Number].

**Description**: It is an array that contains a reference to each layer position in the layers' array, that corresponds to a menu item.

### <a name="matchMenuItems"></a> match
**Type**: Boolean.

**Description**: Indicates if a menu item has any layers that matches a search string.

### <a name="submenus"></a> submenus
**Type**: Array[Number].

**Description**: It is an array that contains a reference to a menu item position that happens to be a sub menu to this menu item.

### <a name="titleMenuItems"></a> title
**Type**: String.

**Description**: It is a string that holds the title of the menu item. It is used on the menu.

## <a name="searchString"></a> searchString
**Type**: String.

**Description**: This attribute represents the search string provided by the user, when searching layers.

## <a name="showMenu"></a> showMenu
**Type**: Boolean.

**Description**: Represents if the left menu is or should be open or not.

## <a name="showSidebarRight"></a> showSidebarRight
**Type**: Boolean.

**Description**: Represents if the right menu is or should be open or not.

## <a name="tooltip"></a> tooltip
**Type**: Object.

**Description**: This attribute represents a tooltip object.

### <a name="showTooltip"></a> show
**Type**: Boolean.

**Description**: This attribute represents if tooltip is being shown or not.

### <a name="sidebarLeftWidthTooltip"></a> sidebarLeftWidth
**Type**: Number.

**Description**: This attribute represents the sidebar left width, so the tooltip can be positioned correctly in the x axis.

### <a name="textTooltip"></a> text
**Type**: String.

**Description**: This attribute contains the text that will appear inside the tooltip.

### <a name="topTooltip"></a> top
**Type**: Number.

**Description**: This attribute represents the position of the tooltip on the y axis.
