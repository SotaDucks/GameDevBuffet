/* Unity 引擎区 · 内容整理自 Miro 资料板。
   增删教程请修改 groups；thumbnail 使用本地封面路径。
   note 保留资料板的版本及素材提醒，不代表对当前版本的兼容性验证。 */
window.RESOURCE_PAGE = {
  groups: [
    {
      id: 'install', no: '01', title: '下载安装',
      hint: '先装好引擎，再开始跟教程。',
      items: [
        {
          id: 'unity-install', title: 'Unity 6 如何下载安装',
          desc: '跟着视频完成 Unity 的下载和安装，为第一个项目做好准备。',
          note: '资料板提示：如果 Unity 6 安装遇到困难，也可以下载 Unity 2022 版本。',
          url: 'https://www.bilibili.com/video/BV1EaePz2E8h/',
          thumbnail: 'assets/images/unity/install.jpg',
          platform: 'bilibili', type: 'video'
        }
      ]
    },
    {
      id: 'beginners', no: '02', title: '零基础入门',
      hint: '第一次接触 Unity？先完整跟一遍，再选择下面的 2D 或 3D 路线。',
      items: [
        {
          id: 'unity-beginners', title: 'GMTK · Unity 完全小白教程（中文字幕）',
          orig: 'The Unity Tutorial For Complete Beginners',
          desc: '面向零基础同学的入门教程，从实际操作中熟悉 Unity 的基本工作流程。',
          note: '资料板提示：教程使用 Unity 2022 的某个版本，Unity 6 的部分操作可能不同。美术素材需要前往 YouTube 原视频下方查找。',
          url: 'https://www.bilibili.com/video/BV1wA41197BX/',
          thumbnail: 'assets/images/unity/beginners.jpg',
          platform: 'bilibili', type: 'video'
        }
      ]
    },
    {
      id: 'route-2d', no: '03', title: '2D 游戏路线',
      hint: '从角色移动开始，再学习为游戏制作精灵图。',
      items: [
        {
          id: 'unity-movement', title: 'Unity 2D 角色移动教程',
          orig: '2D Movement in Unity (Tutorial)',
          desc: '学习让 2D 角色动起来，链接保留了原教程播放列表，方便继续学习。',
          note: '资料板提示：使用 Unity 6 时，部分操作可能与教程不同；原教程的美术素材链接已失效，需要自行准备素材。',
          url: 'https://www.youtube.com/watch?v=dwcT-Dch0bA&list=PLPV2KyIb3jR6TFcFuzI2bB7TMNIIBpKMQ&index=2',
          thumbnail: 'assets/images/unity/movement.jpg',
          platform: 'youtube', type: 'video'
        },
        {
          id: 'unity-sprite-sheets', title: '为 Unity 游戏制作精灵图',
          orig: 'HOW TO MAKE SPRITE SHEETS FOR YOUR UNITY GAME - TUTORIAL',
          desc: '学习制作 Sprite Sheet（精灵图集），为 2D 角色和动画准备素材。',
          note: '链接从资料板标记的 2 分 11 秒开始播放，可以回到开头观看完整教程。',
          url: 'https://www.youtube.com/watch?v=ou8VkQB2sos&t=131s',
          thumbnail: 'assets/images/unity/sprite-sheets.jpg',
          platform: 'youtube', type: 'video'
        }
      ]
    },
    {
      id: 'route-3d', no: '04', title: '3D 游戏路线',
      hint: '借助 Starter Assets，先实现控制角色在场景中自由移动。',
      items: [
        {
          id: 'unity-starter-assets', title: 'Unity Starter Assets 入门',
          orig: 'Starter Assets overview | Unity',
          desc: '了解第一人称和第三人称两种基础资产，作为 3D 角色控制的起点。',
          note: '资料板提示：前往视频评论区查找资产下载入口，第一人称和第三人称资产需要分别选择。',
          url: 'https://www.youtube.com/watch?v=4QuPlKzdq14',
          thumbnail: 'assets/images/unity/starter-assets.jpg',
          platform: 'youtube', type: 'video'
        }
      ]
    },
    {
      id: 'architecture', no: '05', title: '开发架构与实践',
      hint: '完成入门项目后，再思考如何组织系统、数据与表现。',
      items: [
        {
          id: 'indie-code-architecture',
          title: '独立游戏的代码架构',
          orig: 'Best Code Architectures For Indie Games',
          desc: 'Jonas Tyroller 分享可复用系统、游戏数据库、时间处理，以及模拟与表现分离的实践。',
          note: '讨论通用游戏开发架构，不是 Unity 专用 API 教程；适合完成基础项目后结合自己的工程阅读。',
          url: 'https://www.youtube.com/watch?v=8WqYQ1OwxJ4',
          thumbnail: 'assets/images/resources/indie-code-architecture.jpg',
          platform: 'youtube', type: 'video'
        }
      ]
    }
  ]
};
