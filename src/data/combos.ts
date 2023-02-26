import type { ComponentProps } from "react";

interface Square {
	letter: number;
	word: number;
	props: ComponentProps<"div">;
}

const doubleLetter: Square = {
	letter: 2,
	word: 1,
	props: {
		className: "bg-blue-300 text-blue-900",
		title: "Double Letter",
		children: "2L",
	},
};

const tripleLetter: Square = {
	letter: 3,
	word: 1,
	props: {
		className: "bg-blue-500 text-blue-50",
		title: "Triple Letter",
		children: "3L",
	},
};

const doubleWord: Square = {
	letter: 1,
	word: 2,
	props: {
		className: "bg-red-300 text-red-900",
		title: "Double Word",
		children: "2W",
	},
};

const tripleWord: Square = {
	letter: 1,
	word: 3,
	props: {
		className: "bg-red-500 text-red-50",
		title: "Triple Word",
		children: "3W",
	},
};

const blank: Square = {
	letter: 1,
	word: 1,
	props: { className: "bg-slate-200 bg-slate-600" },
};

export const combos = [
	[doubleLetter, blank, doubleLetter, blank, blank],
	[blank, doubleLetter, blank, doubleLetter, blank],
	[blank, blank, doubleLetter, blank, doubleLetter],
	[tripleLetter, blank, blank, blank, tripleLetter],
	[blank, tripleLetter, blank, blank, blank],
	[blank, blank, tripleLetter, blank, blank],
	[blank, blank, blank, tripleLetter, blank],
	[doubleWord, blank, blank, doubleLetter, blank],
	[doubleWord, blank, blank, blank, doubleLetter],
	[blank, doubleLetter, blank, blank, doubleWord],
	[doubleLetter, blank, blank, blank, doubleWord],
	[tripleWord, blank, blank, doubleLetter, blank],
	[tripleWord, blank, blank, blank, doubleLetter],
	[blank, doubleLetter, blank, blank, tripleWord],
	[doubleLetter, blank, blank, blank, tripleWord],
];
