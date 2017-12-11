import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';

import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export function ExpensesSummary(props) {
    const { expenseCount, expensesTotal } = props;
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            {
                expenseCount === 0 ?
                <h2>No expenses</h2> : 
                <h2>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h2>
            }
        </div>
        
    );
}

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: getExpensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);