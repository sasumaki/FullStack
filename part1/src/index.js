import React from 'react'
import ReactDOM from 'react-dom'


const Title = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name={props.course.parts[0].name} amount={props.course.parts[0].exercises} />
      <Part name={props.course.parts[1].name} amount={props.course.parts[1].exercises} />
      <Part name={props.course.parts[2].name} amount={props.course.parts[2].exercises} />
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
  const sum = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <div>
      <p>yhteensä {sum} tehtävää </p>
    </div>
  )
}
const App = () => {
  // const-määrittelyt
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }
  return (
    <div>
      <Title course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)