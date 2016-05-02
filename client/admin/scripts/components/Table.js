import React, {Component} from 'react'
import _ from 'lodash';

class Row extends Component {
    render() {
        var index = 0;
        var self = this;
        var cols = [];
        _.forEach(self.props.head, (_heah) => {
            cols.push(<td key={index++}>{self.props.row[_heah.name]}</td>)
        })
        return (<tr>{cols}</tr>);
    }
}

class Tbody extends Component {
    render() {
        var self = this;
        var index = 0;
        var rows = _.map(this.props.rows, function(row) {
            return (<Row key={index++} row={row} head={self.props.head}/>)
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
        var index = 0;
        var Ths = _.map(this.props.head, function(head) {
            return (<th key={index++}>{head.text}</th>)
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
                <Tbody rows={this.props.rows} head={this.props.head}/>
            </table>
        );
    }
}