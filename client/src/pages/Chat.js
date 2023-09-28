import "../index.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faMessage,
	faTrashCan,
	faPen,
	faBars,
	faX,
} from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
	return (
		<div className="chat-container">
			<MobileDeviceHeader />
			<ConversationContainer />
			<MobileDeviceSidePanel />
			<Sidebar />
			<BottomContainer />
		</div>
	);
};

const ConversationContainer = () => {
	return (
		<div className="convo-container">
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
			<UserMessage />
			<AiMessage />
		</div>
	);
};

const UserMessage = () => {
	return (
		<div className="message-container">
			<div className="profile-img-container"></div>
			<div className="msg">
				<p>
					Amidst the bustling city, a lone street musician played a
					melancholic tune on his weathered guitar, capturing the
					hearts of passersby with each soulful note. The setting sun
					painted the sky in hues of orange and pink, casting long
					shadows that danced to the rhythm of the music. It was a
					moment of serenity in the midst of chaos, a reminder of the
					beauty that could be found in the simplest of moments.
				</p>
			</div>
		</div>
	);
};

const AiMessage = () => {
	return (
		<div id="AI-container" className="message-container">
			<div className="AiProfile"></div>
			<div className="msg">
				<p>
					Amidst the bustling city, a lone street musician played a
					melancholic tune on his weathered guitar, capturing the
					hearts of passersby with each soulful note. The setting sun
					painted the sky in hues of orange and pink, casting long
					shadows that danced to the rhythm of the music. It was a
					moment of serenity in the midst of chaos, a reminder of the
					beauty that could be found in the simplest of moments.
				</p>
			</div>
		</div>
	);
};

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

const Sidebar = () => {
	return (
		<div className="sidebar">
			<SidebarHeader />
			<RecentChatsContainer />
			<SidebarFooter />
		</div>
	);
};

const MobileDeviceSidePanel = ({ isSidePanelVisible, closeSidePanel }) => {
	return (
		<div
			className="sidepanel"
			style={{ display: isSidePanelVisible ? "block" : "none" }}
		>
			<SidebarHeader closeSidePanel={closeSidePanel} />
			<RecentChatsContainer />
			<SidebarFooter />
		</div>
	);
};

const MobileDeviceHeader = () => {
	const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);

	const toggleSidePanel = () => {
		setIsSidePanelVisible(!isSidePanelVisible);
	};

	return (
		<>
			<div className="mobile-device-header">
				<FontAwesomeIcon
					icon={faBars}
					style={{
						color: "#ffffff",
						marginLeft: "1rem",
						cursor: "pointer",
					}}
					onClick={toggleSidePanel}
				/>
			</div>
			<MobileDeviceSidePanel
				isSidePanelVisible={isSidePanelVisible}
				closeSidePanel={() => setIsSidePanelVisible(false)}
			/>
		</>
	);
};

const SidebarHeader = ({ closeSidePanel }) => {
	return (
		<div className="sidebar-header">
			<NewChatBTN />
			<FontAwesomeIcon
				icon={faX}
				className="x-icon"
				style={{
					color: "#ffffff",
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
	return (
		<div className="new-chatBTN">
			<FontAwesomeIcon
				icon={faPlus}
				style={{ color: "#ffffff", marginRight: "1rem" }}
			/>
			<div>New Chat</div>
		</div>
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
								value="Text input"
								style={{width: "60%"}}
							/>
							<button
								className="delete"
								aria-label="close"
								onClick={closeModal}
								style={{position: "absolute", top: "0", right: "0", marginRight: "1rem", marginTop: "1rem"}}
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
		<div class="dropdown is-active">
			<div class="dropdown-trigger">
				<button
					class="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
				>
					<span>Professor</span>
					<span class="icon is-small">
						<i class="fas fa-angle-down" aria-hidden="true"></i>
					</span>
				</button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content">
					<a href="#" class="dropdown-item">
						Dropdown item
					</a>
					<a class="dropdown-item">Other dropdown item</a>
					<a href="#" class="dropdown-item is-active">
						Active dropdown item
					</a>
					<a href="#" class="dropdown-item">
						Other dropdown item
					</a>
					<hr class="dropdown-divider" />
					<a href="#" class="dropdown-item">
						With a divider
					</a>
				</div>
			</div>
		</div>
	);
};

const LanguageSelectionDropdown = () => {
	return (
		<>
			<div class="dropdown is-active" style={{marginLeft: "20%"}}>
				<div class="dropdown-trigger">
					<button
						class="button"
						aria-haspopup="true"
						aria-controls="dropdown-menu"
					>
						<span>Language</span>
						<span class="icon is-small">
							<i class="fas fa-angle-down" aria-hidden="true"></i>
						</span>
					</button>
				</div>
				<div class="dropdown-menu" id="dropdown-menu" role="menu">
					<div class="dropdown-content">
						<a href="#" class="dropdown-item">
							Dropdown item
						</a>
						<a class="dropdown-item">Other dropdown item</a>
						<a href="#" class="dropdown-item is-active">
							Active dropdown item
						</a>
						<a href="#" class="dropdown-item">
							Other dropdown item
						</a>
						<hr class="dropdown-divider" />
						<a href="#" class="dropdown-item">
							With a divider
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

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

const SidebarFooter = () => {
	return (
		<div className="sidebar-footer">
			<div className="profile-img-container">
				<img alt=""></img>
			</div>
			<h2 className="profile-name">John Doe</h2>
		</div>
	);
};

export default Chat;
