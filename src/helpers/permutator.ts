export function permutator(input: string[]) {
	const result: string[] = [];

	const permute = (arr: string[], m: string[] = []) => {
		if (arr.length === 0) {
			result.push(m.join(""));
			return;
		} else {
			for (let i = 0; i < arr.length; i++) {
				const curr = arr.slice();
				const next = curr.splice(i, 1);
				permute(curr.slice(), m.concat(next));
			}
		}
	};

	permute(input);
	return result;
}
