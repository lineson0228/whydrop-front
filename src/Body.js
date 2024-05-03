import React from 'react';
import './Body.css'; // CSS 파일 로드

function Body({ imageRef, buttonSize, stage }) {
    return (
        <div className="mainImageContainer">
            <img ref={imageRef} src="main.png" alt="Main Content" className="mainImage" />
            {stage === 1 && <img src="man1.png" alt="Man 1" className="man man1" />}
            {stage === 2 && <img src="man2.png" alt="Man 2" className="man man2" />}
            {stage === 3 && (
                <>
                    <img src="man3.png" alt="Man 3" className="man man3" />
                    <button className="mainImageButton" style={{
                        width: `${buttonSize}px`,
                        height: `${buttonSize / 3}px`,
                        fontSize: `${buttonSize / 10}px`,
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                       
                    }}>
                        내 영상 피드백
                    </button>
                </>
            )}
        </div>
    );
}

export default Body;
