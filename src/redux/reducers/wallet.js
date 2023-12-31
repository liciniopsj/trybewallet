import {
  REQUEST_CURRENCIES_SUCCESS,
  ADD_EXPENSE, DELETE_EXPENSE,
  ID_TO_EDIT,
  EDIT_STATUS_FALSE,
  EDIT_STATUS_TRUE,
  EDIT_EXPENSES,
} from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case ID_TO_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
    };
  case EDIT_STATUS_TRUE:
    return {
      ...state,
      editor: true,
    };
  case EDIT_STATUS_FALSE:
    return {
      ...state,
      editor: false,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      expenses: [...action.payload],
    };
  default:
    return state;
  }
}
