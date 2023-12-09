import "../../index.css";
import BottomContainer from "./Components/BottomContainer";
import ConversationContainer from "./Components/ConversationContainer";
import React, { useState, useEffect, useContext, useRef } from "react";
import MobileDeviceHeader from "./Components/MobileDeviceHeader";
import MobileDeviceSidePanel from "./Components/MobileDeviceSidepanel";
import Sidebar from "./Components/Sidebar";
import OpenAI from "openai";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery } from "@apollo/client";
import {
	GET_LECTURE,
	INSERT_MESSAGE_TO_LECTURE,
	GET_USER_LECTURES,
	CREATE_LECTURE,
	UPDATE_LECTURE_SETTINGS,
} from "../../queries";
import LectureContext from "../../context/LectureContext";

const Chat = () => {
	// Tracks the state of lecture id and name/ user
	const [selectedLectureId, setSelectedLectureId] = useState(null);

	const [firstName, setFirstName] = useState("");

	const { user } = useContext(AuthContext);

	// tracks state of textarea which holds user message and ai reply
	const [textareaValue, setTextareaValue] = useState("");
	const [assistantResponse, setAssistantResponse] = useState("");
	const [conversationHistory, setConversationHistory] = useState([]);

	const handleTextareaChange = (event) => {
		setTextareaValue(event.target.value);
	};

	const [insertMessageToLecture] = useMutation(INSERT_MESSAGE_TO_LECTURE);
	const [updateLectureSettings] = useMutation(UPDATE_LECTURE_SETTINGS);

	const data = useQuery(GET_LECTURE, {
		variables: { id: selectedLectureId },
	});

	const [loading, setLoading] = useState(false);

	const handleSendClick = async () => {
		if (!textareaValue) {
			console.error("Textarea value is empty or null");
			return;
		}
		try {
			setLoading(true)
			setTextareaValue("");

			// Prepare user message for the database
			const userMessageForDB = {
				text: textareaValue,
				sender: "user",
			};

			try {
				// Await the mutation
				insertMessageToLecture({
					variables: {
						lectureId: selectedLectureId,
						message: userMessageForDB,
					},
				});

			} catch (error) {
				// Log error if the mutation fails
				console.error("Error inserting message:", error);
			}

			const messages = data?.data?.getLecture?.conversation;


			// Loop through the messages and insert them into a new array
			let formattedMessages = [];
			if (messages && Array.isArray(messages)) {
				formattedMessages = messages.map((message) => {
					return {
						content: message.text,
						sender: message.sender,
					};
				});
			}

			const newConversationHistoryForAI = [
				...formattedMessages.map((message) => ({
					role: message.sender === "user" ? "user" : "assistant",
					content: message.content || "",
				})),
				{ role: "user", content: textareaValue },
			];

			// Create OpenAI instance and get response
			const openai = new OpenAI({
				apiKey: process.env.REACT_APP_OPENAI_API_KEY,
				dangerouslyAllowBrowser: true,
			});

			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: newConversationHistoryForAI,
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});

			// Extract the AI's reply
			const assistantReply = response.choices[0].message.content;

			// Prepare AI message for the database
			const assistantMessageForDB = {
				text: assistantReply,
				sender: "ai",
			};

			// Insert AI message to the lecture in the database
			try {
				// Await the mutation
				await insertMessageToLecture({
					variables: {
						lectureId: selectedLectureId,
						message: assistantMessageForDB,
					},
					refetchQueries: [
						{
							query: GET_LECTURE,
							variables: { selectedLectureId },
						},
					],
				});
				setLoading(false);
				// Log success message if the mutation is successful
			} catch (error) {
				// Log error if the mutation fails
				console.error("Error inserting the AI's message:", error);
			}

			// Update conversation history in the state
			setConversationHistory([
				...conversationHistory,
				userMessageForDB,
				assistantMessageForDB,
			]);
			setAssistantResponse(assistantReply);

			let newTitle;

			if (newConversationHistoryForAI.length === 7) {
				const openai = new OpenAI({
					apiKey: process.env.REACT_APP_OPENAI_API_KEY,
					dangerouslyAllowBrowser: true,
				});

				const summaryRequest = {
					role: "user",
					content:
						"Summarize this lecture into a short lecture. ONLY respond with the title, this is very important return the title ONLYY!!!!. Title should be no longer then 20 characters that including spaces. DO NOT RETURN ANY PUNCTUATION",
				};

				const messagesWithPrompt = [
					...newConversationHistoryForAI,
					summaryRequest,
				];

				try {
					const response = await openai.chat.completions.create({
						model: "gpt-3.5-turbo",
						messages: messagesWithPrompt,
						temperature: 0.3,
						max_tokens: 256,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					});

					// Check if response has choices and extract the title
					if (response.choices && response.choices.length > 0) {
						newTitle = response.choices[0].message.content;
					} else {
						console.error("Invalid response structure:", response);
					}
				} catch (error) {
					console.error("Error making API request:", error);
				}
			}

			// Ensure newTitle is defined before updating lecture settings
			if (newTitle) {
				try {
					await updateLectureSettings({
						variables: {
							lectureId: selectedLectureId,
							settings: { title: newTitle },
						},
						refetchQueries: [
							{ query: GET_USER_LECTURES},
						],
					});
				} catch (error) {
					console.error("Error updating lecture settings:", error);
				}
			}
		} catch (error) {
			console.error(
				"Error making API request or inserting message:",
				error
			);
		}
	};

	const userId = user?.userId;
	const [createLecture] = useMutation(CREATE_LECTURE, {
		refetchQueries: [{ query: GET_USER_LECTURES}],
	});

	const isLectureCreationInProgress = useRef(false);
	const [initialSetupDone, setInitialSetupDone] = useState(false);

	useEffect(() => {
		const name = user?.name;
		if (name) {
			const nameParts = name.split(" ");
			const extractedFirstName = nameParts[0];
			setFirstName(extractedFirstName);
		}

		const fetchData = async () => {
			let lectureId = selectedLectureId;

			if (!lectureId && !isLectureCreationInProgress.current) {
				isLectureCreationInProgress.current = true;
				try {
					const newLectureResponse = await createLecture();

					lectureId = newLectureResponse.data.createLecture._id;

					setSelectedLectureId(lectureId);
				} catch (e) {
					console.error("Error creating a lecture", e);
					isLectureCreationInProgress.current = false; // Reset flag on error
					return;
				}
			}

			if (!initialSetupDone) {
				setInitialSetupDone(true);

				try {
					const openai = new OpenAI({
						apiKey: process.env.REACT_APP_OPENAI_API_KEY,
						dangerouslyAllowBrowser: true,
					});

					const extractedFirstName =
						user?.name.split(" ")[0] || "User";

					const initialMessage = {
						role: "user",
						content: `Start your response with 'Hello ${extractedFirstName}, what should we learn today?' followed by a super sarcastic joke about what you would like to learn about. Keep the initial greeting brief and let the humor come through naturally without explaining the joke. Throughout the conversation, maintain a humorous tone. Once the user specifies their learning interest, provide relevant information and data, using analogies for clearer understanding. Remember, do not include detailed information or data in the first response`,
					};

					const initialMessageForDB = {
						text: initialMessage.content,
						sender: initialMessage.role,
					};

					await insertMessageToLecture({
						variables: {
							lectureId: lectureId,
							message: initialMessageForDB,
						},
					});


					const response = await openai.chat.completions.create({
						model: "gpt-3.5-turbo",
						messages: [initialMessage],
						temperature: 1,
						max_tokens: 256,
						top_p: 1,
						frequency_penalty: 0,
						presence_penalty: 0,
					});

					const assistantReply = response.choices[0].message.content;

					const assistantMessageForDB = {
						text: assistantReply,
						sender: "ai",
					};

					await insertMessageToLecture({
						variables: {
							lectureId: lectureId,
							message: assistantMessageForDB,
						},
					});

				} catch (error) {
					console.error("Error in initial message setup:", error);
				}
			}
		};

		fetchData();
	}, [user, selectedLectureId, user?.userId, firstName, initialSetupDone]);

	return (
		<LectureContext.Provider
			value={{ selectedLectureId, setSelectedLectureId }}
		>
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
					loading={loading}
				/>
			</div>
		</LectureContext.Provider>
	);
};

export default Chat;
