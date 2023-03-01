export const BASE_URL = process.env.REACT_APP_BASE_URL;

//DEMO service call -> { url:'/', method:'POST/DELETE/GET/PUT/', params:true/false, query:true/false }
export const SERVICE_URLS = {
	userSignup: { url: "/auth/signup", method: "POST" },
	userLogin: { url: "/auth/login", method: "POST" },
	tokenRefresh: { url: "/token/refresh", method: "POST" },
	createEvent: { url: "/events/", method: "POST" },
	getAllEvents: { url: "/events/", method: "GET" },
};
