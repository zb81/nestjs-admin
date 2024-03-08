export function removeEmptyChildren<T extends { children?: T[] }>(tree: T[]) {
  tree.forEach((item) => {
    if (item.children && item.children.length)
      removeEmptyChildren(item.children)
    else
      delete item.children
  })
}

export function buildTreeFromList<T extends Treeable>(list: T[]): WithChildren<T>[] {
  let ret: (T & { children?: T[] })[] = [...list]

  const idsToRemove: (number | string)[] = []

  ret.forEach((item) => {
    const children = ret.filter(p => p.parentId === item.id)
    if (children.length) {
      item.children = children
      children.forEach(c => idsToRemove.push(c.id))
      ret = ret.filter(p => !idsToRemove.includes(p.id))
    }
  })

  return ret
}
