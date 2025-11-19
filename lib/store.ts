import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
    // Global stats
    totalScore: number;
    totalXP: number;
    level: number;

    // Per-game stats
    leversScore: number;
    whoAmIScore: number;
    movementScore: number;
    matchingScore: number;

    // Streak tracking
    currentStreak: number;
    bestStreak: number;

    // Actions
    addScore: (points: number, game: 'levers' | 'whoami' | 'movement' | 'matching') => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    addXP: (xp: number) => void;
    resetGame: (game: 'levers' | 'whoami' | 'movement' | 'matching') => void;
}

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            totalScore: 0,
            totalXP: 0,
            level: 1,
            leversScore: 0,
            whoAmIScore: 0,
            movementScore: 0,
            matchingScore: 0,
            currentStreak: 0,
            bestStreak: 0,

            addScore: (points, game) => set((state) => {
                const gameScoreKey = `${game}Score` as keyof GameState;
                return {
                    totalScore: state.totalScore + points,
                    [gameScoreKey]: (state[gameScoreKey] as number) + points,
                };
            }),

            incrementStreak: () => set((state) => ({
                currentStreak: state.currentStreak + 1,
                bestStreak: Math.max(state.bestStreak, state.currentStreak + 1),
            })),

            resetStreak: () => set({ currentStreak: 0 }),

            addXP: (xp) => set((state) => {
                const newXP = state.totalXP + xp;
                const newLevel = Math.floor(newXP / 100) + 1;
                return {
                    totalXP: newXP,
                    level: newLevel,
                };
            }),

            resetGame: (game) => set((state) => {
                const gameScoreKey = `${game}Score` as keyof GameState;
                return {
                    [gameScoreKey]: 0,
                };
            }),
        }),
        {
            name: 'biodinamica-game-storage',
        }
    )
);
