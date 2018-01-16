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
      <Part name = {props.part1.name} amount = {props.part1.exercises} />
      <Part name = {props.part2.name} amount = {props.part2.exercises} />
      <Part name = {props.part3.name} amount = {props.part3.exercises}/>
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
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }
  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }
  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }
  return (
    <div>
      <Title course={course} />
      <Content part1 = {part1} part2 ={part2} part3 = {part3}/>
      <Total  total = {part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)