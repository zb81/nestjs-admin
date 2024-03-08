type EntityKey = string | number

type WithChildren<T> = T & { children?: T[] }

interface Treeable {
  id: EntityKey
  parentId?: EntityKey
}
