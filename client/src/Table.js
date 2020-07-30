import React from 'react';
import PropTypes from 'prop-types';

export class Table extends React.Component {
    getTableContent(arr) {
        // function to iterate through the tableData to create the table rows
        const iterateItem = (item) => {
           return item.map(function (nextItem, j) { // todo figure out the format
             return (
                <tr key={nextItem.type}>
                   <td>{nextItem.type}</td>
                   <td>{nextItem.count}</td>
                </tr>
             );
           })
        }

        // create the table itself
        return arr.map(function (item, i) { // todo figure out the format
            return (
                <table key={item.productType}>
                <thead>{item.productType}</thead>
                    <tbody>
                        {iterateItem(item.contents)}
                    </tbody>
                </table>
            );
        });
    };

    render() {
        if (this.props.tableData) {
            return <div>{this.getTableContent(this.props.tableData)}</div>;
        }
        else {            
            return <div></div>;
        }
    }        
}

Table.propTypes = {
    tableData: PropTypes.object
};