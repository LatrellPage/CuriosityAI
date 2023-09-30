import "../../index.css";
import BottomContainer from "./Components/BottomContainer"
import ConversationContainer from "./Components/ConversationContainer";
import React from "react";
import MobileDeviceHeader from "./Components/MobileDeviceHeader";
import MobileDeviceSidePanel from "./Components/MobileDeviceSidepanel";
import Sidebar from "./Components/Sidebar";

const Chat = () => {
	return (
		<div className="chat-container">
			<MobileDeviceHeader />
			<ConversationContainer />
			<MobileDeviceSidePanel />
			<Sidebar />
			<BottomContainer />
		</div>
	);
};




export default Chat;
