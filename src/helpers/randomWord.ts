import { words } from "@/data/words";

export function randomWord() {
	return words[Math.floor(Math.random() * words.length)];
}
