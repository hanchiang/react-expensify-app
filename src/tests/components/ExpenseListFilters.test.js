import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defaultFilters, altFilters, altFilters2 } from '../fixtures/filters';

let setTextFilter, setSortFilter, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    setSortFilter = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
    <ExpenseListFilters  
        filters={defaultFilters} setTextFilter={setTextFilter} setSortFilter={setSortFilter}
        setStartDate={setStartDate} setEndDate={setEndDate}
    />);
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

// need to change the filters prop
test('should render ExpenseListFilters with alt data corectly', () => {
    wrapper.setProps({filters: altFilters});
    expect(wrapper).toMatchSnapshot();
});

test('should sort handle text change', () => {
    const value = 'hello';
    wrapper.find('input').simulate('change', value);
    expect(setTextFilter).toHaveBeenCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.find('select').simulate('change', value);
    expect(setSortFilter).toHaveBeenCalledWith(value);
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', value);
    expect(setSortFilter).toHaveBeenCalledWith(value);
});

test('should handle date changes', () => {
    const startDate = moment(0).add(1, 'days');
    const endDate = moment(0).add(7, 'days');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    wrapper.setProps({onStartDateChange, onEndDateChange});

    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(onStartDateChange).toHaveBeenCalledWith(startDate);
    expect(onEndDateChange).toHaveBeenCalledWith(endDate);
});
test('should handle date focus changes', () => {
    const focused = 'startDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
    expect(wrapper.state('calendarFocused')).toBe(focused);
});