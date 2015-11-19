// Parse out options from optimist
function output(opt) {
  return (opt.length > 1 ? '--' : '-') + opt;
}

module.exports = function (argv) {
  return Object.keys(argv).filter(function (key) {
    return key !== '_' && key !== '$0';
  }).map(function (opt) {
    var val = argv[opt];
    if (typeof val === 'boolean' && val) {
      return output(opt);
    } else if(typeof val === 'string' && val){
      return [ output(opt), '=', val].join('');
    }
  }).join(' ');
};
