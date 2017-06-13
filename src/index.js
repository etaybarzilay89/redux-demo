import { createStore } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'

const INC = 'inc'

const increase = () => ({ type: INC })

const defaultState = { count: 0 }

const selectCount = state => state.count

const reducer = (state = defaultState, action) => 
  action.type === INC ? { count: state.count + 1 } : state  

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Increase = ({onIncrease}) => 
  <button onClick={onIncrease}>Increase</button>

const Display = ({count}) => 
  <div>{ count }</div>

const mapDispatchToIncreaseProps = dispatch => ({
  onIncrease: () => dispatch(increase())
})

const mapStateToDisplayProps = state => ({
  count: selectCount(state)
})

const SmartIncrease = connect(null, mapDispatchToIncreaseProps)(Increase)
const SmartDisplay = connect(mapStateToDisplayProps)(Display)

const App = () => 
  <div>
    <SmartIncrease/>
    <SmartDisplay/>
  </div>

const updateUI = () => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>, 
    document.getElementById('root')
  )
}

store.subscribe(updateUI)

updateUI()