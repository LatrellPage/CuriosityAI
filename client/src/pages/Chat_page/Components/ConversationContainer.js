import React, { useContext, useRef, useEffect } from "react";
import "../../../index.css";
import LectureContext from "../../../context/LectureContext";
import { useQuery } from "@apollo/client";
import { GET_LECTURE } from "../../../queries";

const ConversationContainer = () => {

	const { selectedLectureId } = useContext(LectureContext);

	const { data,} = useQuery(GET_LECTURE, {
		variables: { id: selectedLectureId },
	});

	const messages = data?.getLecture?.conversation || [];

	const messagesToRender = messages.slice(1);

	const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length]);

	return (
		<div className="convo-container">
			{messagesToRender.map((message) => (
				<Message
					key={message._id} // Assuming each message has a unique _id
					role={message.sender === "user" ? "user" : "assistant"}
					content={message.text}
				/>
			))}
			<div ref={bottomRef}></div>
		</div>
	);
};

const Message = ({ role, content }) => {
    const messageClass = role === "user" ? "user-message" : "AI-container";
    const profileImage = role === "user" ? "userProfileImage.png" : "robotTHinking.jpg";
	const headerContent = role == "user" ? "You" : "Professor Turing"
    return (
        <div className={`message-container ${messageClass}`}>
            <div className="profile-img-container">
                <img src={profileImage} alt={`${role}-avatar`} className="profile-avatar"/>
            </div>
            <div className="msg">
				<h1 style={{marginBottom: "0.5rem", fontWeight: "bold", fontSize: "0.5"}}>{headerContent}</h1>
                <p>{content}</p>
            </div>
        </div>
    );
};


export default ConversationContainer;
