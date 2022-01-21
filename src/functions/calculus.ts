import { APIGatewayProxyEvent } from "aws-lambda";
import { CustomError } from "../error/custom-error";
import { jsonResponse } from "../utils/response-helper";
import { validateQuery } from "./query-validator";

export const calculus = async (event: APIGatewayProxyEvent) => {

    try {
        if (validateQuery(event)) {
            return jsonResponse(400, "query cannot be null or empty.");
        }
    } catch (error) {
        const statusCode = error instanceof CustomError ? error.statusCode : 500;
        const message = error instanceof CustomError ? error.message : error as string;
        return jsonResponse(statusCode, message);
    }
}