# How to deploy

This file describes the steps to deploy a new version of InLoco into MPRJ servers.

1. Run `npm build`
1. Copy the contents of the `static` to a temporary folder. Name it `inloco`.
1. Zip that folder, so you'll have a file `inloco.zip`.
1. Copy that file to `X:\[Homologacao\Estatico|Produção]`
1. Open a GLPI (or ask someone to do it).

## GLPI

1. Open http://p-glpidti01.pgj.rj.gov.br and log in with your MPRJ account
1. Assistência > Chamados
1. Click on `+`
1. Fill the fields:
    - Categoria: *Deploy Homologação / Produção* (open one GLPI for each one)
    - Elementos associados: *MP em Mapas* (always)
    - Título: *Deploy Homologação / Produção Estático InLoco*
    - Descrição: The path X:\...
    - Prioridade: *Média* or higher if needed
    - *Don't* attach the zip file.
1. After the GLPI is done, open it and approve or refuse it.
