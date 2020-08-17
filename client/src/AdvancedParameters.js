import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';

const saves = [
    { value: "fortitude", display: "Fortitude" },
    { value: "reflex", display: "Reflex" },
    { value: "will", display: "Will" },
    { value: "none", display: "None" }
];

const spellResistance = [
    { value: "true", display: "Yes" },
    { value: "false", display: "No" },
    { value: "either", display: "Either" }
];

export class AdvancedParameters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            selectedOption: 'either'
        };

        this.createCheckboxsFromArray = this.createCheckboxsFromArray.bind(this);
        this.createRadioButtonsFromArray = this.createRadioButtonsFromArray.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleClicked = this.handleClicked.bind(this);
    }

    createCheckboxsFromArray(checkboxArray) {
        return checkboxArray.map(element => {
            return (
                <label className="checkbox" key={element.display}>
                    <input
                        type="checkbox"
                        value={element.value}
                        onChange={this.props.onCheckboxChange}
                    />
                    {element.display}
                </label>
            );
        });
    }

    createRadioButtonsFromArray(radioArray) {
        return radioArray.map(element => {
            return (
                <label className="checkbox" key={element.display}>
                    <input
                        type="radio"
                        value={element.value}
                        checked={this.state.selectedOption === element.value}
                        onChange={this.handleChecked}
                    />
                    {element.display}
                </label>
            );
        });
    }

    handleChecked(event) {
        this.setState({ selectedOption: event.target.value });
        this.props.onRadioChange(event);
    }

    handleClicked() {
        this.setState(state => ({ isOpened: !state.isOpened }));
    }

    render() {
        return (
            <div>
                <div className="config">
                    <button className={this.state.isOpened ? "collapsible active" : "collapsible"} onClick={this.handleClicked}>&nbsp;&nbsp;Advanced Parameters</button>
                </div>
                <Collapse isOpened={this.state.isOpened}>
                    <div className="blob">
                        <h4>Spell Resistance:</h4>
                        {this.createRadioButtonsFromArray(spellResistance)}
                        <br />
                        <h4>Saves:</h4>
                        {this.createCheckboxsFromArray(saves)}
                    </div>
                </Collapse>
            </div>
        );
    }
}

AdvancedParameters.propTypes = {
    onCheckboxChange: PropTypes.func.isRequired,
    onRadioChange: PropTypes.func.isRequired
};