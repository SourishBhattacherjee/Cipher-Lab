// Homomorphic-inspired emoji cipher
// This is a simplified version that maintains some properties of homomorphic encryption
// while being reversible and deterministic

const emojiMap = new Map([
  ['a', '😀'], ['b', '😎'], ['c', '😊'], ['d', '😃'], ['e', '😄'],
  ['f', '😅'], ['g', '😆'], ['h', '😉'], ['i', '😋'], ['j', '😍'],
  ['k', '😘'], ['l', '😗'], ['m', '😙'], ['n', '😚'], ['o', '😐'],
  ['p', '😶'], ['q', '😏'], ['r', '😣'], ['s', '😥'], ['t', '😮'],
  ['u', '😯'], ['v', '😪'], ['w', '😫'], ['x', '😴'], ['y', '😌'],
  ['z', '😛'], [' ', '✨']
]);

const reverseEmojiMap = new Map(Array.from(emojiMap.entries()).map(([k, v]) => [v, k]));

export function encodeMessage(text: string): string {
  return Array.from(text.toLowerCase())
    .map(char => emojiMap.get(char) || char)
    .join('');
}

export function decodeMessage(emojiText: string): string {
  const emojiArray = Array.from(emojiText.match(/\p{Emoji}/gu) || []);
  return emojiArray
    .map(emoji => reverseEmojiMap.get(emoji) || emoji)
    .join('');
}

// Homomorphic-like property: concatenation of encoded messages
export function concatenateEncodedMessages(encoded1: string, encoded2: string): string {
  return encoded1 + encoded2;
}