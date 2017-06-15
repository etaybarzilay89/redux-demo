const initAction = {
  type: '@@INIT'
}

export const createStore = reducer => {

  let state = reducer(undefined, initAction)
  let listeners = []

  const notifyListeners = () => {
    listeners.forEach(listener => listener())
  }

  const getState = () => state

  const dispatch = action => {
    state = reducer(state, action)
    notifyListeners()
  }

  const subscribe = listener => {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  return { getState, dispatch, subscribe }
}
