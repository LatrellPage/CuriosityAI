import React from "react";
import "../../../index.css";
import SidebarHeader from "./Sidebar_Components/SidebarHeader";
import RecentChatsContainer from "./Sidebar_Components/RecentChatsContainer";
import SidebarFooter from "./Sidebar_Components/SidebarFooter";


const Sidebar = () => {
	return (
		<div className="sidebar">
			<SidebarHeader />
			<RecentChatsContainer />
			<SidebarFooter />
		</div>
	);
};

export default Sidebar;