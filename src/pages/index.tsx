import { Scorecard } from "@/components/Scorecard";
import { SmallTile } from "@/components/SmallTile";
import { Tray } from "@/components/Tray";
import type { tilePoints } from "@/data/tiles";
import { allTiles, type Tile as TileType } from "@/data/tiles";
import { words } from "@/data/words";
import { drawTiles } from "@/helpers/drawTiles";
import { permutator } from "@/helpers/permutator";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
	const [drawn, setDrawn] = useState<TileType[]>([]);
	const [kept, setKept] = useState<TileType[]>([]);
	const [remaining, setRemaining] = useState<TileType[]>(allTiles);
	const [validWords, setValidWords] = useState<string[]>([]);
	const [drawsLeft, setDrawsLeft] = useState(2);
	const [chosen, setChosen] = useState("");
	const [marks, setMarks] = useState<{ word: string; score: number }[]>(
		Array(15)
	);

	useEffect(() => {
		drawFive();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (kept.length === 5) {
			const letters = kept.map((tile) => tile.letter as string);
			const permutations = permutator(letters);
			const validPermutations = words.filter((permutation) =>
				permutations.includes(permutation)
			);
			setValidWords(validPermutations);
		} else {
			setValidWords([]);
		}
	}, [kept]);

	function drawFive() {
		const draw = drawTiles(5, remaining);
		setDrawn(draw.tiles);
		setRemaining(draw.remaining);
	}

	function handleButtonClick() {
		if (drawsLeft === 0) {
			resetStates();
		} else {
			drawFive();
			setDrawsLeft((current) => current - 1);
		}
	}

	function handleDrawnTileClick(tile: TileType) {
		setChosen("");
		setDrawn((current) => current.filter((t) => t !== tile));
		setKept((current) => [...current, tile]);
	}

	function handleKeptTileClick(tile: TileType) {
		setChosen("");
		setDrawn((current) => [...current, tile]);
		setKept((current) => current.filter((t) => t !== tile));
	}

	function handleRowClick(index: number, score: number) {
		setMarks((current) => {
			const newScores = [...current];
			newScores[index] = {
				word: chosen,
				score,
			};
			return newScores;
		});
		resetStates();
		drawFive();
	}

	function handleRowScratch(index: number) {
		setMarks((current) => {
			const newScores = [...current];
			newScores[index] = {
				word: "",
				score: 0,
			};
			return newScores;
		});
		resetStates();
		drawFive();
	}

	function handleWordClick(word: string) {
		return () => {
			setChosen((current) => (word === current ? "" : word));
		};
	}

	function resetStates() {
		setDrawn([]);
		setKept([]);
		setRemaining(allTiles);
		setValidWords([]);
		setDrawsLeft(2);
		setChosen("");
	}

	return (
		<>
			<Head>
				<title>Wordzee</title>
				<meta
					name="description"
					content="A word game at the intersection of Scrabble, Yahtzee and Wordle"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex h-screen items-center justify-center gap-x-8">
				<div className="flex flex-col items-center gap-y-16">
					<h1 className="text-4xl font-bold text-slate-300">Wordzee</h1>
					<div className="flex gap-x-8">
						<div className="flex flex-col gap-y-4">
							<section>
								<h2>Keep</h2>
								<Tray
									tiles={kept}
									onTileClick={handleKeptTileClick}
									disabled={drawn.length === 5}
								/>
							</section>
							<section>
								<h2>Draw</h2>
								<Tray
									tiles={drawn}
									onTileClick={handleDrawnTileClick}
									disabled={kept.length === 5}
								/>
							</section>
							<div className="flex justify-center">
								{drawsLeft > 0 && (
									<button
										className="rounded-md bg-green-700 px-5 py-3 text-2xl text-white shadow-md hover:bg-green-600 disabled:opacity-50"
										disabled={kept.length === 5}
										onClick={handleButtonClick}
									>
										{drawsLeft === 2 && "DRAW 5"}
										{drawsLeft === 1 && "LAST DRAW"}
									</button>
								)}
							</div>
						</div>
						<section>
							<h2>Possible Words</h2>
							<div className="w-[174px] rounded-md border bg-white p-2 shadow-md dark:border-slate-700 dark:bg-slate-800">
								<div className="flex flex-col items-start gap-y-1">
									{validWords.length ? (
										validWords.map((word) => (
											<button
												className={`flex gap-x-0.5 rounded-md p-1 hover:bg-blue-400 dark:hover:bg-blue-600 ${
													chosen === word
														? "bg-green-600 dark:bg-green-700"
														: ""
												}`.trim()}
												key={word}
												onClick={handleWordClick(word)}
											>
												{word.split("").map((letter, index) => (
													<SmallTile
														letter={letter as keyof typeof tilePoints | null}
														key={index}
													/>
												))}
											</button>
										))
									) : (
										<div className="text-sm font-light text-slate-400">
											{kept.length < 5
												? "Keep 5 tiles to calculate"
												: "No valid words found."}
										</div>
									)}
								</div>
							</div>
						</section>
						<Scorecard
							chosen={chosen}
							onRowClick={handleRowClick}
							onRowScratch={handleRowScratch}
							marks={marks}
							showScratch={kept.length === 5 || drawsLeft === 0}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
