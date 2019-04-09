import { db } from '../db';

export const addItem = (item) => {
  db.ref('/items').push({
    name: item
  });
}

export const registerAcc = (username, password) => {
  return new Promise((resolve, reject) => {
    var userRef = db.ref(`/accounts/${username}`);
    userRef.transaction((currentData) => {
      if (currentData === null) {
        return { password: password }
      } else {
        console.log('User already exists')
        return
      }
    }, (error, committed, snapshot) => {
      console.log(`${username}'s data: ${snapshot.val()}`)
      if (error) {
        reject('ERROR: ', error)
      } else if (!committed) {
        reject(`User "${username}" already exists`)
      } else {
        resolve(`User ${username} added!`)
      }
    })
  })


}
