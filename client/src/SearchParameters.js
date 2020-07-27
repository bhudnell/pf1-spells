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
            <input type="checkbox" value="arc" onChange={props.onCheckboxChange}/>
            <label>Arcanist</label>
            <input type="checkbox" value="bard"/>
            <label>Bard</label>
            <input type="checkbox" value="bloodrager"/>
            <label>Bloodrager</label>
            <input type="checkbox" value="cleric"/>
            <label>Cleric</label>
            <input type="checkbox" value="druid"/>
            <label>Druid</label>
            <input type="checkbox" value="hunter"/>
            <label>Hunter</label>
            <input type="checkbox" value="inquisitor"/>
            <label>Inquisitor</label>

            <br />

            <input type="checkbox" value="investigator"/>
            <label>Investigator</label>
            <input type="checkbox" value="magus"/>
            <label>Magus</label>
            <input type="checkbox" value="spell_medium"/>
            <label>Medium</label>
            <input type="checkbox" value="mesmerist"/>
            <label>Mesmerist</label>
            <input type="checkbox" value="occultist"/>
            <label>Occultist</label>
            <input type="checkbox" value="oracle"/>
            <label>Oracle</label>
            <input type="checkbox" value="paladin"/>
            <label>Paladin</label>
            <input type="checkbox" value="psychic"/>
            <label>Psychic</label>
            <input type="checkbox" value="ranger"/>
            <label>Ranger</label>

            <br />

            <input type="checkbox" value="shaman"/>
            <label>Shaman</label>
            <input type="checkbox" value="skald"/>
            <label>Skald</label>
            <input type="checkbox" value="sorc"/>
            <label>Sorcerer</label>
            <input type="checkbox" value="spiritualist"/>
            <label>Spiritualist</label>
            <input type="checkbox" value="summoner"/>
            <label>Summoner</label>
            <input type="checkbox" value="summoner_unchained"/>
            <label>Summoner (Unchained)</label>
            <input type="checkbox" value="witch"/>
            <label>Witch</label>
            <input type="checkbox" value="wiz"/>
            <label>Wizard</label>

            <br /><br />

            <input type="checkbox" value="spell_resistance" onChange={props.onCheckboxChange}/>
            <label>Spell Resistance</label>

            <br /><br />

            <input type="checkbox" value="fort" onChange={props.onCheckboxChange}/>
            <label>Fortitude Save</label>
            <input type="checkbox" value="ref" onChange={props.onCheckboxChange}/>
            <label>Reflex Save</label>
            <input type="checkbox" value="will"/>
            <label>Will Save</label>
            <input type="checkbox" value="nosave"/>
            <label>No Save</label>
            
            <br /><br />

            <input type="checkbox" value="0th" onChange={props.onCheckboxChange}/>
            <label>0th</label>
            <input type="checkbox" value="1st" onChange={props.onCheckboxChange}/>
            <label>1st</label>
            <input type="checkbox" value="2nd" onChange={props.onCheckboxChange}/>
            <label>2nd</label>
            <input type="checkbox" value="3rd"/>
            <label>3rd</label>
            <input type="checkbox" value="4th"/>
            <label>4th</label>
            <input type="checkbox" value="5th"/>
            <label>5th</label>
            <input type="checkbox" value="6th"/>
            <label>6th</label>
            <input type="checkbox" value="7th"/>
            <label>7th</label>
            <input type="checkbox" value="8th"/>
            <label>8th</label>
            <input type="checkbox" value="9th"/>
            <label>9th</label>
        </form>
    );
}

SearchParameters.propTypes = {
    onCheckboxChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired
};