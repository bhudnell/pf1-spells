import React from 'react';
import PropTypes from 'prop-types';

export const SearchParameters = props => {
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
        { value: "spell_medium", display: "Medium" },
        { value: "mesmerist", display: "Mesmerist" },
        { value: "occultist", display: "Occultist" },
        { value: "oracle", display: "Oracle" },
        { value: "paladin", display: "Paladin" },
        { value: "psychic", display: "Psychic" },
        { value: "ranger", display: "Ranger" }, // break
        { value: "shaman", display: "Shaman" },
        { value: "skald", display: "Skald" },
        { value: "sorc", display: "Sorcerer" },
        { value: "spiritualist", display: "Spiritualist" },
        { value: "summoner", display: "Summoner" },
        { value: "summoner_unchained", display: "Summoner (Unchained)" },
        { value: "witch", display: "Witch" },
        { value: "wiz", display: "Wizard" }
    ];
    const saves = [
        { value: "fortitude", display: "Fortitude Save" },
        { value: "reflex", display: "Reflex Save" },
        { value: "will", display: "Will Save" },
        { value: "none", display: "No Save" }
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
    const iterateCheckboxArray = checkboxArray => checkboxArray.map(element => {
        return (
            <React.Fragment key={element.display}>
                <input
                    type="checkbox"
                    value={element.value}
                    onChange={props.onCheckboxChange}
                />
                <label className="CheckboxLabel">{element.display}</label>
            </React.Fragment>
        );
    });

    return (
        <form onSubmit={props.onSubmit}>
            <input type="text" onChange={props.onTextChange}/>
            <input type="submit" value="Search"/> 
            <br /><br />
            {iterateCheckboxArray(classes.slice(0, 9))}
            <br />
            {iterateCheckboxArray(classes.slice(9, 18))}
            <br />
            {iterateCheckboxArray(classes.slice(18, 26))}
            <br /><br />
            <input type="checkbox" value="spell_resistance" onChange={props.onCheckboxChange}/>
            <label>Spell Resistance</label>
            <br /><br />
            {iterateCheckboxArray(saves)}            
            <br /><br />
            {iterateCheckboxArray(spellLevel)}
        </form>
    );
}

SearchParameters.propTypes = {
    onCheckboxChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired
};