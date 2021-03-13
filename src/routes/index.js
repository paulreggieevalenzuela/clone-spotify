import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import Discover from './Discover';

// Utils
import {getTokenFromUrl} from '../common/utils';

// CONFIG
import CONFIG from '../config';

const Routes = () => {
  const [api, setApi] = useState({});

  // SET/GET of the token in the mount of the app
  useEffect(() => {
    if (!getTokenFromUrl()?.access_token) {
      // Get token from URI callback
      window.location.href =
        `${CONFIG.spotifyAuthorize}?client_id=${CONFIG.clientId}&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=${CONFIG.redirectUri}`;
    } else {
      // Get Token
      const accessToken = getTokenFromUrl()?.access_token;
      const spotifyApi = new SpotifyWebApi({
        clientId: CONFIG.clientId,
        clientSecret: CONFIG.clientSecret,
        redirectUri: CONFIG.redirectUri
      });

      // Set token for Spotify API
      spotifyApi.setAccessToken(accessToken);
      
      // Set in the local state of the Spotify Credentials to be used of the components
      setApi(spotifyApi);
    }
  }, [])

  return (
    <Discover api={api} />
  );
}

export default Routes;
