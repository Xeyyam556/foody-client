import Image from "next/image";
import styles from './notFounf.module.css'
import backImg from './image/Rectangle 92.png'
export default function Custom404() {
    return (
        <>
        
            <div className={styles.div}>
                <Image src={backImg} width={1700} height={600} className={styles.img} alt="404" />
            </div>
        </>
    )
}