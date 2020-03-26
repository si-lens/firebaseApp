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
    const product =  snapshot.data() as Product
   //snapshot.id  - Can somebody explain me why this doesn't work?!
   depFactory.getStockController().stockProductCreate(product).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
  });
exports.productBought = functions.firestore.document('products/{id}')
  .onUpdate((change, context) => {
        //When product is bought, stock amount is decreased
       depFactory.getStockController().decreaseStockCount(change,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
       ///When product is bought, new order is created and added to the db
       depFactory.getOrderController().createOrder(change,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
  });
exports.productUpdated = functions.firestore.document('products/{id}')
  .onUpdate((change, context) => {
    //Todo implement methods for updating product both in "orders" and "stocks" collections
    //depFactory.getOrderController().updateProductInOrder(change,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
    //depFactory.getStockController().updateProductInOrder(change,context).then(() => console.log("Success")).catch(()=>console.log("Something went wrong"));
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



