// 이 페이지가 열렸을 때
window.onload = function () {
    includeModal();
    getMyImages();
};

function getMyImages() {
    // GET /api/post/mine
    // query params { }
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('getting my images is DONE!!!');
            const res = JSON.parse(xhr.response);
            console.log(res);
            if (xhr.status >= 200 && xhr.status < 300) {
                // no error (200~299)
                showMyImage(res.results);
                // 마지막 post id값 넘겨주기
                maximumId = res.total;
            } else {
                // yes error (400~599)
                alert(`${xhr.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    });
    // query로 보낼 때는 ? 형태로 주소에 추가
    // path로 보낼 때는 / 붙인 후 주소에 추가
    xhr.open('GET', `${BASE_URL}/post/mine`);
    // 서버로 보내는 데이터의 형태가 json 형태라고 알려줌
    xhr.setRequestHeader('Content-Type', 'application/json');
    // body로 담아 보낼 때는 send() 안에 JSON을 문자열로 변환하여 넣기
    xhr.send();
}

// 나의 게시물 보여주기
function showMyImage(res) {
    const wrapper = document.querySelector('div.posts');
    let html = '';
    for (let i = 0; i < res.length; i++) {
        const id = res[i].id;
        const url = res[i].url.thumb;
        const likes = res[i].number.likes;
        const comments = res[i].number.comments;
        html += `<div class="image-container" onclick="goToPost(this, ${id})" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        html += `<div class="numbers">`;
        html += `<div class="wrapper">`;
        html += `<div class="likes-icon"></div>`;
        html += `<span>${likes}</span>`;
        html += `</div>`; // end of wrapper
        html += `<div class="wrapper">`;
        html += `<div class="comments-icon"></div>`;
        html += `<span>${comments}</span>`;
        html += `</div>`; // end of wrapper
        html += `</div>`; // end of numbers
        html += `<img class="post" src="${BASE_URL}${url}" />`;
        html += `</div>`; // end of image-container
    }
    wrapper.innerHTML += html;
}

// 프로필 setting
document.querySelector('div.preference').addEventListener('click', function (e) {
    document.querySelector('div.setting').style.display = 'flex';
});

// 프로필 setting 부분에서 다른부분을 눌렀을 시에 setting 화면 가리기
document.querySelector('div.setting').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.setting').style.display = 'none';
});

// 미니프로필 누르면 수정창 뜨게하기
document.querySelector('div.profile > img').addEventListener('click', function (e) {
    const edit = document.querySelector('div.profile-edit');
    edit.style.display = edit.style.display === 'none' ? 'flex' : 'none';
});

// 미니프로필 팝업에서 다른부분을 눌렀을 시에 팝업 가리기
document.querySelector('div.profile-edit').addEventListener('click', function (e) {
    const bg = this.querySelector('div.bg');
    if (e.target === bg) {
        this.style.display = 'none';
    }
});

function handleBtnPostsClick() {
    document.getElementById('btn-posts').classList.add('active');
    document.getElementById('btn-igtv').classList.remove('active');
    document.getElementById('btn-saved').classList.remove('active');
    document.getElementById('btn-tagged').classList.remove('active');
    document.querySelector('div.posts').style.display = 'grid';
    document.querySelector('div.igtv').style.display = 'none';
    document.querySelector('div.saved').style.display = 'none';
    document.querySelector('div.tagged').style.display = 'none';
}

function handleBtnIgtvClick() {
    document.getElementById('btn-posts').classList.remove('active');
    document.getElementById('btn-igtv').classList.add('active');
    document.getElementById('btn-saved').classList.remove('active');
    document.getElementById('btn-tagged').classList.remove('active');
    document.querySelector('div.posts').style.display = 'none';
    document.querySelector('div.igtv').style.display = 'flex';
    document.querySelector('div.saved').style.display = 'none';
    document.querySelector('div.tagged').style.display = 'none';
}

function handleBtnSavedClick() {
    document.getElementById('btn-posts').classList.remove('active');
    document.getElementById('btn-igtv').classList.remove('active');
    document.getElementById('btn-saved').classList.add('active');
    document.getElementById('btn-tagged').classList.remove('active');
    document.querySelector('div.posts').style.display = 'none';
    document.querySelector('div.igtv').style.display = 'none';
    document.querySelector('div.saved').style.display = 'flex';
    document.querySelector('div.tagged').style.display = 'none';
}

function handleBtnTaggedClick() {
    document.getElementById('btn-posts').classList.remove('active');
    document.getElementById('btn-igtv').classList.remove('active');
    document.getElementById('btn-saved').classList.remove('active');
    document.getElementById('btn-tagged').classList.add('active');
    document.querySelector('div.posts').style.display = 'none';
    document.querySelector('div.igtv').style.display = 'none';
    document.querySelector('div.saved').style.display = 'none';
    document.querySelector('div.tagged').style.display = 'flex';
}

// 하트 누르면 활동창 뜨게하기
document.querySelector('a.white-heart').addEventListener('click', function (e) {
    const xPos = e.target.getBoundingClientRect().x - 426;
    document.querySelector('a.white-heart').style.display = 'none';
    document.querySelector('a.black-heart').style.display = 'flex';
    document.querySelector('div.profile').style.borderColor = 'transparent';
    document.querySelector('div.post-activity').style.left = xPos + 'px';
    document.querySelector('div.post-activity').style.display = 'flex';
});

// 활동창 팝업에서 다른부분을 눌렀을 시에 팝업 가리기
document.querySelector('div.post-activity').addEventListener('click', function (e) {
    const bg = this.querySelector('div.bg');
    if (e.target === bg) {
        document.querySelector('a.black-heart').style.display = 'none';
        document.querySelector('a.white-heart').style.display = 'flex';
        document.querySelector('div.profile').style.borderColor = 'rgba(var(--i1d, 38, 38, 38), 1)';
        this.style.display = 'none';
    }
});
