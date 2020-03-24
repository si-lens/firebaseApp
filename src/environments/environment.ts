// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    // Don't worry it doesn't work ;-)
    apiKey: 'AIzaSyAFIN09WiEgQq6cTfpPanmAvrQi5sEYQwo',
    authDomain: 'chattijanchat.firebaseapp.com',
    databaseURL: 'https://chattijanchat.firebaseio.com',
    projectId: 'chattijanchat',
    storageBucket: 'chattijanchat.appspot.com',
    messagingSenderId: '418145859824',
    appId: '1:418145859824:web:4a219dce5695db0589aa35',
    measurementId: 'G-P81HHHZRYC'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
