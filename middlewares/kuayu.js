module.exports = function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  // 
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-Access-Token');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Content-Type', 'application/json;charset=utf-8');

  next();
}