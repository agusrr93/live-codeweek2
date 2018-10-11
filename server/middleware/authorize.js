const Event = require('../models/event')

module.exports = {
  isMe: (req, res, next) => {
    Event.findById(req.params.id)
      .then(event => {
         console.log(event) 
        if (event.user._id == req.decoded.id) {
          next()
        } else {
          res.status(401).json({error: 'You are not allowed to access this event!'})
        }
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }
}