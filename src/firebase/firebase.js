// Takes all the named exports and name is as 'firebase'
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };


// database.ref('expenses')
//   .on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

// database.ref('expenses')
//   .on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

// database.ref('expenses')
//   .on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

// database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log('Updated expenses list');
//     console.log(expenses);
//   });




// database.ref('expenses')
//   .once('value')
//   .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });


// database.ref('expenses').push({
//   description: 'Rent',
//   note: '',
//   amount: 17632,
//   createdAt: 154986093
// });



// database.ref('notes').push({
//   title: 'Course topics',
//   body: 'React native, python'
// });


// Gets the reference to database
// database.ref().set({
//   name: 'Han',
//   age: 24,
//   stressLevel: 7,
//   job: {
//     title: 'Web developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Orchard',
//     country: 'Singapore'
//   } 
// }).then(() => {
//   console.log('Data is saved');
// }).catch((error) => {
//   console.log('Data is not saved.', error);
// });

// database.ref('age').set(25);
// database.ref('location/city').set('Somerset');
// database.ref('attributes').set({
//   height: 171,
//   weight: 62
// }).then(() => {
//   console.log('Second set call worked.');
// }).catch((error) => {
//   console.log('Second called failed.', error);
// });