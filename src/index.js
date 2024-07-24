const __interceptAllModules = (args, cb) => {
  const e = args[2]
  let modules = {}
  Object.defineProperty(Object.prototype, '___dylan66ty___', {
    configurable: true,
    enumerable: true,
    get() {
      modules = this
      return ''
    }
  })
  try {
    e('___dylan66ty___')
  } catch (error) {
  }
  delete Object.prototype.___dylan66ty___
  cb(modules, e)
}

const resolve_chunk = (chunk, cb) => {
  const [_id, modules] = chunk
  Object.keys(modules).forEach((moduleId) => {
    const ori = modules[moduleId]
    modules[moduleId] = function (...args) {
      if (!resolve_chunk.__intercept_one && typeof args[2] === 'function') {
        resolve_chunk.__intercept_one = true
        __interceptAllModules(args, cb)
      }
      return ori && ori.apply(this, args)
    }
  })
}

const ready = (initChunks, cb) => {
  const _push = initChunks.push
  function Wrap(...args) {
    resolve_chunk(args[0], cb)
    return _push.apply(initChunks, args)
  }
  Object.defineProperty(initChunks, 'push', {
    get() {
      return Wrap
    },
    set(v) {
      Wrap = v
    }
  })
}

export const visitor = (visitor, defineIds = []) => {
  let toString = Object.prototype.toString
  const isFunction = (value) => toString.call(value) === '[object Function]'
  const isObject = (value) => toString.call(value) === '[object Object]'
  const isModule = (value) => toString.call(value) === '[object Module]'
  const isElement = (value) => value && value instanceof Element

  const expose = (exports) => {
    if (!exports) return
    if (isModule(exports)) {
      visitor.module && visitor.module(exports)
      return
    }
    if (isElement(exports)) {
      visitor.element && visitor.element(exports)
      return
    }
    if (isObject(exports)) {
      Object.entries(exports).forEach(([key, value]) => {
        if (isFunction(value)) {
          visitor.function && visitor.function(key, value, exports)
          return
        }
        if (isObject(value)) {
          visitor.object && visitor.object(key, value)
          return
        }
      })
    }
  }

  return (modules, load) => {
    setTimeout(() => {
      Object.keys(modules).forEach(id => {
        const exports = modules[id]?.exports
        exports && expose(exports)
      })
      if(Array.isArray(defineIds)) {
        defineIds.forEach(id => {
          let val =  modules[id]
          Object.defineProperty(modules, id, {
            get(){
              return val
            },
            set(newVal) {
              val = newVal
              setTimeout(() => {
                expose(newVal)
              }, 0);
            }
          })
        })
      }
    }, 0);
  }
}


export const intercept_webpack_modules = (__chunks_key__, cb) => {
  if (!__chunks_key__) return
  let ori_chunks = window[__chunks_key__]
  Object.defineProperty(window, __chunks_key__, {
    get() {
      return ori_chunks
    },
    set(newChunks) {
      if (
        newChunks &&
        newChunks.length === 1 &&
        Object.prototype.hasOwnProperty.bind(newChunks, 'push')
      ) {
        ready(newChunks, cb)
      }
      ori_chunks = newChunks
    },
  })
}




