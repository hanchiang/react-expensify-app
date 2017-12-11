import moment from 'moment';

const expenses = [
    {
        id: '1',
        description: 'hello',
        note: '',
        amount: 130502,
        createdAt: 0
    },
    {
        id: '2',
        description: 'water',
        note: '',
        amount: 1204032,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: '3',
        description: 'bill',
        note: '',
        amount: 35304,
        createdAt: moment(0).add(4, 'days').valueOf()
    }
];

export default expenses;