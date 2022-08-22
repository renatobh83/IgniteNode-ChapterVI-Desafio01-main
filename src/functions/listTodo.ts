import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.scan({
    TableName: 'todos',
    FilterExpression: ':user_id = user_id',
    ExpressionAttributeValues: {
        ':user_id': user_id,
    },
  }).promise();

  const todos = response.Items;

  console.log(todos);

  if (!todos.length) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "No todos found for this user",
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Success",
      todo: todos,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}