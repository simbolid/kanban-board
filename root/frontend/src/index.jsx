import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain="dev-p9phtkex.us.auth0.com"
    clientId="d5V3U5OAbuotQlvIL2Exo9BIxHv3H63z"
    redirectUri={window.location.origin}
  >
    <CssBaseline />
    <App />
  </Auth0Provider>,
  document.getElementById('root'),
);
