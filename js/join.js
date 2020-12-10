const BASE_URL = 'http://sjud325.iptime.org:11080';

// input값이 있을 때 버튼색 바꾸기
function joinPhone() {
    if (
        document.querySelector('input#phone').value !== '' &&
        document.querySelector('input#name').value !== '' &&
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length >= 8
    ) {
        document.querySelector('button#join-btn').removeAttribute('disabled');
    } else {
        document.querySelector('button#join-btn').setAttribute('disabled', true);
    }
}

function joinName() {
    if (
        document.querySelector('input#phone').value !== '' &&
        document.querySelector('input#name').value !== '' &&
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length >= 8
    ) {
        document.querySelector('button#join-btn').removeAttribute('disabled');
    } else {
        document.querySelector('button#join-btn').setAttribute('disabled', true);
    }
}

function joinId() {
    if (
        document.querySelector('input#phone').value !== '' &&
        document.querySelector('input#name').value !== '' &&
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length >= 8
    ) {
        document.querySelector('button#join-btn').removeAttribute('disabled');
    } else {
        document.querySelector('button#join-btn').setAttribute('disabled', true);
    }
}

function joinPassword() {
    if (
        document.querySelector('input#phone').value !== '' &&
        document.querySelector('input#name').value !== '' &&
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length >= 8
    ) {
        document.querySelector('button#join-btn').removeAttribute('disabled');
    } else {
        document.querySelector('button#join-btn').setAttribute('disabled', true);
    }
}

function join() {
    // POST /api/user/sign-up
    // body params { phone: String, name: String, id: String, pw: String }
    const json = {
        phone: document.querySelector('input#phone').value,
        name: document.querySelector('input#name').value,
        id: document.querySelector('input#id').value,
        pw: document.querySelector('input#password').value
    };
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                location.href = '/login.html';
            } else {
                alert("잘못된 형식입니다.");
            }
        }
    });
    xhr.open('POST', `${BASE_URL}/api/user/sign-up`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));
}