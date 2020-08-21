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
                <div className="content">
                    <header>
                        <h1>Pathfinder 1E Spell Search</h1>
                    </header>
                    <br />
                    <SearchParametersContainer onUpdate={this.updateTable} />
                    <TableContainer tableData={this.state.tableData} />
                    <div className="push"></div>
                </div>
                <footer>
                    <h6>Designed by Brendon Hudnell. 2020</h6>
                </footer>
            </div>
        );
    }
}