import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addExpense, startAddExpense, editExpense, startEditExpense, 
        removeExpense, startRemoveExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = {auth: { uid }};
const createMockStore = configureMockStore([thunk]);

// Set up dummy firebase data
beforeEach((done) => {
    const expensesData = {};
    expenses.forEach((expense) => {
        const { id, description, note, amount, createdAt } = expense;
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const expectedAction = {type: 'REMOVE_EXPENSE', id: '1'};
    const action = removeExpense('1');
    expect(action).toEqual(expectedAction);
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense(id))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            });
            return database.ref(`users/${uid}/expenses/${id}`).once('value')
                .then((snapshot) => {
                    expect(snapshot.val()).toBeFalsy();
                    done();
                });
        });
});

test('should setup edit expense action object', () => {
    const expectedAction = {
        type: 'EDIT_EXPENSE', 
        id: '1',
        updates: {
            amount: 200,
            description: 'hello'
        }
    };
    const action = editExpense('1', {amount: 200, description: 'hello'});
    expect(action).toEqual(expectedAction);
});

test('should setup add expense action object with provided values', () => {
    const expense = expenses[0];
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense
    });
});

test('should add default expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        }); 
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expense = {
        description: 'Mouse',
        note: '',
        amount: 34023,
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    const updates = {
        amount: 12345,
        description: 'Editted expense'
    };
    
    store.dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            });
            return database.ref(`users/${uid}/expenses/${id}`).once('value')
                .then((snapshot) => {
                    const { description, note, amount, createdAt } = expenses[2];
                    const updatedExpense = {
                        description,
                        note,
                        amount,
                        createdAt,
                        ...updates
                    }
                    expect(snapshot.val()).toEqual(updatedExpense);
                    // expect(snapshot.val().amount).toBe(updates.amount);
                    // expect(snapshot.val().description).toBe(updates.description);
                    done();
                });
        });
});