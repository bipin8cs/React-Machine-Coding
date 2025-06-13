import { useReducer } from 'react';


const initialState = {
  count: 0
}
const UseReducer = () => {

  const reducerFunction = (state, action) => {
    console.log(state, action)
    switch (action.type) {
      case 'INCREMENT':
        return {
          count: state.count + 1
        }
      case 'DECREMENT':
        return {
          count: state.count - 1
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return <>
    <div>Count: {state.count}</div>
    <button onClick={() => {
      dispatch({ type: 'DECREMENT', payload: 'Decrement clicked' });
    }}>Decrement</button>
    <button onClick={() => {
      dispatch({ type: 'INCREMENT', payload: 'Increment clicked' });
    }}>Increment</button>
  </>

}
export default UseReducer;



