// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
import * as admin from'firebase-admin';

admin.initializeApp();


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
