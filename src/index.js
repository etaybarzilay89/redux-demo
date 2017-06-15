import { createStore } from 'redux'
import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
/*****   NEW   *****/
import { pure } from 'recompose'
import { map, toPairs } from 'lodash/fp'

const INC = 'inc'
const SOME_ACTION = 'some-action'

/*****   NEW   *****/
const increase = counterName => ({ type: INC, counterName })
const someAction = () => ({type: SOME_ACTION})

/*****   NEW   *****/
const selectCounters = state => map(([name, count]) => ({name, count}), toPairs(state.counts))

/*****   NEW   *****/
const defaultState = {
  someState: 0,
  counts: {a: 0, b: 0, c: 0} 
}

/*****   NEW   *****/
const reducer = (state = defaultState, action) => {
  switch(action.type){
    case INC: 
      return {...state, counts: {...state.counts, [action.counterName]: state.counts[action.counterName] + 1}}
    case SOME_ACTION:
      return {...state, someState: state.someState + 1 }
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Increase = ({onIncrease}) => 
  <button onClick={onIncrease}>Increase</button>

const Display = pure(({count}) => 
  <div>{ count }</div>
)

/*****   NEW   *****/
const Counters = pure(({counts, onIncrease}) => {
  console.log('Rendering Counters')
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
})

/*****   NEW   *****/
const mapStateToProps = state => ({
  counts: selectCounters(state)
})

const mapDispatchToProps = dispatch => ({
  onIncrease: (counterName) => dispatch(increase(counterName))
})

/*****   NEW   *****/
const SmartCounters = connect(mapStateToProps, mapDispatchToProps)(Counters)

/*****   NEW   *****/
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