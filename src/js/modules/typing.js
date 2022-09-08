export default function typing(message, el) { 
    setTimeout(() => {
        let i = 0;
        let loop = setInterval(() => {
            document.querySelector(el).innerHTML += message.charAt(i);
            i++;
            if (i >= message.length) {
                clearInterval(loop);
            }
        }, 150);
    }, 1000);
}