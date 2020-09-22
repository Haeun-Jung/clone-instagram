const BASE_URL = 'http://sjud325.iptime.org:11080';

let page = 1;
let isLoading = false;

// 이 페이지가 열렸을 때
window.onload = function () {
    const xhrPopular = new XMLHttpRequest();
    xhrPopular.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const res = JSON.parse(this.response);
            console.log(res);
            if (this.status >= 200 && this.status < 300) {
                // no error (200~299)
                showPopularImage(res);
            } else {
                // yes error (400~599)
                alert(`${this.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    };
    // query로 보낼 때는 ? 형태로 주소에 추가
    // path로 보낼 때는 / 붙인 후 주소에 추가
    xhrPopular.open('GET', `${BASE_URL}/api/post/popular`);
    // 서버로 보내는 데이터의 형태가 json 형태라고 알려줌
    xhrPopular.setRequestHeader('Content-Type', 'application/json');
    // body로 담아 보낼 때는 send() 안에 JSON을 문자열로 변환하여 넣기
    xhrPopular.send();

    handleScrollDown();

    // recognize scroll to bottom event
    const contents = document.querySelector('div.content');
    contents.addEventListener('scroll', function (e) {
        if (contents.scrollHeight === contents.scrollTop + contents.clientHeight) {
            console.log('bottom hit!!!');
            handleScrollDown();
        }
    });
};

function handleScrollDown() {
    if (isLoading) {
        return;
    }
    isLoading = true;
    const xhrRecent = new XMLHttpRequest();
    xhrRecent.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const res = JSON.parse(this.response);
            console.log(res);
            if (this.status >= 200 && this.status < 300) {
                // no error (200~299)
                showRecentImage(res);
            } else {
                // yes error (400~599)
                alert(`${this.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    };
    // query로 보낼 때는 ? 형태로 주소에 추가
    // path로 보낼 때는 / 붙인 후 주소에 추가
    xhrRecent.open('GET', `${BASE_URL}/api/post/recent?page=${page}`);
    // 서버로 보내는 데이터의 형태가 json 형태라고 알려줌
    xhrRecent.setRequestHeader('Content-Type', 'application/json');
    // body로 담아 보낼 때는 send() 안에 JSON을 문자열로 변환하여 넣기
    xhrRecent.send();
}

// 인기 게시물 보여주기
function showPopularImage(res) {
    const wrapper = document.querySelector('div#popular');
    let html = '';
    for (let i = 0; i < res.length; i++) {
        const id = res[i].id;
        const url = res[i].url;
        const likes = res[i].number.likes;
        const comments = res[i].number.comments;
        html += `<div class="image-container" onclick="goToPost(this, ${id})" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        html += `<div class="numbers">`;
        html += `<div class="wrapper">`;
        html += `<img />`;
        html += `<span>${likes}</span>`;
        html += `</div>`; // end of wrapper
        html += `<div class="wrapper">`;
        html += `<img />`;
        html += `<span>${comments}</span>`;
        html += `</div>`; // end of wrapper
        html += `</div>`; // end of numbers
        html += `<img class="post" src="${BASE_URL}${url}" />`;
        html += `</div>`; // end of image-container
    }
    wrapper.innerHTML += html;
}

// 최신 게시물 보여주기
function showRecentImage(res) {
    page = res.next;
    const wrapper = document.querySelector('div#recent');
    let html = '';
    for (let i = 0; i < res.results.length; i++) {
        const id = res.results[i].id;
        const url = res.results[i].url;
        const likes = res.results[i].number.likes;
        const comments = res.results[i].number.comments;
        html += `<div class="image-container" onclick="goToPost(this, ${id})" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        html += `<div class="numbers">`;
        html += `<div class="wrapper">`;
        html += `<img />`;
        html += `<span>${likes}</span>`;
        html += `</div>`; // end of wrapper
        html += `<div class="wrapper">`;
        html += `<img />`;
        html += `<span>${comments}</span>`;
        html += `</div>`; // end of wrapper
        html += `</div>`; // end of numbers
        html += `<img class="post" src="${BASE_URL}${url}" />`;
        html += `</div>`; // end of image-container
    }
    wrapper.innerHTML += html;
    isLoading = false;
}

// 사진 눌렀을 때 포스트 보이기
function goToPost(target, id) {
    console.log(id);
    const url = target.querySelector('img.post').getAttribute('src');
    console.log(url);
    document.querySelector('img#post-main').setAttribute('src', url);
    document.querySelector('div.modal-post').style.display = 'flex';
}

// 마우스 hover했을 때 좋아요랑 댓글 보이기
function showLikeComment(target) {
    target.querySelector('div.numbers').style.display = 'flex';
}

// 마우스 out했을 때 좋아요랑 댓글 숨기기
function hideLikeComment(target) {
    target.querySelector('div.numbers').style.display = 'none';
}

// 포스트 부분에서 다른부분을 눌렀을 시에 포스트 화면 가리기
document.querySelector('div.modal-post').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.modal-post').style.display = 'none';
});

// post에서 X부분 눌러야 나가짐
document.querySelector('svg.post-close').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.modal-post').style.display = 'none';
});

// 스토리 보기
function goToStory() {
    document.querySelector('div.modal-story').style.display = 'flex';
}

// 스토리에서 X부분 눌러야 나가짐
document.querySelector('svg.story-close').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.modal-story').style.display = 'none';
    document.querySelector('div.hashtag>img').style.borderColor = '#e8e8e8';
});

// 스토리에 신고버튼
function storyReport() {
    document.querySelector('div.story-report').style.display = 'flex';
}

// 스토리에 신고버튼 부분에서 다른부분을 눌렀을 시에 화면 가리기
document.querySelector('div.story-report').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.story-report').style.display = 'none';
});

// 팔로우버튼
function follow() {
    const btn = document.querySelector('button.follow');
    btn.innerText = btn.innerText === '팔로우' ? '팔로잉' : '팔로우';
    // btn.classList.add('active');
    // btn.classList.remove('active');
    btn.classList.toggle('active');
}

// 포스트 메뉴 열기 함수
function postMenu() {
    document.querySelector('div.post-menu').style.display = 'flex';
}

// 포스트 메뉴, 댓글 신고 취소 함수
function cancel() {
    document.querySelector('div.post-menu').style.display = 'none';
    document.querySelector('div.comment-report').style.display = 'none';
    document.querySelector('div.story-report').style.display = 'none';
}

// 포스트 메뉴 부분에서 다른부분을 눌렀을 시에 메뉴 화면 가리기
document.querySelector('div.post-menu').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.post-menu').style.display = 'none';
});

// 포스트 댓글 focus할 때 신고버튼 보이기
function showReport(target) {
    target.querySelector('button.option').style.display = 'flex';
}

// 포스트 댓글 focus out할 때 신고버튼 안보이기
function hideReport(target) {
    target.querySelector('button.option').style.display = 'none';
}

// 포스트 댓글에 신고버튼
function commentReport() {
    document.querySelector('div.comment-report').style.display = 'flex';
}

// 포스트 댓글에 신고버튼 부분에서 다른부분을 눌렀을 시에 화면 가리기
document.querySelector('div.comment-report').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.comment-report').style.display = 'none';
});

//post에서 사진클릭시 좋아요 적용
function dblClickLike() {
    document.querySelector('div.heart-wrapper').style.display = 'flex';
    document.querySelector('svg.like-no').style.display = 'none';
    document.querySelector('svg.like-yes').style.display = 'flex';
    setTimeout(function () {
        document.querySelector('div.heart-wrapper').style.display = 'none';
    }, 1500);
}

function searchCancel() {
    document.querySelector('input.search').value = '';
}

function searchFocus() {
    document.querySelector('img.search-icon').style.left = '10px';
    document.querySelector('a.search-cancel').style.display = 'flex';
}

function searchFocusOut() {
    const search = document.querySelector('input.search');
    document.querySelector('img.search-icon').style.left = '68px';
    document.querySelector('a.search-cancel').style.display = 'none';
    search.style.textAlign = 'center';
    search.style.textSize = '8px';
    search.style.color = '#d4d4d4';
    search.style.marginLeft = '3px';
}

// post 댓글 좋아요 적용
const hearts = document.querySelectorAll('svg.heart');
for (let heart of hearts) {
    heart.addEventListener('click', function (e) {
        this.classList.toggle('active');
    });
}

// post 댓글버튼 누르면 textarea에 초점
document.querySelector('button.comment').addEventListener('click', function (e) {
    document.querySelector('div.comment-wrapper > textarea').focus();
});

//  post 좋아요 버튼
document.querySelector('svg.like-no').addEventListener('click', function (e) {
    document.querySelector('svg.like-no').style.display = 'none';
    document.querySelector('svg.like-yes').style.display = 'flex';
});

// post 좋아요취소 버튼
document.querySelector('svg.like-yes').addEventListener('click', function (e) {
    document.querySelector('svg.like-yes').style.display = 'none';
    document.querySelector('svg.like-no').style.display = 'flex';
});

// post 저장 버튼
document.querySelector('svg.save-no').addEventListener('click', function (e) {
    document.querySelector('svg.save-no').style.display = 'none';
    document.querySelector('svg.save-yes').style.display = 'flex';
});

// post 저장취소 버튼
document.querySelector('svg.save-yes').addEventListener('click', function (e) {
    document.querySelector('svg.save-yes').style.display = 'none';
    document.querySelector('svg.save-no').style.display = 'flex';
});

// post direct 팝업
function direct() {
    document.querySelector('div.modal-direct').style.display = 'flex';
}

// post direct 팝업 취소버튼
function cancel() {
    document.querySelector('div.modal-direct').style.display = 'none';
}

// // post direct 팝업에서 다른부분을 눌렀을 시에 팝업 가리기
document.querySelector('div.modal-direct').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    document.querySelector('div.modal-direct').style.display = 'none';
});
