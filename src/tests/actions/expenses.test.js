import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expense = {
        description: 'hello',
        note: 'just passing by',
        amount: 150,
        createdAt: 1000
    };
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    });

});

test('should setup add expense action object with default values', () => {
    const action = addExpense({});
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});