import Image from "next/image";

import backImg from '../app/image/Restancle 92.png'
export default function Custom404() {
    return (
        <>
        
            <div className={style.div}>
                <Image src={backImg} width={200} height={500} alt="404" />
            </div>
        </>
    )
}