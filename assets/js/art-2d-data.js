/* 内容整理自游戏开发自助餐 Miro 板；修改 groups 可维护资源。 */
window.RESOURCE_PAGE = {
  "no": "04",
  "title": "2D 美术区",
  "short": "2D 美术",
  "en": "2D Game Art",
  "lead": "从手绘和像素画入门，制作 2D 游戏素材与动画，也可以探索 AI 图像和动画工具。",
  "groups": [
    {
      "id": "draw-2d",
      "title": "2D 美术资产 · 手搓",
      "hint": "手绘、数字绘画与像素画，适合持续积累。",
      "items": [
        {
          "id": "drawing",
          "title": "手绘与数字绘画",
          "url": "https://miro.com/app/board/uXjVJhRcRPg=/?moveToWidget=3458764650942402690",
          "desc": "从手绘或熟悉的数字绘画工具开始制作素材。",
          "note": "资料板提醒：绘画没有速成，需要长期练习。",
          "type": "reference",
          "platform": "miro",
          "thumbnail": "assets/images/resources/drawing.svg"
        },
        {
          "id": "aseprite",
          "title": "Aseprite",
          "url": "https://www.aseprite.org/",
          "desc": "资料板收录的像素画与逐帧动画制作软件。",
          "note": "可从官网或 Steam 获取；零基础同学需要预留练习时间。",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/aseprite.png"
        },
        {
          "id": "miro-3458764650942658101",
          "title": "Aseprite 二十分钟快速上手",
          "url": "https://www.bilibili.com/video/BV1o7411C7zo/",
          "desc": "学习 Aseprite 的基础操作，作为像素画练习的起点。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650942658101.jpg"
        },
        {
          "id": "photoshop",
          "title": "Adobe Photoshop",
          "url": "https://www.adobe.com/products/photoshop.html",
          "desc": "已有 Photoshop 基础的同学可以用熟悉的工具制作游戏素材。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/photoshop.svg"
        },
        {
          "id": "illustrator",
          "title": "Adobe Illustrator",
          "url": "https://www.adobe.com/products/illustrator.html",
          "desc": "已有矢量设计基础的同学可使用 Illustrator 制作美术素材。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/illustrator.svg"
        },
        {
          "id": "miro-3458764666875728934",
          "title": "用 Photoshop 制作精灵图",
          "url": "https://www.youtube.com/watch?v=uMBfAhp244w",
          "desc": "学习为 Unity 游戏制作 Sprite Sheet（精灵图集）。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764666875728934.jpg"
        }
      ],
      "note": "",
      "no": "01"
    },
    {
      "id": "generate-2d",
      "title": "2D 美术资产 · AI 路线",
      "hint": "资料板中的图像生成工具与入门教程。",
      "items": [
        {
          "id": "nano-banana",
          "title": "Nano Banana / Google AI Studio",
          "url": "https://aistudio.google.com/",
          "desc": "从资料板提供的 AI Studio 入口探索图像生成。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/nano-banana.png"
        },
        {
          "id": "midjourney",
          "title": "Midjourney",
          "url": "https://www.midjourney.com/explore?tab=video_top",
          "desc": "资料板收录的图像生成工具与作品浏览入口。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/midjourney.svg"
        },
        {
          "id": "miro-3458764650944315203",
          "title": "Midjourney 零基础入门教程",
          "url": "https://www.bilibili.com/video/BV1WuU1B9Exj/",
          "desc": "资料板收录的 2025 版教程，从基础操作开始学习。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650944315203.jpg"
        }
      ],
      "note": "资料板提示：AI 生成结果需要筛选与调整；工具的可用功能、费用和访问条件以网站当前说明为准。",
      "no": "02"
    },
    {
      "id": "animate-2d",
      "title": "2D 动画 · 手搓",
      "hint": "从骨骼绑定、权重到逐帧动画。",
      "items": [
        {
          "id": "spine",
          "title": "Spine",
          "url": "https://esotericsoftware.com/",
          "desc": "用于 2D 骨骼绑定与动画制作，资料板建议先学骨骼、权重和动画。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/spine.png",
          "thumbnailFit": "contain"
        },
        {
          "id": "miro-3458764650938795934",
          "title": "Spine：网格、权重与走路动画",
          "url": "https://www.bilibili.com/video/BV1eZ4y1P7ec?p=4",
          "desc": "从教程的第 4 集开始学习网格和权重。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650938795934.jpg"
        },
        {
          "id": "unity-animation",
          "title": "Unity 2D Animation",
          "url": "https://docs.unity3d.com/Packages/com.unity.2d.animation@latest",
          "desc": "Unity 2D 骨骼动画套件的官方文档入口。",
          "note": "选择与你的 Unity 和包版本匹配的文档。",
          "type": "docs",
          "platform": "docs",
          "thumbnail": "assets/images/resources/unity-animation.svg"
        },
        {
          "id": "miro-3458764650939631537",
          "title": "不依赖 Photoshop 的 Unity 2D 绑定",
          "url": "https://www.youtube.com/watch?v=t3HdlMCTdNU",
          "desc": "学习 Unity 中的 2D 角色绑定与动画制作。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650939631537.jpg"
        },
        {
          "id": "miro-3458764650940705625",
          "title": "Aseprite：像素逐帧动画入门",
          "url": "https://www.bilibili.com/video/BV1o7411C7zo/",
          "desc": "同一套像素画工具也能用于逐帧动画；操作之外仍需绘画积累。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650940705625.jpg"
        }
      ],
      "note": "",
      "no": "03"
    },
    {
      "id": "ai-animation-2d",
      "title": "2D 动画 · AI 路线",
      "hint": "生成图像或视频，再整理为可用的动画帧。",
      "items": [
        {
          "id": "gpt-image",
          "title": "GPT Image / ChatGPT",
          "url": "https://chatgpt.com/",
          "desc": "资料板提供的图像生成入口，可用于探索角色与画面。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/gpt-image.svg"
        },
        {
          "id": "miro-3458764650941983568",
          "title": "AI 游戏人物帧序列工作流",
          "url": "https://www.bilibili.com/video/BV1XkUKBZEHH/",
          "desc": "资料板收录的角色帧序列教程，工作流入口在视频置顶区。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650941983568.jpg"
        },
        {
          "id": "video-sprites",
          "title": "用视频模型制作精灵图",
          "url": "https://miro.com/app/board/uXjVJhRcRPg=/?moveToWidget=3458764673185909075",
          "desc": "查看资料板内嵌的工作流文档。",
          "note": "该文档保留在原板中，点击查看原始资料。",
          "type": "reference",
          "platform": "miro",
          "thumbnail": "assets/images/resources/video-sprites.svg"
        },
        {
          "id": "jimeng",
          "title": "即梦",
          "url": "https://jimeng.jianying.com/",
          "desc": "资料板列出的 AI 图像和视频工具之一。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/jimeng.webp"
        },
        {
          "id": "miro-3458764665702493794",
          "title": "可灵 Kling AI",
          "url": "https://app.klingai.com/cn/",
          "desc": "资料板收录的 AI 图像与视频生成工具。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/miro-3458764665702493794.png"
        },
        {
          "id": "tapnow",
          "title": "Tapnow",
          "url": "https://miro.com/app/board/uXjVJhRcRPg=/?moveToWidget=3458764665702493873",
          "desc": "资料板列出的另一项创作工具。",
          "note": "板上没有提供外部链接，此卡片定位到原板条目。",
          "type": "reference",
          "platform": "miro",
          "thumbnail": "assets/images/resources/tapnow.svg"
        }
      ],
      "note": "资料板提醒：AI 工具变化快，结果可能不稳定，工作流需要结合自己的素材调整。",
      "no": "04"
    }
  ]
};
