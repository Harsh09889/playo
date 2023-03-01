import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/authContext";
import { API, axiosInstance } from "../service/api";

function YourEvents() {
	const [events, setEvents] = useState([]);
	const [requests, setRequests] = useState([]);

	const { user } = useContext(AuthContext);

	const handleAddMember = (e, event) => {
		e.preventDefault();
		if (event.organizer._id === user._id) {
			alert("You can not join an event created by yourself");
		}
	};

	useEffect(() => {
		(async () => {
			const { data } = await axiosInstance.get(`/events/organizer/${user._id}`);
			setEvents(data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const { data } = await axiosInstance.get(`/requests/`);
			setRequests(data.requests);
		})();
	}, []);

	return (
		<>
			<Navbar />
			<div className='h-full relative text-white  flex flex-col pt-[10rem] '>
				<h2 className='text-center text-4xl mb-4'> Your Events</h2>

				<div className='w-full flex flex-col gap-4'>
					{events.map((event) => (
						<div
							onContextMenu={(e) => handleAddMember(e, event)}
							key={event._id}
							className=' p-4 flex flex-col gap-4 shadow-lg w-full '>
							<h2>Title : {event.title}</h2>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default YourEvents;
