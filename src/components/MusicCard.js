import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { checked } = this.props;
    this.setState({
      favorite: checked,
    });
  }

  favoriteSongs = ({ target }) => {
    this.setState({
      favorite: target.checked,
    }, async () => {
      const { favorite } = this.state;
      const { song } = this.props;
      if (favorite === true) {
        this.setState({
          loading: true,
        });
        await addSong(song);
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {
          loading ? (<Loading />)
            : (
              <div>
                <h4>{ trackName }</h4>
                <audio data-testid="audio-component" src={ previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>

                <input
                  type="checkbox"
                  label="Favorita"
                  onChange={ this.favoriteSongs }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ favorite }
                  id="favorite"
                />

              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired]).isRequired,
  previewUrl: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  song: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default MusicCard;
