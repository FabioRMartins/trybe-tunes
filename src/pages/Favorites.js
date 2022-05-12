import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritList: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const favoritesPage = await getFavoriteSongs();
    console.log(favoritesPage);
    this.setState({
      loading: false,
      favoritList: [...favoritesPage],
    });
  }

  render() {
    const {
      favoritList,
      loading,
    } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-favorites">
          <Header />
          {favoritList.map((music) => (
            <div key={ music.trackId }>
              <MusicCard
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                favoritList={ favoritList }
              />
            </div>
          ))}
        </div>
      )
    );
  }
}

export default Favorites;
