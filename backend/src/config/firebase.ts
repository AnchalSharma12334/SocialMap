import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Firebase Admin with environment variables
try {
  // Check if Firebase configuration is available in environment variables
  const projectId = process.env.FIREBASE_PROJECT_ID;
  
  if (!projectId) {
    console.warn('Firebase configuration not found in environment variables');
  }
  
  // Initialize without service account (using Google Application Default Credentials)
  // This works with the Firebase Admin SDK when your app is deployed on Google Cloud
  // or when running locally with application default credentials
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

export default admin;