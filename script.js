// 移动端检测
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
            window.innerWidth <= 768;
}

// 控制移动端提示显示
function toggleMobileNotice() {
    if (isMobileDevice()) {
    } else {
        document.getElementById('mobile-notice').innerHTML = '';
    }
}

// 页面加载时执行移动端检测
document.addEventListener('DOMContentLoaded', function() {
    toggleMobileNotice();
    
    // 监听窗口大小变化，适应响应式设计
    window.addEventListener('resize', toggleMobileNotice);
});
// 软件数据
const softwareData = [
    {
        id: 1,
        name: "9o0d 鼠标连点器",
        description: "简单易用的鼠标自动点击工具，支持自定义点击频率和位置",
        version: "5.0.0.0",
        category: "system",
        icon: "fas fa-mouse-pointer",
        downloadUrl: "https://www.9o0d.top/9o0dMC/9o0dMC.exe",
        isNew: true,
        isPopular: true
    },
    {
        id: 2,
        name: "9o0d 鼠标连点器·轻",
        description: "9o0d 鼠标连点器的极致精简优化版本，占用空间不到7KB，仅保留了基础功能",
        version: "0.0.0.0",
        category: "system",
        icon: "fas fa-mouse-pointer",
        downloadUrl: "https://www.9o0d.top/9o0dMC/l.exe",
        isNew: false,
        isPopular: false
    },
    {
        id: 3,
        name: "99dd 鼠标连点器",
        description: "9o0d 鼠标连点器的分支版本，更加易于使用（下载需跳转到站外）",
        version: "1.0.0.0",
        category: "system",
        icon: "fas fa-mouse-pointer",
        downloadUrl: "https://lestore.lenovo.com/detail/L119005",
        isNew: false,
        isPopular: false
    },
    {
        id: 4,
        name: "9o0d 图片格式转换器",
        description: "支持多种图片格式的快速转换（下载需跳转到站外）",
        version: "1.0.0.0",
        category: "design",
        icon: "fas fa-image",
        downloadUrl: "https://lestore.lenovo.com/detail/L106769",
        isNew: false,
        isPopular: true
    },
    {
        id: 5,
        name: "9o0d 截图精灵",
        description: "功能强大的屏幕截图工具，支持区域截图和编辑功能（下载需跳转到站外）",
        version: "4.3.0.0",
        category: "design",
        icon: "fas fa-camera",
        downloadUrl: "https://lestore.lenovo.com/detail/L106048",
        isNew: false,
        isPopular: false
    },
    {
        id: 6,
        name: "9o0d 取色器",
        description: "精准的颜色拾取工具，可快捷取色（下载需跳转到站外）",
        version: "1145.1.4",
        category: "design",
        icon: "fas fa-eye-dropper",
        downloadUrl: "https://lestore.lenovo.com/detail/L109138",
        isNew: false,
        isPopular: false
    },
    {
        id: 7,
        name: "9o0d 视频格式转换器",
        description: "高效的多格式视频转换工具，支持批量处理（下载需跳转到站外）",
        version: "1.0.0.0",
        category: "media",
        icon: "fas fa-video",
        downloadUrl: "https://lestore.lenovo.com/detail/L120720",
        isNew: true,
        isPopular: true
    },
    {
        id: 8,
        name: "9o0d Wallpaper",
        description: "一款动态壁纸软件，可将mp4文件设为桌面壁纸（下载需跳转到站外）",
        version: "1.0.0.0",
        category: "others",
        icon: "fas fa-video",
        downloadUrl: "https://lestore.lenovo.com/detail/L117695",
        isNew: false,
        isPopular: false
    },
    {
        id: 9,
        name: "9o0d To Do",
        description: "简单的待办事项管理工具，帮助你组织和完成任务（下载需跳转到站外）",
        version: "1.0.0.0",
        category: "others",
        icon: "fas fa-list",
        downloadUrl: "https://lestore.lenovo.com/detail/L120855",
        isNew: true,
        isPopular: false
    }
];

// DOM 元素
const nav = document.querySelector('.glass-nav');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.querySelector('.menu-toggle');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryTabs = document.querySelectorAll('.category-tab');
const softwareGrid = document.getElementById('softwareGrid');
const popularGrid = document.getElementById('popularGrid');
const newGrid = document.getElementById('newGrid');

// 当前选中的分类
let currentCategory = 'all';

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载动画
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    // 初始化软件网格
    renderSoftwareGrid();
    renderPopularGrid();
    renderNewGrid();

    // 立即触发软件卡片动画
    setTimeout(() => {
        animateSoftwareCards();
    }, 300);

    // 初始化事件监听器
    initEventListeners();

    // 初始化滚动监听
    initScrollEffects();
});

// 初始化事件监听器
function initEventListeners() {
    // 导航菜单切换
    menuToggle.addEventListener('click', toggleMobileMenu);

    // 导航链接点击
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            setActiveNavLink(this);
        });
    });

    // 分类标签点击
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            setActiveCategoryTab(this, category);
            filterSoftwareByCategory(category);
        });
    });

    // 搜索功能
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // 窗口大小变化监听
    window.addEventListener('resize', handleResize);
}

// 初始化滚动效果
function initScrollEffects() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // 滚动动画
        animateOnScroll();
    });

    // 鼠标跟随效果
    document.addEventListener('mousemove', function(e) {
        const buttons = document.querySelectorAll('.win10-btn');
        buttons.forEach(button => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// 切换移动端菜单
function toggleMobileMenu() {
    const navLinksContainer = document.querySelector('.nav-links');
    navLinksContainer.classList.toggle('active');
    menuToggle.classList.toggle('menu-active');
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 设置活动导航链接
function setActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// 设置活动分类标签
function setActiveCategoryTab(activeTab, category) {
    categoryTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
    currentCategory = category;
}

// 根据分类筛选软件
function filterSoftwareByCategory(category) {
    const filteredSoftware = category === 'all' 
        ? softwareData 
        : softwareData.filter(software => software.category === category);
    
    renderSoftwareGrid(filteredSoftware);
    
    // 筛选后立即触发新卡片的动画
    setTimeout(() => {
        animateSoftwareCards();
    }, 50);
}

// 处理搜索
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        const filteredSoftware = softwareData.filter(software => 
            software.name.toLowerCase().includes(searchTerm) ||
            software.description.toLowerCase().includes(searchTerm)
        );
        renderSoftwareGrid(filteredSoftware);
        
        // 搜索后立即触发新卡片的动画
        setTimeout(() => {
            animateSoftwareCards();
        }, 50);
        
        // 滚动到软件区域
        scrollToSection('categories');
    } else {
        renderSoftwareGrid();
        
        // 清空搜索后也触发动画
        setTimeout(() => {
            animateSoftwareCards();
        }, 50);
    }
}

// 渲染软件网格
function renderSoftwareGrid(softwareList = softwareData) {
    softwareGrid.innerHTML = '';
    
    softwareList.forEach(software => {
        const softwareCard = createSoftwareCard(software);
        softwareGrid.appendChild(softwareCard);
    });
}

// 渲染热门软件网格
function renderPopularGrid() {
    const popularSoftware = softwareData.filter(software => software.isPopular);
    
    popularSoftware.forEach(software => {
        const softwareCard = createSoftwareCard(software);
        popularGrid.appendChild(softwareCard);
    });
}

// 渲染最新软件网格
function renderNewGrid() {
    const newSoftware = softwareData.filter(software => software.isNew);
    
    newSoftware.forEach(software => {
        const softwareCard = createSoftwareCard(software);
        newGrid.appendChild(softwareCard);
    });
}

// 创建软件卡片
function createSoftwareCard(software) {
    const card = document.createElement('div');
    card.className = 'software-card';
    card.innerHTML = `
        <div class="card-icon">
            <i class="${software.icon}"></i>
        </div>
        <div class="card-content">
            <h3 class="card-title">${software.name}</h3>
            <p class="card-description">${software.description}</p>
            <div class="card-meta">
                <span class="card-version">版本: ${software.version}</span>
                <span class="card-category">${getCategoryName(software.category)}</span>
            </div>
        </div>
        <div class="card-actions">
            <a href="${software.downloadUrl}" class="win10-btn primary download-btn" target="_blank">
                <i class="fas fa-download"></i>
                <span>下载</span>
            </a>
        </div>
    `;
    
    return card;
}

// 获取分类名称
function getCategoryName(category) {
    const categoryNames = {
        'system': '系统工具',
        'design': '设计工具',
        'media': '媒体工具',
        'others': '其他工具'
    };
    return categoryNames[category] || category;
}

// 滚动动画
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// 立即触发软件卡片动画
function animateSoftwareCards() {
    const softwareCards = document.querySelectorAll('.software-card');
    
    // 先移除所有卡片的动画类，确保可以重新触发
    softwareCards.forEach(card => {
        card.classList.remove('animated');
    });
    
    // 短暂延迟后重新触发动画
    setTimeout(() => {
        softwareCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 30); // 更短的延迟，30ms
        });
    }, 10);
}

// 窗口大小变化处理
function handleResize() {
    // 如果窗口宽度大于768px，确保移动菜单关闭
    if (window.innerWidth > 768) {
        const navLinksContainer = document.querySelector('.nav-links');
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('menu-active');
    }
}

// 添加软件卡片样式
const style = document.createElement('style');
style.textContent = `
    .software-card {
        background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(240, 248, 255, 0.8) 100%
        );
        backdrop-filter: blur(20px) saturate(180%);
        border-radius: 20px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .software-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        border-color: rgba(255, 255, 255, 0.6);
    }

    .card-icon {
        text-align: center;
    }

    .card-icon i {
        font-size: 3rem;
        background: linear-gradient(135deg, #0078d4 0%, #00b7c3 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: drop-shadow(0 4px 8px rgba(0, 120, 212, 0.2));
    }

    .card-content {
        flex: 1;
    }

    .card-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 0.8rem;
        line-height: 1.3;
    }

    .card-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1rem;
        font-size: 1rem;
    }

    .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        color: #999;
    }

    .card-version {
        background: rgba(0, 120, 212, 0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        color: #0078d4;
        font-weight: 500;
    }

    .card-category {
        background: rgba(102, 102, 102, 0.1);
        padding: 0.3rem 0.8rem;
        border-radius: 12px;
        color: #666;
        font-weight: 500;
    }

    .card-actions {
        text-align: center;
    }

    .download-btn {
        width: 100%;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .software-card {
            padding: 1.5rem;
            gap: 1rem;
        }

        .card-title {
            font-size: 1.2rem;
        }

        .card-description {
            font-size: 0.95rem;
        }

        .card-meta {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
        }
    }
`;

document.head.appendChild(style);