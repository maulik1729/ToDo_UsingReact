import React from 'react';

const FilterButton = (props) => {
    console.log(props);
    return (
        <span className={"filter__item "+(props.currentState==props.stateName?"filter__item--dark":"")}
              onClick={()=>props.onClick(props.stateName)}
        >{props.stateName}
        </span>
    )
}

export default FilterButton;