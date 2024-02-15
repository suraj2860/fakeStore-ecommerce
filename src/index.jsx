import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="dev-4vcw7midsg2um2fe.us.auth0.com"
    clientId="YOjfyxBixoADBl7smCviRd9w0ao7aPUJ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);