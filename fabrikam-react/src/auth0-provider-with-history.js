import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = 'atomy0606.au.auth0.com';// process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = 'KRUCi0sBIxA2728Gs4ixYkf9BbEeGVUG';// process.env.REACT_APP_AUTH0_CLIENT_ID;
    const audience = 'fabrikam.meeting.api';
    
    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            audience={audience}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;