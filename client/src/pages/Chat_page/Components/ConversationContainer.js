import React from "react";
import "../../../index.css";



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
			<div className="msg">
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
			<div className="msg">
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


export default ConversationContainer;