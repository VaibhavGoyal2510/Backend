class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data=data
        this.message=message
        this.success = statusCode<400; // if statusCode 400 se kam hai matlab success hai boss
    }
}

export {ApiResponse}