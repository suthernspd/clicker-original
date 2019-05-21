import React from 'react';
import Header from './Header';
import Buttons from './Buttons';
import OptionModal from './OptionModal';

export default class Clicker extends React.Component {
    state = {
        count: 0,
        countInc: 1,
        countIncInc: 0.1,
        countTime: 1,
        incCost: 10,
        bonus: 1,
        calcBonus: 1,
        resets: 0,
        resetPls: false
    };
    componentDidMount = () => {
        const countTime = 1;
        let gain = 0;
        const stringThen = localStorage.getItem('time');
        const then = parseInt(stringThen,10);
        if (!isNaN(then)) {
            const now = new Date();
            const diff = now.getTime() - then;
            gain = countTime*(diff/1000);
            console.log(`Offline Gain was ${gain}`);
        }
        const stringCount = localStorage.getItem('count');
        let count = parseInt(stringCount,10);
        if (!isNaN(count)) {
            count += gain;
            this.setState(() => ({ count }))
        }
        const stringCountInc = localStorage.getItem('countInc');
        const countInc = parseInt(stringCountInc,10);
        if (!isNaN(countInc)) {
            this.setState(() => ({ countInc }))
        }
        const stringBonus = localStorage.getItem('bonus');
        const bonus = parseInt(stringBonus,10);
        if (!isNaN(bonus)) {
            this.setState(() => ({ bonus }))
        }
        const stringResets = localStorage.getItem('resets');
        const resets = parseInt(stringResets,10);
        if (!isNaN(resets)) {
            this.setState(() => ({ resets }))
        }
    }
    componentDidUpdate = (prevProps, prevState) => {
        const now = new Date();
        if (prevState.count !== this.state.count) {
            localStorage.setItem('count', this.state.count);
        }
        if (prevState.countInc !== this.state.countInc) {
            localStorage.setItem('countInc', this.state.countInc);
        }
        if (prevState.bonus !== this.state.bonus) {
            localStorage.setItem('bonus', this.state.bonus);
        }
        if (prevState.resets !== this.state.resets) {
            localStorage.setItem('resets', this.state.resets);
        }
        localStorage.setItem('time', now.getTime());
    }
    handleAddOne = () => {
        this.setState((prevState) => {
            const count = prevState.count + this.state.countInc;
            return {
                count: count,
                calcBonus: (prevState.bonus + (count / 10000)).round(3)
            };
        });
    }
    handleMinusOne = () => {
        this.setState((prevState) => {
            const count = prevState.count - this.state.incCost;
            return {
                count: count,
                countInc: prevState.countInc + this.state.countIncInc,
                incCost: (prevState.incCost + ((3*(prevState.incCost-1))/100)),
                calcBonus: (prevState.bonus + (count / 10000)).round(3)
            };
        });
    }
    handleReset = () => {
        this.setState((prevState) => ({
            count: 0,
            countInc: 1 * this.state.calcBonus,
            countIncInc: 0.1 * this.state.calcBonus,
            incCost: 10, bonus: this.state.calcBonus,
            calcBonus: this.state.calcBonus,
            resets: prevState.resets++,
            resetPls: false}));
    }
    wantToReset = () => {
        this.setState(() => ({resetPls: true}));
    }
    dontReset = () => {
        this.setState(() => ({resetPls: false}));
    }
    render() {
        const title = 'W3 Clicker';
        const subtitle = 'Work work';
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <h1 className="bonus">Current Bonus: {(this.state.bonus.round(2)*100).round(1)}%, Resets: {this.state.resets}</h1>
                    <h1 className="count">Count: {this.state.count.round(2)}</h1>
                    <Buttons 
                    count = {this.state.count.round(2)}
                    countInc = {(this.state.countInc).round(2)}
                    countIncInc = {(this.state.countIncInc).round(2)}
                    incCost = {this.state.incCost.round(2)}
                    calcBonus = {((this.state.calcBonus-this.state.bonus)*100).round(1)}
                    handleAddOne={this.handleAddOne}
                    handleMinusOne={this.handleMinusOne}
                    wantToReset={this.wantToReset}/>
                </div>
                <OptionModal 
                count = {this.state.count.round(2)}
                calcBonus = {((this.state.calcBonus-this.state.bonus)*100).round(1)}
                resetPls = {this.state.resetPls}
                handleReset={this.handleReset}
                dontReset={this.dontReset}/>
            </div>
        );
    }
}

Number.prototype.round = function(decimals) {
    return Number((Math.round(this + "e" + decimals)  + "e-" + decimals));
}