/* 内容整理自游戏开发自助餐 Miro 板；修改 groups 可维护资源。 */
window.RESOURCE_PAGE = {
  "no": "05",
  "title": "3D 美术区",
  "short": "3D 美术",
  "en": "3D Game Art",
  "lead": "学习 3D 建模、材质导入、骨骼绑定与角色动画，也可以从现成或 AI 生成的资产开始。",
  "groups": [
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
      "no": "01"
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
      "no": "02"
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
      "no": "03"
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
      "no": "04"
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
      "no": "05"
    }
  ]
};
