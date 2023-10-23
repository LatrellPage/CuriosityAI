import React from "react";
import "../../../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus, } from "@fortawesome/free-solid-svg-icons";

const SidebarHeader = ({ closeSidePanel }) => {
	return (
		<div className="sidebar-header">
			<NewChatBTN />
			<FontAwesomeIcon
				icon={faX}
				className="x-icon"
				style={{
					color: "#000000",
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
				style={{ color: "#000000", marginRight: "1rem" }}
			/>
			<div>New Lecture</div>
		</div>
	);
};

export default SidebarHeader;