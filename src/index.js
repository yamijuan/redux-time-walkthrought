import React from 'react'
import ReactDOM from 'react-dom'

import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import {animationsReducer, startAnimation} from 'redux-time'
import {Animate} from 'redux-time/node/animations'

// 1. Create a redux store, and start the animation runloop with initial state
const store = createStore(combineReducers({animations: animationsReducer}))

const initial_state = {ball: {style: {}}}
const time = startAnimation(store, initial_state)

// 2. Set up our first animation
const move_ball_animation = Animate({
    // move the ball 20px down over 1s
    path: '/ball/style/top',
    start_state: 0,
    end_state: 100,
    duration: 5000,
})

document.onkeypress = (e) => {
    // trigger it when the down arrow is pressed
    if (e.keyCode == 13) {
        console.log("keypress", e.keyCode)
        store.dispatch({type: 'ANIMATE', animation: move_ball_animation})
    }
}

// 3. Create a component to display our state
const BallComponent = ({ball}) =>
    <div id="ball" style={{position: 'absolute', ...ball.style}}></div>

const mapStateToProps = ({animations}) => {
    console.log(animations.state.ball.style)
    return {
        ball: animations.state.ball,
        // optionally deepMerge(yaother_state, animations.state)
    }
}
const Ball = connect(mapStateToProps)(BallComponent)

// 4. Then render it
ReactDOM.render(
    <Provider store={store}>
        <Ball/>
    </Provider>,
    document.getElementById('react')
)