// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from'firebase-admin';
import {Product} from "./models/products";
import {DependencyFactory} from "./dependency-factory";

admin.initializeApp();

const depFactory = new DependencyFactory();

exports.productCreated = functions.firestore.document('products/{id}')
  .onCreate((snapshot, context) => {
    const product =  snapshot.data() as Product;
   //snapshot.id  - Can somebody explain me why this doesn't work?!
   depFactory.getStockController().createStock(product,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
  });
exports.productUpdated = functions.firestore.document('products/{id}')
  .onUpdate((change, context) => {
        depFactory.getOrderController().updateOrder(change,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
        depFactory.getStockController().updateStock(change,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
  });
exports.productDeleted = functions.firestore.document('products/{id}')
  .onDelete((snapshot, context) => {
    depFactory.getStockController().deleteStock(context).then(() => console.log('deletion is working')).catch( error => console.log(error));
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



