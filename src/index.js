import { createStore } from 'redux'
import React from 'react'
import { render } from 'react-dom'

const INC = 'inc'

const increase = () => ({ type: INC })

const defaultState = { count: 0 }

const reducer = (state = defaultState, action) => 
  action.type === INC ? { count: state.count + 1 } : state  

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// *****   NEW   ***** //
const Increase = ({onIncrease}) => 
  <button onClick={onIncrease}>Increase</button>

const Display = ({count}) => 
  <div>{ count }</div>

const App = ({count, onIncrease}) => 
  <div>
    <Increase onIncrease={onIncrease}/>
    <Display count={count}/>
  </div>

const updateUI = () => {
  render(
    <App 
      count={store.getState().count} 
      onIncrease={
        () => store.dispatch(increase())
      }
    />,
    document.getElementById('root')
  )
}

store.subscribe(updateUI)

updateUI()