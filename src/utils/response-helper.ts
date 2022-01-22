const jsonErrorResponse = (statusCode: number, message: string): { statusCode: number, body: string, isBase64Encoded: boolean } => {
    return {
        statusCode,
        body: JSON.stringify({
            message
        }, null, 2),
        isBase64Encoded: false
    };
};

const jsonSuccessResponse = (statusCode: number, result: number): { statusCode: number, body: string, isBase64Encoded: boolean } => {
    return {
        statusCode,
        body: JSON.stringify({
            result
        }, null, 2),
        isBase64Encoded: false
    };
};


export { jsonErrorResponse, jsonSuccessResponse };