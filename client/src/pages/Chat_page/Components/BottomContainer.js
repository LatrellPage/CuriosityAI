import React from "react";
import "../../../index.css";

const BottomContainer = () => {
	return (
		<div className="bottom-container">
			<TextareaContainer />
		</div>
	);
};

const TextareaContainer = () => {
	return (
		<div className="text-flex-positioner">
			<div className="text-container">
				<textarea
					placeholder="Send a Message"
					className="text-area"
				></textarea>
				<div className="submit-button-container">
					<span id="sendBTN" class="material-symbols-rounded">
						send
					</span>
				</div>
			</div>
		</div>
	);
};

export default BottomContainer;