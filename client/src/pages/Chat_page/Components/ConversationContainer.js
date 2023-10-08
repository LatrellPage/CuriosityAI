import React from "react";
import "../../../index.css";

const ConversationContainer = ({ messages }) => {
	 const messagesToRender = messages.slice(1)

	return (
		<div className="convo-container">
			{messagesToRender.map((message, index) => (
				<Message
					key={index}
					role={message.role}
					content={message.content}
				/>
			))}
		</div>
	);
};

const Message = ({ role, content }) => {
	const messageClass = role === "user" ? "user-message" : "assistant-message";

	return (
		<div className={`message-container ${messageClass}`}>
			<div className="profile-img-container"></div>
			<div className="msg">
				<p>{content}</p>
			</div>
		</div>
	);
};

export default ConversationContainer;
