// input값이 있을 때 버튼색 바꾸기
function loginId() {
    if (
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length > 5
    ) {
        document.querySelector('button#login-btn').style.backgroundColor = '#2e9afe';
    } else {
        document.querySelector('button#login-btn').style.backgroundColor = '#b3dffc';
    }
}

function loginPassword() {
    if (
        document.querySelector('input#id').value !== '' &&
        document.querySelector('input#password').value !== '' &&
        document.querySelector('input#password').value.length > 5
    ) {
        document.querySelector('button#login-btn').style.backgroundColor = '#2e9afe';
    } else {
        document.querySelector('button#login-btn').style.backgroundColor = '#b3dffc';
    }
}
