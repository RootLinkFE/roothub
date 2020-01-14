class Res {
    constructor(code) {
        this.code = code;
    }
    success(data) {
        return {
            code: this.code,
            success: true,
            data: data
        }
    }
}

module.exports = Res;