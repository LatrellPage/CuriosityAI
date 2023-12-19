import React, { useContext } from "react";
import "../../../../index.css";
import { AuthContext} from '../../../../context/authContext';
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";


const SidebarFooter = () => {
	const { user } = useContext(AuthContext);
	const name = user?.name;
	const firstLetterInName = name[0]

	return (
		<div className="sidebar-footer">
			<div className="profile-img-container">
			<Avatar
						sx={{ bgcolor: deepOrange[500], height: 32, width: 32 }}
						alt="User Avatar"
						src="/broken-image.jpg"
					>
						{firstLetterInName}
					</Avatar>
			</div>
			<h2 className="profile-name">{ name }</h2>
			
		</div>
	);
};



export default SidebarFooter;