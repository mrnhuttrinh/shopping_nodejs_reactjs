import React, {Component} from 'react';

export default class AccountInfoEdit extends Component {
    render() {
        var user = this.props.user;
        return (
            <tr>
                <td className="padding-0px">
                    <table className="table table-hover margin-0px">
                        <tbody>
                            <tr>
                                <td>
                                    Họ và Tên: 
                                </td>
                                <td>
                                    Edit
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td> 
            </tr> 
        );
    }
}
