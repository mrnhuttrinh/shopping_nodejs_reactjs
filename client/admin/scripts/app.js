import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import createLogger from "redux-logger";
import thunk from "redux-thunk";

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute, Redirect } from 'react-router'
import routes from './routes'

var createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);

import * as reducers from './reducers'

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
})

const store = createStoreWithMiddleware(
    reducer
)

render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>, 
    document.getElementById("app")
)
