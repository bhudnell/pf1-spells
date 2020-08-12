import React from 'react';
import PropTypes from 'prop-types';

import { BasicParameters } from './BasicParameters';
import { AdvancedParameters } from './AdvancedParameters';

export class SearchParametersContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.isStateEmpty = this.isStateEmpty.bind(this);
    }

    isStateEmpty() {
        const entries = Object.entries(this.state);
        for (let i = 0; i < entries.length; i++) {
            if (entries[i][0] === 'searchString' && entries[i][1].length > 0) { // searchString
                return false;
            }
            else if (entries[i][0] === 'spellResistance' && entries[i][1] !== 'either') { // spellResistance
                return false;
            }
            else if (entries[i][1] === true) { // the rest
                return false;
            }
        }
        return true;
    }

    handleCheckboxChange(event) {
        this.setState({ [event.target.value]: event.target.checked });
    }

    handleTextChange(event) {
        this.setState({ searchString: event.target.value });
    }

    handleRadioChange(event) {
        this.setState({ spellResistance: event.target.value });
    }

    handleSubmit(event) {
        // prevent default form submit behavior
        event.preventDefault();

        // if there are no parameters, dont send request
        if (this.isStateEmpty()) {
            return;
        }

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
                    onRadioChange={this.handleRadioChange}
                />
            </div>
        );
    }
}

SearchParametersContainer.propTypes = {
    onUpdate: PropTypes.func.isRequired
};