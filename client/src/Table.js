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

export class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isSorted: {
                spell_name: false,
                spell_level: false,
                short_description: false,
                saving_throw: false,
                spell_resistance: false
            },
            sortDirection: { // true = ascending, false = descending
                spell_name: true,
                spell_level: true,
                short_description: true,
                saving_throw: true,
                spell_resistance: true
            },
            isSearch: false,
            isDropDown: [],
            prevExpand: -1
        };

        this.onSort = this.onSort.bind(this);
        this.getTableContent = this.getTableContent.bind(this);
        this.doExpand = this.doExpand.bind(this);
    }

    doExpand(e, index) {
        const isDropDown = this.state.isDropDown;

        isDropDown[index] = !isDropDown[index];
        if (this.state.prevExpand !== -1 && this.state.prevExpand !== index) {
            isDropDown[this.state.prevExpand] = false;
        }

        this.setState({ 
            isDropDown,
            prevExpand: index
        });
    }

    getTableContent(tableData) {
        // function to iterate through the tableData to create the table rows
        const createRows = tableData => {
           return tableData.map((row, index) => {
             return (
                <React.Fragment key={row.spell_name}>
                    <tr className="bordered" onClick={e => this.doExpand(e, index)}>
                        <td className="bordered">{row.spell_name}</td>
                        <td className="bordered">{row.spell_level}</td>
                        <td className="bordered">{row.short_description}</td>
                        <td className="bordered">{row.saving_throw}</td>
                        <td className="bordered">{row.spell_resistance}</td>
                    </tr>
                    <tr className={this.state.isDropDown[index] ? "" : "hidden"}>
                        <td className="expand" colSpan={tableColumns.length}>
                            {ReactHtmlParser(row.description_formatted)}
                        </td>
                    </tr>
                </React.Fragment>
             );
           });
        }        

        const isSorted = this.state.isSorted;
        const sortDirection = this.state.sortDirection;

        const createHeaders = headers => {
            return headers.map(header => {
                return (
                    <th 
                        key={header.display}
                        className={isSorted[header.value] ? (sortDirection[header.value] ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                        onClick={e => this.onSort(e, header.value)}
                    >
                        {header.display}
                    </th>
                );
            });
        }

        // create the table itself
        return (
            <table className="bordered">
                <tbody>
                    <tr>
                        {createHeaders(tableColumns)}
                    </tr>
                    {createRows(tableData)}
                </tbody>
            </table>
        );
    }

    onSort(e, sortKey) {
        const data = this.state.data;
        const isSorted = this.state.isSorted;
        const sortDirection = this.state.sortDirection;

        // mark the sortKey column as sorted, the rest as not
        Object.keys(isSorted).forEach(key => {
            if (key === sortKey) {
                isSorted[key] = true;
            }
            else {
                isSorted[key] = false;
            }
        });

        data.sort((a, b) => {
            // equal items sort equally
            if (a[sortKey] === b[sortKey]) {
                return 0;
            }
            // nulls sort after anything else
            else if (a[sortKey] === null) {
                return 1;
            }
            else if (b[sortKey] === null) {
                return -1;
            }
            // otherwise, if we're ascending, lowest sorts first
            else if (sortDirection[sortKey]) {
                return a[sortKey] < b[sortKey] ? -1 : 1;
            }
            // if descending, highest sorts first
            else { 
                return a[sortKey] < b[sortKey] ? 1 : -1;
            }
        });

        // change the sortDirection
        const sortKeyDirection = sortDirection[sortKey];
        Object.keys(sortDirection).forEach(key => {
            if (key === sortKey) {
                sortDirection[key] = !sortKeyDirection;
            }
            else {
                sortDirection[key] = true;
            }
        });
        
        this.setState({ 
            data,
            isSorted,
            sortDirection
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableData !== this.props.tableData) {
            const data = this.props.tableData;
            const isDropDown = data.map(() => false);

            this.setState({ 
                data,
                isSearch: true,
                isDropDown
             });    
        }
    }

    render() {
        return (
            <div className="results">
                <h4>{this.state.isSearch ? `${this.state.data.length} results found.` : ''}</h4>
                <div id="tableContainer">
                    {this.state.data.length > 0 ? this.getTableContent(this.state.data) : null}
                </div>
            </div>
        );
    }        
}

Table.propTypes = {
    tableData: PropTypes.array
};