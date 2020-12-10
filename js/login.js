const BASE_URL = 'http://sjud325.iptime.org:11080';

// input값이 있을 때 버튼색 바꾸기
function loginId() {
    if (
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length >= 8
    ) {
        document.querySelector('button#login-btn').removeAttribute('disabled');
    } else {
        document.querySelector('button#login-btn').setAttribute('disabled', true);
    }
}

function loginPassword() {
    if (
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length >= 8
    ) {
        document.querySelector('button#login-btn').removeAttribute('disabled');
    } else {
        document.querySelector('button#login-btn').setAttribute('disabled', true);
    }
}

function login() {
    // POST /api/user/sign-in
    // body params { id: String, pw: String }
    const json = {
        id: document.querySelector('input#id').value,
        pw: document.querySelector('input#password').value
    };
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                location.href = '/profile.html';
            } else {
                alert("잘못된 이메일 또는 비밀번호입니다.");
            }
        }
    });
    xhr.open('POST', `${BASE_URL}/api/user/sign-in`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));
}