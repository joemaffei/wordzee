import { combos } from "@/data/combos";
import { tilePoints } from "@/data/tiles";

export function calculateScores(chosen: string) {
	const tiles = chosen.split("").map((letter) => ({
		letter,
		points: tilePoints[letter as keyof typeof tilePoints],
	}));

	const scores: number[] = [];

	for (const combo of combos) {
		let score = 0;
		let multiplier = 1;
		for (const index of [0, 1, 2, 3, 4]) {
			multiplier *= combo[index].word;
			score += tiles[index].points * combo[index].letter;
		}
		scores.push(score * multiplier);
	}

	return scores;
}
