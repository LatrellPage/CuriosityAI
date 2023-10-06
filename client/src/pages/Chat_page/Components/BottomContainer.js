import React, { useState } from "react";
import "../../../index.css";
import OpenAI from "openai";

const BottomContainer = (props) => {
	console.log(props)

	const handleTextareaChange = (event) => {
		props.setTextareaValue(event.target.value);
	};

	const handleSendClick = async () => {
		const openai = new OpenAI({
			apiKey: process.env.REACT_APP_OPENAI_API_KEY,
			dangerouslyAllowBrowser: true,
		});

		try {
			const response = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content: `${props.textareaValue}`,
					},
				],
				temperature: 1,
				max_tokens: 256,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
			});

			const assistantReply = response.choices[0].message.content;
			props.setAssistantResponse(assistantReply);

			console.log("Assistant's reply:", assistantReply);
		} catch (error) {
			console.error("Error making API request:", error);
		}
	};

	return (
		<div className="bottom-container">
			<div className="text-flex-positioner">
				<div className="text-container">
					<textarea
						value={props.setTextareaValue}
						onChange={handleTextareaChange}
						placeholder="Send a Message"
						className="text-area"
					></textarea>
					<div className="submit-button-container">
						<span
							id="sendBTN"
							className="material-symbols-rounded"
							onClick={handleSendClick}
						>
							send
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};



export default BottomContainer;
