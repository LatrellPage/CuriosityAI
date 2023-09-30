import React from "react";
import "../../../index.css";
import SidebarHeader from "./Sidebar_Components/SidebarHeader";
import RecentChatsContainer from "./Sidebar_Components/RecentChatsContainer";
import SidebarFooter  from "./Sidebar_Components/SidebarFooter";


const MobileDeviceSidePanel = ({ isSidePanelVisible, closeSidePanel }) => {
	return (
		<div
			className="sidepanel"
			style={{ display: isSidePanelVisible ? "block" : "none" }}
		>
			<SidebarHeader closeSidePanel={closeSidePanel} />
			<RecentChatsContainer />
			<SidebarFooter />
		</div>
	);
};


export default MobileDeviceSidePanel;