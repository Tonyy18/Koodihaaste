
//Returns the absolute path to the root directory
//Easier to get its path from submodules
let path = __dirname.split("/");
let os = "linux"
if(path.length < 2) {
    path = __dirname.split("\\");
    os = "windows"
}
path.pop()
if(os == "windows") {
    path = path.join("\\")
} else {
    path = path.join("/")
}
module.exports = path