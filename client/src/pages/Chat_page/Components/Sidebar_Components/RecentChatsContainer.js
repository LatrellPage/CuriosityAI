import React, { useState, useContext, useEffect } from "react";
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
import LectureContext from "../../../../context/LectureContext";

const RecentChatsContainer = () => {

	const { user } = useContext(AuthContext);
	const userId = user?.userId;




	const { data, refetch } = useQuery(GET_USER_LECTURES, {
		variables: { userId },
		skip: !userId,
		fetchPolicy: "cache-and-network",
	});

	useEffect(() => {
		if (userId) {
			refetch();
		}
	}, [userId, refetch]);


	// Define the mutation logic here (if needed)
	// const handleMutation = (lectureId) => {

	// };

	const [selectedLectureId, setSelectedLectureId] = useState(null);
	const [showIconsForLecture, setShowIconsForLecture] = useState(null);

	const handleSelectLecture = (lectureId) => {
		if (lectureId !== selectedLectureId) {
			setSelectedLectureId(lectureId);
			setShowIconsForLecture(lectureId); 
		} else {
			setShowIconsForLecture(null); 
		}
	};

	if (data && data.getUserLectures) {
		return (
			<ol className="recent-chats-container">
				{data.getUserLectures.map((lecture) => (
					<RecentChatItem
						key={lecture._id}
						_id={lecture._id}
						title={lecture.title}
						userId={userId}
						isSelected={selectedLectureId === lecture._id}
						showIcons={showIconsForLecture === lecture._id}
						onSelect={handleSelectLecture}
					/>
				))}
			</ol>
		);
	}
};

const RecentChatItem = ({ _id, title, userId, isSelected, onSelect}) => {
	const [showIcons, setShowIcons] = useState(false);
	const [chatTitleStyles, setChatTitleStyles] = useState({
		width: "100%",
	});

	const [isModalOpen, setIsModalOpen] = useState(false);

	
	const itemStyle = {
		justifyContent: showIcons ? "space-between" : "normal",
		backgroundColor: isSelected ? "#696b77" : "",
		...chatTitleStyles,
	};

	const toggleIcons = (event) => {
		event.stopPropagation(); 
		setShowIcons(!showIcons);
		setChatTitleStyles({
			width: showIcons ? "80%" : "57%",
		});
	};

	const { setSelectedLectureId } = useContext(LectureContext);

	const handleClick = () => {
		setSelectedLectureId(_id);
		setShowIcons(!showIcons);
		onSelect(_id)
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

	const [deleteQuery] = useMutation(DELETE_LECTURE, {
		refetchQueries: [
			{ query: GET_USER_LECTURES, variables: { userId: userId } },
		],
	});

	const handleDeleteClick = (event) => {
		event.stopPropagation();

		deleteQuery({
			variables: { id: _id },
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

	const [updateLectureSettings] = useMutation(UPDATE_LECTURE_SETTINGS);

	const handleSaveChanges = () => {
		updateLectureSettings({
			variables: {
				lectureId: _id,
				settings: {
					title: inputValue,
					professor: professor,
					language: language,
				},
			},
		})
			.then((response) => {
				console.log("Lecture settings updated successfully", response);
				setIsModalOpen(false);
			})
			.catch((error) => {
				console.error("Error updating lecture settings", error);
			});
	};
	

	return (
		<li className="recent-chat" onClick={handleClick} style={itemStyle}>
			<FontAwesomeIcon
				icon={faMessage}
				style={{ color: "white", marginLeft: "1rem" }}
				onClick={toggleIcons}
			/>
			<h1 className="chat-title" style={chatTitleStyles}>
				{title}
			</h1>
			{showIcons && (
				<>
					<FontAwesomeIcon
						icon={faPen}
						style={{
							color: "white",
							cursor: "pointer",
							marginRight: "0.7rem",
						}}
						onClick={openModal}
					/>
					<FontAwesomeIcon
						icon={faTrashCan}
						style={{ color: "white", marginRight: "0.7rem" }}
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

const ProfessorSelectionDropDown = ({ professor, onProfessorChange }) => {
	return (
		<div className="dropdown-container">
			<div className="dropdown dropdown-reset position-dropdown">
				<button
					className="btn dropdown-toggle dropdown-reset"
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

				<ul className="dropdown-menu dropdown-styles">
					<li>
						<button
							className="dropdown-item "
							type="button"
							onClick={() => onProfessorChange("Turing")}
						>
							Turing
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => onProfessorChange("Professor2")}
						>
							Professor2
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => onProfessorChange("Professor3")}
						>
							Professor3
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

const LanguageSelectionDropdown = ({ language, onLanguageChange }) => {
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
					{language}
				</button>

				<ul className="dropdown-menu position-dropdown dropdown-styles">
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => onLanguageChange("English")}
						>
							English
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => onLanguageChange("Spanish")}
						>
							Spanish
						</button>
					</li>
					<li>
						<button
							className="dropdown-item"
							type="button"
							onClick={() => onLanguageChange("French")}
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
