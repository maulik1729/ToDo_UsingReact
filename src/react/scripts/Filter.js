import React from 'react';
import PropTypes from 'prop-types';
import {ALL,ACTIVE,COMPLETED} from "../../constants/state";
import FilterButton from "./FilterButton";

const  Filter = (props) => {
    return (
        <div className="filter">
            <FilterButton  stateName={ALL} {...props}/>
            <FilterButton  stateName={ACTIVE} {...props}/>
            <FilterButton  stateName={COMPLETED} {...props}/>
         </div>
    );
}

Filter.propTypes={
    onClick:PropTypes.func.isRequired
}

export default Filter;