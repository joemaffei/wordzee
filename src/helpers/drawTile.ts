import type { Tile } from "@/data/tiles";

export function drawTile(tiles: Tile[]) {
	const remainingTiles = [...tiles];
	const index = Math.floor(Math.random() * remainingTiles.length);
	remainingTiles.splice(index, 1);

	return {
		tile: tiles[index],
		remaining: remainingTiles,
	};
}
