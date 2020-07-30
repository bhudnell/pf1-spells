import React from 'react';
import PropTypes from 'prop-types';

export class Table extends React.Component {
    getTableContent(tableData) {
        // function to iterate through the tableData to create the table rows
        const createRows = tableData => {
           return tableData.map(row => {
             return (
                <tr key={row.spell_name}>
                   <td>{row.spell_name}</td>
                   <td>{row.spell_level}</td>
                   <td>{row.short_description}</td>
                   <td>{row.saving_throw}</td>
                   <td>{row.spell_resistance}</td>
                </tr>
             );
           })
        }

        // create the table itself
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Spell Name</th>
                        <th>Spell Level</th>
                        <th>Spell Description</th>
                        <th>Saving Throw</th>
                        <th>Spell Resistance</th>
                    </tr>
                    {createRows(tableData)}
                </tbody>
            </table>
        );
    };

    render() {
        if (this.props.tableData) {
            return <div>{this.getTableContent(this.props.tableData)}</div>;
        }
        else {            
            return <></>;
        }
    }        
}

Table.propTypes = {
    tableData: PropTypes.array
};