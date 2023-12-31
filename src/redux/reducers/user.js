import { USER_AUTH } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_AUTH:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
}
