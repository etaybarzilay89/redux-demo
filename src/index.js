import { createStore, combineReducers } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'

const INC = 'inc'

const increase = counterName => ({ type: INC, counterName })

const selectCount = counterName => state => state[counterName]

const countReducer = counterName => (count = 0, action) => 
  action.type === INC && counterName === action.counterName ? count + 1 : count

const reducer = combineReducers({
  count1: countReducer('count1'),
  count2: countReducer('count2'),
  count3: countReducer('count3')
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Increase = ({onIncrease}) => 
  <button onClick={onIncrease}>Increase</button>

const Display = ({count}) => 
  <div>{ count }</div>

const Counter = ({count, onIncrease}) => 
  <div>
    <Increase onIncrease={onIncrease}/>
    <Display count={count}/>
  </div>

const mapStateToProps = counterName => state => ({
  count: selectCount(counterName)(state)
})

const mapDispatchToProps = counterName => dispatch => ({
  onIncrease: () => dispatch(increase(counterName))
})

const SmartCounter1 = connect(mapStateToProps('count1'), mapDispatchToProps('count1'))(Counter)
const SmartCounter2 = connect(mapStateToProps('count2'), mapDispatchToProps('count2'))(Counter)
const SmartCounter3 = connect(mapStateToProps('count3'), mapDispatchToProps('count3'))(Counter)

const Sum = connect(state => ({
  count: selectCount('count1')(state) + selectCount('count2')(state)
}))(Display)

const App = () => 
  <div>
    <SmartCounter1/>
    <SmartCounter2/>
    <SmartCounter3/>
    <Sum/>
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