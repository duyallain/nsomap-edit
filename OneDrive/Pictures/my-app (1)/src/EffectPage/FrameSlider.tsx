import React from "react";

type Props = {
    value?: number;
    maxFrame: number;
    onChange?: (value: number) => void;
    onClick: () => void;
    sequence: number[];
};

const FrameSlider = ({
    maxFrame,
    onChange,
    value,
    sequence,
    onClick,
}: Props) => {
    return (
        <>
            <input
                type="range"
                className="w-full"
                min={0}
                max={maxFrame - 1}
                onChange={(e) => onChange?.(+e.target.value)}
                value={value}
                onClick={onClick}
            />
            {/* Frame index */}
            <div className="w-full flex my-3">
                {maxFrame - 1 > 0 &&
                    new Array(maxFrame - 1).fill(-1).map((_, index) => {
                        return (
                            <div
                                key={index}
                                className="flex-1 flex text-center justify-between"
                            >
                                {index !== maxFrame - 2 ? (
                                    sequence[index]
                                ) : (
                                    <>
                                        <span>{sequence[index]}</span>
                                        <span>{sequence[index + 1]}</span>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default FrameSlider;
