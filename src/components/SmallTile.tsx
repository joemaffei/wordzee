import { tilePoints } from "@/data/tiles";
import type { FC } from "react";

interface SmallTileProps {
	letter: keyof typeof tilePoints | null;
}

export const SmallTile: FC<SmallTileProps> = ({ letter }) => {
	return (
		<div className="relative flex h-[28px] w-[28px] grow-0 select-none rounded-sm bg-amber-200 pt-0.5 pl-1 font-semibold text-amber-900 shadow-sm dark:bg-amber-200">
			<div className="text-center text-xl leading-none">{letter}</div>
			<div className="absolute bottom-0.5 right-0.5 text-[10px] font-semibold leading-none tracking-tighter">
				{letter === null ? 0 : tilePoints[letter]}
			</div>
		</div>
	);
};
