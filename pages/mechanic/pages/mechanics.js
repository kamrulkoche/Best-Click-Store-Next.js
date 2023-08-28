import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from '../authentication/sessionAuthentication';

export default function Mechanics() {

	const [users, setUsers] = useState([]);
	const { user } = useAuth();
	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		const res = await axios(process.env.NEXT_PUBLIC_BACKEND_URL + 'mechanics',{
			withCredentials: true
		});
		console.log("RES", res.data);
		setUsers(res.data);
	}

	return (
		<div>
			<h1>Dynamic Routing</h1>
			{users.map((user) => {
				return (
					<div key={user.mechanic_id}>
						Mechanic ID :
						<Link href={"../profile/" + user.mechanic_id}> {user.mechanic_id}</Link>
					</div>
				);
			})}
		</div>
	);
};
