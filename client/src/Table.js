import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const tableColumns = [
    { value: 'spell_name', display: 'Spell Name' },
    { value: 'spell_level', display: 'Spell Level' },
    { value: 'short_description', display: 'Spell Description' },
    { value: 'saving_throw', display: 'Saving Throw' },
    { value: 'spell_resistance', display: 'Spell Resistance' }
];

const createHeaders = (headers, isSorted, sortDirection, onSortEvent) => {
    return headers.map(header => {
        return (
            <th
                key={header.display}
                className={isSorted[header.value] ? (sortDirection[header.value] ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                onClick={e => onSortEvent(e, header.value)}
            >
                {header.display}
            </th>
        );
    });
}

const createRows = (data, isExpanded, onExpandEvent) => {
    return data.map((row, index) => {
        return (
            <React.Fragment key={row.spell_name}>
                <tr className="bordered" onClick={e => onExpandEvent(e, index)}>
                    <td className="bordered">{row.spell_name}</td>
                    <td className="bordered">{row.spell_level}</td>
                    <td className="bordered">{row.short_description}</td>
                    <td className="bordered">{row.saving_throw}</td>
                    <td className="bordered">{row.spell_resistance}</td>
                </tr>
                <tr className={isExpanded[index] ? "" : "hidden"}>
                    <td className="expand" colSpan={tableColumns.length}>
                        {ReactHtmlParser(row.description_formatted)}
                    </td>
                </tr>
            </React.Fragment>
        );
    });
}

export const Table = props => {
    return (
        <table className="bordered">
            <tbody>
                <tr>
                    {createHeaders(tableColumns, props.isSorted, props.sortDirection, props.onSort)}
                </tr>
                {createRows(props.data, props.isExpanded, props.onExpand)}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    isSorted: PropTypes.object.isRequired,
    sortDirection: PropTypes.object.isRequired,
    isExpanded: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired
};