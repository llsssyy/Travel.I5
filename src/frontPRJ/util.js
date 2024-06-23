export const getDateTime = () => {
    console.log('getDateTime CALLED!!');

    let now = new Date();    
    let month = now.getMonth()+1;
    let date = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    return `${month}/${date} ${hours}:${minutes}`;
}