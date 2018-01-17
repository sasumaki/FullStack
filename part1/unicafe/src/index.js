import React from 'react'
import ReactDOM from 'react-dom'


const Title = (props) => {
    return (
        <div>
            <h1>{props.label}</h1>
        </div>
    )
}
const Statistics = (props) => {
    if (props.state.good > 0 || props.state.neutral > 0 || props.state.bad > 0) {
        return (
            <div>
                <table>
                    <tbody>

                        <Statistic name="Good" amount={props.state.good} />
                        <Statistic name="Neutral" amount={props.state.neutral} />
                        <Statistic name="Bad" amount={props.state.bad} />
                        <Statistic name="Average" amount={props.state.average} />
                        <Statistic name="Positives" amount={props.state.positives * 100 + " %"} />
                    </tbody>

                </table>
            </div>
        )
    } else {
        return (
            <div>
                <p>No feedback yet</p>
            </div>
        )
    }


}
const Statistic = (props) => {
    return (

        <tr>
            <td>{props.name}: {props.amount}</td>
        </tr>


    )
}

const Button = ({ state, text, func }) => {
    return (
        <button onClick={func(state, text)}>{text}</button>
    )
}




class App extends React.Component {
    // const-määrittelyt
    constructor(props) {
        super(props)


        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
            average: 0,
            positives: 0
        }

    }
    positives = () => {
        let divisor = (this.state.good + this.state.bad + this.state.neutral)
        if (divisor === 0) {
            divisor = 1
        }
        this.setState({ positives: this.state.good / divisor })
    }
    average = () => {
        let divisor = (this.state.good + this.state.bad + this.state.neutral)
        if (divisor === 0) {
            divisor = 1
        }
        let avg = ((this.state.good * 1) + (this.state.bad * -1)) / divisor

        this.setState({
            average: avg
        })
        this.positives()
    }
    click = (stateToIncrement, text) =>
        () => {
            if (text === "good") {
                this.setState({ good: stateToIncrement + 1 }, this.average)
            }
            else if (text === "neutral") {
                this.setState({ neutral: stateToIncrement + 1 }, this.average)

            } else {
                this.setState({ bad: stateToIncrement + 1 }, this.average)
            }
        }

    render() {
        return (
            <div>
                <Title label="Give feedback" />
                <Button state={this.state.good} text={"good"} func={this.click} />
                <Button state={this.state.neutral} text={"neutral"} func={this.click} />
                <Button state={this.state.bad} text={"bad"} func={this.click} />
                <Title label="Statistics" />
                <Statistics state={this.state} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)