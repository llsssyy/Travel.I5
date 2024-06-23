

export const getDateTime = () => {

    let now = new Date();
    let fullYear = now.getFullYear();
    let month = now.getMonth()+1;
    if (month < 10) {
        month = '0' + month
    }
    let date = now.getDate();
    if (date < 10) {
        date = '0' + date
    }
    let hours = now.getHours();
    if (hours < 10) {
        hours = '0' + hours
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    let seconds = now.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    return (`${fullYear}/${month}/${date} ${hours}:${minutes}:${seconds}`)
}