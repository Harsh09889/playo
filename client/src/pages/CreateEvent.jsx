import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/authContext";
import { API } from "../service/api";

function Homepage() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const [event, setEvent] = useState({
		title: "",
		organizer: user._id,
		description: "",
		maxMembers: 0,
		startTime: "",
		endTime: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await API.createEvent(event);
			navigate("/");
		} catch (error) {}
	};

	const handleChange = (e) => {
		e.preventDefault();
		setEvent((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	return (
		<div className='bg-black'>
			<Navbar />
			<div>
				<div className='relative pt-[10rem]'>
					<form
						className='w-full mx-auto gap-8 bg-slate-50 border max-w-md flex flex-col rounded shadow'
						onSubmit={handleSubmit}>
						<input
							className='h-16 px-4 bg-slate-200'
							type='text'
							name='title'
							placeholder='Enter title of Event'
							value={event.title}
							onChange={handleChange}
						/>
						<input
							className='h-16 px-4 bg-slate-200'
							type='text'
							name='description'
							placeholder='Enter description of Event'
							value={event.description}
							onChange={handleChange}
						/>
						<input
							className='h-16 px-4 bg-slate-200'
							type='number'
							name='maxMembers'
							placeholder='Enter Your maximum Members that can join'
							value={event.maxMembers}
							onChange={handleChange}
						/>
						<div className='flex flex-col'>
							<label htmlFor='startTime'>Choose Start Time of Event</label>
							<input
								className='h-16 px-4 bg-slate-200'
								type='datetime-local'
								name='startTime'
								value={event.email}
								onChange={handleChange}
							/>
						</div>

						<div className='flex flex-col'>
							<label htmlFor='startTime'>Choose Start Time of Event</label>
							<input
								className='h-16 px-4 bg-slate-200'
								type='datetime-local'
								name='endTime'
								value={event.email}
								onChange={handleChange}
							/>
						</div>

						<button
							type='submit'
							className='h-16 px-4 bg-green-400'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
