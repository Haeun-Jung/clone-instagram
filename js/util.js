function includeModal(callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const body = document.querySelector('body');
            body.innerHTML += this.responseText;
            callback();
        }
    };
    xhr.open('GET', '/modal.txt');
    xhr.send();
}
