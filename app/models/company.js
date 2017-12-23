function Company (opts) {
    if(!opts) opts = {};
    this.name = opts.name || '';    
  }
  
  module.exports = Company;

