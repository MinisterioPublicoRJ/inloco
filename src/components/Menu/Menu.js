import React from 'react';
import MenuItem from '../MenuItem/MenuItem';

require('./menu.scss');

const Menu = ({menu, camadas}) => {
    console.log("menu", menu, "camadas", camadas);
    return (
        <ul className="menu">
            {
                menu.map((item) => <MenuItem item={item} camadas={camadas} />)
            }
        </ul>
    );
}

export default Menu;

/*
export default class Menu extends React.Component {
    constructor() {
        super();
        const {store} = this.context;
        console.log('props',store);
    }
    render() {
        return (
            <ul className="menu">
                {
                    this.props.menu.map((item) =>
                        <li>{item.title}</li>
                    )
                }
            </ul>
        );
    }
}*/


/*

<li>{item.title}
                            {
                                this.props.hasSubItem ?
                                    <ul>
                                        {
                                            item[this.props.subItemPropName].map((camada) =>
                                                <li>{camada.title}</li>
                                            )
                                        }
                                    </ul>
                                : ''
                            }
                        </li>

*/
