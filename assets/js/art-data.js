/* 内容整理自游戏开发自助餐 Miro 板；修改 groups 可维护资源。 */
window.RESOURCE_PAGE = {
  "no": "04",
  "title": "游戏美术区",
  "short": "美术",
  "en": "Game Art",
  "lead": "从一张角色图，到一个能动起来的模型。按 2D / 3D、素材 / 动画选择路线，手工制作、现成资产与 AI 工具都在这里。",
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
    },
    {
      "id": "model-3d",
      "title": "3D 美术资产 · 手搓",
      "hint": "Blender 建模与模型、材质导入 Unity。",
      "items": [
        {
          "id": "blender",
          "title": "Blender",
          "url": "https://www.blender.org/",
          "desc": "资料板推荐的 3D 创作工具，可从官网或 Steam 获取。",
          "note": "导出前留意面数、面朝向和拓扑。",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/blender.webp"
        },
        {
          "id": "miro-3458764650946081426",
          "title": "Blender → Unity：模型导出",
          "url": "https://www.youtube.com/watch?v=oBhCxC1hUg4&list=PLofegzJ9Wy5vH_yPxIUd8jBKr2BgMCd5o",
          "desc": "处理导出中的坐标轴、缩放和贴图打包问题。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650946081426.jpg"
        },
        {
          "id": "miro-3458764650946081906",
          "title": "Blender → Unity：材质与贴图导出",
          "url": "https://www.youtube.com/watch?v=yloupOUjMOA&list=PLofegzJ9Wy5vH_yPxIUd8jBKr2BgMCd5o&index=2",
          "desc": "学习将 Blender 材质和贴图带入 Unity。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650946081906.jpg"
        }
      ],
      "note": "",
      "no": "05"
    },
    {
      "id": "generate-3d",
      "title": "3D 美术资产 · 资产与 AI",
      "hint": "先获得模型，再处理拓扑、材质和引擎导入。",
      "items": [
        {
          "id": "asset-store",
          "title": "Unity Asset Store",
          "url": "https://assetstore.unity.com/",
          "desc": "查找可用于原型的模型、场景与成套资产。",
          "note": "选择与项目渲染管线匹配的资源，并查看资源自身的使用许可。",
          "type": "resource",
          "platform": "website",
          "thumbnail": "assets/images/resources/asset-store.jpg"
        },
        {
          "id": "miro-3458764650947471083",
          "title": "资产变紫色？材质与 URP 转换教程",
          "url": "https://www.bilibili.com/video/BV1Tu411p7VZ",
          "desc": "资料板重点标记的材质兼容问题教程。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650947471083.jpg"
        },
        {
          "id": "tripo",
          "title": "Tripo AI",
          "url": "https://www.tripo3d.ai/",
          "desc": "资料板列出的 3D 模型生成工具之一。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/tripo.svg"
        },
        {
          "id": "meshy",
          "title": "Meshy",
          "url": "https://www.meshy.ai/",
          "desc": "资料板列出的 3D 模型生成工具之一。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/meshy.webp"
        },
        {
          "id": "sam3d",
          "title": "SAM 3D",
          "url": "https://github.com/facebookresearch/sam-3d-objects",
          "desc": "资料板列出的 SAM 3D 项目入口。",
          "note": "",
          "type": "tool",
          "platform": "github",
          "thumbnail": "assets/images/resources/sam3d.png"
        },
        {
          "id": "hunyuan",
          "title": "混元 3D",
          "url": "https://3d.hunyuan.tencent.com/",
          "desc": "资料板列出的 3D 生成工具之一。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/hunyuan.png"
        },
        {
          "id": "miro-3458764665762007323",
          "title": "Rodin / Hyper3D",
          "url": "https://hyper3d.ai/?lang=zh",
          "desc": "资料板补充的 3D 模型生成工具。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/miro-3458764665762007323.png"
        },
        {
          "id": "miro-3458764650948227483",
          "title": "生成模型的 Blender → Unity 中转",
          "url": "https://www.youtube.com/watch?v=oBhCxC1hUg4&list=PLofegzJ9Wy5vH_yPxIUd8jBKr2BgMCd5o",
          "desc": "得到模型后，参考模型导出教程整理并导入 Unity。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650948227483.jpg"
        },
        {
          "id": "miro-3458764650948227532",
          "title": "生成模型的材质与贴图导出",
          "url": "https://www.youtube.com/watch?v=yloupOUjMOA&list=PLofegzJ9Wy5vH_yPxIUd8jBKr2BgMCd5o&index=2",
          "desc": "继续处理模型材质、贴图与 Unity 导入。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650948227532.jpg"
        }
      ],
      "note": "资料板提醒：生成模型适合快速原型，但 UV、布线和输出稳定性可能需要额外处理。",
      "no": "06"
    },
    {
      "id": "animate-3d",
      "title": "3D 动画 · 半手搓",
      "hint": "Mixamo 动作、骨骼适配与 Cascadeur 制作。",
      "items": [
        {
          "id": "miro-3458764650956889670",
          "title": "Mixamo",
          "url": "https://www.mixamo.com/",
          "desc": "资料板收录的角色与动作资源入口。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/miro-3458764650956889670.ico",
          "thumbnailFit": "contain"
        },
        {
          "id": "miro-3458764650949079162",
          "title": "Unity 动画与 Mixamo · 基础篇",
          "url": "https://www.bilibili.com/video/BV1VcZgYKEfv/",
          "desc": "学习将 Mixamo 模型与动画导入 Unity。",
          "note": "",
          "type": "video",
          "platform": "bilibili",
          "thumbnail": "assets/images/resources/miro-3458764650949079162.jpg"
        },
        {
          "id": "miro-3458764650949316444",
          "title": "给自己的模型绑定 Mixamo 动画",
          "url": "https://www.youtube.com/watch?v=2T0hDIoQKNc",
          "desc": "资料板重点标记：将动作应用到自己的模型，再导入 Unity。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650949316444.jpg"
        },
        {
          "id": "cascadeur",
          "title": "Cascadeur",
          "url": "https://cascadeur.com/",
          "desc": "资料板收录的 3D 动画制作工具。",
          "note": "资料板提醒：导入的模型需要先绑好骨骼。",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/cascadeur.png"
        },
        {
          "id": "miro-3458764650950210816",
          "title": "Cascadeur：制作第一个动画",
          "url": "https://www.youtube.com/watch?v=BsMK31XRz2s",
          "desc": "资料板推荐的官方入门教程。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764650950210816.jpg"
        }
      ],
      "note": "",
      "no": "07"
    },
    {
      "id": "ready-animation",
      "title": "3D 动画 · 现成资源",
      "hint": "从附带动画的资产开始搭建原型。",
      "items": [
        {
          "id": "animated-assets",
          "title": "带动画的 Unity 资产",
          "url": "https://assetstore.unity.com/",
          "desc": "资料板提醒：部分 3D 资源已经包含动画，可结合项目需求选择。",
          "note": "下载前查看动画列表、适用角色和渲染管线。",
          "type": "resource",
          "platform": "website",
          "thumbnail": "assets/images/resources/animated-assets.jpg"
        }
      ],
      "note": "",
      "no": "08"
    },
    {
      "id": "rigging-extra",
      "title": "角色与绑定补充",
      "hint": "资料板在主分区周围补充的角色制作工具。",
      "items": [
        {
          "id": "lpc",
          "title": "Universal LPC Spritesheet Generator",
          "url": "https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/#sex=male&body=Body_color_light&head=Human_male_light&expression=Neutral_light",
          "desc": "组合像素人物部件并生成角色精灵图。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/lpc.svg"
        },
        {
          "id": "miro-3458764665773567716",
          "title": "Auto-Rig Pro 角色绑定教程",
          "url": "https://www.youtube.com/watch?v=I_hTspsqnCE",
          "desc": "资料板建议：Mixamo 无法处理角色骨骼时，可了解这条绑定路线。",
          "note": "",
          "type": "video",
          "platform": "youtube",
          "thumbnail": "assets/images/resources/miro-3458764665773567716.jpg"
        },
        {
          "id": "miro-3458764668085839550",
          "title": "Rokoko Create",
          "url": "https://create.rokoko.com/",
          "desc": "资料板补充的文字生成骨骼动画工具入口。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/miro-3458764668085839550.jpg"
        },
        {
          "id": "miro-3458764669152866682",
          "title": "Anything World",
          "url": "https://app.anything.world/u/my-world/my-models",
          "desc": "资料板补充：非人类生物的模型与动画处理入口。",
          "note": "",
          "type": "tool",
          "platform": "website",
          "thumbnail": "assets/images/resources/miro-3458764669152866682.png",
          "thumbnailFit": "contain"
        }
      ],
      "note": "",
      "no": "09"
    }
  ],
  "heroGroups": [
    "draw-2d",
    "animate-2d",
    "model-3d",
    "animate-3d"
  ],
  "source": "3458764650951988035"
};
