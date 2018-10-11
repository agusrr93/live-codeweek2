const crypto = require('crypto');


class Encrypt {
  
  static hashPassword(password, secret) {
    const hashed = crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
    
    return hashed
  }  
  
}

// console.log(Encrypt.hashPassword('123','asdf'))
module.exports = Encrypt