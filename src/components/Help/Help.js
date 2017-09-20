import React from 'react'
import { Steps } from 'intro.js-react'

import 'intro.js/introjs.css';

let introjsOptions = {
    initialStep: 0,
    steps: [
        {
            element: '.toolbar-item.fa-question',
            intro: 'Bem-vindo ao inLoco 2.0! Este passo a passo irá mostrar rapidamente as funcionalidades da plataforma.',
        },
        {
            element: '.application-header--menu-button',
            intro: 'Menu: Aqui você pode escolher múltiplas camadas para exibição no mapa, através de categorias ou busca textual.',
        },
        {
            element: '.leaflet-control-zoom',
            intro: 'Para ajustar a área exibida, você pode arrastar, e dar duplo clique ou usar a rodinha do mouse (botão do meio) para alterar o zoom. Você também pode arrastar segurando shift para dar zoom em uma região específica.',
        },
        {
            element: '.platform-toolbar',
            intro: 'Aqui você encontra diferentes ferramentas: zoom/destaque em uma área específica, busca por polígono, desenho livre/destaque no mapa, compartilhar e download.',
        },
        {
            element: '.toolbar-item.search',
            intro: 'Busca detalhada: aqui você pode buscar por CRAAIs, municípios ou bairros, destacando-os no mapa.',
        },
        {
            element: '.toolbar-item.polygonRequest',
            intro: 'Busca por área: aqui você pode obter informações sobre um recorte desenhado no mapa: pirâmide etária, quantidade de escolas etc.',
        },
        {
            element: '.toolbar-item.draw',
            intro: 'Desenho livre: aqui você pode inserir marcadores e polígonos no mapa, afim de destacar um determinado local.',
        },
        {
            element: '.toolbar-item.share',
            intro: 'Compartilhar: Clique aqui para copiar uma URL para esta visão do mapa.',
        },
        {
            element: '.toolbar-item.download',
            intro: 'Baixar: Clique aqui para baixar o mapa visualizado em tela em diferentes formatos.',
        },
        // {
        //     element: '.toolbar-item.about',
        //     intro: 'Sobre: Clique aqui para ver informações gerais sobre a plataforma.',
        // },
        {
            element: '.map-toolbar',
            intro: 'Aqui você encontra mais ferramentas: Google Street View™, busca por endereços ou pontos de referência, e mudança de mapa base.',
        },
        {
            element: '.toolbar-item.streetView',
            intro: 'Street View™: Clique aqui para ter uma visão panorâmica em 360° a nível do chão das ruas registradas nesta ferramenta do Google.',
        },
        {
            element: '.toolbar-item.searchStreet',
            intro: 'Busca de ruas: Clique aqui para buscar endereços ou pontos de interesse, para levar o mapa diretamente para o local desejado.',
        },
        {
            element: '.toolbar-item.basemaps',
            intro: 'Mapas de fundo: Clique aqui para alterar a camada de fundo, trocando entre imagens de satélite, terreno e mapas do Google Maps™ e OpenStreetMap.',
        },
    ],
    options: {
        hidePrev: true,
        hideNext: true,
        showBullets: false,
        showProgress: true,
        nextLabel: 'Próximo →',
        prevLabel: '← Anterior',
        skipLabel: 'Sair',
        doneLabel: 'Pronto!',
    }
}

const Help = ({ showHelp, onIntrojsExit }) => {

    const handleIntrojsExit = () => {
        onIntrojsExit()
    }

    return (
        <Steps
            enabled={showHelp}
            steps={introjsOptions.steps}
            initialStep={introjsOptions.initialStep}
            options={introjsOptions.options}
            onExit={handleIntrojsExit}
        />
    )
}

export default Help
