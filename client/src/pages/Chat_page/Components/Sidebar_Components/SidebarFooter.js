import React, { useContext } from "react";
import "../../../../index.css";
import { AuthContext} from '../../../../context/authContext';


const SidebarFooter = () => {
	const { user } = useContext(AuthContext);
	const name = user?.name;
	console.log(name)

	

	return (
		<div className="sidebar-footer">
			<div className="profile-img-container">
				<img src="userProfileImage.png"></img>
			</div>
			<h2 className="profile-name">{ name }</h2>
		</div>
	);
};

export default SidebarFooter;