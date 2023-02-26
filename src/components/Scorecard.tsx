import { combos } from "@/data/combos";
import type { tilePoints } from "@/data/tiles";
import { calculateScores } from "@/helpers/calculateScores";
import type { ComponentProps, FC } from "react";
import { useEffect, useState } from "react";
import { SmallTile } from "./SmallTile";

interface ScorecardProps {
	chosen: string;
	onRowClick: (index: number, score: number) => void;
	onRowScratch: (index: number) => void;
	marks: { word: string; score: number }[];
	showScratch: boolean;
}

const Square: FC<ComponentProps<"div">> = ({ className, ...attrs }) => (
	<div
		{...attrs}
		className={`flex h-[34px] w-[34px] select-none items-center justify-center rounded-md font-semibold ${className}`}
	/>
);

export const Scorecard: FC<ScorecardProps> = ({
	chosen,
	onRowClick,
	marks,
	onRowScratch,
	showScratch,
}) => {
	const [scores, setScores] = useState<number[]>([]);

	useEffect(() => {
		if (chosen) {
			setScores(calculateScores(chosen));
		}
	}, [chosen]);

	const total = marks.reduce((acc, cur) => {
		if (cur?.score) acc += cur?.score;
		return acc;
	}, 0);

	return (
		<section>
			<h2>Scorecard</h2>
			<div className="rounded-md border bg-white p-2 pt-4 shadow-md dark:border-slate-700 dark:bg-slate-800">
				<table>
					<tbody>
						{combos.map((combo, comboIndex) => (
							<tr key={comboIndex}>
								<td className="w-[66px]">
									{showScratch && !chosen && !marks[comboIndex] && (
										<button
											className="h-8 w-full rounded border border-red-600 px-2 leading-none hover:bg-red-100"
											onClick={() => onRowScratch(comboIndex)}
											title="Scratch"
										>
											❌ →
										</button>
									)}
									{chosen && !marks[comboIndex] && (
										<button
											className="h-8 w-full rounded bg-green-700 px-2 leading-none text-white hover:bg-green-600"
											onClick={() => onRowClick(comboIndex, scores[comboIndex])}
										>
											{scores[comboIndex]} →
										</button>
									)}
								</td>
								<td className="flex items-center gap-x-0.5 pl-1">
									{combo.map((square, squareIndex) => {
										const { children } = square.props;
										return (
											<div
												key={squareIndex}
												className={
													`${
														marks[comboIndex]?.score === 0 ? "opacity-30" : ""
													}` || undefined
												}
											>
												<Square {...square.props}>
													{marks[comboIndex]?.word ? (
														<SmallTile
															letter={
																marks[comboIndex]?.word[
																	squareIndex
																] as keyof typeof tilePoints
															}
														/>
													) : (
														children
													)}
												</Square>
											</div>
										);
									})}
								</td>
								<td className="pl-2">{marks[comboIndex]?.score}</td>
							</tr>
						))}
						<tr className="text-xl">
							<td colSpan={2} className="pt-1 text-end font-bold">
								TOTAL
							</td>
							<td className="pl-2 pt-1 font-bold">
								<div className="w-[54px]">{total}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
};
