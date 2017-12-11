import React from 'react';

import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

function ExpenseDashboardPage() {
    return (
        <div>
            <ExpenseListFilters />
            <ExpenseList />
        </div>
    )
}

export default ExpenseDashboardPage;