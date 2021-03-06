import { APIGatewayProxyEvent } from "aws-lambda";
import { CustomError } from "../error/custom-error";
import { calculusService } from "../services/calculus-service";
import { parseService } from "../services/parse-service";
import { jsonErrorResponse, jsonSuccessResponse } from "../utils/response-helper";
import { validateQuery } from "./query-validator";

export const calculus = async (event: APIGatewayProxyEvent) => {

    try {
        if (validateQuery(event)) {
            return jsonErrorResponse(400, "query cannot be null or empty.");
        }

        const query = event.queryStringParameters!.query;

        const tokensArray = parseService.parseString(query!);
        if (tokensArray === null || tokensArray === undefined || !Array.isArray(tokensArray) || tokensArray.length <= 0) {
            return jsonErrorResponse(400, "Invalid query.");
        }

        const postfixArray = calculusService.createPostfixArray(tokensArray);
        if (postfixArray === null || postfixArray === undefined || !Array.isArray(postfixArray) || postfixArray.length <= 0) {
            return jsonErrorResponse(400, "Invalid query.");
        }

        const result = calculusService.evaluatePostfix(postfixArray);
        return jsonSuccessResponse(200, result);
    } catch (error) {
        const statusCode = error instanceof CustomError ? error.statusCode : 500;
        const message = error instanceof CustomError ? error.message : (error as Error).message;
        return jsonErrorResponse(statusCode, message);
    }
}