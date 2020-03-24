// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from'firebase-admin';
import {Product} from "./models/products";
import {DependencyFactory} from "./dependency-factory";

admin.initializeApp();

const depFactory = new DependencyFactory();
/*
exports.productWritten = functions.firestore
  .document('products/{productID}')
  .onWrite((snap, context) => {
    return depFactory.getProductController().productWritten(context.params.productID);
  });
*/
exports.productCreated = functions.firestore.document('products/{id}')
  .onCreate((snapshot, context) => {
    const product = snapshot.data() as Product
   //snapshot.id  - Can somebody explain me why this doesn't work?!
   depFactory.getProductController().productCreated(product.id).then(() => console.log(snapshot.id)).catch(()=>console.log("You suck"));
  });





// Methods for old project
exports.deleteUser = functions.firestore.document('users/{id}').onDelete((res: any, context) => {
  admin.auth().deleteUser(context.params.id).then(() => console.log('its working')).catch( error => console.log(error));
});
exports.blockUser = functions.firestore.document('users/{id}').onUpdate((change, context) => {
  const id = context.params.id;

  admin.auth().getUser(id).then( userRecord => {
    if(userRecord.disabled) {
      admin.auth().updateUser(id, {
        disabled: false
      }).catch(() => console.log('Couldnt enable user'));
    } else {
      admin.auth().updateUser(id, {
        disabled: true
      }).catch(() => console.log('Couldnt disable user'));
    }
  }).catch(()=> console.log('Couldnt retrieve user'));

});



