import React from 'react'

const News = ({onCloseModal}) => {

    return (
        <div className="news-container">
            <span className="intro"> Bem-vindo a plataforma de mapas interativos do  inLoco 2.0! A nova plataforma é moderna e intuitiva e permite ao usuário visualizar e sobrepor dados geográficos de diversos assuntos, realizar buscas e dispor de diversas informações. Além das consultas de sempre, essa ferramenta traz de forma acessível novas funcionalidades e está disponível para uso no seu dia a dia: </span>
            <ol className="news-modal-list">
                <li>
                    <strong> Desenho livre </strong> – É uma ferramenta rápida e fácil que permite que você desenhe ou demarque um ponto de interesse ou áreas relevantes no mapa.
                </li>
                <li>
                    <strong> Busca por polígono ou área </strong> – Facilita a busca de uma área fechada em determinada região e a descreve com varias informações num raio de distância definido no mapa.
                </li>

                <li>
                    <strong> Busca de endereço  </strong> – É um serviço que permite buscar um endereço ou um ponto de interesse, através de uma busca textual.
                </li>

                <li>
                    <strong> Mudar a camada de fundo </strong> – É possível alterar o estilo de plano de fundo do mapa oferecendo imagens por satélite, terrenos ou logradouros do Estado do Rio de Janeiro.
                </li>

                <li>
                    <strong> Google Street View </strong> – A nova ferramenta agora está integrada ao Street View, que é um recurso do Google. Ela disponibiliza vistas panorâmicas de 360° e permite que os usuários vejam partes de algumas regiões ao nível do chão/solo.
                </li>
            </ol>
            {/*
            * Date.now of last update
            */}
            <div className="modal-options--back">
                <button id="newsTimestamp" className="modal-options--link" data-value="1505847454072" onClick={onCloseModal}>
                    Fechar e não exibir novamente
                </button>
            </div>
        </div>
    )
}

export default News
