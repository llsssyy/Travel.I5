export const getDateTime = () => {
    console.log('getDateTime CALLED!!');

    let now = new Date();
    let fullYear = now.getFullYear();
    let month = now.getMonth()
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    return `${fullYear}${month}${date}${hours}${minutes}${seconds}`;

}