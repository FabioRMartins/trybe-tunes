import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      perfil: {},
    };
  }

  componentDidMount() {
    this.userData();
  }

  userData = async () => {
    const perfil = await getUser();
    console.log(perfil);
    this.setState({ perfil });
  }

  render() {
    const { loading, perfil: { description, email, image, name } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <br />
        { loading
          ? <Loading />
          : (
            <div>
              <div>
                <img data-testid="profile-image" src={ image } alt={ image } />
                { ' ' }
                <Link to="/profile/edit">
                  <button type="button">
                    Editar perfil
                  </button>
                </Link>
              </div>
              <h4>Name</h4>
              <p>{ name }</p>
              <h4>E-mail</h4>
              <p>{ email }</p>
              <h4>Descrição</h4>
              <p>{ description }</p>
            </div>
          )}
      </div>
    );
  }
}
export default Profile;
