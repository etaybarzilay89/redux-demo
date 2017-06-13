import { createStore, applyMiddleware } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { pure } from 'recompose'
import { createSelector } from 'reselect'
import { map, toPairs, delay } from 'lodash/fp'
import thunk from 'redux-thunk'

const remoteCounter = count => new Promise(resolve => {
  delay(1000, () => {
    resolve(count + 1)
  })
})

const SET = 'set'
const SOME_ACTION = 'some-action'

const set = (counterName, counterValue) => ({ type: SET, counterName, counterValue })
const someAction = () => ({type: SOME_ACTION})

const increase = counterName => (dispatch, getState) => {
  const currentCount = getState().counts[counterName]
  remoteCounter(currentCount).then(newCount => {
    dispatch(set(counterName, newCount))
  })
}

const selectCounts = state => state.counts
const selectCounters = createSelector(
  selectCounts,
  counts => map(([name, count]) => ({name, count}), toPairs(counts))
)

const defaultState = {
  someState: 0,
  counts: {a: 0, b: 0, c: 0} 
}

const reducer = (state = defaultState, action) => {
  switch(action.type){
    case SET: 
      return {...state, counts: {...state.counts, [action.counterName]: action.counterValue}}
    case SOME_ACTION:
      return {...state, someState: state.someState + 1 }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk))

const Increase = ({onIncrease}) => 
  <button onClick={onIncrease}>Increase</button>

const Display = pure(({count}) => 
  <div>{ count }</div>
)

const Counters = pure(({counts, onIncrease}) => {
  return <div>
    {
      map(({name, count}) => {
        return <div key={name}>
          <Increase onIncrease={() => onIncrease(name)}/>
          <Display count={count}/>
        </div>
      }, 
      counts)
    }
  </div>
}
)

const mapStateToProps = state => ({
  counts: selectCounters(state)
})

const mapDispatchToProps = dispatch => ({
  onIncrease: (counterName) => dispatch(increase(counterName))
})

const SmartCounters = connect(mapStateToProps, mapDispatchToProps)(Counters)

const App = () => 
  <div>
    <button onClick={() => store.dispatch(someAction())}>Some Action</button>
    <SmartCounters/>
  </div>


render(
  <Provider store={store}>
    <App/>
  </Provider>, 
  document.getElementById('root')
)