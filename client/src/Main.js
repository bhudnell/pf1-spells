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
      <div className="main">
        <SearchParametersContainer onUpdate={this.updateTable} />
        <TableContainer tableData={this.state.tableData} />
      </div>
    );
  }
}