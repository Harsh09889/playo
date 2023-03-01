import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function Navbar() {
	const { user } = useContext(AuthContext);
	return (
		<nav className='flex items-center px-8 justify-between  h-20 bg-[rgba(0,0,0,0.5)] sticky top-0 left-0 z-50'>
			<NavLink to={"/"}>
				<img
					className='h-16'
					src='https://playo-website.gumlet.io/playo-website-v2/Logo+with+Trademark_Filled.png'
					alt='logo'
				/>
			</NavLink>
			<div className='flex gap-4'>
				{!user ? (
					<>
						<NavLink
							to={"/auth/"}
							className='text-white'>
							Login
						</NavLink>
						<NavLink
							to={"/auth/signup"}
							className='text-white'>
							Signup
						</NavLink>
					</>
				) : (
					<>
						<h2 className='text-white font-bold'>{user.name}</h2>
						<NavLink
							to={"/events/create"}
							className='text-white font-bold'>
							Create Event
						</NavLink>
						<NavLink
							to={"/yourevents"}
							className='text-white font-bold'>
							Your Events
						</NavLink>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
