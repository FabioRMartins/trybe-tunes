import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artist: '',
      album: '',
      favoriteList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const saveFavorite = await getFavoriteSongs();
    const listMusics = album.filter((item, index) => index !== 0);
    this.setState({
      artist: album[0].artistName,
      album: album[0].collectionName,
      musicList: listMusics,
      favoriteList: saveFavorite,
    });
  }

  favoriteListReturn = (trackId) => {
    const { favoriteList } = this.state;
    const checkArray = [];
    favoriteList.forEach((song) => {
      if (song.trackId === trackId) {
        checkArray.push(song.trackId);
      }
    });
    const check = checkArray.some((song) => Number(song) === Number(trackId));
    if (check === true) {
      return check;
    }
  }

  render() {
    const {
      musicList,
      album,
      artist,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">
          { artist }
        </h3>
        <h3 data-testid="album-name">
          { album }
        </h3>
        { musicList.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            checked={ this.favoriteListReturn(music.trackId) }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.objectOf(PropTypes.string) }).isRequired,
};

export default Album;
