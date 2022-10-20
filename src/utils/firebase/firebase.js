import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { query, orderBy, onSnapshot, getDocs } from "firebase/firestore";

import { collection, addDoc, Timestamp } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyAF-DxKQ5tMSx5TO_WE18pT70WEWdrDf0s",
	authDomain: "form-handler-9db72.firebaseapp.com",
	projectId: "form-handler-9db72",
	storageBucket: "form-handler-9db72.appspot.com",
	messagingSenderId: "239493380735",
	appId: "1:239493380735:web:0db1a511996ccb78f89d4a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

export const addUser = async (username, email, birthday, password) => {
	try {
		await addDoc(collection(db, "users_register"), {
			username: username,
			email: email,
			birthday: birthday,
			password: password,
			isSuperUser: false,
			created: Timestamp.now()
		});
		console.log("user created successfully");
	} catch (err) {
		console.log(err);
	}
};

export const getQuery = async () => {
	const q = await query(
		collection(db, "users_register"),
		orderBy("created", "desc")
	);

	const querySnapshot = await getDocs(q);
	console.log(querySnapshot.docs.map((docSnapshot) => docSnapshot.data()));
	return querySnapshot.docs.map((docSnapshot) => {
    return {
      data: docSnapshot.data(),
      id: docSnapshot.id
    }
  });
};
