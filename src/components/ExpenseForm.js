// A form to edit or add expense
// Use local state to track form inputs
// Form data to be passed back to the parent component which handles the interaction with redux

// Will be used for AddExpensePage and EditExpensePage
// For editting, the expense's information have to be grabbed from the redux store in EditExpensePage,
// and passed to ExpenseForm as props

import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

// const now = moment();
// console.log(now.format('MMM Do YYYY'));

class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        const expense = props.expense;
        this.state = {
            description: expense ? expense.description : '',
            note: expense ? expense.note : '',
            amount: expense ? (expense.amount / 100).toString() : '',
            createdAt: expense ? moment(expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        };

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNoteChange = this.onNoteChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    onNoteChange(event) {
        this.setState({ note: event.target.value });
    }

    onAmountChange(event) {
        const amount = event.target.value;
        // validate amount
        if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
            this.setState({ amount });
        }
    }

    onDateChange(createdAt) {
        if (createdAt) {
            this.setState({ createdAt });
        }
    }

    onFocusChange({ focused }) {
        this.setState({ calendarFocused: focused });
    }

    onSubmit(event) {
        event.preventDefault();
        let error = '';

        if (!this.state.description || !this.state.amount) {
            error = 'Please provide a description and amount';
            this.setState({ error });
        } else {
            this.setState({ error });
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            });
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type="text" placeholder="Description" className="text-input"
                    value={this.state.description} onChange={this.onDescriptionChange} autoFocus
                />
                <input
                    type="number" placeholder="Amount" className="text-input"
                    value={this.state.amount} onChange={this.onAmountChange}
                />
                <SingleDatePicker
                    date={this.state.createdAt} // momentPropTypes.momentObj or null
                    onDateChange={this.onDateChange} // PropTypes.func.isRequired
                    focused={this.state.calendarFocused} // PropTypes.bool
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
                    numberOfMonths={1}
                    isOutsideRange={(day) => false}
                />
                <textarea placeholder="Add a note for your expense (optional)"
                    value={this.state.note} onChange={this.onNoteChange} className="textarea">
                </textarea>
                <div>
                    <button className="button">Save expense</button>
                </div>
                
            </form>
        );
    }
}

export default ExpenseForm;