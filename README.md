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



