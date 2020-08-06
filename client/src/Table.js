import React from 'react';
import PropTypes from 'prop-types';

export class Table extends React.Component {
    getTableContent(tableData) {
        // function to iterate through the tableData to create the table rows
        const createRows = tableData => {
           return tableData.map(row => {
             return (
                <tr key={row.spell_name}>
                   <td className="bordered">{row.spell_name}</td>
                   <td className="bordered">{row.spell_level}</td>
                   <td className="bordered">{row.short_description}</td>
                   <td className="bordered">{row.saving_throw}</td>
                   <td className="bordered">{row.spell_resistance}</td>
                </tr>
             );
           })
        }

        // create the table itself
        return (
            <table className="bordered">
                <tbody>
                    <tr>
                        <th className="bordered">Spell Name</th>
                        <th className="bordered">Spell Level</th>
                        <th className="bordered">Spell Description</th>
                        <th className="bordered">Saving Throw</th>
                        <th className="bordered">Spell Resistance</th>
                    </tr>
                    {createRows(tableData)}
                </tbody>
            </table>
        );
    };

    render() {
        return (
            <div className="results" id="tableContainer">
                {this.props.tableData ? this.getTableContent(this.props.tableData) : null}
            </div>
        );
    }        
}

Table.propTypes = {
    tableData: PropTypes.array
};