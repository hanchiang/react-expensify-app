// Get filter from user input

import React from 'react';
import { connect } from 'react-redux';

import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarFocused: null,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
        this.handleSortFilterChange = this.handleSortFilterChange.bind(this);
    }

    handleTextFilterChange(event) {
        this.props.setTextFilter(event);
    }

    handleSortFilterChange(event) {
        this.props.setSortFilter(event);
    }

    onDatesChange({startDate, endDate}) {
        this.props.onStartDateChange(startDate);
        this.props.onEndDateChange(endDate);
    }

    onFocusChange(calendarFocused) {
        this.setState({ calendarFocused });
    }

    render() {
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={this.handleTextFilterChange} />
                <select value={this.props.filters.sortBy} onChange={this.handleSortFilterChange} >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                {this.props.filters.sortBy === "date" &&
                    <DateRangePicker
                        startDate={this.props.filters.startDate}
                        endDate={this.props.filters.endDate}
                        onDatesChange={this.onDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        startDateId={'startDate'}
                        endDateId={'endDate'}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                        showClearDates={true}
                    />
                }
                
            </div>
        );
    }
    
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (event) => dispatch(setTextFilter(event.target.value)),
    setSortFilter: (event) => event.target.value === "amount" ?
        dispatch(sortByAmount()) 
        : dispatch(sortByDate()),
    onStartDateChange: (startDate) => dispatch(setStartDate(startDate)),
    onEndDateChange: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
