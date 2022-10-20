
//Returns the absolute path to the root directory
//Easier to get its path from submodules
let path = __dirname.split("/");
path.pop()
path = path.join("/")
module.exports = path