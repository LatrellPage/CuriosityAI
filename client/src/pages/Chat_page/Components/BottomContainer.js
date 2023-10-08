import React from "react";
import "../../../index.css";


const BottomContainer = ({textareaValue, handleSendClick, handleTextareaChange}) => {

	return (
		<div className="bottom-container">
			<div className="text-flex-positioner">
				<div className="text-container">
					<textarea
						value={textareaValue}
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
