import React from 'react';

require('./menu.scss');

export default class Menu extends React.Component {
    render() {
        return (
            <ul className="menu">
                {
                    this.props.items.map((item) =>
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
                    )
                }
            </ul>
        );
    }
}
