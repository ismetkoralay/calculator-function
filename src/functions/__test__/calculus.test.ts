import { calculus } from "../calculus";
import { APIGatewayProxyEvent } from "aws-lambda";
import { TokenModel } from "../../models/token-model";
import { parseService } from "../../services/parse-service";
import { calculusService } from "../../services/calculus-service";
import { CustomError } from "../../error/custom-error";

class MockCustomError extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

jest.mock("../../services/parse-service", () => {
    return {
        parseService: {
            parseString: jest.fn().mockImplementation((input: string): TokenModel[] => {
                if (input === "3+5") {
                    return [{
                        type: "number",
                        value: 3
                    }, {
                        type: "operator",
                        value: "+"
                    }, {
                        type: "number",
                        value: 5
                    }];
                } else if (input === " ") {
                    return [];
                } else if (input === "PostFixTest") {
                    return [{
                        type: "operator",
                        value: "("
                    }]
                } else if (input === "internalerror") {
                    throw new Error("Unexpected Error");
                }

                throw new MockCustomError(400, "Invalid query.");
            })

        }
    }
});

jest.mock("../../services/calculus-service", () => {
    return {
        calculusService: {
            createPostfixArray: jest.fn().mockImplementation((input: TokenModel[]): (string | number)[] => {
                if (input.length === 3) {
                    return [3, 5, "+"];
                } else if (input.length === 1) {
                    return [];
                }

                throw new MockCustomError(400, "Invalid query.");
            }),

            evaluatePostfix: jest.fn().mockImplementation((input: (string | number)[]): number => {
                if (input.length === 3) {
                    return 8;
                }

                throw new MockCustomError(400, "Invalid query.");
            })
        }
    }
});

it("calculus handler returns 400 when query is empty", async () => {
    const event: APIGatewayProxyEvent = {
        queryStringParameters: {
        }
    } as any;

    const result = await calculus(event);
    expect(result.statusCode).toEqual(400);
});

it("calculus handler returns 400 when query has invalid query", async () => {
    const event: APIGatewayProxyEvent = {
        queryStringParameters: {
            query: " "
        }
    } as any;

    let result = await calculus(event);
    expect(result.statusCode).toEqual(400);

    event.queryStringParameters!.query = "PostFixTest";
    result = await calculus(event);
    expect(result.statusCode).toEqual(400);

    event.queryStringParameters!.query = "dummy%+67";
    result = await calculus(event);
    expect(result.statusCode).toEqual(400);
});

it("calculus handler returns 200 when query is valid", async () => {

    const query = "3+5";
    const event: APIGatewayProxyEvent = {
        queryStringParameters: {
            query
        }
    } as any;

    const result = await calculus(event);
    expect(parseService.parseString).toHaveBeenCalled();
    expect(calculusService.createPostfixArray).toHaveBeenCalled();
    expect(calculusService.evaluatePostfix).toHaveBeenCalled();
    expect(result.statusCode).toEqual(200);
});

it("calculus handler return 500 when internal error happens", async () => {
    const event: APIGatewayProxyEvent = {
        queryStringParameters: {
            query: "internalerror"
        }
    } as any;

    const result = await calculus(event);
    expect(result.statusCode).toEqual(500);
})