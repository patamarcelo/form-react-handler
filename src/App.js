import { useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput.component";

import { addUser, getQuery } from "./utils/firebase/firebase";

const INITITAL_STATE = {
	username: "",
	email: "",
	birthday: "",
	password: "",
	confirmPassword: ""
};

const App = () => {
	const [values, setValues] = useState(INITITAL_STATE);
	const [query, setQuery] = useState([]);

	const inputs = [
		{
			id: 1,
			name: "username",
			type: "text",
			placeholder: "Username",
			errorMessage:
				"Username should be 3-16 characters and shouldn't include any special character!",
			label: "Username",
			pattern: "^[A-Za-z0-9]{3,16}$",
			required: true
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "Email",
			errorMessage: "It should be a valid email address!",
			label: "Email",
			required: true
		},
		{
			id: 3,
			name: "birthday",
			type: "date",
			placeholder: "Birthday",
			label: "Birthday"
		},
		{
			id: 4,
			name: "password",
			type: "password",
			placeholder: "Password",
			errorMessage:
				"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
			label: "Password",
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
			required: true
		},
		{
			id: 5,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
			errorMessage: "Passwords don't match!",
			label: "Confirm Password",
			pattern: values.password,
			required: true
		}
	];

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(values);
		setValues(INITITAL_STATE);
		addUser(
			values.username,
			values.email,
			values.birthday,
			values.password
		);
	};

	const handlerQuery = async () => {
		const query = await getQuery();
		console.log("query", query);
		setQuery(query);
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<>
			<div className="app">
				<form onSubmit={handleSubmit}>
					<h1>Register</h1>
					{inputs.map((input) => (
						<FormInput
							key={input.id}
							{...input}
							value={values[input.name]}
							onChange={onChange}
						/>
					))}
					<button>Submit</button>
				</form>
			</div>
			<button onClick={handlerQuery}>Gerar Query</button>

			{query && <h1>{JSON.stringify(query)}</h1>}
		</>
	);
};

export default App;
