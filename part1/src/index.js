import React from 'react'
import ReactDOM from 'react-dom'


const Title = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  return (
    <div>
      <Part name = {props.part1} amount = {props.exercises1} />
      <Part name = {props.part2} amount = {props.exercises2} />
      <Part name = {props.part3} amount = {props.exercises3} />
    </div>
  ) 
}
const Part = (props) => {
  return (
    <div>
      <p>{props.name}, {props.amount}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>yhteensä {props.total} tehtävää </p>
    </div>
  ) 
}
const App = () => {
  // const-määrittelyt
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Title course={course} />
      <Content part1 = {part1} part2 ={part2} part3 = {part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total  total = {exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)