import { lazy, Suspense, useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const CreateEvent = lazy(() => import("../pages/CreateEvent"));
const Event = lazy(() => import("../pages/Event"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const Homepage = lazy(() => import("../pages/Homepage"));
const YourEvents = lazy(() => import("../pages/YourEvents"));

function IfLoggedIn() {
	const { user } = useContext(AuthContext);
	return user ? <Outlet /> : <Navigate to={"/auth"} />;
}

function IfLoggedOut() {
	const { user } = useContext(AuthContext);
	return !user ? <Outlet /> : <Navigate to={"/"} />;
}

function MainRoute() {
	const { user } = useContext(AuthContext);
	return (
		<Routes>
			<Route
				path='/'
				element={<IfLoggedIn />}>
				<Route
					path=''
					element={
						<Suspense fallback={"Loading..."}>
							<Homepage />
						</Suspense>
					}
				/>
				<Route
					path='/events/create'
					element={
						<Suspense fallback={"Loading..."}>
							<CreateEvent />
						</Suspense>
					}
				/>
				<Route
					path='/events/:id'
					element={
						<Suspense fallback={"Loading..."}>
							<Event />
						</Suspense>
					}
				/>
				<Route
					path='/yourevents'
					element={
						<Suspense fallback={"Loading..."}>
							<YourEvents />
						</Suspense>
					}
				/>
			</Route>
			<Route
				path='/auth'
				element={<IfLoggedOut />}>
				<Route
					path=''
					element={
						<Suspense fallback={"Loading..."}>
							<Login />
						</Suspense>
					}
				/>
				<Route
					path='signup'
					element={
						<Suspense fallback={"Loading..."}>
							<Signup />
						</Suspense>
					}
				/>
			</Route>

			<Route
				path='/login'
				element={
					<Suspense fallback={"Loading..."}>
						<Login />
					</Suspense>
				}
			/>
			<Route
				path='/signup'
				element={
					<Suspense fallback={"Loading..."}>
						<Signup />
					</Suspense>
				}
			/>
		</Routes>
	);
}

export default MainRoute;
