const initAction = {
  type: '@@INIT'
}

export const createStore = reducer => {
  
  const notifyListeners = () => {
    listeners.forEach(listener => listener())
  }

  let state 
  let listeners = []

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

  dispatch(initAction)
  return { getState, dispatch, subscribe }
}
