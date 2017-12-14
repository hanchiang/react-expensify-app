import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

// Use the id from match.params to find the expense object

export function EditExpensePage(props) {
    const handleRemove = (event) => {
        props.startRemoveExpense(props.expense.id);
        props.history.push('/');
    }
    const handleSubmit = (expense) => {
        props.editExpense(expense.id, expense);
        props.history.push('/');
    }

    return (
        <div>
            <ExpenseForm onSubmit={handleSubmit} expense={props.expense} />
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
    
});

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);