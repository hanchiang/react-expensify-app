import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expense', () => {
    const total = getExpensesTotal([]);
    expect(total).toBe(0);
});

test('should return the amount of 1 expense correctly', () => {
    const total = getExpensesTotal([expenses[0]]);
    expect(total).toBe(expenses[0].amount);
});

test('should return the amount of multiple expenses correctly', () => {
    const total = getExpensesTotal(expenses);
    const expectedTotal = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    expect(total).toBe(expectedTotal);
});
