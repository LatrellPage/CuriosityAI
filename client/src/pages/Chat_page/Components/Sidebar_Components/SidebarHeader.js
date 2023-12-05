import React, { useContext } from "react";
import "../../../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { CREATE_LECTURE, GET_USER_LECTURES, INSERT_MESSAGE_TO_LECTURE } from "../../../../queries";
import { AuthContext } from "../../../../context/authContext";
import LectureContext from "../../../../context/LectureContext"
import OpenAI from "openai";


const SidebarHeader = ({ closeSidePanel }) => {
	return (
		<div className="sidebar-header">
			<NewChatBTN />
			<FontAwesomeIcon
				icon={faX}
				className="x-icon"
				style={{
					color: "white",
					marginLeft: "4rem",
					marginTop: "-2rem",
					fontSize: "1rem",
					cursor: "pointer",
				}}
				onClick={closeSidePanel}
			/>
		</div>
	);
};

const NewChatBTN = () => {
	const { user } = useContext(AuthContext);
	const userId = user?.userId;
	const [createLecture] = useMutation(CREATE_LECTURE, {
		refetchQueries: [{ query: GET_USER_LECTURES, variables: { userId } }],
	});

	const [insertMessageToLecture] = useMutation(INSERT_MESSAGE_TO_LECTURE);

	const { setSelectedLectureId } = useContext(LectureContext);

	const handleCreateLecture = async () => {
		try {
			const data = await createLecture({
				variables: { userId: user?.userId },
			});
			
			const newLectureId = data.data.createLecture._id
			setSelectedLectureId(newLectureId)

			const openai = new OpenAI({
				apiKey: process.env.REACT_APP_OPENAI_API_KEY,
				dangerouslyAllowBrowser: true,
			});

			const extractedFirstName =
				user?.name.split(" ")[0] || "User";



			const initialMessage = {
				role: "user",
				content: `Start your response with 'Hello ${extractedFirstName}, what should we learn in this lecture?' followed by a super sarcastic joke about what you would like to learn about. Keep the initial greeting brief and let the humor come through naturally without explaining the joke. Throughout the conversation, maintain a humorous tone. Once the user specifies their learning interest, provide relevant information and data, using analogies for clearer understanding. Remember, do not include detailed information or data in the first response`,
			};

			const initialMessageForDB = {
				text: initialMessage.content,
				sender: initialMessage.role,
			};

			await insertMessageToLecture({
				variables: {
					lectureId: newLectureId,
					message: initialMessageForDB,
				},
			});

			console.log(
				"The initial message was successfully inserted"
			);

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
					lectureId: newLectureId,
					message: assistantMessageForDB,
				},
			});

			console.log(
				"The AI's initial message was successfully inserted"
			);

			
		} catch (e) {
			console.error("Error creating a lecture", e);
		}
	};

	

	return (
		<div className="new-chatBTN" onClick={handleCreateLecture}>
			<FontAwesomeIcon
				icon={faPlus}
				style={{ color: "white", marginRight: "1rem" }}
			/>
			<div>New Lecture</div>
		</div>
	);
};

export default SidebarHeader;
