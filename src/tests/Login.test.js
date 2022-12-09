import { screen } from '@testing-library/react';
// import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Login Components', () => {
  test('login inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();

    const emailValid = 'teste@trybe.com';
    const passwordValid = '123456';

    userEvent.type(emailInput, emailValid);
    userEvent.type(passwordInput, passwordValid);

    expect(emailInput.value).toBe(emailValid);
    expect(passwordInput.value).toBe(passwordValid);

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/carteira');
  });
});
// test('', () => {});
