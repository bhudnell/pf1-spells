import React from 'react';
import PropTypes from 'prop-types';

const classes = [
    { value: "alchemist", display: "Alchemist" },
    { value: "antipaladin", display: "Antipaladin" },
    { value: "arcanist", display: "Arcanist" },
    { value: "bard", display: "Bard" },
    { value: "bloodrager", display: "Bloodrager" },
    { value: "cleric", display: "Cleric" },
    { value: "druid", display: "Druid" },
    { value: "hunter", display: "Hunter" },
    { value: "inquisitor", display: "Inquisitor" }, // break
    { value: "investigator", display: "Investigator" },
    { value: "magus", display: "Magus" },
    { value: "medium", display: "Medium" },
    { value: "mesmerist", display: "Mesmerist" },
    { value: "occultist", display: "Occultist" },
    { value: "oracle", display: "Oracle" },
    { value: "paladin", display: "Paladin" },
    { value: "psychic", display: "Psychic" },
    { value: "ranger", display: "Ranger" }, // break
    { value: "shaman", display: "Shaman" },
    { value: "skald", display: "Skald" },
    { value: "sorcerer", display: "Sorcerer" },
    { value: "spiritualist", display: "Spiritualist" },
    { value: "summoner", display: "Summoner" },
    { value: "witch", display: "Witch" },
    { value: "wizard", display: "Wizard" },
    { value: "summoner_unchained", display: "Summoner (Unchained)" }
];

const spellLevel = [
    { value: "0th", display: "0th" },
    { value: "1st", display: "1st" },
    { value: "2nd", display: "2nd" },
    { value: "3rd", display: "3rd" },
    { value: "4th", display: "4th" },
    { value: "5th", display: "5th" },
    { value: "6th", display: "6th" },
    { value: "7th", display: "7th" },
    { value: "8th", display: "8th" },
    { value: "9th", display: "9th" }
];

const createTableRow = (checkboxArray, onChangeEvent) => checkboxArray.map(element => {
    return (
        <td key={element.display}>
            <label>
                <input
                    type="checkbox"
                    value={element.value}
                    onChange={onChangeEvent}
                />
                {element.display}
            </label>
        </ td>
    );
});

export const BasicParameters = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <input id="searchText" type="text" onChange={props.onTextChange}/>
            <input type="submit" value="Search"/>
            <br />
            <h4 className="parameterLabel">Class:</h4>
            <table className="parameters">
                <tbody>
                    <tr>
                        {createTableRow(classes.slice(0, 8), props.onCheckboxChange)}
                    </tr>
                    <tr>
                        {createTableRow(classes.slice(8, 17), props.onCheckboxChange)}
                    </tr>
                    <tr>
                        {createTableRow(classes.slice(17, 26), props.onCheckboxChange)}
                    </tr>
                </tbody>
            </table>
            <h4 className="parameterLabel">Spell level:</h4>
            <table className="parameters">
                <tbody>
                    <tr>
                        {createTableRow(spellLevel, props.onCheckboxChange)}
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

BasicParameters.propTypes = {
    onCheckboxChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired
};