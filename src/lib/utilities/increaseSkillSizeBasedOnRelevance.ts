import { randomIntFromInterval } from '$lib/utilities/randomIntFromInterval';

export function increaseSkillSizeBasedOnRelevance(id: number) {
    const possibilities = [24, 48, 64, 96];
    // return possibilities[randomIntFromInterval(0, 2)];
    return possibilities[id];
}