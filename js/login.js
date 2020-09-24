// input값이 있을 때 버튼색 바꾸기
if (document.querySelector('input#id').value !== '' && document.querySelector('input#password').value !== '') {
    document.querySelector('button#login-btn').style.backgroundColor = '#2e9afe';
}
