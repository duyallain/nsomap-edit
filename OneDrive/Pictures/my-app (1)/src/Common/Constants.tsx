import { DataSkillEff } from "./Types";

// const API_URL = "http://localhost:9000";
const API_URL = "https://spring-backend-mapcreator.herokuapp.com";

const size = 96;
const typeToSize = {
    hiro: 120,
    okaza: 142,
    haru: 141,
    vdmq: 104,
};

const defaultWidth = 20;
const defaultHeight = 10;
const placeHolderImg = "/assets/placeholder.png";

export {
    API_URL,
    size,
    typeToSize,
    defaultHeight,
    defaultWidth,
    placeHolderImg,
};

export const canvas1Width = 250;

export const imgTest =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAADiCAMAAADJYzEJAAABgFBMVEUAAAD3+Ph04e9y3e104u953+504e924e504e9z3+534e9z1Ot04O923u924u904O522Ox04O514O504e912ux04e9/4e903+514e914u953+952u1y3e9w2e1u1e1sz+xqzOtmyOtivupcuOlcsedWquhOoOFEk907it42g9w0eM4tacMnXbolWrgnXLkmW7gnW7gnW7gnXLgpYLwmW7gmW7gnXbkmW7guYrsnXLgmW7gnXLkwZLonXLklWrgmW7gmW7glWrglWrgrY704b8Q1g9xGhdBGkds3hds+hNY5bMBXpuZftulWqupmyeyDwNV6y+1wuedbp+RAidk+hNVZnuBZrOl6vupxx+hWqedDitc7hNY2bcA5fM1IhcxHld5aruhpyuqGzuCj0eyh5fGY5/KM4/CA5PCn6vOx6/S47fTC7/XL7/TS8vbb8/bg8/fk9ffp9ffo9vjs9vfw9/j0+PjO5/S97PO66/Ncruh5ueU9hdhAfs/R8PbG7PT3+Ph3nsK6AAAAf3RSTlMAAwEECQ4aIi4+SlhfbHiFk52svM7a5+/4//////z+//7+//7///////7+/v7/9ebc0se7rqKZi3NfT0A3KiIVCQQBBAYFAwsYKxseCwMDCCM7WmVKgJN9s7fH1tfs++rx6fj////+/v///////////////////Nys2f6liEgJopzNEgAAFndJREFUeAGtwFuQnGeZ2PH/87zv933dPaODDazlBYxZ1tgLi1nkA8YG5GkdLFnqkSxsbCBVm1zsXuzF5nKTKqOL4NQWValK1aYq2ZtUKsnuVtmSD6ODJTRSj4QPYPAZCCYBzBJgA/gozXT3d3ifJ2ZGkiVbh1YqP2FMU2bJHPdkiG7k37JEGNOtBsmsSg7gduWjLBLG1HXm6LrVVe0O7tasvh8QLtZUVdbuYI2tvh+Ei9ZNZd0Ybo2vvh9hfF0W9emmZt6wlLjuo8KYupbM3NzMReMHfzF0S29svvQ/CeNZU6XKxE1YItd+v/bPtugIwDrrcwFThjvmbqkxZ5Hdyev/TQDW5aOmNkCLI5xXF3Orhg7g0xX6M4G77fV6OHIkRA1PckFdKwcG9EbC8L/HO1rP8775GrSVB8bRp6vz7r2FCDTxJZKXNRSd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";
export const dataTest = {
    imgs: [
        { id: 0, x: 0, y: 74, w: 32, h: 13 },
        { id: 1, x: 0, y: 32, w: 32, h: 14 },
        { id: 2, x: 0, y: 46, w: 32, h: 14 },
        { id: 3, x: 0, y: 60, w: 32, h: 14 },
        { id: 4, x: 0, y: 87, w: 32, h: 13 },
        { id: 5, x: 0, y: 0, w: 32, h: 16 },
        { id: 6, x: 0, y: 16, w: 32, h: 16 },
        { id: 7, x: 0, y: 100, w: 32, h: 13 },
    ],
    listFrame: [
        {
            listPartTop: [
                { idSmallImg: 0, dx: -15, dy: -13, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 1, dx: -14, dy: -16, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 2, dx: -15, dy: -17, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 3, dx: -15, dy: -19, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 4, dx: -14, dy: -20, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 5, dx: -14, dy: -25, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 6, dx: -15, dy: -26, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        {
            listPartTop: [
                { idSmallImg: 7, dx: -15, dy: -25, flip: 0, onTop: 0 },
            ],
            listPartBottom: [],
        },
        { listPartTop: [], listPartBottom: [] },
    ],
    sequence: [
        0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0, 0, 1, 1, 2, 2, 3, 3,
        4, 4, 5, 5, 6, 6, 7, 7, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7,
        8, 8,
    ],
    frameChar: [[], [], null, []],
} as DataSkillEff;
