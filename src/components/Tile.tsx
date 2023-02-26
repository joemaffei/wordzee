import { type Tile as TileType } from "@/data/tiles";
import type { ComponentProps, FC } from "react";

interface TileProps extends ComponentProps<"button"> {
	tile: TileType;
}

export const Tile: FC<TileProps> = ({
	className,
	disabled,
	tile,
	...buttonAttrs
}) => {
	return (
		<button
			className={`relative flex h-[70px] w-[70px] shrink-0 grow-0 select-none items-center justify-center rounded-sm bg-amber-200 font-semibold text-amber-900 shadow ${
				className ?? ""
			} ${disabled ? "cursor-not-allowed" : "hover:bg-amber-300"}`.trim()}
			{...buttonAttrs}
		>
			<div className="text-center text-5xl leading-none">{tile.letter}</div>
			<div className="absolute bottom-1 right-1 text-end text-sm font-semibold leading-none">
				{tile.points}
			</div>
		</button>
	);
};
