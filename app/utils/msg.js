class Msg {
    static SUCCESS = 200;
    static INTERNALERROR = 500
    static BADREQUEST = 400
  
    /**
     * @param {number} [status=] -
     * @param {string} message -
     * @param {object} [data={}] - 
     * @returns {object}
     */

    static success(status = Msg.SUCCESS, message = "Success", data = {}) {
        data['status'] = status
        data['message'] = message

        return {status,data};
    }

    static internal_error(status = Msg.INTERNALERROR, message = "Internal Error", data = {}) {
        data['status'] = status
        data['message'] = message

        return {status,data};
    }

    static bad_request(status = Msg.BADREQUEST, message = "Bad Request", data = {}) {
        data['status'] = status
        data['message'] = message

        return {status,data};
    }
}

  
  module.exports = Msg;
  