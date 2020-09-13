// 페이지 새로고침
function refreshPage() {
    window.location.reload();
}

const BASE_URL = 'http://sjud325.iptime.org:11080';

// 이 페이지가 열렸을 때
window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            const res = JSON.parse(this.response);
            console.log(res);
            if (this.status >= 200 && this.status < 300) {
                // no error (200~299)
            } else {
                // yes error (400~599)
                alert(`${this.status} 오류가 발생했습니다. 관리자에게 문의해주세요.`);
            }
        }
    };
    xhr.open('POST', `${BASE_URL}/api/user/sign-in`); // query로 보낼 때는 ? 형태로 주소에 추가
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id: 'a', pw: 'b' })); // body로 담아 보낼 때는 send() 안에 넣기

    // showImage();
    // const contents = document.querySelector('div.content');
    // // scroll event
    // // contents.onscroll = function (e) {}
    // contents.addEventListener('scroll', function (e) {
    //     if (contents.scrollHeight === contents.scrollTop + contents.clientHeight) {
    //         console.log('bottom hit!!!');
    //         showImage();
    //     }
    // });
};

let currentImage = '';

// 게시글을 보여주기 위한 배열
const example = [
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku0.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku1.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku2.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku3.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku4.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku5.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku6.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku7.jpg',
        },
    },
    {
        likes: 500,
        comments: 23,
        image: {
            url: 'ppukku8.jpg',
        },
    },
];

// 게시글들 보여주기
function showImage() {
    console.log('showImage() invoked.');

    const wrapper = document.querySelector('div.posts');
    console.log(wrapper);

    /*
    원래의 경우 API 통신을 해서 JSON을 받아오고,
    JSON을 통해 이미지를 띄움.
    */

    // const: 변하지 않는 상수 선언
    // let: 변할 수 있는 변수 선언
    let contents = '';
    for (let i = 0; i < example.length; i++) {
        // contents += '<image src="toeicSpeaking.jpg" />';
        const likes = example[i].likes;
        const comments = example[i].comments;
        const url = example[i].image.url;
        contents += `<div class="image-container" onclick="goToPost(this)" onmouseover="showLikeComment(this)" onmouseout="hideLikeComment(this)">`;
        contents += `<div class="numbers">`;
        contents += `<div class="wrapper">`;
        contents += `<img />`;
        contents += `<span>${likes}</span>`;
        contents += `</div>`; // end of wrapper
        contents += `<div class="wrapper">`;
        contents += `<img />`;
        contents += `<span>${comments}</span>`;
        contents += `</div>`; // end of wrapper
        contents += `</div>`; // end of numbers
        contents += `<img class="post" src="img/${url}" />`;
        contents += `</div>`; // end of image-container
    }
    wrapper.innerHTML += contents;
    // wrapper.innerHTML += contents;
}

// 사진 눌렀을 때 포스트 보이기
function goToPost(target) {
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
document.querySelector('span.post-close').addEventListener('click', function (e) {
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
document.querySelector('span.story-close').addEventListener('click', function (e) {
    if (e.target !== this) {
        return; // 현재 함수 빠져나가기
    }
    console.log(e.target);
    document.querySelector('div.modal-story').style.display = 'none';
    document.querySelector('div.hashtag>img').style.borderColor = '#e8e8e8';
});

/*
document.getElementById('url[i]').onclick = function () {
    location.href = 'post.html';
};
*/

function follow() {
    var count = 1;

    if (count == 1) {
        document.querySelector('button.follow').textContent = '팔로잉';
        document.querySelector('button.follow').style.color = '#262626';
        document.querySelector('button.follow').style.backgroundColor = '#fafafa';
        document.querySelector('button.follow').style.borderColor = '#e6e6e6';
        count == 0;
    } else {
        document.querySelector('button.follow').textContent = '팔로우';
        document.querySelector('button.follow').style.color = '#ffffff';
        document.querySelector('button.follow').style.backgroundColor = 'rgba(var(--d69, 0, 149, 246), 1)';
        ('#fafafa');
        document.querySelector('button.follow').style.borderColor = 'transparent';
        count == 1;
    }
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
    target.querySelector('a.option').style.display = 'flex';
}

// 포스트 댓글 focus out할 때 신고버튼 안보이기
function hideReport(target) {
    target.querySelector('a.option').style.display = 'none';
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
