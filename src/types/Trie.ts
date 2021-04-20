export class Trie {
  val: string
  private payload ?: Set<string>
  children ?: Map<string, Trie>

  constructor(val: string) {
    this.val = val
  }

  set content(v: string) {
    const payload = this.payload
    if (payload) {
      payload.add(v)
    } else {
      this.payload = new Set<string>([v])
    }
  }

  get content(): string {
    const payload = this.payload
    if (!payload) return null

    const w = [...payload], len_w = w.length
    if (len_w === 1) return w.pop()
    const r = (Math.random() * len_w) >> 0
    return w[r]
  }

  insert(text: string, payload: string) {
    const words = text.split('-')
    let now: Trie = this
    for (const word of words) {
      const children = now.children || (now.children = new Map<string, Trie>())
      const exist = children.get(word)
      if (exist) {
        now = exist
      } else {
        now = new Trie(word)
        children.set(word, now)
      }
    }
    now.content = payload
  }
}
