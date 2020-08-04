import React from 'react';
import PropTypes from 'prop-types';

import { BasicParameters } from './BasicParameters';
import { AdvancedParameters } from './AdvancedParameters';

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
        // prevent default form submit behavior
        event.preventDefault();

        const queryBase = '/api/spellsearch?';
        let queryParams = '';

        Object.entries(this.state).forEach(entry => {
            queryParams += `${entry[0]}=${entry[1]}&`;
        });
        const queryString = queryBase + queryParams.slice(0, -1);

        fetch(queryString)
        .then(res => res.json())
        .then(result => {
            this.props.onUpdate(result);
        },
        error => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <BasicParameters
                    onCheckboxChange={this.handleCheckboxChange}
                    onSubmit={this.handleSubmit}
                    onTextChange={this.handleTextChange}
                />
                <br />
                <AdvancedParameters
                    onCheckboxChange={this.handleCheckboxChange}
                />
            </div>
        );
    }
}

SearchParametersContainer.propTypes = {
    onUpdate: PropTypes.func.isRequired
};