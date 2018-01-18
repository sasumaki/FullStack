import React from "react";

const Course = props => {
  return (
    <div>
      <Title name={props.name} />
      <Content course={props} />
      <Total parts={props.parts} />
    </div>
  );
};
const Title = props => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => (
        <Part key={part.id} name={part.name} amount={part.exercises} />
      ))}
    </div>
  );
};

const Part = props => {
  return (
    <div>
      <p>
        {props.name}, {props.amount}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  console.log(parts);
  let exercises = parts.map(part => part.exercises);
  const reducer = (accumulator, currVal) => accumulator + currVal;
  let sum = exercises.reduce(reducer);
  return (
    <div>
      <p>yhteensä {sum} tehtävää </p>
    </div>
  );
};

export default Course;
