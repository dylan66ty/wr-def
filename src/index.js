const __moduleLoadedObserver = (module, cb) => {
  let load = module.l
  if(load) {
    cb(module)
  } else {
    Object.defineProperty(module, 'l', {
      get(){
        return load
      },
      set(loaded) {
        load = loaded
        if(loaded) {
          cb(module)
        }
      }
    })
  }
}

const __interceptAllModules = (args, cb, moduleIds) => {
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
  
  window.__$modules = modules

  moduleIds.forEach(id => {
    let module = modules[id]
    if(module) {
      __moduleLoadedObserver(module, cb)
    } else {
      Object.defineProperty(module, id, {
        get() {
          return module
        },
        set(newModule) {
          module = newModule
          __moduleLoadedObserver(newModule, cb)
        },
      })
    }
  })
}

const resolve_chunk = (chunk, cb, moduleIds) => {
  const [_id, modules] = chunk
  Object.keys(modules).forEach((moduleId) => {
    const ori = modules[moduleId]
    modules[moduleId] = function (...args) {
      if (!resolve_chunk.__intercept_one && typeof args[2] === 'function') {
        resolve_chunk.__intercept_one = true
        __interceptAllModules(args, cb, moduleIds)
      }
      return ori && ori.apply(this, args)
    }
  })
}

const intercept_push = (initChunks, cb, moduleIds) => {
  const w_push = initChunks.push.bind(initChunks)
  let _push = (...args) => {
    resolve_chunk(args[0], cb, moduleIds)
    return w_push(...args)
  }
  Object.defineProperty(initChunks, 'push', {
    configurable: true,
    get() {
      return _push
    },
    set(newPush) {
      _push = (...args) => {
        resolve_chunk(args[0], cb, moduleIds)
        return newPush(...args)
      }
    } 
  })
}


export const intercept_webpack_modules = (__chunks_key__, cb, moduleIds = []) => {
  if (!__chunks_key__) return

  let ori_chunks = window[__chunks_key__]
  Object.defineProperty(window, __chunks_key__, {
    get() {
      return ori_chunks
    },
    set(newChunks) {
      if (newChunks) {
        intercept_push(newChunks, cb, moduleIds)
      }
      ori_chunks = newChunks
    },
  })
}



