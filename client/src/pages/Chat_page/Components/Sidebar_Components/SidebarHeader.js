import React, { useContext } from "react";
import "../../../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { CREATE_LECTURE, GET_USER_LECTURES } from "../../../../queries";
import { AuthContext } from "../../../../context/authContext";

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

	const handleCreateLecture = async () => {
		try {
			await createLecture({
				variables: { userId: user?.userId },
			});
			
			console.log(" successfully created lecture")
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
