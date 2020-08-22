import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './Table';

export class TableContainer extends React.Component {
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
      isExpanded: [],
      prevExpand: -1
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleExpand(e, index) {
    const isExpanded = this.state.isExpanded;

    isExpanded[index] = !isExpanded[index];
    if (this.state.prevExpand !== -1 && this.state.prevExpand !== index) {
      isExpanded[this.state.prevExpand] = false;
    }

    this.setState({
      isExpanded,
      prevExpand: index
    });
  }

  handleSort(e, sortKey) {
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
      const isExpanded = data.map(() => false);

      this.setState({
        data,
        isSearch: true,
        isExpanded
      });
    }
  }

  render() {
    return (
      <div className="results">
        <h4>{this.state.isSearch ? `${this.state.data.length} results found.` : ''}</h4>
        <div id="tableContainer">
          {this.state.data.length > 0 ? <Table data={this.state.data} isSorted={this.state.isSorted} sortDirection={this.state.sortDirection}
                                               isExpanded={this.state.isExpanded} onSort={this.handleSort} onExpand={this.handleExpand} /> : null}
        </div>
      </div>
    );
  }
}

TableContainer.propTypes = {
  tableData: PropTypes.array
};