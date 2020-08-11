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
    { value: "yes", display: "Yes" },
    { value: "no", display: "No" },
    { value: "either", display: "Either" }
];

export class AdvancedParameters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: false,
            selectedOption: 'either'
        };

        this.iterateCheckboxArray = this.iterateCheckboxArray.bind(this);
        this.iterateRadioArray = this.iterateRadioArray.bind(this);
        this.onClicked = this.onClicked.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }

    onClicked() {
        this.setState(state => ({ isOpened: !state.isOpened }));
    }

    onChecked(event) {
        this.setState({ selectedOption: event.target.value });
        this.props.onRadioChange(event);
    }

    iterateCheckboxArray(checkboxArray) {
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

    iterateRadioArray(radioArray) {
        return radioArray.map(element => {
            return (
                <label className="checkbox" key={element.display}>
                    <input
                        type="radio"
                        value={element.value}
                        checked={this.state.selectedOption === element.value}
                        onChange={this.onChecked}
                    />
                    {element.display}
                </label>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="config">
                    <button className={this.state.isOpened ? "collapsible active" : "collapsible"} onClick={this.onClicked}>&nbsp;&nbsp;Advanced Parameters</button>
                </div>
                <Collapse isOpened={this.state.isOpened}>
                    <div className="blob">
                        <h4>Spell Resistance:</h4>
                        {this.iterateRadioArray(spellResistance)}
                        <br />
                        <h4>Saves:</h4>
                        {this.iterateCheckboxArray(saves)}
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