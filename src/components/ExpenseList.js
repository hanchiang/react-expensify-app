import React from 'react';
import { connect } from 'react-redux';
import selectExpense from '../selectors/expenses';

import ExpenseListItem from './ExpenseListItem';

export function ExpenseList(props) {
    return (
        <div>
            {
                props.expenses.length === 0 ? (
                    <p>No expenses</p>
                ) : (
                    props.expenses.map((expense) =>
                        <ExpenseListItem expense={expense} key={expense.id} />
                    )
                )

            }
        </div>
    );
}

const mapStateToProps = (state) => ({ 
    expenses: selectExpense(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);