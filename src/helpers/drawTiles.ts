import type { Tile } from "@/data/tiles";
import { drawTile } from "./drawTile";

export function drawTiles(total: number, tiles: Tile[]) {
	let remaining = [...tiles];
	const drawn: Tile[] = [];
	for (const _ of Array(total)) {
		const draw = drawTile(remaining);
		drawn.push(draw.tile);
		remaining = draw.remaining;
	}
	return {
		tiles: drawn,
		remaining,
	};
}
