import {
    faAdd,
    faDownload,
    faPause,
    faPlayCircle,
    faSave,
    faSubtract,
    faTrash,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Layer, Stage, Text } from "react-konva";
import { Button } from "../Common/Button";
import { canvas1Width } from "../Common/Constants";
import { Dim, FrameEff, PartData } from "../Common/Types";
import { getPart } from "../Common/Utils";
import { Char } from "./Char";
import FrameSlider from "./FrameSlider";
import PartFramePainter from "./PartFramePainter";
import PartImg from "./PartImg";
type Props = {
    ratio: number;
    maxFrame: number;
    setRatio: (v: number) => void;
    baseX: number;
    baseY: number;
    centerX: number;
    canvasDim: Dim;
    setCanvasDim: (d: Dim) => void;
    parts: PartData[];
    listFrames: FrameEff[];
    sequence: number[];
};

const ShowPanel = ({
    ratio,
    maxFrame,
    setRatio,
    baseX,
    baseY,
    centerX,
    setCanvasDim,
    canvasDim,
    parts,
    listFrames,
    sequence,
}: Props) => {
    const [canvasDim2, setCanvasDim2] = useState<Dim>({ width: 0, height: 0 });
    const canvas1Ref = useRef<HTMLDivElement | null>(null);
    const canvas2Ref = useRef<HTMLDivElement | null>(null);
    const [partIndex, setPartIndex] = useState(-1);
    const [selectedFrame, setSelectedFrame] = useState(-1);
    const [play, setPlay] = useState(false);
    const timeoutRef = useRef<any>();
    const [timeFrame, setTime] = useState(100);

    useEffect(() => {
        const playAnimation = () => {
            setSelectedFrame((f) => {
                let nextF = f + 1;
                nextF %= sequence.length;
                return nextF;
            });

            timeoutRef.current = setTimeout(() => {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = playAnimation();
            }, timeFrame);
        };
        if (play) {
            playAnimation();
        } else {
            clearTimeout(timeoutRef.current);
        }
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [play]);

    useEffect(() => {
        const load = function () {
            if (canvas1Ref) {
                setCanvasDim({
                    width: canvas1Ref.current?.clientWidth!!,
                    height: canvas1Ref.current?.clientHeight!!,
                });
            }
            if (canvas2Ref) {
                setCanvasDim2({
                    width: canvas2Ref.current?.clientWidth!!,
                    height: canvas2Ref.current?.clientHeight!!,
                });
            }
        };
        window.addEventListener("load", load);
        if (listFrames.length > 0) {
            setSelectedFrame(0);
        }

        return () => {
            window.removeEventListener("load", load);
        };
    }, []);

    useEffect(() => {
        setPartIndex(-1);
    }, [parts]);

    return (
        <div className="w-2/3 h-full">
            <div
                ref={canvas1Ref}
                className="w-full p-5 border-2 rounded-lg shadow-lg relative bg-white flex items-center justify-center mb-5 h-72  flex-row-reverse"
            >
                <div className="shadow-md border-2 p-5 flex  flex-col absolute right-4 top-5">
                    {/* Controls 1 */}
                    <Button
                        full
                        onClick={() => {
                            setPlay(!play);
                        }}
                    >
                        <FontAwesomeIcon icon={play ? faPause : faPlayCircle} />
                    </Button>
                    <Button full onClick={() => {}}>
                        <FontAwesomeIcon icon={faDownload} />
                    </Button>
                    <Button full onClick={() => {}}>
                        <FontAwesomeIcon icon={faSave} />
                    </Button>
                    <Button full danger onClick={() => {}}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    {/* Controls */}
                </div>
                <div className="flex-1 justify-center flex">
                    <Stage
                        className="border-x-2"
                        width={canvas1Width}
                        height={canvasDim.height}
                    >
                        <Layer>
                            <Text
                                y={10}
                                x={centerX - 30}
                                text="Charater"
                                fontStyle="bold"
                                fontSize={15}
                            />
                            <Char
                                baseX={baseX}
                                baseY={baseY}
                                parts={[
                                    getPart(2, "head"),
                                    getPart(1, "body"),
                                    getPart(0, "leg"),
                                ]}
                                ratio={ratio}
                                width={10}
                            />
                        </Layer>
                        <Layer>
                            {selectedFrame !== -1 && (
                                <PartFramePainter
                                    baseX={baseX}
                                    baseY={baseY}
                                    parts={parts}
                                    ratio={ratio}
                                    partFrame={
                                        listFrames[sequence[selectedFrame]]
                                    }
                                />
                            )}
                        </Layer>
                    </Stage>
                </div>
            </div>
            <div className="rounded-full text-xl h-10 space-x-5 flex items-center w-full flex-row justify-center">
                <FontAwesomeIcon
                    className="bg-green-500 rounded-full p-2 hover:bg-green-600 cursor-pointer select-none"
                    icon={faSubtract}
                    onClick={() => {
                        if (ratio > 1) {
                            setRatio(ratio - 1);
                        }
                    }}
                />

                <FontAwesomeIcon
                    className="bg-green-500 rounded-full p-2 hover:bg-green-600 cursor-pointer select-none"
                    icon={faAdd}
                    onClick={() => {
                        if (ratio < 4) {
                            setRatio(ratio + 1);
                        }
                    }}
                />
            </div>
            <FrameSlider
                value={selectedFrame}
                maxFrame={sequence.length}
                sequence={sequence}
                onChange={(frame) => setSelectedFrame(frame)}
                onClick={() => setPlay(false)}
            />
            <div className="flex space-x-3 h-44 border-2 shadow-sm my-3 w-full overflow-auto p-5">
                <Stage width={canvas2Ref.current?.clientWidth} height={100}>
                    <Layer>
                        {parts.map((p, index, arr) => {
                            return (
                                <PartImg
                                    key={index}
                                    index={index}
                                    img={p.img}
                                    data={p.data}
                                    ratio={ratio}
                                    selectedIndex={partIndex}
                                    setSelectedIndex={setPartIndex}
                                    x={parts.reduce((acc, current, i) => {
                                        if (index > i) {
                                            return (
                                                acc +
                                                current.data.w * ratio +
                                                ratio *
                                                    (index - i === 1 ? 10 : 0) *
                                                    index
                                            );
                                        }
                                        return acc;
                                    }, 0)}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
            <div
                className="rounded-md border-2 shadow-lg bg-white flex items-center justify-center mb-5 h-52"
                ref={canvas2Ref}
            >
                {/* Control frame set */}
                <div className="shadow-md border-2 p-5 flex  flex-col w-30 h-full justify-center">
                    <Button full onClick={() => {}}>
                        <FontAwesomeIcon icon={faUpload} />
                    </Button>
                    <Button full danger onClick={() => {}}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
                <Stage
                    className="border-x-2"
                    width={canvasDim2.width - 82}
                    height={canvasDim2.height}
                >
                    <Layer></Layer>
                </Stage>
            </div>
        </div>
    );
};

export default ShowPanel;
