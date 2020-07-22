import React from 'react';
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

        console.log(event.target);
        console.log(event.target.value);
        console.log(event.target.checked);
    }

    handleTextChange(event) {
        this.setState({ searchString: event.target.value });

        console.log(event.target);
        console.log(event.target.value);
    }

    handleSubmit(event) {
        fetch('http://localhost:5000/api/spells?searchString=sdghaksdg&sorc=true&wiz=false')
            .then(res => res.json())
            .then(result => {
                console.log(result);
            },
            error => {
                console.log(error);
            });
    }

    render() {
        return <SearchParameters
            handleCheckboxChange={this.handleCheckboxChange}
            handleSubmit={this.handleSubmit}
            handleTextChange={this.handleTextChange} />;
    }
}