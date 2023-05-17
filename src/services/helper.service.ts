import { GlobalError } from "../lib/types";

export class HelperService {
  public static formatError(err: GlobalError) {
    return {
      confirmation: "Fail",
      statusCode: err.statusCode || 500,
      name: err.name,
      message: err.message,
    };
  }

  public formatResponse(results: any) {
    return {
      confirmation: "Success",
      results,
    };
  }
}

export default new HelperService();
