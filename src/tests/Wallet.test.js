import { screen, waitFor } from '@testing-library/react';
// import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { gStateWithAddedExpense, initialGState } from './helpers/mockState';

const ONZE_DOLARES = 'Onze dólares';
const CREDIT = 'Cartão de crédito';

describe('Wallet components', () => {
  test('Entering the Wallet and Wallet Header', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    const emailValid = 'teste@trybe.com';
    const passwordValid = '123456';

    userEvent.type(emailInput, emailValid);
    userEvent.type(passwordInput, passwordValid);

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/carteira');

    const userEmail = screen.getByText(/teste@trybe\.com/i);

    expect(userEmail.textContent).toBe(emailValid);
  });
  test('Adding a expense', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: initialGState });

    expect(history.location.pathname).toBe('/carteira');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(await (await fetch()).json()).toBe(mockData);

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
    const currencyInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', { name: /metodo de pagamento:/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria:/i });

    userEvent.type(valueInput, '11');
    userEvent.type(descriptionInput, ONZE_DOLARES);
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, CREDIT);
    userEvent.selectOptions(tagInput, 'Lazer');

    expect(valueInput.value).toBe('11');
    expect(descriptionInput.value).toBe(ONZE_DOLARES);
    expect(currencyInput.value).toBe('USD');
    expect(methodInput.value).toBe(CREDIT);
    expect(tagInput.value).toBe('Lazer');

    const addBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(addBtn).toBeInTheDocument();

    userEvent.click(addBtn);

    await waitFor(() => {
      const descriptionCell = screen.getByRole('cell', { name: /onze dólares/i });
      expect(descriptionCell).toBeInTheDocument();
    });
  });
  test('Added expense renders in table', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: gStateWithAddedExpense });

    const descriptionCell = screen.getByRole('cell', { name: /onze dólares/i });
    const tagCell = screen.getByRole('cell', { name: /lazer/i });
    const valueCell = screen.getByRole('cell', { name: /11\.00/i });
    const currencyCell = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
    // const askCell =
    // const convertedValueCell
    // const exchangeCurrencyCell = screen.findByText('cell', { name: 'Real' });
    const editBtn = screen.getByRole('button', { name: /editar/i });
    const DeleteBtn = screen.getByRole('button', { name: /delete/i });

    expect(descriptionCell).toBeInTheDocument();
    expect(descriptionCell.textContent).toBe(ONZE_DOLARES);
    expect(tagCell).toBeInTheDocument();
    expect(tagCell.textContent).toBe('Lazer');
    expect(valueCell).toBeInTheDocument();
    expect(valueCell.textContent).toBe('11.00');
    expect(currencyCell).toBeInTheDocument();
    expect(currencyCell.textContent).toBe('Dólar Americano/Real Brasileiro');
    expect(editBtn).toBeInTheDocument();
    expect(DeleteBtn).toBeInTheDocument();

    userEvent.click(editBtn);

    const valueInput = screen.getByRole('spinbutton', { name: /valor:/i });
    const descriptionInput = screen.getByRole('textbox', { name: /descrição:/i });
    const currencyInput = screen.getByRole('combobox', { name: /moeda:/i });
    const methodInput = screen.getByRole('combobox', { name: /metodo de pagamento:/i });
    const tagInput = screen.getByRole('combobox', { name: /categoria:/i });
    const formEditBtn = screen.getByRole('button', { name: /editar despesa/i });

    expect(valueInput.value).toBe('11');
    expect(formEditBtn).toBeInTheDocument();
    expect(descriptionInput.value).toBe(ONZE_DOLARES);
    expect(currencyInput.value).toBe('USD');
    expect(methodInput.value).toBe(CREDIT);
    expect(tagInput.value).toBe('Lazer');

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '15');
    userEvent.click(formEditBtn);

    await waitFor(() => { expect(valueInput.value).toBe(''); });

    userEvent.click(DeleteBtn);

    await waitFor(() => {
      expect(descriptionCell).not.toBeInTheDocument();
      expect(tagCell).not.toBeInTheDocument();
      expect(valueCell).not.toBeInTheDocument();
      expect(currencyCell).not.toBeInTheDocument();
      expect(editBtn).not.toBeInTheDocument();
      expect(DeleteBtn).not.toBeInTheDocument();
    });
  });
});
