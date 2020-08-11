import React from 'react';
import PropTypes from 'prop-types';

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
        isSearch: false
    };

    this.onSort = this.onSort.bind(this);
    this.getTableContent = this.getTableContent.bind(this);
}

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

        const isSorted = this.state.isSorted;
        const sortDirection = this.state.sortDirection;

        // create the table itself
        return (
            <table className="bordered">
                <tbody>
                    <tr>
                        <th 
                            className={isSorted.spell_name ? (sortDirection.spell_name ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                            onClick={e => this.onSort(e, 'spell_name')}>
                                Spell Name
                        </th>
                        <th 
                            className={isSorted.spell_level ? (sortDirection.spell_level ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                            onClick={e => this.onSort(e, 'spell_level')}>
                                Spell Level
                        </th>
                        <th 
                        className={isSorted.short_description ? (sortDirection.short_description ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                        onClick={e => this.onSort(e, 'short_description')}>
                            Spell Description
                            </th>
                        <th 
                        className={isSorted.saving_throw ? (sortDirection.saving_throw ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                        onClick={e => this.onSort(e, 'saving_throw')}>
                            Saving Throw
                            </th>
                        <th 
                        className={isSorted.spell_resistance ? (sortDirection.spell_resistance ? "bordered ascendingSort" : "bordered descendingSort") : "bordered" }
                        onClick={e => this.onSort(e, 'spell_resistance')}>
                            Spell Resistance
                            </th>
                    </tr>
                    {createRows(tableData)}
                </tbody>
            </table>
        );
    }

    onSort(e, sortKey) {
        const newData = this.state.data;
        const newSorted = this.state.isSorted;
        const newDirection = this.state.sortDirection;

        // mark the sortKey column as sorted, the rest as not
        Object.keys(newSorted).forEach(key => {
            if (key === sortKey) {
                newSorted[key] = true;
            }
            else {
                newSorted[key] = false;
            }
        });

        newData.sort((a, b) => {
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
            else if (newDirection[sortKey]) {
                return a[sortKey] < b[sortKey] ? -1 : 1;
            }
            // if descending, highest sorts first
            else { 
                return a[sortKey] < b[sortKey] ? 1 : -1;
            }
        });

        // change the sortDirection
        const sortKeyDirection = newDirection[sortKey];
        Object.keys(newDirection).forEach(key => {
            if (key === sortKey) {
                newDirection[key] = !sortKeyDirection;
            }
            else {
                newDirection[key] = true;
            }
        });
        
        this.setState({ 
            data: newData,
            isSorted: newSorted,
            sortDirection: newDirection
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tableData !== this.props.tableData) {
            const data = this.props.tableData;
            this.setState({ 
                data,
                isSearch: true
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