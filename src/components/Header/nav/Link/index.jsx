import styles from './style.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../animation';

export default function Index({data, isActive, setSelectedIndicator}) {
  
    const { title, href, index} = data;
    
    // Check if it's an external URL
    const isExternal = href.startsWith('http');
  
    return (
      <motion.div 
        className={styles.link} 
        onMouseEnter={() => {setSelectedIndicator(href)}} 
        custom={index} 
        variants={slide} 
        initial="initial" 
        animate="enter" 
        exit="exit"
      >
        <motion.div 
          variants={scale} 
          animate={isActive ? "open" : "closed"} 
          className={styles.indicator}>
        </motion.div>
        {isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
        ) : (
          <Link href={href}>{title}</Link>
        )}
      </motion.div>
    )
}