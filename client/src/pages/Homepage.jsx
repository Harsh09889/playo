import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/authContext";
import { API } from "../service/api";

function AllEvents() {
	const [events, setEvents] = useState([]);
	const { user } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleAddMember = (e, event) => {
		e.preventDefault();
		navigate(`/events/${event._id}`, { state: { event } });
	};

	useEffect(() => {
		(async () => {
			const { data } = await API.getAllEvents();
			setEvents(data);
		})();
	}, []);

	return (
		<>
			<Navbar />
			<div className='relative  h-full min-h-screen flex flex-col pt-[10rem] '>
				<h2 className='text-white text-center text-4xl mb-4'> All Events</h2>

				<div className='w-full flex flex-col gap-4'>
					{events.map((event) => (
						<div
							onClick={(e) => handleAddMember(e, event)}
							key={event._id}
							className='bg-white p-4 flex flex-col gap-4 shadow-lg w-full '>
							<h2>Title : {event.title}</h2>
							{/* change it to name */}
							<h2>Organizer : {event.organizer.username}</h2>
							<p>Starting At : {new Date(event.startTime).toLocaleString()}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default AllEvents;
