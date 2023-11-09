import React, { useState, useContext } from "react";
import "../../../../index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMessage,
	faTrashCan,
	faPen,
	faGlobe,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "@apollo/client";
import {
	GET_USER_LECTURES,
	UPDATE_LECTURE_SETTINGS,
	DELETE_LECTURE,
} from "../../../../queries";
import { AuthContext } from "../../../../context/authContext";

const RecentChatsContainer = () => {
	const { user } = useContext(AuthContext);
	const userId = user?.userId;

	const { data } = useQuery(GET_USER_LECTURES, {
		variables: { userId },
	});

	console.log(data);

	if (data && data.getUserLectures) {
		return (
			<ol className="recent-chats-container">
				{data.getUserLectures.map((lecture) => (
					<RecentChatItem key={lecture._id} title={lecture.title} />
				))}
			</ol>
		);
	}
};

const RecentChatItem = ({ _id, title }) => {
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

	const [inputValue, setInputValue] = useState(`${title}`);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const [deleteQuery] = useMutation(DELETE_LECTURE);

	const handleDeleteClick = (event) => {
		event.stopPropagation(); 

		deleteQuery({
			variables: { _id },
		})
			.then((response) => {
				console.log("Lecture deleted successfully", response);
			})
			.catch((error) => {
				console.error("Error deleting lecture", error);
			});
	};

	const [professor, setProfessor] = useState("current-professor");
	const [language, setLanguage] = useState("current-language");

	const handleLanguageChange = (newLanguage) => {
		setLanguage(newLanguage);
	};

	const handleProfessorChange = (newProfessor) => {
		setProfessor(newProfessor);
	};

	const handleSaveChanges = () => {
		UPDATE_LECTURE_SETTINGS({
			variables: {
				lectureId: _id,
				language: language,
				professor: professor,
			},
		}).then((response) => {
			console.log("Lecture settings updated successfully", response);
			setIsModalOpen(false);
		});
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
				style={{ color: "black", marginLeft: "1rem" }}
			/>
			<h1 className="chat-title" style={chatTitleStyles}>
				{title}
			</h1>
			{showIcons && (
				<>
					<FontAwesomeIcon
						icon={faPen}
						style={{ color: "black", cursor: "pointer" }}
						onClick={openModal}
					/>
					<FontAwesomeIcon
						icon={faTrashCan}
						style={{ color: "black", marginRight: "0.7rem" }}
						onClick={handleDeleteClick}
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
								placeholder="Enter your title here"
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
							<ProfessorSelectionDropDown
								professor={professor}
								onProfessorChange={handleProfessorChange}
							/>
							<LanguageSelectionDropdown
								language={language}
								onLanguageChange={handleLanguageChange}
							/>
						</section>
						<footer className="modal-card-foot modal-reset">
							<button
								className="button is-success"
								onClick={handleSaveChanges}
							>
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
