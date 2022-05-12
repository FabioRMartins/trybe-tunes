import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userDescription: '',
      imageUrl: '',
      disable: true,
    };
  }

  componentDidMount() {
    this.setState(
      async () => {
        const { name, email, description, image } = await getUser();
        this.setState({
          loading: false,
          userName: name,
          userEmail: email,
          userDescription: description,
          imageUrl: image,
        }, () => { this.userData(); });
      },
    );
  }

  userData = () => {
    const { userName, userEmail, userDescription, imageUrl } = this.state;
    if (userName.length > 0
       && userEmail.length > 0
       && userDescription.length > 0
       && imageUrl.length > 0
    ) {
      this.setState({
        disable: false,
      });
    } else {
      this.setState({
        disable: true,
      });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => { this.userData(); });
  };

  handleButton = (event, userInfo) => {
    const { userName, userEmail, userDescription, imageUrl } = userInfo;
    this.setState(
      { loading: true },
      async () => {
        await updateUser({
          name: userName,
          email: userEmail,
          image: imageUrl,
          description: userDescription,
        });
        const { history } = this.props;
        history.push('/profile');
      },
    );
  }

  render() {
    const {
      loading, userName, userEmail, userDescription, imageUrl, disable,
    } = this.state;
    const userInfo = { userName, userEmail, userDescription, imageUrl };
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? (<Loading />)
          : (
            <form>
              <input
                data-testid="edit-input-name"
                value={ userName }
                name="userName"
                type="text"
                onChange={ this.handleChange }
              />
              <input
                data-testid="edit-input-email"
                value={ userEmail }
                placeholder="Email"
                name="userEmail"
                type="email"
                onChange={ this.handleChange }
              />
              <input
                data-testid="edit-input-description"
                value={ userDescription }
                placeholder="Descrição"
                name="userDescription"
                type="textarea"
                onChange={ this.handleChange }
              />
              <input
                data-testid="edit-input-image"
                value={ imageUrl }
                placeholder="Image-URL "
                name="imageUrl"
                type="text"
                onChange={ this.handleChange }
              />
              <button
                data-testid="edit-button-save"
                type="submit"
                disabled={ disable }
                onClick={ (event) => { this.handleButton(event, userInfo); } }
              >
                Salvar
              </button>
            </form>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default ProfileEdit;
