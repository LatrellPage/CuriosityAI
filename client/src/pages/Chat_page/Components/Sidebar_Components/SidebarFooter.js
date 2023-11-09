import React, { useContext } from "react";
import "../../../../index.css";
import { AuthContext} from '../../../../context/authContext';
import { useQuery } from '@apollo/client'


const SidebarFooter = () => {
	const { user } = useContext(AuthContext);
	const name = user?.name;

	

	return (
		<div className="sidebar-footer">
			<div className="profile-img-container">
				<img alt=""></img>
			</div>
			<h2 className="profile-name">{ name }</h2>
		</div>
	);
};

export default SidebarFooter;