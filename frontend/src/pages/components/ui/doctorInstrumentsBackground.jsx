import React, { useEffect, useState } from "react";
import {
    FaStethoscope,
    FaSyringe,
    FaUserMd,
    FaHeartbeat,
    FaPills,
    FaMicroscope,
    FaBriefcaseMedical,
    FaNotesMedical,
    FaProcedures
} from "react-icons/fa";

export default function DoctorInstrumentsBackground({ children }) {
    const icons = [
        FaStethoscope,
        FaSyringe,
        FaUserMd,
        FaHeartbeat,
        FaPills,
        FaMicroscope,
        FaBriefcaseMedical,
        FaNotesMedical,
        FaProcedures
    ];

    // Each icon will have random properties for unique movement
    const [iconData] = useState(() =>
        icons.map((Icon) => ({
            Icon,
            centerX: Math.random() * window.innerWidth,
            centerY: Math.random() * window.innerHeight,
            radius: 80 + Math.random() * 200, // distance of orbit
            angle: Math.random() * Math.PI * 2,
            speed: 0.003 + Math.random() * 0.002 // different speed per icon
        }))
    );

    const [hoverBoost, setHoverBoost] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            iconData.forEach((data) => {
                data.angle += data.speed * hoverBoost;
            });
            // force re-render
            setTick((t) => t + 1);
        }, 16);
        return () => clearInterval(interval);
    }, [hoverBoost, iconData]);

    const [, setTick] = useState(0); // just to trigger re-render

    return (
        <div
            className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-teal-400"
            onMouseEnter={() => setHoverBoost(4)}
            onMouseLeave={() => setHoverBoost(1)}
        >
            {/* Moving medical icons */}
            {iconData.map(({ Icon, centerX, centerY, radius, angle }, i) => {
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                return (
                    <div
                        key={i}
                        className="absolute text-white opacity-70"
                        style={{
                            left: x,
                            top: y,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <Icon size={36} />
                    </div>
                );
            })}

            {/* Foreground content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
