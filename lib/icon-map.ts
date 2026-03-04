import { FaUsers } from "react-icons/fa";
import { FaAward, FaHandshakeAngle, FaLaptopCode, FaUserGraduate } from "react-icons/fa6";
import type { IconType } from "react-icons";

export const infoIconMap: Record<string, IconType> = {
    FaAward,
    FaHandshakeAngle,
    FaLaptopCode,
    FaUserGraduate,
    FaUsers,
};

export const infoIconOptions = Object.keys(infoIconMap);
