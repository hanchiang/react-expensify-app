import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

function ExpenseListItem(props) {
    const { expense } = props;
    const { id, description, amount, createdAt } = expense;

    return (
        <div>
            <Link to={`/edit/${id}`}><h3>Description: {description}</h3></Link>
            <p>Amount: { amount }</p>
            <p>Created at: {moment(createdAt).format('Do MMM YYYY, H:mm:ss:SS Z') }</p>
        </div>
    );
}

export default ExpenseListItem;