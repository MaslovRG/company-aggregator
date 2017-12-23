function News (opts) {
  if(!opts) opts = {};
  this.title = opts.title || '';
  this.content = opts.content || ''; 
  //this.url = opts.url || ''; 
}

module.exports = News;

