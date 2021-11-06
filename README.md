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

####  Section 25: Bonus: Angular Universal

#####  391. Adding Angular Universal

1.  Install Angular Universal
    - ~~ng add @nguniversal/express-engine --clientProject course-project~~ (deprecated)
    - `ng add @nguniversal/express-engine`
2.  Check that code runs in a browser
    -  `isPlatformBrowser(this.platformId)`
3.  Max's run commands
    -  `npm run build:ssr`
    -  `npm run serve:ssr`
    -  visit `localhost:4000`   
4.  Jost's run command
    -  `npm run dev:ssr` 

####  Section 26: Angular Animations

#####  403. Making Animations Work with Angular 4+

1.  Install the new animations package: 
    -  `npm install --save @angular/animations`
2.  Add the BrowserAnimationsModule  to your imports[]  array in AppModule    
    
####  Section 27: Adding Offline Capabilities with Service Workers

#####  416. Adding Service Workers

1.  Add library for service worker
    -  `ng add @angular/pwa`
2.  Build project
    -  `ng build --prod`
3.  Install web server
    -  `npm install -g http-server` (Max)
    -  **or**
    -  `npm i -g http-server-spa` (Jost)
4.  Start server
    -  `cd dist/angular-pwa`
    -  `http-server -p 8081`
    -  **or**
    -  `http-server-spa .`

####  Section 29: Angular as a Platform, Closer Look at the CLI

#####  433. A Closer Look at "ng new"    

1.  Install latest ng cli
    -  `npm install -g @angular/cli@latest`
2.  Ng New Help
    -  `ng new --help`
3.  New Project
    -  `ng new angular-config`
        -  No Routing
        -  CSS     

#####  436. Important CLI Commands

-  `ng help`
-  `ng serve --help`
    -  --port 4321
    -  to access to local IP like http://192.168.1.154:4200
        -  `ng serve --host 0.0.0.0 --disable-host-check` 
        -  `ng serve --host 192.168.1.154 --disable-host-check`
-  `ng generate --help`          
    -  `ng generate component --help`
    -  `ng generate class shared/user --type model` -> will generate user.model.ts with class User
-  `ng lint` -> code quality check
    -  uses `tslint.json` file
    -  `Cannot find "lint" target for the specified project.`
    -  `You should add a package that implements linting capabilities.`
    -  `ng add @angular-eslint/schematics` ->
        -  `An unhandled exception occurred: NOT SUPPORTED: keyword "id", use "$id" for schema ID`    
-  `ng build`

#####  439. The "ng add" Command

-  `ng add @angular/material`
    -  theme: Deep Purple/Amber
    -  animations -> yes
    
#####  440. Using Custom "ng generate" Schematics

-  `ng generate @angular/material:nav main-nav`

#####  442. Simplified Deployment with "ng deploy"

-  `ng add @angular/fire`
-  `npm install -g firebase-tools` - in case of errors
-  not working for me. have an error
    - `The package that you are trying to add does not support schematics. You can try using a different version of the package or contact the package author to add ng-add support.`
-  skipping

          