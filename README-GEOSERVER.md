# GeoServer

Our GeoServer admin panel runs on MPRJ network and is not exposed to the Internet. The frontend makes calls to an nginx proxy, which only forwards WMS/WFS requests.

This document describes the tags used on the layers to add different caracteristics on the inLoco frontend.

## Layers tags

The frontend expects that the layers have the following tags. Some are required, some are not. Layers that don't have required tags will be ignored.

### Menu **(required)**

In order to appear on the menu, layers _should_ have both `menu` and `menu2` tags. `menu` was used in [old inLoco 1.0](apps.mprj.mp.br/sistema/mpmapas/inloco.html) and was kept for retrocompatibility.

- `menu:xxxx` is a hardcoded string to a menu category on the old system (for instance `menu:educacao`)

- `menu2:xxxx[:xxxx]` is the tag used to create the element on the menu. It can either be a single level (for instance, `menu2:Educação`) or dual level (for instance, `menu2:Educação:IDEB por município`). The system will read the tags and create the menu dynamically.

Important notes:

- Both `menu` and `menu2` are required, if a tag has `menu2` but not `menu` it will not appear on the menu

- `menu2` tags are case sensitive and have spaces, therefore if you create a layer with the tag `menu2:Educação` and another with `menu2: Educação` (notice the space) you will end up with duplicate menu items on the app.

### Styles ordering **(not required)**

When a layer has the tag `ordenar`, the styles are organized alphabetically in descending order (Z-A). Thus, the last style name (tipically "(...) 2017") is display first, then the one for last year and so on. This tag is not required.

### Table ordering **(not required)**

When opening a layer and clicking on the map, the right sidebar opens with details of the given point(s)/area(s). This details includes a small table with up to 3 items. This table will show the first three columns on the database, except if specified by this tag, which follows this standard:

`tabela:["column1","column2","column3"]`

For instance, the layer `Educação > Escolas` have the following tag: `tabela:["Escola","Rede","Gestão"]`.

This tag is not required, and if not present the table will present the first 3 items on the database.

### Charts **(not required)**

This non-required tag specify that a chart should appear when displaying information about one or more features. It uses the following specification:

`grafico:type|title|entity|column1-display-name/column1-name[,...]`

The app supports one of the following chart types: `linha`, `barra`, `barra-horizontal`, `pizza`, `piramide`. Respectivelly, they can be translated to: line chart, bar chart, horizontal bar chart, pie chart and pyramid chart.

It's easier to understand with an example (layer `Segurança > Instituto de Segurança Pública > ISP: Armamentos`):

`grafico:linha|Artefato|dp_nome|2016T1/artefato_t1_2016,2016T2/artefato_t2_2016,2016T3/artefato_t3_2016,2016T4/artefato_t4_2016,2017T1/artefato_t1_2017,2017T2/artefato_t2_2017`

So the chart type is `linha`, the chart title is `Artefato`, the `entity` is `dp_nome` (so it will appear on the chart legend), and then there is a number of columns, separated by `,`, each one having their display name (`2016T1`, for instance) and the respective column (`artefato_t1_2016`, for instance), separated by `/`.

`piramide` charts are used to display, in most cases, population number spread by age, and are automatically split in half (for men and women). The columns are specified manually like in the following example:

`grafico:piramide|Pirâmide Etária|Código_Setor_Censitário|0-3/h_0_3,4-7/h_4_7,8-11/h_8_11,12-15/h_12_15,16-19/h_16_19,20-23/h_20_23,24-27/h_24_27,28-31/h_28_31,32-35/h_32_35,36-39/h_36_39,40-43/h_40_43,44-47/h_44_47,48-51/h_48_51,52-55/h_52_55,56-59/h_56_59,60-63/h_60_63,64-67/h_64_67,68-71/h_68_71,72-75/h_72_75,76-79/h_76_79,80-83/h_80_83,84-87/h_84_87,88-91/h_88_91,92-95/h_92_95,96-99/h_96_99,0-3/m_0_3,4-7/m_4_7,8-11/m_8_11,12-15/m_12_15,16-19/m_16_19,20-23/m_20_23,24-27/m_24_27,28-31/m_28_31,32-35/m_32_35,36-39/m_36_39,40-43/m_40_43,44-47/m_44_47,48-51/m_48_51,52-55/m_52_55,56-59/m_56_59,60-63/m_60_63,64-67/m_64_67,68-71/m_68_71,72-75/m_72_75,76-79/m_76_79,80-83/m_80_83,84-87/m_84_87,88-91/m_88_91,92-95/m_92_95,96-99/m_96_99`

`grafico` tags are not required, and a single layer can have multiple tags. In this case the system will display them in the order they were inserted on the GeoServer database.
