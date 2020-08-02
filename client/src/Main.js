import React from 'react';

import { Table } from './Table';
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
                <Table tableData={this.state.tableData} />
            </div>
        );
    }
}