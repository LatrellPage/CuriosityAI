import React from 'react';

const LectureContext = React.createContext({
    selectedLectureId: null,
    setSelectedLectureId: () => {},
});

export default LectureContext;
