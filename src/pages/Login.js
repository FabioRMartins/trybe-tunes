import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isSaveButtonDisable: true,
      loading: false,
      searchRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 3;
    this.setState({
      [name]: value,
    });
    const activeButton = value.length >= minLength;
    if (activeButton) {
      this.setState({ isSaveButtonDisable: false });
    } else {
      this.setState({ isSaveButtonDisable: true });
    }
  }

  onSaveButtonClick = async () => {
    const {
      name: inputName,
    } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: inputName });
    this.setState({
      loading: false,
      searchRedirect: true,
    });
  }

  render() {
    const {
      isSaveButtonDisable,
      name,
      loading,
      searchRedirect,
    } = this.state;

    if (loading) {
      return <Loading />;
    }
    if (searchRedirect) {
      return <Redirect to="/search" />;
    }

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form>
          <input
            data-testid="login-name-input"
            label="login-name-input"
            type="text"
            name="name"
            placeholder="Nome"
            value={ name }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            name="button"
            disabled={ isSaveButtonDisable }
            onClick={ this.onSaveButtonClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
