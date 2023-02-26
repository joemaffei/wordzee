import type { Tile as TileType } from "@/data/tiles";
import type { FC } from "react";
import { Tile } from "./Tile";

interface TrayProps {
	disabled: boolean;
	tiles: TileType[];
	onTileClick: (tile: TileType) => void;
}

export const Tray: FC<TrayProps> = ({ disabled, tiles, onTileClick }) => {
	function handleTileClick(tile: TileType) {
		if (!disabled) return () => onTileClick(tile);
	}

	return (
		<div className="flex h-[88px] w-[384px] justify-start gap-x-1 rounded-md border bg-white p-2 shadow-md dark:border-slate-700 dark:bg-slate-800">
			{tiles.length ? (
				tiles.map((tile, index) => (
					<Tile
						disabled={disabled}
						tile={tile}
						key={index}
						onClick={handleTileClick(tile)}
						className={disabled ? "opacity-50" : undefined}
					/>
				))
			) : (
				<div className="flex h-full w-full items-center justify-center font-light text-slate-400 dark:text-slate-500">
					no tiles
				</div>
			)}
		</div>
	);
};
