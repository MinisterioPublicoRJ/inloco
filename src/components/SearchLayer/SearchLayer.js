import React from 'react';

const SearchLayer = ({searchLayer}) => {
    console.log(searchLayer);
    let input;
    return (
        <form action="#">
            <input
                type="text"
                ref={node => {input = node;}}
                onKeyUp={() => {
                    searchLayer(input.value)
                }}/>
        </form>
    );
};

export default SearchLayer;
