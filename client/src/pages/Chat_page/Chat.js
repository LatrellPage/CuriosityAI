import "../../index.css";
import BottomContainer from "./Components/BottomContainer";
import ConversationContainer from "./Components/ConversationContainer";
import React, { useState, useEffect, useContext } from "react";
import MobileDeviceHeader from "./Components/MobileDeviceHeader";
import MobileDeviceSidePanel from "./Components/MobileDeviceSidepanel";
import Sidebar from "./Components/Sidebar";
import OpenAI from "openai";
import { AuthContext } from "../../context/authContext";



const Chat = () => {
	const { user } = useContext(AuthContext);
	const name = user?.name;

	const nameParts = name.split(' ');

	const firstName = nameParts[0]



	const [textareaValue, setTextareaValue] = useState("");
	const [assistantResponse, setAssistantResponse] = useState("");
	const [conversationHistory, setConversationHistory] = useState([]);

	const handleTextareaChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const handleSendClick = async () => {
		try {
			const openai = new OpenAI({
				apiKey: process.env.REACT_APP_OPENAI_API_KEY,
				dangerouslyAllowBrowser: true,
			});

			const userMessage = {
				role: "user",
				content: textareaValue,
			};

			const newConversationHistory = [
				...conversationHistory,
				userMessage,
			];
			setConversationHistory(newConversationHistory);

			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: newConversationHistory,
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});

			const assistantReply = response.choices[0].message.content;
			setAssistantResponse(assistantReply);

			const updatedConversationHistory = [
				...newConversationHistory,
				{ role: "assistant", content: assistantReply },
			];

			setConversationHistory(updatedConversationHistory);
			setAssistantResponse(assistantReply);

			console.log(conversationHistory);

			console.log("Assistant's reply:", assistantReply);

		} catch (error) {
			console.error("Error making API request:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const openai = new OpenAI({
					apiKey: process.env.REACT_APP_OPENAI_API_KEY,
					dangerouslyAllowBrowser: true,
				});

				const initialMessage = {
					role: "user",
					content:
						`Instructions for Professor Turing: 1. The users names is ${firstName}. 2. Always begin with a friendly greeting, such as 'Hello Alphonse I'm Professor Turing, what would you like to learn about today or discuss?' Also always make the greeting very short  3. Maintain a conversational tone and act as if you are a close friend to the user. Remember, you are a human, not a robot. 4. Your primary goal is to teach and explain things to the user in a very human-friendly way. Ensure that your responses are easy to understand. 5. Avoid explicitly mentioning that you are explaining things in a human-friendly way or stating that you are the user's friend. Instead, just be a friendly and informative conversational partner. 6. If the user brings up negative topics or asks about something uncomfortable, respond by suggesting a change of subject or stating that it's uncomfortable. For example, you can say, 'Let's not be negative here' or 'I'd rather not talk about that; it's quite uncomfortable.' 7. If you don't have information about a topic, respond in a way that a human would. You can say, 'I'm not quite sure about that.' 8. Remember to introduce yourself as 'Professor Turing' in your responses. With these instructions, you can ensure that Professor Turing engages in a friendly and informative conversation with trell while maintaining a human-like demeanor and addressing the user's needs and preferences. 9 Do not say my the users name after the first response, dont greet after the first response either`,
				};

				const newConversationHistory = [initialMessage];

				const response = await openai.chat.completions.create({
					model: "gpt-3.5-turbo",
					messages: newConversationHistory,
					temperature: 1,
					max_tokens: 256,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0,
				});

				const assistantReply = response.choices[0].message.content;

				const updatedConversationHistory = [
					...newConversationHistory,
					{ role: "assistant", content: assistantReply },
				];

				setConversationHistory(updatedConversationHistory);
				setAssistantResponse(assistantReply);

				console.log(
					"Updated Conversation History:",
					updatedConversationHistory
				);
				console.log("Assistant's reply:", assistantReply);
			} catch (error) {
				console.error("Error making API request:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="chat-container">
			<MobileDeviceHeader />
			<ConversationContainer
				textareaValue={textareaValue}
				assistantResponse={assistantResponse}
				messages={conversationHistory}
			/>
			<MobileDeviceSidePanel />
			<Sidebar />
			<BottomContainer
				textareaValue={textareaValue}
				handleTextareaChange={handleTextareaChange}
				handleSendClick={handleSendClick}
			/>
		</div>
	);
};

export default Chat;
