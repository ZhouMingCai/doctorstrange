import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, hashHistory, IndexRoute, browserHistory} from 'react-router'
import routes from './routes';

injectTapEventPlugin();


render((
  <Router
    history={hashHistory}
    routes={routes}
  >
  </Router>
), document.getElementById('app'))
