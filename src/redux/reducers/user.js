// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ACTION':
    return {
      ...state,
    };

  default:
    return state;
  }
}
