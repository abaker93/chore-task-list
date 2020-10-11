const setDate = setInterval(function() {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let indicator = 'AM';

    if (hour > 12) {
        hour = hour - 12;
        indicator = 'PM';
    }

    if (hour < 10) { hour = '0' + hour; }

    if (minute < 10) { minute = '0' + minute; }

    if (second < 10) { second = '0' + second; }

    document.getElementById('today').innerText = `${month} ${day}, ${year} ${hour}:${minute}:${second} ${indicator}`;
}, 1000);

export { setDate };