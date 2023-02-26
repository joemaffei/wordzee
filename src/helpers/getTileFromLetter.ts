import { allTiles } from "@/data/tiles";

export function getTileFromLetter(letter: string) {
	const tile = allTiles.find((tile) => tile.letter === letter);
	if (!tile) throw new Error("getTileFromLetter: Invalid letter");
	return tile;
}
