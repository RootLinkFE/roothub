const launch = require('launch-editor');
const path = require('path');

module.exports = {
    launchEditor: (req, res, next) => {
        const { file } = req.query;
        launch(
            file,
            // try specific editor bin first (optional)
            'code',
            // callback if failed to launch (optional)
            (fileName, errorMsg) => {
                console.error(errorMsg);
                next(new Error('打开编辑器失败'));
            }
        );
        res.status(200).send({
            success: true,
            data: '成功'
        })
    }
}
