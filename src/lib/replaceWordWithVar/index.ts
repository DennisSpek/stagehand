/**
 * Replaces a word in a string with a variable value.
 * @param str The original string.
 * @param word The word to be replaced.
 * @param replacement The variable value to replace the word with.
 * @returns The modified string with the word replaced by the variable value.
 */

export function replaceWordWithVar(str: string, word: string, replacement: string): string {
  return str.replace(new RegExp(`\\b${word}\\b`, 'g'), replacement);
}