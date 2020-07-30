import React from 'react';
import PropTypes from 'prop-types';

import { SearchParameters } from './SearchParameters';

export class SearchParametersContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCheckboxChange(event) {
        this.setState({ [event.target.value]: event.target.checked });
    }

    handleTextChange(event) {
        this.setState({ searchString: event.target.value });
    }

    handleSubmit(event) {
        const queryBase = '/api/spellsearch?'; // todo dont send if its a blank query
        let queryParams = '';
        Object.entries(this.state).forEach(entry => {
            queryParams += `${entry[0]}=${entry[1]}&`;
        });
        const queryString = queryBase + queryParams.slice(0, -1);

        fetch(queryString)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            //this.props.onUpdate(result); todo uncomment when table is ready
        },
        error => {
            console.log(error);
        });
    }

    render() {
        return <SearchParameters
            onCheckboxChange={this.handleCheckboxChange}
            onSubmit={this.handleSubmit}
            onTextChange={this.handleTextChange} />;
    }
}

SearchParametersContainer.propTypes = {
    onUpdate: PropTypes.func.isRequired
};