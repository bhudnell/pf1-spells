import React from 'react';
import PropTypes from 'prop-types';

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

    this.createCheckboxRow = this.createCheckboxRow.bind(this);
    this.createRadioButtonRow = this.createRadioButtonRow.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleClicked = this.handleClicked.bind(this);
  }

  createCheckboxRow(checkboxArray) {
    return checkboxArray.map(element => {
      return (
        <td key={element.display}>
          <label>
            <input
              type="checkbox"
              value={element.value}
              onChange={this.props.onCheckboxChange}
            />
            {element.display}
          </label>
        </td>
      );
    });
  }

  createRadioButtonRow(radioArray) {
    return radioArray.map(element => {
      return (
        <td key={element.display}>
          <label>
            <input
              type="radio"
              value={element.value}
              checked={this.state.selectedOption === element.value}
              onChange={this.handleChecked}
            />
            {element.display}
          </label>
        </td>
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
        <button className={this.state.isOpened ? "collapsible active" : "collapsible"} onClick={this.handleClicked}>&nbsp;&nbsp;Advanced Parameters</button>
        <div className={this.state.isOpened ? "" : "hidden"}>
          <h4>Spell Resistance:</h4>
          <table>
            <tbody>
              <tr>
                {this.createRadioButtonRow(spellResistance)}
              </tr>
            </tbody>
          </table>
          <h4>Saves:</h4>
          <table>
            <tbody>
              <tr>
                {this.createCheckboxRow(saves)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

AdvancedParameters.propTypes = {
  onCheckboxChange: PropTypes.func.isRequired,
  onRadioChange: PropTypes.func.isRequired
};