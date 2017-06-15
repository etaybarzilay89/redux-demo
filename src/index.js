import { createStore } from './redux'

const INC = 'inc'

const increase = () => ({ type: INC })

const defaultState = { count: 0 }

const reducer = (state = defaultState, action) => 
  action.type === INC ? { count: state.count + 1 } : state  

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const button = document.createElement('button')
const display = document.createElement('div')

document.body.appendChild(button)
button.innerText = 'Increment'

document.body.appendChild(display)

const updateUI = () => {
  display.innerText = store.getState().count  
}
store.subscribe(updateUI)

button.addEventListener('click', () => {
  store.dispatch(increase())
})

updateUI()