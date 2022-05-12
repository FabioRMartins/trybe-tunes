import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { favoritList, trackId } = this.props;
    if (favoritList.some((music) => music.trackId === trackId)) {
      this.setState({ favorite: true });
    } else {
      this.setState({ favorite: false });
    }
  }

  componentDidUpdate() {
    getFavoriteSongs();
  }

  favoriteSongs = ({ target }) => {
    this.setState({
      favorite: target.checked,
      loading: true,
    }, async () => {
      const { favorite } = this.state;
      const { music } = this.props;
      if (favorite === true) {
        await addSong(music);
        this.setState({
          loading: false,
        });
      } else {
        await removeSong(music);
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
                <label htmlFor={ trackId }>
                  Favorita
                  <input
                    type="checkbox"
                    onChange={ this.favoriteSongs }
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ favorite }
                    id={ trackId }
                  />
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  music: PropTypes.objectOf(PropTypes.shape).isRequired,
  favoritList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
