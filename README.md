# art-schwarzmuller-angular
 
Angular - The Complete Guide (2021 Edition) - Tutorial from Maximilian Schwarzmüller (Udemy)

####  Section 1: Getting Started

#####  6. Project Setup and First App

-  `ng new my-first-app --no-strict`
-  Routing - no
-  CSS

##### 12. A Basic Project Setup using Bootstrap for Styling

-  `npm install --save bootstrap@3`
-  update styles in `angulr.json`
-  rerun `ng serve`


####  Section 18: Making Http Requests

#####  253. Backend (Firebase) Setup

1.  Create new Firebase project
    -  Console
    -  `https://console.firebase.google.com`
    -  Add project `ng-complete-guide`
2.  Realtime Database
    -  Create database
    -  Start in test mode

#####  263. Handling Errors

-  Change rules for Realtime Database
-  Were
```json
{
  "rules": {
    ".read": "now < 1636754400000",  // 2021-11-13
    ".write": "now < 1636754400000",  // 2021-11-13
  }
}
```
-  Make
```json
{
  "rules": {
    ".read": false,
    ".write": "now < 1636754400000",  // 2021-11-13
  }
}
```
-  Fetch post - got `401 (Unauthorized)`

#####  264. Using Subjects for Error Handling

```json
{
  "rules": {
    "absent":{
      ".read": false,
      ".write":true
    },
    "posts":{
    	".read": "now < 1636754400000",  // 2021-11-13
    	".write": "now < 1636754400000",  // 2021-11-13
    }
  }
}
```

####  Section 20: Authentication & Route Protection in Angular

#####  290. Preparing the Backend

-  Change database rules
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
-  Tune Firebase Authentication
    -  Authentication -> Get Started
    -  Sign-in method: 
        -  Email/Password -> Enable
        -  Save

####  Section 23: Deploying an Angular App

#####  341. Deployment Example: Firebase Hosting

1.  Install Firebase CLI
    -  `npm install -g firebase-tools`
2.  Login to Google
    - `firebase login`
3.  Initiate project
    -  `firebase init`
    -  choose `Hosting`
    -  project in Firebase -> `ng-course-recipe-book-e8a67 (ng-course-recipe-book)` 
    -  public directory: `dist/course-project`
    -  configure as a single-page app -> yes
    -  overwrite index.html -> no      
4.  Deploy to Firebase Hosting
    -  `firebase deploy`
    -  After deploying, view your app at `ng-course-recipe-book-e8a67.web.app`
    -  [Project Console](https://console.firebase.google.com/project/ng-course-recipe-book-e8a67/overview)
    -  [Hosting URL](https://ng-course-recipe-book-e8a67.web.app)

####  Section 24: Bonus: Working with NgRx in our Project

#####  346. Getting Started with Reducers

1.  Install NgRx
    -  `npm install --save @ngrx/store`

#####  365. Exploring NgRx Effects

Install side effects package
-  `npm install --save @ngrx/effects`

#####  377. Using the Store Devtools

-  google for `redux devtools extension`
-  install `Redux DevTools` extension
-  install dependency
    -  `npm install --save-dev @ngrx/store-devtools` 

#####  378. The Router Store

-  `npm install --save @ngrx/router-store`

