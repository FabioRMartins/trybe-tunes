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
      favoritList: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const fav = await getFavoriteSongs();
    this.setState({
      artist: album[0].artistName,
      album: album[0].collectionName,
      musicList: album,
      favoritList: [...fav],
    });
  }

  updateFavoritas = async () => {
    const favoritesPage = await getFavoriteSongs();
    this.setState({
      favoritList: [...favoritesPage],
    });
  }

  render() {
    const {
      musicList,
      album,
      artist,
      favoritList,
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
        { musicList.slice(1).map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
            favoritList={ favoritList }
            update={ this.updateFavoritas }
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
