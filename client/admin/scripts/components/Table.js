import React, {Component} from 'react'
import _ from 'lodash';

class Row extends Component {
    render() {
        var cols = _.map(this.props.row, function(col) {
            return (<td>{col}</td>)
        })
        return (<tr>{cols}</tr>);
    }
}

class Tbody extends Component {
    render() {
        var rows = _.map(this.props.rows, function(row) {
            return (<Row row={row} />)
        });
        return (
            <tbody>
                {rows}
            </tbody>
        );
    }
}

class Thead extends Component {
    render() {
        var Ths = _.map(this.props.head, function(head) {
            return (<th>{head}</th>)
        })
        return (
            <thead>
                <tr>
                    {Ths}
                </tr>
            </thead>
        );
    }
}

export default class Table extends Component {
    render() {
        var className = this.props.className || "table table-bordered";
        return (
            <table className={className}>
                <Thead head={this.props.head}/>
                <Tbody rows={this.props.rows}/>
            </table>
        );
    }
}