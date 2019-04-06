import { db } from '../db';

export const addItem = (item) => {
    db.ref('/items').push({
        name: item
    });
}