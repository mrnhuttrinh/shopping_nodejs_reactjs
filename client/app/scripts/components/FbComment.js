import React, { Component} from 'react';
import FacebookProvider, { Comments } from 'react-facebook';
 
export default class Example extends Component {
    render() {
        return (
            <FacebookProvider appID="745581532251215">
                <Comments href="https://www.facebook.com/zuck/posts/10102577175875681?comment_id=1193531464007751&reply_comment_id=654912701278942" />
            </FacebookProvider>
        );
    }
}