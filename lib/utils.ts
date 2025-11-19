import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility functions for text normalization and comparison

/**
 * Normalizes text for comparison by:
 * - Converting to lowercase
 * - Removing accents/diacritics
 * - Trimming whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .trim();
}

/**
 * Checks if two texts match (case-insensitive, accent-insensitive)
 */
export function textsMatch(text1: string, text2: string): boolean {
  return normalizeText(text1) === normalizeText(text2);
}

/**
 * Checks if text1 contains text2 (case-insensitive, accent-insensitive)
 */
export function textContains(text1: string, text2: string): boolean {
  return normalizeText(text1).includes(normalizeText(text2));
}

/**
 * Checks if guess is a valid answer
 * Returns true if:
 * - Exact match (normalized)
 * - Answer contains guess and guess is longer than 3 chars
 */
export function isValidAnswer(guess: string, correctAnswer: string): boolean {
  const normalizedGuess = normalizeText(guess);
  const normalizedAnswer = normalizeText(correctAnswer);

  if (normalizedGuess === normalizedAnswer) return true;
  if (normalizedGuess.length > 3 && normalizedAnswer.includes(normalizedGuess)) return true;

  return false;
}
