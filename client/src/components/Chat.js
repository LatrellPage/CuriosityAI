import "../index.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faMessage,
	faTrashCan,
	faPen,
} from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
	return (
		<div className="chat-container">
			<ConversationContainer />
			<Sidebar />
			<BottomContainer />
		</div>
	);
};

const ConversationContainer = () => {
	return (
		<div className="convo-container">
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
		</div>
	);
};

const UserMessage = () => {
	return (
		<div className="message-container">
			<div className="profile-img-container"></div>
			<div className="message">
				<p>
					Amidst the bustling city, a lone street musician played a
					melancholic tune on his weathered guitar, capturing the
					hearts of passersby with each soulful note. The setting sun
					painted the sky in hues of orange and pink, casting long
					shadows that danced to the rhythm of the music. It was a
					moment of serenity in the midst of chaos, a reminder of the
					beauty that could be found in the simplest of moments.
				</p>
			</div>
		</div>
	);
};

const AiMessage = () => {
	return (
		<div id="AI-container" className="message-container">
			<div className="AiProfile"></div>
			<div className="message">
				<p>
					Amidst the bustling city, a lone street musician played a
					melancholic tune on his weathered guitar, capturing the
					hearts of passersby with each soulful note. The setting sun
					painted the sky in hues of orange and pink, casting long
					shadows that danced to the rhythm of the music. It was a
					moment of serenity in the midst of chaos, a reminder of the
					beauty that could be found in the simplest of moments.
				</p>
			</div>
		</div>
	);
};

const BottomContainer = () => {
	return (
		<div className="bottom-container">
			<TextareaContainer />
		</div>
	);
};

const TextareaContainer = () => {
	return (
		<div className="text-flex-positioner">
			<div className="text-container">
				<textarea
					placeholder="Send a Message"
					className="text-area"
				></textarea>
				<div className="submit-button-container">
					<span id="sendBTN" class="material-symbols-rounded">
						send
					</span>
				</div>
			</div>
		</div>
	);
};

const Sidebar = () => {
	return (
		<div className="sidebar">
			<SidebarHeader />
			<RecentChatsContainer />
			<SidebarFooter />
		</div>
	);
};

const SidebarHeader = () => {
	return (
		<div className="sidebar-header">
			<NewChatBTN />
		</div>
	);
};

const NewChatBTN = () => {
	return (
		<div className="new-chatBTN">
			<FontAwesomeIcon
				icon={faPlus}
				style={{ color: "#ffffff", marginRight: "1rem" }}
			/>
			<div>New Chat</div>
		</div>
	);
};

const RecentChatItem = () => {
	const [showIcons, setShowIcons] = useState(false);
	const [chatTitleStyles, setChatTitleStyles] = useState({
		width: "80%",
	});

	const toggleIcons = () => {
		setShowIcons(!showIcons);
		setChatTitleStyles({
			width: showIcons ? "80%" : "57%",
		});
	};

	return (
		<li
			className="recent-chat"
			onClick={toggleIcons}
			style={{
				justifyContent: showIcons ? "space-between" : "normal",
			}}
		>
			<FontAwesomeIcon
				icon={faMessage}
				style={{ color: "whitesmoke", marginLeft: "1rem" }}
			/>
			<h1 className="chat-title" style={chatTitleStyles}>
				New Chat about quantum mechanics
			</h1>
			{showIcons && (
				<>
					<FontAwesomeIcon
						icon={faPen}
						style={{ color: "#ffffff" }}
					/>
					<FontAwesomeIcon
						icon={faTrashCan}
						style={{ color: "#ffffff", marginRight: "0.7rem" }}
					/>
				</>
			)}
			<input></input>
		</li>
	);
};

const RecentChatsContainer = () => {
	return (
		<ol className="recent-chats-container">
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
            <RecentChatItem />
			
		</ol>
	);
};

const SidebarFooter = () => {
	return (
		<div className="sidebar-footer">
			<div className="profile-img-container">
				<img></img>
			</div>
			<h2 className="profile-name">John Doe</h2>
		</div>
	);
};

export default Chat;
