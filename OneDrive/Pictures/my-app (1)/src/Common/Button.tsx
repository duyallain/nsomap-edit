import React from "react";

type Props = {
    children: any;
    onClick: () => void;
    full?: boolean;
    danger?: boolean;
};

export const Button = ({ danger, full, onClick, children }: Props) => {
    return (
        <button
            className={`${full ? "w-full" : "w-1/2"} ${
                danger
                    ? "bg-red-500 hover:bg-red-700 mb-2"
                    : "bg-blue-500 hover:bg-blue-700 mb-2"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer`}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};
