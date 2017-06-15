const initAction = {
  type: '@@INIT'
}

export const createStore = reducer => {
  
  const notifyListeners = () => {
    listeners.forEach(listener => listener())
  }

  let state = reducer(undefined, initAction)
  let listeners = new Set()

  const getState = () => state

  const dispatch = action => {
    state = reducer(state, action)
    notifyListeners()
  }

  const subscribe = listener => {
    listeners.add(listener)
    return () => {
      listeners = listeners.delete(listener)
    }
  }

  return { getState, dispatch, subscribe }
}
