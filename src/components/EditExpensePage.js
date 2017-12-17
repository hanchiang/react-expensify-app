import React from 'react';
import { connect } from 'react-redux';

import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

// Use the id from match.params to find the expense object

export function EditExpensePage(props) {
    const handleRemove = (event) => {
        props.startRemoveExpense(props.expense.id);
        props.history.push('/');
    }
    const handleSubmit = (expense) => {
        props.startEditExpense(props.expense.id, expense);
        props.history.push('/');
    }

    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Edit expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm onSubmit={handleSubmit} expense={props.expense} />
                <button className="button button--remove" onClick={handleRemove}>Remove expense</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
    
});

const mapStateToProps = (state, props) => ({
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);