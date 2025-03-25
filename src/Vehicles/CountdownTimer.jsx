import { useState, useEffect } from "react";


function CountdownTimer({endTime}) {
    const time=endTime;
    const [countTime, setCountTime] = useState("");

    useEffect(() => {
        const hesaplaKalanSüre = () => {
            const endTime = new Date(time).getTime();
            const now = new Date().getTime(); 

            const farkMs = endTime - now; 
            
            if (farkMs <= 0) {
                setCountTime("Süre doldu!");
                return;
            }

            const second = 1000;
            const minute = 60 * second;
            const hour = 60 * minute;
            const day = 24 * hour;
            const moonth = 30 * day; 

            if (farkMs >= moonth) {
                const kalanAy = Math.floor(farkMs / moonth);
                setCountTime(`${kalanAy} ay kaldı`);
            } else {
                const kalanGun = Math.floor(farkMs / day);
                const kalanSaat = Math.floor((farkMs % day) / hour);
                const kalanDakika = Math.floor((farkMs % hour) / minute);
                const kalanSaniye = Math.floor((farkMs % minute) / second);
                setCountTime(
                    `  ${kalanGun} gün ${kalanSaat} saat ${kalanDakika} dakika ${kalanSaniye} saniye kaldı`
                );
            }
        };

        hesaplaKalanSüre(); // 
        const interval = setInterval(hesaplaKalanSüre, 1000); //

        return () => clearInterval(interval); 
    }, [time.endTime]);

    return  <p className="w-16 h-full">{countTime}</p>;
}

export default CountdownTimer;