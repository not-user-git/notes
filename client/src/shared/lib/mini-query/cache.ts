import type { TSetFn, TGetFn, TUpdateFn, TDeleteFn } from './types'

export class Cache {
  cache: Map<string, unknown>

  constructor() {
    this.cache = new Map()
  }

  set: TSetFn = (keys, data) => {
    for (const key of keys) this.cache.set(key, data)
  }

  get: TGetFn  = (keys) => {
    
  }


  update: TUpdateFn = (keys, data) => {
    for (const key of keys) {
      if (this.cache.has(key)) {
        this.cache.set(key, data)
      }
    }
  }
  delete: TDeleteFn = (keys) => {
    for (const key of keys) {
      if (this.cache.has(key)) this.cache.delete(key)
    }
  }
}
