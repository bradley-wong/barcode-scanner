import { db } from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';


export const addItem = (username, barcode) => {
  db.ref(`/accounts/${username}/${barcode}`).push({
    name: item
  });
}

export const registerAcc = (username, password) => {
  let encodedUsername = encode(username)
  let encodedPassword = encode(password)

  return new Promise((resolve, reject) => {
    let userRef = db.ref(`/accounts/${encodedUsername}`);
    userRef.transaction((currentData) => {
      if (currentData === null) {
        return { password: encodedPassword }
      } else {
        console.log('User already exists')
        return
      }
    }, (error, committed, snapshot) => {
      console.log(`${username}'s data: `, snapshot.val())
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
