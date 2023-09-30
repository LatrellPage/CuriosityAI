import React, { useState } from "react";
import "../../../../index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrashCan, faPen, faGlobe, faUser,} from "@fortawesome/free-solid-svg-icons";


const RecentChatsContainer = () => {
	return (
		<ol className="recent-chats-container">
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
			<RecentChatItem />
		</ol>
	);
};

const RecentChatItem = () => {
	const [showIcons, setShowIcons] = useState(false);
	const [chatTitleStyles, setChatTitleStyles] = useState({
		width: "80%",
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleIcons = () => {
		setShowIcons(!showIcons);
		setChatTitleStyles({
			width: showIcons ? "80%" : "57%",
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const [inputValue, setInputValue] = useState("Title here"); 

	
	const handleInputChange = (event) => {
		setInputValue(event.target.value); 
	};

	return (
		<li
			className="recent-chat"
			onClick={toggleIcons}
			style={{
				justifyContent: showIcons ? "space-between" : "normal",
			}}
		>
			<FontAwesomeIcon
				icon={faMessage}
				style={{ color: "whitesmoke", marginLeft: "1rem" }}
			/>
			<h1 className="chat-title" style={chatTitleStyles}>
				New Chat about quantum mechanics
			</h1>
			{showIcons && (
				<>
					<FontAwesomeIcon
						icon={faPen}
						style={{ color: "#ffffff", cursor: "pointer" }}
						onClick={openModal}
					/>
					<FontAwesomeIcon
						icon={faTrashCan}
						style={{ color: "#ffffff", marginRight: "0.7rem" }}
					/>
				</>
			)}
			{isModalOpen && (
				<div className="modal is-active">
					{" "}
					<div className="modal-background"></div>
					<div className="modal-card modal-div-reset">
						<header className="modal-card-head modal-reset">
							<input
								class="input"
								type="text"
								value={inputValue}
								placeholder="Enter a Title"
								style={{ width: "60%" }}
								onChange={handleInputChange}
							/>
							<button
								className="delete"
								aria-label="close"
								onClick={closeModal}
								style={{
									position: "absolute",
									top: "0",
									right: "0",
									marginRight: "1rem",
									marginTop: "1rem",
								}}
							></button>
						</header>
						<section className="modal-card-body modal-section-reset">
							<ProfessorSelectionDropDown />
							<LanguageSelectionDropdown />
						</section>
						<footer className="modal-card-foot modal-reset">
							<button className="button is-success">
								Save changes
							</button>
						</footer>
					</div>
				</div>
			)}
			<input></input>
		</li>
	);
};

const ProfessorSelectionDropDown = () => {
	return (
		<div className="dropdown-container">
			<div class="dropdown dropdown-reset position-dropdown">
				<button
					class="btn dropdown-toggle dropdown-reset"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="true"
				>
					<FontAwesomeIcon
						icon={faUser}
						style={{ color: "#000000", marginRight: "0.5rem" }}
					/>
					Professor
				</button>

				<ul class="dropdown-menu dropdown-styles">
					<li>
						<button class="dropdown-item " type="button">
							Mr. Doe
						</button>
					</li>
					<li>
						<button class="dropdown-item" type="button">
							Mrs. Sandy
						</button>
					</li>
					<li>
						<button class="dropdown-item" type="button">
							Mr. Carl
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

const LanguageSelectionDropdown = () => {
	const [selectedLanguage, setSelectedLanguage] = useState("English");

	const handleLanguageChange = (newLanguage) => {
		setSelectedLanguage(newLanguage);
	};

	return (
		<div className="dropdown-container">
			<div className="dropdown dropdown-reset position-dropdown">
				<button
					className="btn  dropdown-toggle dropdown-reset"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					<FontAwesomeIcon
						icon={faGlobe}
						style={{ color: "#000000", marginRight: "0.5rem" }}
					/>
					{selectedLanguage}
				</button>

				<ul className="dropdown-menu position-dropdown dropdown-styles">
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => handleLanguageChange("English")}
						>
							English
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => handleLanguageChange("Spanish")}
						>
							Spanish
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => handleLanguageChange("French")}
						>
							French
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default RecentChatsContainer;