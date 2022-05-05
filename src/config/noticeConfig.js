const noticeList = {
  通知公告: [
    {
      title: "湖小业云招聘用人单位汇总(5月2日更新)",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485247&idx=1&sn=4f33d2d33017be4af6ae8b25184ab434&chksm=ce021907f9759011ec348e438c59085ad5e6f01b7da3b08aa50d28f44a4464c3a39b42ef7c0b#rd",
    },
    {
      title: "国家24365大学生就业服务平台",
      url: "https://24365.smartedu.cn/",
    },
    {
      title: "湖北师范大学线下招聘会（第十周5月2日-5月8日）",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485244&idx=1&sn=bead9ee501dc9f224a4cfbe84245ccec&chksm=ce021904f9759012676f54b1c024f99323ba0e614460dfdbbee9a977177fbe97418ca18b6d83&token=1401933684&lang=zh_CN#rd",
    },
    {
      title: "湖北师范大学【校园招聘】4月29日（周五）线下校园招聘",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485206&idx=1&sn=63873d2bf084e8a6e362dafdd9aba5ec&chksm=ce02192ef9759038711a76a389bbad3aed4479605d3591b15ab123c4748b98165153e7907d37&token=1401933684&lang=zh_CN#rd",
    },
    // 没录入
    {
      title: "东莞市教育局赴省外高校定点公开招聘354名事业编制教师",
      url: "https://mp.weixin.qq.com/s?__biz=MzIzOTA0MzMzNw==&mid=2654048903&idx=5&sn=afc12ed28cf204d6d125d56a1ed5583c&chksm=f2f524e1c582adf757e09ab53470d2dad4eaf7a909588498cf260098a232615584052d151fdb&mpshare=1&scene=23&srcid=0428nVNo8Az0PzKt0MkY85j4&sharer_sharetim",
    },
    {
      title: "湖北师范大学【校园招聘】4月28日（周四）线下校园招聘",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485198&idx=1&sn=a41e23ef0ac906fa6901add64a1e49fb&chksm=ce021936f975902014689efe7f50b1c1dd5e94a184599c04a3da0cd30b190578439f6a70e2f9#rd",
    },
    {
      title:
        "2022届高校毕业生就业促进周系列活动——“才聚荆楚·襄十随神城市群”网络招聘会",
      url: "https://www.91wllm.com/jobfair91/view/id/47694/mark",
    },
    {
      title: "义乌市商城学校招聘湖北师范大学应届毕业生简章",
      url: "https://hbnu.91wllm.com/news/view/aid/222071/tag/tzgg",
    },
    {
      title: "【湖小业-云招聘】新增用人单位招聘信息汇总",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485157&idx=1&sn=892c33fa8f9cfbe774c10d2117bdc7a8&chksm=ce0218ddf97591cba099459ae0e20fef040c7e1a31c39520f58874dd4f678c89c09d69dad871#rd",
    },
    {
      title: "湖北师范大学线下招聘会（第九周4月25日-5月1日）",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485155&idx=1&sn=937ccc0d7c6924c6eb27eff68814dc44&chksm=ce0218dbf97591cd1ca7aad721dfe600b94a791ad7ee861b9eb86d1325123c0b32a0a87c36bf&token=1833932883&lang=zh_CN#rd",
    },
    {
      title: "本周招聘|4月18日至4月22日“湖小业”招聘信息推送",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485146&idx=1&sn=bd5dc79830428b81b1a30f74d280efa8&chksm=ce0218e2f97591f49235f3c5609dafcff7e0492b5614412af304de57c17732d484574839b115&token=2054450913&lang=zh_CN#rd",
    },
    {
      title: "湖北师范大学【校园招聘】4月21日（周四）线下校园招聘",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485120&idx=1&sn=ee4d486b862c5f37a7a8363e84474fe9&chksm=ce0218f8f97591ee16980018e17363cdd32244781679b4dc04daa860faca0b6871e7654fe13f&token=1961431883&lang=zh_CN#rd",
    },
    {
      title: "湖北师范大学【校园招聘】4月20日（周三）线下校园招聘",
      url: "https://mp.weixin.qq.com/s?__biz=Mzg2MjczNTE5MQ==&mid=2247485108&idx=1&sn=ce3d309056a02475ac65799a1b4fe949&chksm=ce02188cf975919a6c085cf55c967a2ce3c89068d8c0a95d5a028d34276b5aba1c0bfad6d647&token=1961431883&lang=zh_CN#rd",
    },
    {
      title: "安康高新区第六小学教师招聘公告",
      url: "https://hbnu.91wllm.com/news/view/aid/221597/tag/tzgg",
    },
  ],
  新闻快递: [
    {
      title: "湖北师范大学仁信助研·《考研英语》基础知识竞赛（初赛）圆满完成",
      url: "https://hbnu.91wllm.com/news/view/aid/215283/tag/xwkd",
    },
    {
      title: "2021届毕业生就业核查培训工作会圆满召开",
      url: "https://hbnu.91wllm.com/news/view/aid/208910/tag/xwkd",
    },
    {
      title: "美术学院积极做好2021毕业季工作",
      url: "https://hbnu.91wllm.com/news/view/aid/207678/tag/xwkd",
    },
    {
      title: "学校举办春季首场大型线下招聘会",
      url: "https://hbnu.91wllm.com/news/view/aid/202782/tag/xwkd",
    },
    {
      title: "学校就业服务中心开展新学期就业指导集体备课会",
      url: "https://hbnu.91wllm.com/news/view/aid/201837/tag/xwkd",
    },
    {
      title: "招就处教职工观看《为了和平》纪录片",
      url: "https://hbnu.91wllm.com/news/view/aid/201011/tag/xwkd",
    },
    {
      title: "武汉纺织大学管理学院研究生招考专项宣讲会圆满举行",
      url: "https://hbnu.91wllm.com/news/view/aid/199930/tag/xwkd",
    },
    {
      title: "提供近6000个岗位！江苏10余家企业将来黄招聘",
      url: "https://mp.weixin.qq.com/s?__biz=MzIwMDQwNDA5Ng==&mid=2651284504&idx=1&sn=c0ded75095c3c04f705d04f65e4c11aa&chksm=8d0e79f7ba79f0e1f695058e1f0c1960b17d26339806791f84236a1da413af054a33d0e25de8&mpshare=1&scene=1&srcid=1118dhibQcgDzW9wTUBwzggZ&sharer_sharetime",
    },
  ],
  招聘公告: [
    {
      title: "招聘全职or实习老师",
      url: "https://hbnu.91wllm.com/campus/view/id/896684",
    },
    {
      title: "南京巨鲨医疗显示科技有限公司（春招）",
      url: "https://hbnu.91wllm.com/campus/view/id/896659",
    },
    {
      title: "灵图互动（武汉）科技有限公司",
      url: "https://hbnu.91wllm.com/campus/view/id/896638",
    },
    {
      title: "2022年春季全国博士、博士后、 高级人才巡回签约洽谈会—武汉站",
      url: "https://hbnu.91wllm.com/campus/view/id/896604",
    },
    {
      title: "中国邮政储蓄银行股份有限公司株洲市分行",
      url: "https://hbtcm.91wllm.com/campus/view/id/896488",
    },
    {
      title: "南阳开元国际学校2022春期高中全科教师招聘",
      url: "https://hbtcm.91wllm.com/campus/view/id/896442",
    },
    {
      title: "上海大山合集团招聘公告",
      url: "https://hbtcm.91wllm.com/campus/view/id/896386",
    },
  ],
};

export default noticeList;
