import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import Image from 'next/image';

const slider1 = [
    {
        color: "#8B4513",
        src: "morgan-main.jpg"
    },
    {
        color: "#FFD700",
        src: "fineboy-morgan.jpg"
    },
    {
        color: "#4A4A4A",
        src: "morgan-relaxed.jpg"
    },
    {
        color: "#FF6B35",
        src: "morgan-selfie.jpg"
    }
]

const slider2 = [
    {
        color: "#8B4513",
        src: "morgan-main.jpg"
    },
    {
        color: "#FFD700", 
        src: "fineboy-morgan.jpg"
    },
    {
        color: "#4A4A4A",
        src: "morgan-relaxed.jpg"
    },
    {
        color: "#FF6B35",
        src: "morgan-selfie.jpg"
    }
]

export default function SlidingImages() {
    const container = useRef(null);
    const [modalState, setModalState] = useState({
        isOpen: false,
        selectedImage: null,
        selectedIndex: null
    });
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isTouch, setIsTouch] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(0);

    // Initialize viewport width and touch detection
    useEffect(() => {
        const updateViewport = () => {
            setViewportWidth(window.innerWidth);
            setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => window.removeEventListener('resize', updateViewport);
    }, []);

    // Responsive scroll transform values based on viewport
    const getScrollTransforms = () => {
        if (viewportWidth <= 479) {
            return { x1: [0, 80], x2: [0, -80] }; // Reduced movement on small mobile
        } else if (viewportWidth <= 600) {
            return { x1: [0, 100], x2: [0, -100] }; // Small mobile
        } else if (viewportWidth <= 768) {
            return { x1: [0, 120], x2: [0, -120] }; // Tablets
        } else if (viewportWidth <= 1024) {
            return { x1: [0, 140], x2: [0, -140] }; // Large tablets
        } else {
            return { x1: [0, 150], x2: [0, -150] }; // Desktop
        }
    };

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    const transforms = getScrollTransforms();
    const x1 = useTransform(scrollYProgress, [0, 1], transforms.x1);
    const x2 = useTransform(scrollYProgress, [0, 1], transforms.x2);
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

    // Enhanced scroll detection to close modal with mobile-specific handling
    useEffect(() => {
        let scrollTimer;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // More sensitive threshold for mobile devices
            const scrollThreshold = isTouch ? 30 : 50;
            
            if (modalState.isOpen && Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
                closeModal();
            }
            setLastScrollY(currentScrollY);
        };

        const handleTouchMove = (e) => {
            if (modalState.isOpen) {
                // Clear any existing timer
                clearTimeout(scrollTimer);
                
                // Set a timer to close modal after touch movement stops
                scrollTimer = setTimeout(() => {
                    const currentScrollY = window.scrollY;
                    if (Math.abs(currentScrollY - lastScrollY) > 20) {
                        closeModal();
                    }
                }, 150);
            }
        };

        // Prevent wheel scrolling on the sliding images container
        const preventWheel = (e) => {
            if (container.current && container.current.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        if (modalState.isOpen) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            if (isTouch) {
                window.addEventListener('touchmove', handleTouchMove, { passive: true });
                window.addEventListener('touchend', handleScroll, { passive: true });
            }
        }

        // Always prevent wheel scrolling on the component
        window.addEventListener('wheel', preventWheel, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleScroll);
            window.removeEventListener('wheel', preventWheel);
            clearTimeout(scrollTimer);
        };
    }, [modalState.isOpen, lastScrollY, isTouch]);

    // Handle escape key and prevent body scroll
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && modalState.isOpen) {
                closeModal();
            }
        };

        if (modalState.isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll when modal is open, but allow on mobile for accessibility
            if (!isTouch || viewportWidth > 768) {
                document.body.style.overflow = 'hidden';
            }
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [modalState.isOpen, isTouch, viewportWidth]);

    const openModal = (project, index, slider) => {
        setLastScrollY(window.scrollY);
        setModalState({
            isOpen: true,
            selectedImage: project,
            selectedIndex: index,
            slider: slider
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            selectedImage: null,
            selectedIndex: null,
            slider: null
        });
    };

    const handleImageClick = (project, index, slider) => {
        // Disable modal on small devices (mobile phones) to prevent page expansion
        if (typeof window !== 'undefined' && window.innerWidth <= 600) {
            return;
        }
        openModal(project, index, slider);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <div 
                ref={container} 
                className={styles.slidingImages}
                onWheel={(e) => e.preventDefault()} // Prevent wheel scrolling directly on the component
                onScroll={(e) => e.preventDefault()} // Prevent scroll events
            >
                <motion.div style={{x: x1}} className={styles.slider}>
                        {
                            slider1.map( (project, index) => {
                                return <div 
                                    key={index} 
                                    className={styles.project} 
                                    style={{backgroundColor: project.color}}
                                    onClick={() => handleImageClick(project, index, 'slider1')}
                                >
                                    <div className={styles.imageContainer}>
                                        <Image 
                                        fill={true}
                                        alt={"Bright Morgan"}
                                        src={`/${project.src}`}/>
                                    </div>
                                </div>
                            })
                        }
                    </motion.div>
                    <motion.div style={{x: x2}} className={styles.slider}>
                        {
                            slider2.map( (project, index) => {
                                return <div 
                                    key={index} 
                                    className={styles.project} 
                                    style={{backgroundColor: project.color}}
                                    onClick={() => handleImageClick(project, index, 'slider2')}
                                >
                                    <div key={index} className={styles.imageContainer}>
                                        <Image 
                                        fill={true}
                                        alt={"Bright Morgan"}
                                        src={`/${project.src}`}/>
                                    </div>
                                </div>
                            })
                        }
                    </motion.div>
                    <motion.div style={{height}} className={styles.circleContainer}>
                        <div className={styles.circle}></div>
                    </motion.div>
            </div>

            {/* Modal */}
            <AnimatePresence mode="wait">
                {modalState.isOpen && modalState.selectedImage && (
                    <motion.div
                        className={styles.modalOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            className={styles.modalContent}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 300, 
                                damping: 30,
                                duration: 0.4 
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div 
                                className={styles.modalImageContainer}
                                style={{ backgroundColor: modalState.selectedImage.color }}
                            >
                                <Image
                                    src={`/${modalState.selectedImage.src}`}
                                    fill={true}
                                    alt="Bright Morgan"
                                    className={styles.modalImage}
                                />
                                <button
                                    className={styles.closeButton}
                                    onClick={closeModal}
                                    aria-label="Close modal"
                                >
                                    ×
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
