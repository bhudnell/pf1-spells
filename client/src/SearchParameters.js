import React from 'react';
import PropTypes from 'prop-types';

export const SearchParameters = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <input type="text" onChange={props.onTextChange}/>
            <input type="submit" value="Search"/> 

            <br /><br />

            <input type="checkbox" value="alchemist" onChange={props.onCheckboxChange}/>
            <label>Alchemist</label>
            <input type="checkbox" value="antipaladin" onChange={props.onCheckboxChange}/>
            <label>Antipaladin</label>
            <input type="checkbox" value="arcanist" onChange={props.onCheckboxChange}/>
            <label>Arcanist</label>
            <input type="checkbox" value="bard" onChange={props.onCheckboxChange}/>
            <label>Bard</label>
            <input type="checkbox" value="bloodrager" onChange={props.onCheckboxChange}/>
            <label>Bloodrager</label>
            <input type="checkbox" value="cleric" onChange={props.onCheckboxChange}/>
            <label>Cleric</label>
            <input type="checkbox" value="druid" onChange={props.onCheckboxChange}/>
            <label>Druid</label>
            <input type="checkbox" value="hunter" onChange={props.onCheckboxChange}/>
            <label>Hunter</label>
            <input type="checkbox" value="inquisitor" onChange={props.onCheckboxChange}/>
            <label>Inquisitor</label>

            <br />

            <input type="checkbox" value="investigator" onChange={props.onCheckboxChange}/>
            <label>Investigator</label>
            <input type="checkbox" value="magus" onChange={props.onCheckboxChange}/>
            <label>Magus</label>
            <input type="checkbox" value="spell_medium" onChange={props.onCheckboxChange}/>
            <label>Medium</label>
            <input type="checkbox" value="mesmerist" onChange={props.onCheckboxChange}/>
            <label>Mesmerist</label>
            <input type="checkbox" value="occultist" onChange={props.onCheckboxChange}/>
            <label>Occultist</label>
            <input type="checkbox" value="oracle" onChange={props.onCheckboxChange}/>
            <label>Oracle</label>
            <input type="checkbox" value="paladin" onChange={props.onCheckboxChange}/>
            <label>Paladin</label>
            <input type="checkbox" value="psychic" onChange={props.onCheckboxChange}/>
            <label>Psychic</label>
            <input type="checkbox" value="ranger" onChange={props.onCheckboxChange}/>
            <label>Ranger</label>

            <br />

            <input type="checkbox" value="shaman" onChange={props.onCheckboxChange}/>
            <label>Shaman</label>
            <input type="checkbox" value="skald" onChange={props.onCheckboxChange}/>
            <label>Skald</label>
            <input type="checkbox" value="sorc" onChange={props.onCheckboxChange}/>
            <label>Sorcerer</label>
            <input type="checkbox" value="spiritualist" onChange={props.onCheckboxChange}/>
            <label>Spiritualist</label>
            <input type="checkbox" value="summoner" onChange={props.onCheckboxChange}/>
            <label>Summoner</label>
            <input type="checkbox" value="summoner_unchained" onChange={props.onCheckboxChange}/>
            <label>Summoner (Unchained)</label>
            <input type="checkbox" value="witch" onChange={props.onCheckboxChange}/>
            <label>Witch</label>
            <input type="checkbox" value="wiz" onChange={props.onCheckboxChange}/>
            <label>Wizard</label>

            <br /><br />

            <input type="checkbox" value="spell_resistance" onChange={props.onCheckboxChange}/>
            <label>Spell Resistance</label>

            <br /><br />

            <input type="checkbox" value="fort" onChange={props.onCheckboxChange}/>
            <label>Fortitude Save</label>
            <input type="checkbox" value="ref" onChange={props.onCheckboxChange}/>
            <label>Reflex Save</label>
            <input type="checkbox" value="will" onChange={props.onCheckboxChange}/>
            <label>Will Save</label>
            <input type="checkbox" value="nosave" onChange={props.onCheckboxChange}/>
            <label>No Save</label>
            
            <br /><br />

            <input type="checkbox" value="0th" onChange={props.onCheckboxChange}/>
            <label>0th</label>
            <input type="checkbox" value="1st" onChange={props.onCheckboxChange}/>
            <label>1st</label>
            <input type="checkbox" value="2nd" onChange={props.onCheckboxChange}/>
            <label>2nd</label>
            <input type="checkbox" value="3rd" onChange={props.onCheckboxChange}/>
            <label>3rd</label>
            <input type="checkbox" value="4th" onChange={props.onCheckboxChange}/>
            <label>4th</label>
            <input type="checkbox" value="5th" onChange={props.onCheckboxChange}/>
            <label>5th</label>
            <input type="checkbox" value="6th" onChange={props.onCheckboxChange}/>
            <label>6th</label>
            <input type="checkbox" value="7th" onChange={props.onCheckboxChange}/>
            <label>7th</label>
            <input type="checkbox" value="8th" onChange={props.onCheckboxChange}/>
            <label>8th</label>
            <input type="checkbox" value="9th" onChange={props.onCheckboxChange}/>
            <label>9th</label>
        </form>
    );
}

SearchParameters.propTypes = {
    onCheckboxChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired
};