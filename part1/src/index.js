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
  console.log(props)
  return (
    <div>
      <Part name={props.parts[0].name} amount={props.parts[0].exercises} />
      <Part name={props.parts[1].name} amount={props.parts[1].exercises} />
      <Part name={props.parts[2].name} amount={props.parts[2].exercises} />
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
      <p>yhteensä {props.total[0].exercises+props.total[1].exercises+props.total[2].exercises} tehtävää </p>
    </div>
  )
}
const App = () => {
  // const-määrittelyt
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]
  return (
    <div>
      <Title course={course} />
      <Content parts={parts} />
      <Total total={parts} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)