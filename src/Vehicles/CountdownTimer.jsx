import { useState, useEffect } from "react";

function CountdownTimer({ endTime }) {
    const [countTime, setCountTime] = useState("");

    useEffect(() => {
        const calculateRemainingTime = () => {
            const targetTime = new Date(endTime + "Z").getTime();
            const now = new Date().getTime();

            const diffMs = targetTime - now;

            if (diffMs <= 0) {
                setCountTime("Süre doldu!");
                return;
            }

            const second = 1000;
            const minute = 60 * second;
            const hour = 60 * minute;
            const day = 24 * hour;
            const month = 30 * day;

            if (diffMs >= month) {
                const remainingMonths = Math.floor(diffMs / month);
                setCountTime(`${remainingMonths} ay kaldı`);
            } else {
                const remainingDays = Math.floor(diffMs / day);
                const remainingHours = Math.floor((diffMs % day) / hour);
                const remainingMinutes = Math.floor((diffMs % hour) / minute);
                const remainingSeconds = Math.floor((diffMs % minute) / second);
                setCountTime(
                    `${remainingDays} gün ${remainingHours} saat ${remainingMinutes} dakika ${remainingSeconds} saniye kaldı`
                );
            }
        };

        calculateRemainingTime();
        const interval = setInterval(calculateRemainingTime, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return <p className="w-16 j h-full">{countTime}</p>;
}

export default CountdownTimer;