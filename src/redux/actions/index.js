import getCurrencies from '../../services/getCurrencies';

export const USER_AUTH = 'USER_AUTH';
// export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const userAuth = (payload) => ({
  type: USER_AUTH,
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
  // 1. Aviso de inicio do Fetch
  // dispatch(requestCurrencies());
  // 2. Fazendo o Fetch
  const data = await getCurrencies();
  // 3. Avisando que o request foi bem sucedido e entregando
  dispatch(requestCurrenciesSuccess(data));
};
