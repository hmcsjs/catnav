// 主页js
// 1Headers模块
// 1.1点击按钮更换背景
let btnImg = document.querySelector('.changeimg')
let header = document.querySelector('.header')
let num = 1
btnImg.addEventListener('click', () => {
    if (num > 0 && num < 3) {
        num += 1
    } else {
        num = 1
    }
    header.style.background = `url(./imgs/0${num}.gif) no-repeat center/cover`;
})

header.addEventListener('click', () => {
    if (num > 0 && num < 3) {
        num += 1
    } else {
        num = 1
    }
    header.style.background = `url(./imgs/0${num}.gif) no-repeat center/cover`;
})

// 浏览器列表模块
let brimg = document.querySelector('.browerimg')
let brlist = document.querySelector('.browerlist')
let timer1, timer2
brimg.addEventListener('mousemove', () => {
    clearTimeout(timer1)
    clearTimeout(timer2)
    brlist.style.display = 'block'
})

brimg.addEventListener('mouseout', () => {
    timer1 = setTimeout(function() {
        brlist.style.display = 'none'
    }, 1000)

})
brlist.addEventListener('mouseout', () => {
    timer2 = setTimeout(function() {
        brlist.style.display = 'none'
    }, 1888)

})
brlist.addEventListener('mousemove', () => {
    clearTimeout(timer2)
    clearTimeout(timer1)
    brlist.style.display = 'block'

})


let imgarr = ['edge', 'baidu', 'google', 'yandex', '360']
brlist.addEventListener('click', (e) => {
    if (e.target.tagName == 'A' && e.target.dataset.id) {
        let imgid = e.target.dataset.id
        brimg.style.background = ''
        brimg.style.background = `url(./imgs/browericon/${imgarr[imgid]}.jpg) no-repeat center/cover`
        localStorage.setItem('brname', imgarr[imgid])

    }

})

// 页面加载事件
window.addEventListener('load', () => {
    let name = localStorage.getItem('brname')
    if (name) {
        brimg.style.background = `url(./imgs/browericon/${name}.jpg) no-repeat center/cover`
        brimg.style.display = `inline-block`

    } else {
        brimg.style.display = `inline-block`
    }
})

//搜索框，输入内容搜索页面
let brobject = {
    edge: 'https://cn.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?tn=15007414_15_dg&ie=utf-8&wd=',
    google: 'https://www.google.com/search?q=',
    yandex: 'https://yandex.com/search/?clid=2324058&text=',
    360: 'https://www.so.com/s?src=lm&ls=sm2054017&lm_extend=ctype:4&q='
}

//跳转函数
function openpage() {
    let openname = localStorage.getItem('brname')
    console.log(brobject.baidu);

    let ourl = openname ? brobject[openname] + sinput.value : brobject.baidu + sinput.value
    window.open(ourl)
}

let sinput = document.querySelector('.search input')
sinput.addEventListener('input', () => {
    document.addEventListener('keydown', e => {
        if (e.code === 'Enter' && document.activeElement === sinput && sinput.value.length > 0) {
            openpage()
        }
    })
})

// 搜索按钮打开模块
let searchbtn = document.querySelector('.searchicon')
searchbtn.addEventListener('click', () => {
        if (sinput.value.length > 0) {
            openpage()
        }
    })
    // 时间和翻译模块
    // 1.时间模块
    // 获取时间函数
function getTime() {
    const date = new Date();

    // 获取年月日
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，需要+1
    const day = date.getDate();

    // 获取时分秒
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 获取星期
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[date.getDay()];

    // 格式化时间
    const dateStr = `${year}年${month}月${day}日`;
    const timeStr = `${hours}:${minutes}:${seconds}`;

    // 更新显示
    document.querySelector('.year').textContent = ' ' + dateStr;
    document.querySelector('.timetext').textContent = ' ' + `${timeStr} ${weekday}`;
}

// 初始调用
getTime();

// 每秒更新一次
setInterval(getTime, 1000);


// 翻译模块
let textarea = document.querySelector('.custom-textarea')
let customText = document.querySelector('.custom-text')

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

textarea.addEventListener('input', debounce(() => {
    if (!textarea.value.trim()) {
        customText.innerText = '';
        return;
    }

    customText.innerText = '翻译中...'

    // 使用 MyMemory Translation API
    const apiUrl = 'https://api.mymemory.translated.net/get';
    const text = textarea.value.trim();
    const langPair = 'en|zh'; // 英文到中文，可以根据需要调整

    fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${langPair}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.responseData && data.responseData.translatedText) {
                customText.innerText = data.responseData.translatedText;
            } else {
                throw new Error('翻译结果格式错误');
            }
        })
        .catch(err => {
            console.error('翻译请求失败:', err);
            customText.innerText = '翻译服务暂时不可用，请稍后再试';
        });
}, 500));

// ... existing code ...


// 翻译复制按钮
// 初始化 Bootstrap popover
$(document).ready(function() {
    $('.copybtn').popover({
        trigger: 'focus', // 触发方式：focus
        placement: 'top', // 显示位置：顶部
        content: '复制成功！' // popover显示的内容
    });
});

// 复制按钮功能
// ... existing code ...
$('.copybtn button').on('click', function() {
    // 使用 text() 获取 div 的内容
    const textToCopy = $('.custom-text').text();

    // 复制到剪贴板
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // 显示popover
            $(this).parent('.copybtn').popover('show');

            // 2秒后自动隐藏
            setTimeout(() => {
                $(this).parent('.copybtn').popover('hide');
            }, 2000);
        })
        .catch(err => {
            console.error('复制失败:', err);
            // 如果剪贴板API失败，使用传统方法
            const tempInput = document.createElement('textarea');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            // 显示popover
            $(this).parent('.copybtn').popover('show');
            setTimeout(() => {
                $(this).parent('.copybtn').popover('hide');
            }, 2000);
        });
});


// 轮播图-ai问答

let swiperWrapper = document.querySelector('.swiper-wrapper');
let swiper = document.querySelector('.swiper');

// 获取随机图片的函数
function getimg() {
    swiperWrapper.innerHTML = ''; // 清空旧幻灯片
    const requests = [];
    for (let i = 0; i < 6; i++) {
        requests.push(
            axios({
                url: 'https://picsum.photos/800/400',
                method: 'get',
            }).then(result => {
                const imageUrl = result.request.responseURL;
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `<img src="${imageUrl}" alt="随机图片加载失败..." title="点击下载按钮可以下载图片">`;
                swiperWrapper.appendChild(slide);
            }).catch(err => {
                console.error('获取图片失败:', err);
            })
        );
    }

    // 等待所有请求完成后初始化 Swiper
    Promise.all(requests).then(() => {
        document.querySelector('.swiper-aipage img').style.display = 'none';
        console.log('所有图片已添加，初始化 Swiper');

        if (myswiper) {
            myswiper.destroy(true, true); // 销毁旧实例，避免重复初始化
        }

        initializeSwiper(); // 初始化 Swiper
        swiper.style.display = 'block'; // 显示 Swiper 容器
    });
}

// 初始化 Swiper
let myswiper;
let currentSlide

function initializeSwiper() {
    myswiper = new Swiper('.swiper', {
        loop: true,
        loopedSlides: 6, // 等于幻灯片数量
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },
        speed: 2000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChange: function() {
                let actualIndex = this.realIndex;

                // 处理 realIndex 超过范围的情况
                if (actualIndex >= 6) {
                    actualIndex = 0; // 重置为 0
                }

                // console.log('当前真实索引 (realIndex):', actualIndex);
                currentSlide = this.slides[actualIndex];
            },
        },
    });

    // 更新 Swiper 以正确识别新添加的幻灯片
    myswiper.update();
}

// DOM 加载完成后调用 getimg
document.addEventListener('DOMContentLoaded', getimg);


// 刷新和下载按钮事件
// 获取下载提示框
let tipbox = document.querySelector('.tipbox')
if (!tipbox) {
    console.log(55555);

}
let tipTimer
    // 异步下载函数asyncLoad
async function asyncLoad(url) {
    try {
        tipbox.innerHTML = '&#10004;获取下载链接中...'
        tipbox.style.color = 'green'
        tipbox.style.display = 'block'
            // 使用 fetch 获取图片的响应
        const response = await fetch(url);
        // 将响应转换为 Blob 对象
        const blob = await response.blob();
        // 创建一个 a 标签
        const a = document.createElement('a');
        // 创建一个指向 Blob 对象的 URL
        const objUrl = URL.createObjectURL(blob);
        // 设置 a 标签的 href 属性为 Blob URL
        a.href = objUrl;
        // 设置下载的文件名
        // 使用正则表达式匹配从 `?` 到结尾的字符串
        let match = url.match(/\?(.+)$/);
        if (match) {
            a.download = match[0]; // 输出: ?hmac=Rh-rPFcZsb1pHw7w2cr1w_QZStBBa13WPpZlvZs6rIg
        } else {
            console.log("没有找到匹配的部分");
        }
        // 将 a 标签添加到文档中
        document.body.appendChild(a);
        // 模拟点击 a 标签
        a.click();
        // 从文档中移除 a 标签
        document.body.removeChild(a);
        // 释放 Blob URL
        URL.revokeObjectURL(url);
        tipbox.innerHTML = '&#10004;下载成功...'
            // 提示框定时器
        tipTimer = setTimeout(() => {
            // 添加 Animate.css 的基础类和具体动画类
            tipbox.classList.add('animate__fadeOutUp');
        }, 3000)
    } catch (error) {
        console.error('下载图片时出错:', error);
    }
}
// 1.刷新按钮事件
let refresh = document.querySelector('.refresh')
refresh.addEventListener('click', () => {
        swiperWrapper.innerHTML = ''
        document.querySelector('.swiper-aipage img').style.display = 'block'
        getimg()
    })
    // 2.下载按钮事件
let loadbtn = document.querySelector('.load')
    // 初始化 Swiper
loadbtn.addEventListener('click', () => {
    tipbox.classList.remove('animate__fadeOutUp');

    if (currentSlide) {
        let childElements = currentSlide.children[0]
        childUrl = childElements.currentSrc
        asyncLoad(childUrl)
    } else {
        tipbox.innerHTML = '&#10008;下载错误...'
        tipbox.style.color = 'red'
        tipbox.style.display = 'block'
            // 提示框定时器
        tipTimer = setTimeout(() => {
            tipbox.classList.add('animate__fadeOutUp');
        }, 3000)
        console.error('swiper获取错误,请检查swiper初始化...')
    }
})

// ai问答toai模块
let listGroup = document.querySelector('.list-group')
let listItems = document.querySelectorAll('.list-group li')
listGroup.addEventListener('mousemove', e => {
        if (e.target.tagName === 'LI') {
            listItems.forEach(item => {
                item.classList.contains('active') && item.classList.remove('active')
                item.children[0].classList.contains('ac') && item.children[0].classList.remove('ac')
            })
            e.target.classList.add('active')
            e.target.children[0].classList.add('ac')
        } else if (e.target.tagName === 'A') {
            listItems.forEach(item => {
                item.classList.contains('active') && item.classList.remove('active')
                item.children[0].classList.contains('ac') && item.children[0].classList.remove('ac')
            })
            e.target.parentNode.classList.add('active')
            e.target.classList.add('ac')
        }
    })
    // 折叠按钮
let foldbtn = document.querySelector('.fold')
let listH = document.querySelector('.list-fold h6')
let aiAnswer = document.querySelector('.ai-answer')
let lists = document.querySelectorAll('.list-group-item')
foldbtn.addEventListener('click', () => {
        if (foldbtn.textContent === '折叠') {
            foldbtn.textContent = '展开'
            listH.style.display = 'none'
            lists.forEach(item => {
                item.style.display = 'none'
            })

            aiAnswer.style.width = '100%'
        } else {
            foldbtn.textContent = '折叠'
            listH.style.display = 'inline-block'
            lists.forEach(item => {
                item.style.display = 'block'
            })
            aiAnswer.style.width = '70%'
        }
    })
    // 智能回复模块
let aiText = document.querySelector('.ai-text')
let inputBtn = document.querySelector('.input-btn')
    // 初始滚动到底部
window.onload = function() {
    aiText.scrollTop = aiText.scrollHeight;
};
// textarea输入内容不显示滚动条,文本框向上延伸
let aiTextarea = document.querySelector('.input-group textarea')
aiTextarea.addEventListener('input', function() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    this.style.transform = `translateY(${77 -this.scrollHeight }px)`; // 让其向上扩展
    inputBtn.style.bottom = `${this.scrollHeight - 71}px`
})

// 智能问答模块，请求函数
let flag = true
    // 重新创建控制器
let controller = new AbortController();
let signal = controller.signal;

function ask() {
    if (aiTextarea.value && flag) {
        flag = false
        inputBtn.innerHTML = `<svg class="icon btn-icon" aria-hidden="true">
                                <use xlink:href="#icon-zanting"></use>
                              </svg>`
            // 1. 创建一个新的 div 元素
        const newDiv = document.createElement('div');
        // 2. 设置元素的属性
        newDiv.className = 'question'; // 设置 class
        // 3. 添加内容
        newDiv.textContent = aiTextarea.value
        aiText.appendChild(newDiv);
        aiText.scrollTop = aiText.scrollHeight;
        aiTextarea.value = ''
        let waitDiv = document.createElement('div')
        waitDiv.className = 'wait'
        waitDiv.innerHTML = '<video autoplay loop src="./tools/toai-icon/光照.mp4" alt="" style="width: 28px; height: 28px; border-radius: 50%;">'
        aiText.appendChild(waitDiv);
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.52vmy.cn/api/chat/yiyan?msg=${aiTextarea.value}`, {
                signal
            })
            .then(response => {
                aiText.removeChild(waitDiv);
                console.log(111, waitDiv);
                // 1. 创建一个新的 div 元素
                const newDiv = document.createElement('div');
                // 2. 设置元素的属性
                newDiv.className = 'answer'; // 设置 class
                // 3. 添加内容
                newDiv.textContent = response.data.data.answer
                aiText.appendChild(newDiv);
                document.querySelector('.input-btn button').style.background = `pink`
                flag = true
            }).catch(error => {
                aiText.removeChild(waitDiv);
                if (axios.isCancel(error)) {
                    // 1. 创建一个新的 div 元素
                    const newDiv = document.createElement('div');
                    // 2. 设置元素的属性
                    newDiv.className = 'answer'; // 设置 class
                    // 3. 添加内容
                    newDiv.textContent = '请求被取消'
                    aiText.appendChild(newDiv);
                } else {
                    // 1. 创建一个新的 div 元素
                    const newDiv = document.createElement('div');
                    // 2. 设置元素的属性
                    newDiv.className = 'answer'; // 设置 class
                    // 3. 添加内容
                    newDiv.textContent = '服务器错误！'
                    aiText.appendChild(newDiv);
                }
                inputBtn.innerHTML = `<svg class="icon btn-icon" aria-hidden="true">
                <use xlink:href="#icon-shangchuan"></use>
              </svg>`
                flag = true
            });
    } else if (!flag) {
        //取消上一次请求
        // 取消之前的请求
        controller.abort();
        flag = true
        inputBtn.innerHTML = `<svg class="icon btn-icon" aria-hidden="true">
        <use xlink:href="#icon-shangchuan"></use>
      </svg>`
        controller = new AbortController(); // 重新创建控制器
        signal = controller.signal;
    }
    // 滚动到底部
    aiText.scrollTop = aiText.scrollHeight;
}
// 点击发送按钮,事件处理
inputBtn.addEventListener('click', () => {
        ask()
    })
    // 键盘按下回车发送请求
document.querySelector('.input-group textarea').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            ask()
        }
        if (e.key === 'Enter' && e.ctrlKey) {
            const currentValue = this.value;
            const caretPosition = this.selectionStart;
            this.value = currentValue.slice(0, caretPosition) + '\n' + currentValue.slice(caretPosition);
            this.selectionStart = this.selectionEnd = caretPosition + 1;
            e.preventDefault();
        }
    })
    // 网页展示栏webnav
    //给a标签添加属性，让新页面在新窗口打开
let links = document.querySelectorAll('.webnav li a')
links.forEach(link => {
        // 添加 target 和 rel 属性
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    })
    // 鼠标经过Li,logo动画
let navUlList = document.querySelectorAll('.webnav ul')
navUlList.forEach(list => {
    list.addEventListener('mousemove', (e) => {
        if (e.target.tagName === 'A') {
            e.target.children[0].classList.add('animate__animated', 'animate__shakeY')
        } else if (e.target.tagName === 'LI') {
            e.target.children[0].children[0].classList.add('animate__animated', 'animate__shakeY')
        } else if (e.target.tagName === 'IMG') {
            e.target.classList.add('animate__animated', 'animate__shakeY')
        } else if (e.target.tagName === 'DIV') {
            e.target.previousElementSibling.classList.add('animate__animated', 'animate__shakeY')
        } else if (e.target.tagName === 'P' || e.target.tagName === 'H4') {
            e.target.parentNode.previousElementSibling.classList.add('animate__animated', 'animate__shakeY')
        }
    })
})
navUlList.forEach(list => {
    list.addEventListener('mouseout', function(e) {
        if (!e.relatedTarget || !this.contains(e.relatedTarget)) {
            if (e.target.tagName === 'A') {
                !e.target.children[0].classList.contains('animate__animated') || e.target.children[0].classList.remove('animate__animated');
                !e.target.children[0].classList.contains('animate__shakeY') || e.target.children[0].classList.remove('animate__shakeY')
            } else if (e.target.tagName === 'LI') {
                !e.target.children[0].children[0].classList.contains('animate__animated') || e.target.children[0].children[0].classList.remove('animate__animated');
                !e.target.children[0].children[0].classList.contains('animate__shakeY') || e.target.children[0].children[0].classList.remove('animate__shakeY')
            } else if (e.target.tagName === 'IMG') {
                !e.target.classList.contains('animate__animated') || e.target.classList.remove('animate__animated');
                !e.target.classList.contains('animate__shakeY') || e.target.classList.remove('animate__shakeY')
            } else if (e.target.tagName === 'DIV') {
                !e.target.previousElementSibling.classList.contains('animate__animated') || e.target.previousElementSibling.classList.remove('animate__animated');
                !e.target.previousElementSibling.classList.contains('animate__shakeY') || e.target.previousElementSibling.classList.remove('animate__shakeY')
            } else if (e.target.tagName === 'P' || e.target.tagName === 'H4') {
                !e.target.parentNode.previousElementSibling.classList.contains('animate__animated') || e.target.parentNode.previousElementSibling.classList.remove('animate__animated');
                !e.target.parentNode.previousElementSibling.classList.contains('animate__shakeY') || e.target.parentNode.previousElementSibling.classList.remove('animate__shakeY')
            }
        }
    })
})

// 判断页面卷去的高度，显示头部导航栏
let navbar = document.querySelector('.navbar')
window.addEventListener('scroll', () => {
    // console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 100) {
        navbar.style.display = 'block'
    } else {
        navbar.style.display = 'none'
    }
})