const { createHash } = require('crypto');

const hashString = (string) =>{
  return createHash('sha256').update(string).digest('hex');
}

exports.hashString = hashString;