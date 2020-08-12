import React from 'react';

import { TableContainer } from './TableContainer';
import { SearchParametersContainer } from './SearchParametersContainer';

export class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.updateTable = this.updateTable.bind(this);
    }

    updateTable(newData) {
        this.setState({
            tableData: newData
        });
    }

    render() {
        return (
            <div>
                <br />
                <SearchParametersContainer onUpdate={this.updateTable} />
                <br /><br />
                <TableContainer tableData={this.state.tableData} />
            </div>
        );
    }
}