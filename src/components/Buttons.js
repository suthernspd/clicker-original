import React from 'react';

const Buttons = (props) => (
        <div>
            <button className="big-button" onClick={props.handleAddOne}>+{props.countInc} Click{props.count > 1 ? 's' : ''}</button>
            <button className="big-button" onClick={props.handleMinusOne} disabled={props.count < props.incCost}>+{props.countIncInc} Per Click, Cost: {props.incCost}</button>
            <button className="big-button" onClick={props.wantToReset}>Reset, Potential Bonus: {props.calcBonus}%</button>
        </div>
    );

export default Buttons;