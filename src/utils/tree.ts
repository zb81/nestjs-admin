export function shakeTree<T extends { children?: T[] }>(tree: T[]) {
  tree.forEach((item) => {
    if (item.children && item.children.length)
      shakeTree(item.children)
    else
      delete item.children
  })
}
