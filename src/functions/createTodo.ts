import { v4 as uuidV4 } from "uuid";

import { document } from "../utils/dynamodbClient";

interface ICreateTodo {
  title: string;
  deadline: string;
}

interface ITemplate {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

export const handle = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

  const id = uuidV4();

  const todo: ITemplate = {
    id,
    user_id,
    title,
    done: false,
    deadline: new Date(deadline).toUTCString()
  }

  await document.put({
    TableName: "todos",
    Item: todo
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created successfully!",
      todo,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}