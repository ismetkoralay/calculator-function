import { APIGatewayProxyEvent } from "aws-lambda"

const validateQuery = (event: APIGatewayProxyEvent): boolean => {
    return event?.queryStringParameters === null || event.queryStringParameters === undefined ||
        event.queryStringParameters.query === null || event.queryStringParameters.query === undefined ||
        event.queryStringParameters.query.length === 0;
}

export { validateQuery };