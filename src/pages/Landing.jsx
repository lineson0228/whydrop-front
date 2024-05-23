import React, { useState, useRef, useEffect } from 'react'; // useRef 추가
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 통해 페이지 이동
import '../assets/css/Landing.css'; // CSS 파일 로드

function Landing() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const [stage, setStage] = useState(0);
    const imageRef = useRef(null);
    const [buttonSize, setButtonSize] = useState(0);
    useEffect(() => {
        function updateButtonSize() {
            if (imageRef.current) {
                const width = imageRef.current.clientWidth;
                const minButtonWidth = 120;
                const buttonWidth = Math.max(width * 0.25, minButtonWidth);
                setButtonSize(buttonWidth);
            }
        }

        window.addEventListener('resize', updateButtonSize);
        updateButtonSize();

        const timers = [
            setTimeout(() => setStage(1), 1000),
            setTimeout(() => setStage(2), 2000),
            setTimeout(() => setStage(3), 4000),
        ];

        return () => {
            window.removeEventListener('resize', updateButtonSize);
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    const navigate = useNavigate(); // useNavigate 훅 사용

    // 각 이미지의 슬라이드 배열 정의 (a, b, c, d 각각 2장씩)
    const slides = {
        a: ['a1.png', 'a2.png'],
        b: ['b1.png', 'b2.png'],
        c: ['c1.png', 'c2.png'],
        d: ['d1.png', 'd2.png'],
    };

    // 각 이미지에 대한 ref 생성
    const refs = useRef([...Array(4)].map(() => React.createRef()));
    const mainImageRef = useRef();

    const handleMouseEnter = ref => {
        if (ref.current) {
            ref.current.style.transform = 'scale(1.5) rotateY(20deg)';
        }
    };

    const handleMouseLeave = ref => {
        if (ref.current) {
            ref.current.style.transform = 'scale(1) rotateY(0)';
        }
    };

    const handleImageClick = index => {
        setSelectedImageIndex(index);
        setCurrentSlideIndex(0); // 첫 번째 슬라이드로 초기화
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleNextSlide = () => {
        const currentChar = String.fromCharCode(97 + selectedImageIndex); // a, b, c, d...
        const numSlides = slides[currentChar].length;

        setCurrentSlideIndex(prev => (prev + 1) % numSlides); // 순환 이동
    };

    const handlePrevSlide = () => {
        const currentChar = String.fromCharCode(97 + selectedImageIndex);
        const numSlides = slides[currentChar].length;

        setCurrentSlideIndex(prev => (prev - 1 + numSlides) % numSlides); // 순환 이동
    };

    const handleButtonClick = () => {
        navigate('/upload'); // 업로드 페이지로 이동
    };

    return (
        <div className="mainImageContainer">
            <img
                ref={mainImageRef}
                src="main.png"
                alt="Main Content"
                className="mainImage"
            />
            {[...Array(4).keys()].map(index => (
                <img
                    key={index}
                    ref={refs.current[index]}
                    src={`${String.fromCharCode(97 + index)}.png`}
                    alt={`Interactive Element ${String.fromCharCode(
                        97 + index,
                    )}`}
                    className={`interactiveImage interactiveImage-${String.fromCharCode(
                        97 + index,
                    )}`}
                    onMouseEnter={() => handleMouseEnter(refs.current[index])}
                    onMouseLeave={() => handleMouseLeave(refs.current[index])}
                    onClick={() => handleImageClick(index)}
                />
            ))}
            {stage === 1 && (
                <img src="man1.png" alt="Man 1" className="man man1" />
            )}
            {stage === 2 && (
                <img src="man2.png" alt="Man 2" className="man man2" />
            )}
            {stage === 3 && (
                <>
                    <img src="man3.png" alt="Man 3" className="man man3" />
                    <button
                        className="mainImageButton"
                        onClick={handleButtonClick}
                    >
                        내 영상 분석
                    </button>
                </>
            )}
            {isModalOpen && (
                <div className="modal" onClick={handleCloseModal}>
                    <div
                        className="modal-content"
                        onClick={e => e.stopPropagation()}
                    >
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <img
                            src={
                                slides[
                                    String.fromCharCode(97 + selectedImageIndex)
                                ][currentSlideIndex]
                            }
                            alt="Detailed Slide"
                            className="modalImage"
                        />
                        <button className="prevSlide" onClick={handlePrevSlide}>
                            &#10094;
                        </button>
                        <button className="nextSlide" onClick={handleNextSlide}>
                            &#10095;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Landing;
