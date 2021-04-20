const pinyin = require('pinyin')
import { ROOT } from './cx_tree'
import { Trie } from "../types/Trie";


function getPinyin(text: string): string[] {
  const py_raw = <string[][]>pinyin(text, { style: pinyin.STYLE_NORMAL })
  return py_raw.reduce((pre, cur) => {
    pre.push(cur[0])
    return pre
  }, [])
}

export function abstract(text: string): string {
  const pys = getPinyin(text),
    chs = Array.from(text)

  const s: Trie[] = [],
    result: string[] = []

  let now_trie = ROOT

  function flushStatus(ch: string) {
    while (s.length) {
      const peek = s.pop()
      const v = peek.content
      if (v) {
        s.length = 0
        now_trie = ROOT
        result.push(v)
        return
      } else {
        chs.unshift(peek.val)
      }
    }

    result.push(ch)
  }

  while (chs.length) {
    const py = pys.shift(),
      ch = chs.shift()

    const childrenMap = now_trie.children
    if (childrenMap) {
      const children = childrenMap.get(py)

      if (children) {
        now_trie = children
        s.push(now_trie)
        continue
      }
    }

    flushStatus(ch)
  }

  return result.join("")
}
