import React from 'react';
import PropTypes from 'prop-types';

export const Table = props => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Spell Resistance?</th>
                <th>Save</th> 
            </tr>
            <tr>
                <td>Fireball</td>
                <td>fireball go boom</td>
                <td>Yes</td>
                <td>Reflex</td>
            </tr>
            <tr>
                <td>Chains of light</td>
                <td>lock'em up... with light!</td>
                <td>No</td>
                <td>Reflex</td>
            </tr>
        </table>
    );
}

Table.propTypes = {
    tableData: PropTypes.object.isRequired
};