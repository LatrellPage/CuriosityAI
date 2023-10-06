import "../../index.css";
import BottomContainer from "./Components/BottomContainer";
import ConversationContainer from "./Components/ConversationContainer";
import React, { useState } from "react";
import MobileDeviceHeader from "./Components/MobileDeviceHeader";
import MobileDeviceSidePanel from "./Components/MobileDeviceSidepanel";
import Sidebar from "./Components/Sidebar";

const Chat = () => {
	const [textareaValue, setTextareaValue] = useState("");
	const [assistantResponse, setAssistantResponse] = useState("");

	return (
		<div className="chat-container">
			<MobileDeviceHeader />
			<ConversationContainer
				textareaValue={textareaValue}
				assistantResponse={assistantResponse}
			/>
			<MobileDeviceSidePanel />
			<Sidebar />
			<BottomContainer />
		</div>
	);
};

export default Chat;
