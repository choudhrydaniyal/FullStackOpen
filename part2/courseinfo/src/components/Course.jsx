const Header = ({ course }) => <h2>{course.name}</h2>;

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ course }) => {
  return (
    <b>
      total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
      exercices
    </b>
  );
};

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course}></Header>
          <Content course={course}></Content>
          <Total course={course}></Total>
        </div>
      ))}
    </>
  );
};

export default Course;
