import React from 'react';
import { connect } from 'react-redux';

import { addExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export function AddExpensePage(props) {
    const handleSubmit = (expense) => {
        props.addExpense(expense);
        props.history.push('/');
    }
    return (
        <div>
            <h1>Add expense</h1>
            <ExpenseForm onSubmit={handleSubmit}/>
        </div>
    );
}

const mapDispatchToProps = (dispatch, props) => ({
    addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(null, mapDispatchToProps)(AddExpensePage);