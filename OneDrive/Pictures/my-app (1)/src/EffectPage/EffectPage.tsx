import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import { Button } from "../Common/Button";
import {
    API_URL,
    canvas1Width,
    dataTest,
    imgTest,
    placeHolderImg,
} from "../Common/Constants";
import Divider from "../Common/Divider";
import Input from "../Common/Input";
import { DataSkillEff, Dim, PartData } from "../Common/Types";
import { safeParse } from "../Common/Utils";
import ShowPanel from "./ShowPanel";

type UploadType = "image" | "data";

const EffectPage = () => {
    const uploadRef = useRef<any>();
    const [imgData, setImgData] = useState<string | null>(imgTest);
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [zoom, onZoomChange] = useState<number>(1);

    const imgRef = useRef<HTMLImageElement | null>(null);
    const [maxFrame, setMaxFrame] = useState<number>(10);

    const typeUploadRef = useRef<UploadType>("image");
    const [ratio, setRatio] = useState<number>(2);
    const [dataSkillEff, setDataSkillEff] = useState<DataSkillEff | null>(
        dataTest
    );
    const [canvasDim, setCanvasDim] = useState<Dim>({
        height: 0,
        width: 0,
    });
    const [parts, setParts] = useState<Array<PartData>>([]);

    useEffect(() => {
        if (dataSkillEff === null || imgData === null) {
            return;
        }
        setMaxFrame(dataSkillEff?.listFrame.length);
        setParts(
            dataSkillEff.imgs.map((i) => {
                return {
                    img: imgData,
                    data: i,
                } as PartData;
            })
        );
    }, [dataSkillEff, imgData]);
    /////////////////////////////////////////
    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (typeUploadRef.current === "image") {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = function () {
                setImgData(reader.result as string);
            };
        } else if (typeUploadRef.current === "data") {
            const formData = new FormData();
            formData.append("file", file);
            axios
                .post(API_URL + "/uploadEffData", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(({ data }) => {
                    setDataSkillEff(data as DataSkillEff);
                })
                .catch(console.log);
        }
    };

    const center = () => {
        return [canvas1Width / 2, canvasDim.height / 2];
    };

    const getBaseX = () => {
        let offset = 20;
        if (ratio === 1) {
            offset = 8;
        } else if (ratio === 2) {
            offset = 15;
        } else if (ratio === 3) {
            offset = 25;
        } else if (ratio === 4) {
            offset = 35;
        }
        return center()[0] - offset;
    };

    const getBaseY = () => {
        let offset = 20;
        if (ratio === 1) {
            offset = 8;
        } else if (ratio === 2) {
            offset = 15;
        } else if (ratio === 3) {
            offset = 25;
        } else if (ratio === 4) {
            offset = 35;
        }
        return center()[1] - offset;
    };

    return (
        <div className="container mx-auto flex pt-12">
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                ref={uploadRef}
                className="hidden"
                placeholder="File upload"
            />
            <ShowPanel
                maxFrame={maxFrame}
                ratio={ratio}
                setRatio={setRatio}
                baseX={getBaseX()}
                baseY={getBaseY()}
                sequence={dataSkillEff?.sequence ?? []}
                centerX={center()[0]}
                setCanvasDim={setCanvasDim}
                canvasDim={canvasDim}
                parts={parts}
                listFrames={dataSkillEff?.listFrame ?? []}
            />
            <div className="w-1/3 h-full ml-5">
                <div className="flex justify-center w-full">
                    <div className="w-full p-5 border-2 rounded-lg shadow-lg bg-white">
                        <div className="flex justify-between">
                            <h5 className="text-gray-900 text-xl leading-tight font-bold mb-2">
                                Image uploader
                            </h5>
                            <Button onClick={() => {}}>Thêm Part</Button>
                        </div>

                        <div className="w-full flex items-center justify-center my-4">
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => {
                                    setCrop(c);
                                }}
                            >
                                <img
                                    ref={imgRef}
                                    src={
                                        imgData !== null
                                            ? imgData
                                            : placeHolderImg
                                    }
                                    style={{ zoom: `${zoom * 100}%` }}
                                    className="h-full border-2"
                                    alt=""
                                />
                            </ReactCrop>
                        </div>
                        <Divider>Zoom</Divider>
                        <Input
                            onChange={(e) => {
                                safeParse(() => {
                                    onZoomChange(+e.target.value);
                                });
                            }}
                            value={zoom}
                            placeholder="Zoom"
                            type="number"
                            full
                        />
                        <Divider>Max Frame</Divider>
                        <Input
                            type="number"
                            full
                            onChange={(e) => {
                                safeParse(() => {
                                    setMaxFrame(parseInt(e.target.value));
                                });
                            }}
                            value={maxFrame}
                            placeholder="Max Frame"
                        />
                        <Button
                            full
                            onClick={() => {
                                uploadRef?.current?.click();
                                typeUploadRef.current = "image";
                            }}
                        >
                            Upload image
                        </Button>
                        <Button
                            danger
                            full
                            onClick={() => {
                                uploadRef?.current?.click();
                                typeUploadRef.current = "data";
                            }}
                        >
                            Upload Data
                        </Button>

                        <Button full onClick={() => {}}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EffectPage;
