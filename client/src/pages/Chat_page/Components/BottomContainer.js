import React from "react";
import "../../../index.css";

const BottomContainer = ({
	textareaValue,
	handleSendClick,
	handleTextareaChange,
	loading,
}) => {
	return (
		<div className="bottom-container">
			<div className="text-flex-positioner">
				<div className="text-container">
					<textarea
						value={textareaValue}
						onChange={handleTextareaChange}
						placeholder="Message Professor Turing..."
						className="text-area"
					></textarea>
					<div className="submit-button-container">
						{loading ? (
							<span
								className="spinner"
								style={{
									display: "inline-block",
									border: "2px solid gray",
									borderLeftColor: "white",
									borderRadius: "50%",
									width: "20px",
									height: "20px",
									animation: "spin 1s linear infinite",
								}}
							></span>
						) : (
							<span
								id="sendBTN"
								className="material-symbols-rounded"
								onClick={handleSendClick}
								style={{ color: textareaValue ? 'black' : 'inherit' }}
							>
								send
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BottomContainer;
