import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/authContext";
import { axiosInstance } from "../service/api";

function Event() {
	const location = useLocation();
	const [req, setReq] = useState(null);
	const [eventsPendingReq, setEventsPendingReq] = useState([]);
	const { event } = location.state;
	const { user } = useContext(AuthContext);
	const [seed, setSeed] = useState(1);

	const reset = () => {
		setSeed(Math.random());
	};

	const joinRequest = async () => {
		try {
			const { data } = await axiosInstance.get(`request/join/${event._id}`);
			reset();
			return alert("Request sent Successfully");
		} catch (error) {
			const {
				response: { data },
			} = error;
			alert(data.message);
		}
	};
	const checkReqStatus = async () => {
		try {
			const { data } = await axiosInstance.get(
				`request/checkRequest/${event._id}`
			);
			if (data.request) {
				setReq(data.request);
			}
		} catch (error) {
			const {
				response: { data },
			} = error;
		}
	};

	const handleAccept = async (req) => {
		try {
			const { data } = await axiosInstance.patch("/request/accept", {
				request: req,
			});
		} catch (error) {
			console.log(error.response.data);
			alert(error.response.data.message);
		}
		reset();
	};
	const handleReject = async (req) => {
		try {
			const { data } = await axiosInstance.patch("/request/reject", {
				request: req,
			});
			reset();
		} catch (error) {
			console.log(error.response.data);
			alert(error.response.data.message);
		}
	};

	const deleteReq = async (req) => {
		try {
			const { data } = await axiosInstance.delete(
				`/request/delete/${req._id}`,
				{
					request: req,
				}
			);
			reset();
		} catch (error) {
			console.log(error.response.data);
			alert(error.response.data.message);
		}
	};

	useEffect(() => {
		checkReqStatus();
	}, [seed]);

	console.log("Event is", event);

	useEffect(() => {
		(async () => {
			if (user._id === event.organizer._id) {
				const { data } = await axiosInstance.get(`request/event/${event._id}`);
				setEventsPendingReq(data.requests);
			}
		})();
	}, []);

	return (
		<>
			<Navbar />
			<h1 className='hidden'>{seed}</h1>
			<div className='relative text-white grid place-items-center min-h-screen'>
				<div className='max-w-3xl border'>
					<img
						src='https://via.placeholder.com/150'
						className='w-full'
						alt='...'
					/>
					<div className='p-4'>
						<h5 className='text-xl text-white font-bold tracking-widest mb-2 uppercase'>
							{event.title}
						</h5>
						<div className='my-4'>
							<h2>Members :</h2>
							{event.members?.map((elem) => (
								<p key={elem}>{elem}</p>
							))}
						</div>
						<p>
							{event.description || "Description of the event will go here"}
						</p>
						<p>Organizer : {event.organizer.username}</p>
						{req
							? (req.expired && <h2>Request Expired</h2>) ||
							  (req.accepted && <h2>Request Accepted</h2>) ||
							  (req.rejected && <h2>Request Rejected</h2>) || (
									<>
										<h2>Request Pending</h2>
										<button
											onClick={(e) => deleteReq(req)}
											className='p-2 rounded shadow bg-red-300 text-black'>
											Cancel Request
										</button>
									</>
							  )
							: user._id !== event.organizer._id && (
									<button
										onClick={joinRequest}
										className='bg-green-500 hover:bg-green-400 text-white px-4 py-2 inline-block mt-4 rounded'>
										Join
									</button>
							  )}
					</div>
				</div>
				{user._id === event.organizer._id && (
					<>
						<h2 className='text-6xl text-black bg-white'>You are the admin</h2>
						{eventsPendingReq.map((req) => (
							<div
								className='text-black bg-white w-full max-w-lg p-4 flex justify-between'
								key={req._id}>
								{req.creator.username}
								<div className='flex gap-2 '>
									{(event.startTime < Date.now() && <h2>Expired</h2>) ||
										(req.accepted && <h2>Accepted</h2>) ||
										(req.rejected && <h2>Rejected</h2>) || (
											<>
												<button
													className='bg-green-400 p-2 rounded shadow'
													onClick={(e) => handleAccept(req)}>
													Accept
												</button>
												<button
													className='bg-red-400 p-2 rounded shadow'
													onClick={(e) => handleReject(req)}>
													Decline
												</button>
											</>
										)}
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</>
	);
}

export default Event;
