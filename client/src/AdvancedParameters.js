import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';

const saves = [
    { value: "fortitude", display: "Fortitude Save" },
    { value: "reflex", display: "Reflex Save" },
    { value: "will", display: "Will Save" },
    { value: "none", display: "No Save" }
];

export class AdvancedParameters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isOpened: false};

        this.iterateCheckboxArray = this.iterateCheckboxArray.bind(this);
        this.onClicked = this.onClicked.bind(this);
    }

    onClicked() {
        this.setState(state => ({
            isOpened: !state.isOpened
          }));
    }

    iterateCheckboxArray(checkboxArray) {
        return checkboxArray.map(element => {
            return (
                <React.Fragment key={element.display}>
                    <input
                        type="checkbox"
                        value={element.value}
                        onChange={this.props.onCheckboxChange}
                    />
                    <label className="checkbox">{element.display}</label>
                </React.Fragment>
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
                        <input type="checkbox" value="spell_resistance" onChange={this.props.onCheckboxChange}/>
                        <label>Spell Resistance</label>
                        <br /><br />
                        {this.iterateCheckboxArray(saves)}
                    </div>
                </Collapse>
            </div>
        );
    }
}

AdvancedParameters.propTypes = {
    onCheckboxChange: PropTypes.func.isRequired
};