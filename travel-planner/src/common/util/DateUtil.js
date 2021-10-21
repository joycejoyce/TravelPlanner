export function getDateStr(dateObj) {
    dateObj = new Date(dateObj);
    const dateStr = [dateObj.getFullYear(), (dateObj.getMonth() + 1), dateObj.getDate()].join("/");
    return dateStr;
}