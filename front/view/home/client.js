import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, hashHistory, IndexRoute, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import routes from './routes';

import * as reducers from '../../reducers'

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

const store = createStore(
  reducer,
)

const history = syncHistoryWithStore(hashHistory, store)

injectTapEventPlugin();


render((
    <Provider store={store}>
      <Router
        history={history}
        routes={routes}
      >
      </Router>
    </Provider>
), document.getElementById('app'))
