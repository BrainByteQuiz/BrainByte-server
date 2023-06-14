import { ApiResponse } from "./types";

export const errorResponse = (message: string): ApiResponse<{}> => {
    return {
        status: "failure",
        data: {},
        error: message,
    };
};
