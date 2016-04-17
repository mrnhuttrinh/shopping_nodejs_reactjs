export default function(file) {
    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/))
        return false;
    return true;
}