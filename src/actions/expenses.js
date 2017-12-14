// Expenses action creators
import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// Add to database
// Async thunk to add expense to firebase and trigger ADD_EXPENSE action
const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = { description, note, amount, createdAt };

    return database.ref('expenses').push(expense)
      .then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
      });
  }
}

// REMOVE_EXPENSE
const removeExpense = (id = '') => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSES
const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// Fetch from database
// Async thunk function to fetch expenses from firebase and trigger SET_EXPENSES action
const startSetExpenses = () => {
  return (dispatch) => {
    const expenses = [];
    return database.ref('expenses')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        });
        dispatch(setExpenses(expenses));
      });
  }
}


export { addExpense, startAddExpense, removeExpense, editExpense, setExpenses, startSetExpenses };

