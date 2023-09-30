import React, { useState } from "react";
import "../../../index.css";
import MobileDeviceSidePanel from "./MobileDeviceSidepanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

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

export default MobileDeviceHeader;
