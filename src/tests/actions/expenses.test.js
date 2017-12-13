import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addExpense, startAddExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
    const expectedAction = {type: 'REMOVE_EXPENSE', id: '1'};
    const action = removeExpense('1');
    expect(action).toEqual(expectedAction);
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

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
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

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
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

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });
});


// test('should setup add expense action object with default values', () => {
//     const action = addExpense({});
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });