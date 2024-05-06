// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyC-Y9oqWb9DOchX8TNuPdK8wGqDf_0RSN8",

	authDomain: "lighting-nodes.firebaseapp.com",

	projectId: "lighting-nodes",

	storageBucket: "lighting-nodes.appspot.com",

	messagingSenderId: "93953590064",

	appId: "1:93953590064:web:9f064496121685d6ddfef5",

	measurementId: "G-4X0FKMJ06T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
	return app;
};
