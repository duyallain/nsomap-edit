import React from "react";
import { FrameEff, PartData } from "../Common/Types";
import PartImg from "./PartImg";

type Props = {
    partFrame: FrameEff;
    baseX: number;
    baseY: number;
    parts: PartData[];
    ratio: number;
};

function PartFramePainter({ partFrame, baseX, baseY, parts, ratio }: Props) {
    const BASE_EFF_X = baseX + 15;
    const BASE_EFF_Y = baseY + 60;
    return (
        <>
            {/* Render top */}
            {partFrame?.listPartTop?.map((part, index) => {
                return (
                    <PartImg
                        flip={part.flip === 1}
                        index={999}
                        key={index}
                        ratio={ratio}
                        dragable
                        x={BASE_EFF_X + part.dx * ratio}
                        y={BASE_EFF_Y + part.dy * ratio}
                        img={parts[part.idSmallImg].img}
                        data={parts[part.idSmallImg].data}
                    />
                );
            })}

            {partFrame?.listPartBottom?.map((part, index) => {
                return (
                    <PartImg
                        flip={part.flip === 1}
                        index={999}
                        key={index}
                        ratio={ratio}
                        dragable
                        x={BASE_EFF_X + part.dx * ratio}
                        y={BASE_EFF_Y + part.dy * ratio}
                        img={parts[part.idSmallImg].img}
                        data={parts[part.idSmallImg].data}
                    />
                );
            })}
            {/* Render bottom */}
        </>
    );
}

export default PartFramePainter;
