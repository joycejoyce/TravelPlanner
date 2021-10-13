export function getParentPath(path) {
    const parts = path.split("/");
    parts.pop();
    const parentPath = parts.join("/");
    return parentPath;
}

export function getImgPath(filename) {
    return `/img/${filename}`;
}