import React, { useContext, useRef, useEffect } from "react";
import "../../../index.css";
import LectureContext from "../../../context/LectureContext";
import { useQuery } from "@apollo/client";
import { GET_LECTURE } from "../../../queries";

const ConversationContainer = () => {

	const { selectedLectureId } = useContext(LectureContext);

	const { data, loading, error } = useQuery(GET_LECTURE, {
		variables: { id: selectedLectureId },
	});

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [data]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const messages = data?.getLecture?.conversation || [];

	const messagesToRender = messages.slice(1);

	return (
		<div className="convo-container">
			{messagesToRender.map((message) => (
				<Message
					key={message._id} // Assuming each message has a unique _id
					role={message.sender === "user" ? "user" : "assistant"}
					content={message.text}
				/>
			))}
		</div>
	);
};

const Message = ({ role, content }) => {
	const messageClass = role === "user" ? "user-message" : "AI-container";
	const profileContainer =
		role === "user" ? "profile-img-container" : "AiProfile";

	return (
		<div className={`message-container ${messageClass}`}>
			<div className={`${profileContainer}`}></div>
			<div className="msg">
				<p>{content}</p>
			</div>
		</div>
	);
};

export default ConversationContainer;
