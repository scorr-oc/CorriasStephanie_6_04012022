const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, '86ab11fe835957fbceb19b92c7c22f5898a7eea3572814e2aa3b712f8f026778083d7011d219f7bdbe621638388fb991fa9a1d8c173ac7a596b122c21c38903c')
    const userId = decodedToken.userId
    req.auth = userId
    if(req.body.userId && req.body.userId !== userId) {
      throw '403: unauthorized request'
    } else {
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête invalide')
    })
  }
}