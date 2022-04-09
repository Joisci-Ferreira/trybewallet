// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';
const ERROR = 'ERROR';
const DELETE = 'DELETE';

export const login = (value) => (
  {
    type: LOGIN,
    value,
  });

export const addCurrencies = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const addExpenses = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const getAPIerror = (expenses) => ({
  type: ERROR,
  expenses,
});

export const deleteExpense = (expenses) => ({
  type: DELETE,
  expenses,
});

const endpoint = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencyAPI = async () => {
  const response = await fetch(endpoint);
  const results = await response.json();
  return Object.keys(results).filter((currency) => currency !== 'USDT');
};

export const fetchCurrencies = () => (dispatch) => getCurrencyAPI()
  .then((response) => {
    dispatch(addCurrencies(response));
  })
  .catch((error) => {
    dispatch(getAPIerror(error));
  });
