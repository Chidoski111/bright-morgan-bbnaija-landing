import styles from './style.module.scss';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './animation';
import Rounded from '../../common/RoundedButton';
export default function Description() {

    const phrase = "28-year-old multi-talented star ready to win BBNaija Season 10. Four years of dedication, countless auditions, one dream realized.";
    const description = useRef(null);
    const isInView = useInView(description)
    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map( (word, index) => {
                        return <span key={index} className={styles.mask}><motion.span variants={slideUp} custom={index} animate={isInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
                    })
                }
                </p>
                <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>The combination of my passion for modeling, acting, and culinary arts positions me as the most versatile housemate in BBNaija history. Join Team BRIGHTSTARS!</motion.p>
                <div data-scroll data-scroll-speed={0.1}>
                    <Rounded className={styles.button}>
                        <a href="https://www.dstv.com/africamagic/en-ng/show/big-brother-naija/season/10/vote" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                            <p>Vote Now</p>
                        </a>
                    </Rounded>
                </div>
            </div>
        </div>
    )
}
