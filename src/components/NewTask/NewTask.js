import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    // const createTask = (taskData) => {
    //   const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // };
    sendTaskRequest(
      {
        url: "https://custom-hooks-17bc6-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
      //the first argument that we passes to bind is the this keyword that is not matter to here, so we can put it null
      //but the second argument that we pass to the bind is the first arguement to the calling function
      // and the argument that the applyData(data) function is giving inside use-http.js file to this createTask() method above here will be pass to as the third argument to this
    );
    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     "https://custom-hooks-17bc6-default-rtdb.firebaseio.com/tasks.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Request failed!");
    //   }

    //   const data = await response.json();

    //   // const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   // const createdTask = { id: generatedId, text: taskText };

    //   // props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || "Something went wrong!");
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
