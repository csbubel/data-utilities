export default class Duplicates {
    constructor(col) {
        const [normalizedLines, normalizedToOriginal] = this.normalize(col);

        const lineToFrequency = new Map();
        for (const line of normalizedLines) {
            const count = lineToFrequency.get(line) || 0;
            lineToFrequency.set(line, count + 1);
        }

        this.duplicates = new Map();
        this.uniques = new Set();

        for (const [line, frequency] of lineToFrequency) {
            if (frequency > 1) {
                this.duplicates.set(normalizedToOriginal.get(line), frequency);
            }
            else {
                this.uniques.add(normalizedToOriginal.get(line));
            }
        }
    }

    normalize = (col) => {
        const normalizedToOriginal = new Map();
        const lines = col.split("\n");
        const normalizedLines = [];

        for (let line of lines) {
            const normalized = line.trim().toLowerCase();
            normalizedLines.push(normalized);

            if (!normalizedToOriginal.has(line)) {
                normalizedToOriginal.set(normalized, line);
            }
        }

        return [normalizedLines, normalizedToOriginal];
    }
}