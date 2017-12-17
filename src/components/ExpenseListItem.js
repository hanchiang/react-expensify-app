import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

function ExpenseListItem(props) {
    const { expense, handleRemove } = props;
    const { id, description, amount, createdAt } = expense;

    const onClick = (event) => handleRemove(id);

    return (
        <Link className="list-item" to={`/edit/${id}`}>
            <div>
                <h3 className="list-item__title">{description}</h3>
                <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do YYYY, H:mm:ss')}</span>
            </div>
            <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
            {/* <button type="button" onClick={onClick}>Remove</button> */}
        </Link>


    );
}

export default ExpenseListItem;