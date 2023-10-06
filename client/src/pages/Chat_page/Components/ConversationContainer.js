import React from "react";
import "../../../index.css";


const ConversationContainer = (props) => {
	const { textareaValue, assistantResponse } = props;

	return (
		<div className="convo-container">
			<Message
				role="user"
				content={textareaValue}
				assistantResponse={assistantResponse}
			/>
			<Message
				role="assistant"
				content={assistantResponse}
				textareaValue={textareaValue}
			/>
		</div>
	);
};

const Message = ({ role, content, textareaValue, assistantResponse }) => {
	const messageClass = role === "user" ? "user-message" : "assistant-message";

	return (
		<div className={`message-container ${messageClass}`}>
			<div className="profile-img-container"></div>
			<div className="msg">
				{role === "user" ? <p>{content}</p> : <p>{content}</p>}
			</div>
		</div>
	);
};

export default ConversationContainer;
