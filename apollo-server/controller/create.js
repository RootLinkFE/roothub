const service =  require('../services/create');

module.exports = {
  list: async(req, res) => {
    const { path }  = req.query;
    try {
      const result = await service.list(path)
      res.send(result)
    } catch (err) {
      res.send(err)
    }
  }
}