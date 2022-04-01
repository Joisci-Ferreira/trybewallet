// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const CURRENCIES = 'CURRENCIES';
const EXPENSES = 'EXPENSES';

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
