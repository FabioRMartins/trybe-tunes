import PropTypes from 'prop-types';
import React from 'react';

class Musics extends React.Component {
  render() {
    const { musicList } = this.props;
    const filteredMusic = musicList.filter((item, index) => index !== 0 && item);
    return (
      <div>
        {filteredMusic.map((item, index) => (
          <div className="song" key={ index }>
            {item.trackName }
            <audio data-testid="audio-component" src={ item.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

Musics.propTypes = {
  musicList: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default Musics;
