import { createContext, useEffect, useState } from "react";
import { API } from "../service/api";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	async function login(body) {
		try {
			const { data } = await API.userLogin(body);
			setUser(data);
		} catch (error) {}
	}

	function logout() {
		setUser(null);
	}

	async function signup(body) {
		try {
			await API.userSignup(body);
			return true;
		} catch (error) {
			return false;
		}
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, signup }}>
			{children}
		</AuthContext.Provider>
	);
}
