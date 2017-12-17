import React from 'react';
import { connect } from 'react-redux';

import { startAddExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export function AddExpensePage(props) {
    const handleSubmit = (expense) => {
        props.startAddExpense(expense);
        props.history.push('/');
    }
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Add expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm onSubmit={handleSubmit} />
            </div>
            
            
        </div>
    );
}

const mapDispatchToProps = (dispatch, props) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(null, mapDispatchToProps)(AddExpensePage);