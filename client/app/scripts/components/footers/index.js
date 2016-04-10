import React from 'react'
import Pre from './Pre'
import Mid from './Mid'
import Post from './Post'

export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <Pre />
                <Mid />
                <Post />
            </div>
        )
    }
}