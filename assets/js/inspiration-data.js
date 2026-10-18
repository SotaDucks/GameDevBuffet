/* ==========================================================
   游戏灵感刷刷区 · 内容数据
   以后想增删资源，只需要改这个文件，页面会自动更新。

   每条资源的字段：
     id        唯一标识（英文，不要重复）
     thumbnail 本地缩略图路径（视频封面或频道头像）
     thumbnailFit 'contain' 完整显示频道头像；不填则铺满封面
     title     标题
     orig      原标题（可选，英文标题等）
     desc      一句话介绍
     note      补充说明（可选）
     url       链接
     platform  'youtube' 或 'bilibili'
     type      'channel'（频道）、'video'（视频）或 'playlist'（播放列表）
     hot       true 表示"强烈推荐"（可选）
   ========================================================== */
window.INSPIRATION = {
  groups: [
    {
      id: 'channels',
      no: '01',
      title: '频道订阅',
      hint: '先关注这几个频道，空闲时慢慢刷。',
      items: [
        {
          id: 'gmtk',
          thumbnail: 'assets/images/inspiration/gmtk.jpg', thumbnailFit: 'contain',
          title: "Game Maker's Toolkit",
          orig: 'GMTK',
          desc: '全世界最著名的油管游戏设计频道。',
          url: 'https://www.youtube.com/@GMTK',
          platform: 'youtube', type: 'channel', hot: true
        },
        {
          id: 'extra-credits',
          thumbnail: 'assets/images/inspiration/extra-credits.jpg', thumbnailFit: 'contain',
          title: 'Extra Credits',
          desc: '游戏设计知识非常丰富的频道。',
          url: 'https://www.youtube.com/@extracredits',
          platform: 'youtube', type: 'channel'
        },
        {
          id: 'gdc',
          thumbnail: 'assets/images/inspiration/gdc.jpg', thumbnailFit: 'contain',
          title: 'GDC Festival of Gaming',
          desc: '游戏开发者大会（GDC）官方频道，高质量讲座。',
          url: 'https://www.youtube.com/@GDCFestivalofGaming',
          platform: 'youtube', type: 'channel'
        },
        {
          id: 'hanxiansheng',
          thumbnail: 'assets/images/inspiration/hanxiansheng.jpg',
          title: '汗先生的集游册',
          desc: '一个有刷不完的游戏灵感的 B 站频道，强烈推荐。',
          note: '链接是频道里的一期示例：Slots & Daggers——极简也可以有质感（交互反馈）。',
          url: 'https://www.bilibili.com/video/BV1kbUkBVE8y',
          platform: 'bilibili', type: 'channel', hot: true
        },
        {
          id: 'leege',
          thumbnail: 'assets/images/inspiration/leege.jpg', thumbnailFit: 'contain',
          title: 'Lee哥的游戏开发加油站',
          desc: '另一个不错的 B 站频道。',
          url: 'https://space.bilibili.com/396395171',
          platform: 'bilibili', type: 'channel'
        },
        {
          id: 'indie-games-hub',
          thumbnail: 'assets/images/resources/indie-games-hub.jpg', thumbnailFit: 'contain',
          title: 'Indie Games Hub',
          desc: '独立游戏资讯、预告与作品推荐频道，适合持续发现新作和小众游戏。',
          url: 'https://www.youtube.com/@IndieHub01',
          platform: 'youtube', type: 'channel'
        }
      ]
    },
    {
      id: 'gamejam',
      no: '02',
      title: 'Game Jam 精选',
      hint: 'GMTK 每年 Game Jam 的精选作品回顾，看看别人在限定时间里做出了什么。',
      items: [
        {
          id: 'jam-2025',
          thumbnail: 'assets/images/inspiration/jam-2025.jpg',
          title: 'GMTK Game Jam 2025 精选',
          orig: 'My Favourite Games from GMTK Game Jam 2025',
          desc: '2025 年 GMTK Game Jam 的精选作品回顾。',
          url: 'https://www.youtube.com/watch?v=kG3LWpuiLqg',
          platform: 'youtube', type: 'video'
        },
        {
          id: 'jam-2024',
          thumbnail: 'assets/images/inspiration/jam-2024.jpg',
          title: 'GMTK Game Jam 2024 精选',
          orig: 'The Best Games from GMTK Game Jam 2024',
          desc: '2024 年 GMTK Game Jam 的精选作品回顾。',
          url: 'https://www.youtube.com/watch?v=gqCAeFjB8Uo',
          platform: 'youtube', type: 'video'
        },
        {
          id: 'jam-2023',
          thumbnail: 'assets/images/inspiration/jam-2023.jpg',
          title: 'GMTK Game Jam 2023 精选',
          orig: 'The Best Games from GMTK Game Jam 2023',
          desc: '2023 年 GMTK Game Jam 的精选作品回顾。',
          url: 'https://www.youtube.com/watch?v=tYxZ_LOlFnU',
          platform: 'youtube', type: 'video'
        }
      ]
    },
    {
      id: 'design',
      no: '03',
      title: '游戏设计精讲',
      hint: '两期用具体游戏讲设计的视频。',
      wide: true,
      items: [
        {
          id: 'hundred-games',
          thumbnail: 'assets/images/inspiration/hundred-games.jpg',
          title: '教会我游戏设计的 100 个游戏',
          orig: 'The 100 Games That Taught Me Game Design',
          desc: '从一百个游戏里梳理出来的游戏设计心得。',
          url: 'https://www.youtube.com/watch?v=gWNXGfXOrro',
          platform: 'youtube', type: 'video'
        },
        {
          id: 'fix-platformer',
          thumbnail: 'assets/images/inspiration/fix-platformer.jpg',
          title: '从简单的设置中学习游戏设计',
          orig: 'Can you fix this platformer?',
          desc: '从一个简单的平台跳跃游戏设置入手，学习游戏设计。',
          url: 'https://www.youtube.com/watch?v=zWi0jgghGcI',
          platform: 'youtube', type: 'video'
        }
      ]
    },
    {
      id: 'visual-reference',
      no: '04',
      title: '作品与视觉参考区',
      hint: '从游戏作品、视觉实验和制作经验中观察风格与技术取舍，为自己的游戏收集参考。',
      items: [
        {
          id: 'best-pixel-art-games',
          thumbnail: 'assets/images/resources/best-pixel-art-games.jpg',
          title: '像素游戏作品精选',
          orig: 'Best Pixel Art Games',
          desc: 'Indie Games Hub 的像素游戏播放列表，按类型与年度收集作品，适合寻找画面和玩法参考。',
          note: '这是作品推荐合集，可结合游戏美术区的制作教程继续学习。',
          url: 'https://www.youtube.com/playlist?list=PLxxJaB4u1JY4my1Q0RrPRjT-NSnf0H28h',
          platform: 'youtube', type: 'playlist'
        },
        {
          "id": "t3ssel8r",
          "title": "t3ssel8r",
          "url": "https://www.youtube.com/@t3ssel8r",
          "desc": "围绕 3D 像素风格、程序化动画、Shader 与交互效果分享开发实验。",
          "note": "可先看像素画缩放、数学驱动动画和 3D 像素场景等主题。",
          "type": "channel",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/t3ssel8r.jpg",
          "thumbnailFit": "contain"
        },
        {
          "id": "nick-carver",
          "title": "Nick Carver",
          "url": "https://www.youtube.com/@nickdcarver",
          "desc": "通过游戏原型与视觉实验，观察夜景风格、雾效、植被和摄影测量的组合。",
          "note": "频道中可查看 8-bit Night time Look Development 与 Filters, Fog, Foliage & Photogrammetry 等作品。",
          "type": "channel",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/nick-carver.jpg",
          "thumbnailFit": "contain"
        },
        {
          "id": "art-style-by-necessity",
          "title": "从制作限制中选择美术风格",
          "orig": "Indie Game Art: Style By Necessity",
          "url": "https://www.youtube.com/watch?v=IgJBLXBG1Yc&list=PLofegzJ9Wy5vH_yPxIUd8jBKr2BgMCd5o&index=4",
          "desc": "Miziziziz 从像素、低多边形和 2D / 3D 制作技巧出发，讨论适合独立开发的美术风格。",
          "note": "适合确定美术方向和制作工作量时参考，再到游戏美术区选择对应的资产与动画路线。",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/art-style-by-necessity.jpg"
        }
      ]
    }
  ]
};
