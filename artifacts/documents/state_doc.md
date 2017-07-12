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

- [searchString](#searchString)

- [showMenu](#showMenu)

- [showSidebarRight](#showSidebarRight)

- [tooltip](#tooltip)

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
**Type**: .

**Description**: .

## <a name="menuItems"></a> menuItems
**Type**: .

**Description**: .

## <a name="searchString"></a> searchString
**Type**: .

**Description**: .

## <a name="showMenu"></a> showMenu
**Type**: .

**Description**: .

## <a name="showSidebarRight"></a> showSidebarRight
**Type**: .

**Description**: .

## <a name="tooltip"></a> tooltip
**Type**: .

**Description**: .
