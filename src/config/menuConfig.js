const menuList = [
  {
    key: "/userInformationManagement",
    name: "用户信息管理",
    icon: "icon-yonghuxiugai",
  },
  {
    key: "/student",
    name: "学生信息管理",
    icon: "icon-xueshengdangan",
    children: [
      {
        key: "/student/management",
        name: "学生信息",
      },
      {
        key: "/student/statistics",
        name: "学生信息统计",
      },
    ],
  },
  {
    key: "/employment",
    name: "就业状态信息管理",
    icon: "icon-shixijiuye",
    children: [
      {
        key: "/employment/management",
        name: "就业状态信息",
      },
      {
        key: "/employment/statistics",
        name: "就业状态信息统计",
      },
    ],
  },
  {
    key: "/recruit",
    name: "就业招聘信息管理",
    icon: "icon-qiyezhaopin",
  },
  {
    key: "/notice",
    name: "通知公告",
    icon: "icon-tongzhi",
  },
];

export default menuList;
