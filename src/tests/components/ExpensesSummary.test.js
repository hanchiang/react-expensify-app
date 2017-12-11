import React from 'react';
import { shallow } from 'enzyme';

import expenses from '../fixtures/expenses';
import { altFilters3, altFilters4 } from '../fixtures/filters';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import getVisibleExpenses from '../../selectors/expenses';
import getExpensesTotal from '../../selectors/expenses-total';

test('should show expenses summary for 1 expense', () => {
    const finalExpenses = getVisibleExpenses(expenses, altFilters3);
    const expenseCount = finalExpenses.length;
    const expensesTotal = getExpensesTotal(finalExpenses);
    const wrapper = shallow(<ExpensesSummary expenseCount={expenseCount} expensesTotal={expensesTotal} />);
    expect(wrapper).toMatchSnapshot();
});

test('should show expenses summary for 2 expenses', () => {
    const finalExpenses = getVisibleExpenses(expenses, altFilters4);
    const expenseCount = finalExpenses.length;
    const expensesTotal = getExpensesTotal(finalExpenses);
    const wrapper = shallow(<ExpensesSummary expenseCount={expenseCount} expensesTotal={expensesTotal} />);
    expect(wrapper).toMatchSnapshot();
});