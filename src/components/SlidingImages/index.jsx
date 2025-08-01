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

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    // Handle scroll detection to close modal
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollThreshold = 50; // Close modal if user scrolls more than 50px
            
            if (modalState.isOpen && Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
                closeModal();
            }
            setLastScrollY(currentScrollY);
        };

        if (modalState.isOpen) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('touchmove', handleScroll, { passive: true });
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        };
    }, [modalState.isOpen, lastScrollY]);

    // Handle escape key to close modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && modalState.isOpen) {
                closeModal();
            }
        };

        if (modalState.isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [modalState.isOpen]);

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
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
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
            <div ref={container} className={styles.slidingImages}>
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
