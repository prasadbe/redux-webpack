import { createStore, combineReducers } from 'redux';
import { increment, doubleIncrement } from './reducers/index';
var reducer = combineReducers({ increment, doubleIncrement });
console.log(reducer);
const store = createStore(reducer);
console.log(store.getState());
const render = () => {
    console.log(store.getState().increment.id);
    document.getElementById('content1').innerHTML = store.getState().increment.id;
    document.getElementById('content2').innerHTML = store.getState().doubleIncrement.id;
}
document.getElementById('content1').addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
    setTimeout(() => {
        render();
    }, 1000);

});
render();