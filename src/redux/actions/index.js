import getCurrencies from '../../services/getCurrencies';

export const USER_AUTH = 'USER_AUTH';
// export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const userAuth = (payload) => ({
  type: USER_AUTH,
  payload,
});

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const addExpense = (payload, exchangeRates) => ({
  type: ADD_EXPENSE,
  payload: { ...payload, exchangeRates },
});

const requestCurrenciesSuccess = (payload) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  const data = await getCurrencies();
  dispatch(requestCurrenciesSuccess(data));
};
