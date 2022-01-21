import { APIGatewayProxyEvent } from "aws-lambda";

export const calculus = async (event: APIGatewayProxyEvent) => {
  console.log(event.queryStringParameters);
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: "true",
      message: "error response"
    },
    null,
    2),
    isBase64Encoded: false
  };
}