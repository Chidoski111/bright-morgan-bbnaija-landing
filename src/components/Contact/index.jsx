import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef, useState, useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Contact() {
    const container = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile viewport
    useEffect(() => {
        const updateIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        updateIsMobile();
        window.addEventListener('resize', updateIsMobile);
        return () => window.removeEventListener('resize', updateIsMobile);
    }, []);

    // Optimize scroll triggers for proper sequencing after LiveStats
    const scrollOffset = isMobile 
        ? ["start 0.8", "end end"]  // Earlier trigger on mobile for better flow
        : ["start 0.7", "end end"]; // Earlier trigger on desktop

    const { scrollYProgress } = useScroll({
        target: container,
        offset: scrollOffset
    })
    
    // Reduce transforms to prevent visual conflicts
    const x = useTransform(scrollYProgress, [0, 1], [0, 80])
    const y = useTransform(scrollYProgress, [0, 1], isMobile ? [-50, 0] : [-100, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                            fill={true}
                            alt={"Bright Morgan"}
                            src={`/morgan-main.jpg`}
                            />
                        </div>
                        <h2>Vote for</h2>
                    </span>
                    <h2>Bright</h2>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Rounded backgroundColor={"#FFD700"} className={styles.button}>
                            <a href="https://www.dstv.com/africamagic/en-ng/show/big-brother-naija/season/10/vote" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>Vote Now</p>
                            </a>
                        </Rounded>
                    </motion.div>
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <a href="https://www.dstv.com/africamagic/en-ng/show/big-brother-naija/season/10/vote" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>Vote: dstv.com/africamagic</p>
                            </a>
                        </Rounded>
                        <Rounded>
                            <a href="https://wa.me/message/OXRCFTEPZDSIL1" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>Join: Team BRIGHTSTARS</p>
                            </a>
                        </Rounded>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>Season</h3>
                            <p>BBNaija 10</p>
                        </span>
                        <span>
                            <h3>Status</h3>
                            <p>Vote Now Active</p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <h3>socials</h3>
                            <Magnetic>
                                <a href="https://instagram.com/bright_morgan_" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <p>Instagram</p>
                                </a>
                            </Magnetic>
                        </span>
                        <Magnetic>
                            <a href="https://twitter.com/bright_morgan_" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>Twitter/X</p>
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://linkedin.com/in/bright-morgan" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>LinkedIn</p>
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://wa.me/message/OXRCFTEPZDSIL1" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>WhatsApp</p>
                            </a>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
