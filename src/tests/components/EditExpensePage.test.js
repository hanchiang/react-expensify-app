import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let expense, startEditExpense, startRemoveExpense, wrapper, history;

beforeEach(() => {
    expense = expenses[0];
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
    <EditExpensePage
            expense={expense} startRemoveExpense={startRemoveExpense} startEditExpense={startEditExpense}
        history={history}
    />);
});

test('should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveExpense', () => {
    wrapper.find('button').prop('onClick')();
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});