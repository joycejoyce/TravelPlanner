export function getDateStr(dateObj) {
    dateObj = new Date(dateObj);
    const dateStr = [(dateObj.getMonth() + 1), dateObj.getDate()].join("/");
    return dateStr;
}