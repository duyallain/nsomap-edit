import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";
import { SmallImage } from "../Common/Types";

type Props = {};

type PartImgProps = {
    img: string;
    data: SmallImage;
    ratio: number;
    x: number;
    y?: number;
    selectedIndex?: number;
    setSelectedIndex?: (i: number) => void;
    flip?: boolean;
    index: number;
    dragable?: boolean;
};
const PartImg = ({
    img,
    data,
    ratio,
    x,
    y,
    selectedIndex,
    setSelectedIndex,
    dragable,
    index,
    flip,
}: PartImgProps) => {
    const [image] = useImage(img);
    const selected = index === selectedIndex;

    return (
        <>
            <Image
                x={x}
                y={y}
                scaleX={flip ? -1 : 1}
                fill={selected ? `rgb(10,10,0,0.1)` : ""}
                width={Math.round(data.w * ratio)}
                height={Math.round(data.h * ratio)}
                image={image}
                draggable={dragable}
                onClick={() => {
                    if (selected) {
                        setSelectedIndex?.(-1);
                    } else {
                        setSelectedIndex?.(index);
                    }
                }}
                crop={{
                    x: (data.x - 0) * ratio,
                    y: (data.y + 0.5) * ratio,
                    height: Math.round(data.h * ratio),
                    width: Math.round(data.w * ratio),
                }}
            />
        </>
    );
};

export default PartImg;
