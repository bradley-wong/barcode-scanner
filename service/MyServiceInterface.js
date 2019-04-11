import { db } from '../db';
import {
  encode,
  decode,
  encodeComponents,
  decodeComponents,
} from 'firebase-encode';


export const addItem = (username, barcode, itemName, price, upctype) => {
  console.log('reee', username, barcode, itemName, price, upctype)
  let encodedUsername = encode(username),
    encodedBarcode = encode(barcode.toString()),
    encodedName = encode(itemName.toString()),
    encodedPrice = encode(price.toString()),
    encodedUPC = encode(upctype.toString())




  db.ref(`/accounts/${encodedUsername}/barcodes`).update({
    [encodedBarcode]: {
      name: encodedName,
      price: encodedPrice,
      upc: encodedUPC,
      date: new Date(),
      barcode: encodedBarcode
    }
  });
}

export const delItem = (username, userBarcode) => {
  let encodedUsername = encode(username),
    encodedUserBarcode = encode(userBarcode)
  db.ref(`/accounts/${encodedUsername}/barcodes/${encodedUserBarcode}`).remove()
}

export const registerAcc = (username, password) => {
  let encodedUsername = encode(username)
  let encodedPassword = encode(password)

  return new Promise((resolve, reject) => {
    if (username === '') { reject('Username cannot be left blank') }
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
