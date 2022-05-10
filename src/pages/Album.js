import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      artist: '',
      album: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const listMusics = album.filter((item, index) => index !== 0);
    this.setState({
      artist: album[0].artistName,
      album: album[0].collectionName,
      musicList: listMusics,
    });
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
