export default function(file) {
    var fileCopy = file.name.toLowerCase();
    if (!fileCopy.match(/\.(jpg|jpeg|png|gif)$/))
        return false;
    return true;
}