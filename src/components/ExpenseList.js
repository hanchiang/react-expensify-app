import React from 'react';
import { connect } from 'react-redux';

import selectExpense from '../selectors/expenses';
import ExpenseListItem from './ExpenseListItem';
import { startRemoveExpense } from '../actions/expenses';

export function ExpenseList(props) {
    const handleRemove = (id) => props.startRemoveExpense(id);
    
    return (
        <div>
            {
                props.expenses.length === 0 ? (
                    <p>No expenses</p>
                ) : (
                    props.expenses.map((expense) => 
                        <ExpenseListItem 
                            expense={expense} key={expense.id} 
                            handleRemove={handleRemove} 
                        />
                    )
                )

            }
        </div>
    );
}

const mapStateToProps = (state) => ({ 
    expenses: selectExpense(state.expenses, state.filters)
});

const mapDispatchToProps = (dispatch) => ({
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);