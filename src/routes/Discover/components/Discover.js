import React, { useState, useEffect } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

const Discover = ({ api }) => {
  const [ newReleases, setReleases ] = useState([])
  const [ featuredPlaylists, setPlaylists ] = useState([])
  const [ categories, setCategories ] = useState([])

  // Can be handled better when trigger API request
  const [ loading, setLoading ] = useState(false)
  
  /**
   * Set SPOTIFY_API when mounting the component
   */
  useEffect(() => {
    const hasApiCredentials = Object.keys(api).length;
    if (hasApiCredentials) {
      // TODO: Loading state of the API request each of one should have their own trigger for loading
      // TODO: await on each request before triggering another API request to lessen the debt in the network request
      setLoading(true);

      // Get New Releases
      api.getNewReleases()
      .then((data) => {
        setLoading(false);
        setReleases(data.body.albums.items);
      }, (err) => {
        console.warn("Something went wrong!", err);
      });

      // Get Featured Playlists
      api.getFeaturedPlaylists()
      .then((data) => {
        setLoading(false);
        setPlaylists(data.body.playlists.items);
      }, (err) => {
        console.warn("Something went wrong!", err);
      });

      // Get Categories
      api.getCategories()
      .then((data) => {
        setLoading(false);
        setCategories(data.body.categories.items);
      }, (err) => {
        console.warn("Something went wrong!", err);
      });
    }
  }, [api]);

  return (
    <div className="discover">
      <DiscoverBlock loading={loading} text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock loading={loading} text="FEATURED PLAYLISTS" id="featured" data={featuredPlaylists} />
      <DiscoverBlock loading={loading} text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  )
}

export default Discover;