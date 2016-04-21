export default function(file) {
    var fileCopy = file.toLowerCase();
    if (!fileCopy.name.match(/\.(jpg|jpeg|png|gif)$/))
        return false;
    return true;
}