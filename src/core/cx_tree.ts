import {readFileAsJson} from "../utils/files";
import {EmojiMap} from "../types/EmojiMap";
import {Trie} from "../types/Trie";

export const ROOT = new Trie('')

function loadEmoji() {
  const emojiJson = readFileAsJson<EmojiMap>('./src/core/emoji.json')

  for (const emoji of Object.keys(emojiJson)) {
    const pys = emojiJson[emoji]
    for (const py of pys) {
      ROOT.insert(py, emoji)
    }
  }
}

loadEmoji()
