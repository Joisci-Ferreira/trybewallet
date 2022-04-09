// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas.

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };

  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length, ...action.expenses,
      }],
    };

  case 'DELETE':
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== (action.expenses)),
    };

    /* case 'ERROR':
    return {
      ...state,
      error: action.expenses.error,
    }; */
  default:
    return state;
  }
};

export default wallet;
