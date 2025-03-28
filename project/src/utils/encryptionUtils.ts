import { encodeMessage as emojiEncode, decodeMessage as emojiDecode } from './emojiCipher';

// Base64 encryption
const base64Encode = (text: string): string => {
  return btoa(text);
};

const base64Decode = (encoded: string): string => {
  try {
    return atob(encoded);
  } catch {
    return 'Invalid Base64 input';
  }
};

// ROT13 encryption
const rot13 = (text: string): string => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - base + 13) % 26 + base);
  });
};

// Caesar Cipher
const caesarCipher = (text: string, shift: number, decode = false): string => {
  const actualShift = decode ? (26 - shift) : shift;
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - base + actualShift) % 26 + base);
  });
};

// Reverse Text (just for fun)
const reverseText = (text: string): string => {
  return text.split('').reverse().join('');
};

export type EncryptionAlgorithm = {
  id: string;
  name: string;
  encode: (text: string) => string;
  decode: (text: string) => string;
  description: string;
};

export const algorithms: EncryptionAlgorithm[] = [
  {
    id: 'emoji',
    name: 'Emoji Cipher',
    encode: emojiEncode,
    decode: emojiDecode,
    description: 'Converts text to emoji using a homomorphic-inspired mapping'
  },
  {
    id: 'base64',
    name: 'Base64',
    encode: base64Encode,
    decode: base64Decode,
    description: 'Standard Base64 encoding for text data'
  },
  {
    id: 'rot13',
    name: 'ROT13',
    encode: rot13,
    decode: rot13,
    description: 'Classic ROT13 substitution cipher'
  },
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    encode: (text) => caesarCipher(text, 3, false),
    decode: (text) => caesarCipher(text, 3, true),
    description: 'Traditional Caesar cipher with shift of 3'
  },
  {
    id: 'reverse',
    name: 'Reverse Text',
    encode: reverseText,
    decode: reverseText,
    description: 'Simple text reversal transformation'
  }
];