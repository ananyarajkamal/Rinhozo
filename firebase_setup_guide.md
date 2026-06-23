# Firebase Production Setup Guide

This guide outlines the steps required to configure Firebase Authentication and Firestore Security Rules for the production deployment of Rinhozo.

## 1. Firebase Project Initialization

1. Go to the Firebase Console.
2. Click Add Project and follow the instructions to create a new project.
3. Register a Web App inside your project to receive your configuration keys.

## 2. Enable Firebase Authentication

1. In the Firebase Console, navigate to Build and select Authentication.
2. Click Get Started.
3. Under the Sign-in method tab, enable the Email/Password provider.
4. Customize settings and save.

## 3. Firestore Database Setup

1. Navigate to Build and select Firestore Database.
2. Click Create Database.
3. Select your database location and choose Start in test mode for the initial setup.

## 4. Firestore Security Rules

To ensure strict row-level security where users can only view, modify, and log their own data, replace the default Firestore rules with the configuration below.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if the user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper function to check if the document belongs to the authenticated user
    function isOwner(userId) {
      return request.auth.uid == userId;
    }

    // User profiles collection rules
    match /profiles/{userId} {
      allow read, write: if isAuthenticated() && isOwner(userId);
    }

    // User progress collection rules
    match /progress/{progressId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }

    // User interaction logs collection rules
    match /interactions/{logId} {
      allow read, write: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

## 5. Deployment Rules

Ensure you have installed the Firebase CLI. Log in and initialize your local directory:

```bash
firebase login
firebase init firestore
```

During initialization, choose to use your existing project and set up the default rules file named firestore.rules. Paste the rules listed above into that file, then deploy the security rules:

```bash
firebase deploy:only firestore:rules
```

Deploy your static frontend code using your preferred hosting solution.
