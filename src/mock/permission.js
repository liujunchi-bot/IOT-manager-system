import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'wp') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                label: '设备管理',
                icon: 's-home',
                children: [
                  {
                    path: "/terminal",
                    name: "终端管理",
                    label: '终端管理',
                    icon: 'setting',
                    url: 'Equipment/Terminal'
                  },
                  {
                    path: "/sensor",
                    name: "sensor",
                    label: '传感器管理',
                    icon: 'setting',
                    url: 'Equipment/Sensor'
                  },
                  {
                    path: "/monitor",
                    name: "实时监控",
                    label: '实时监控',
                    icon: 'setting',
                    url: 'Equipment/Monitor'
                  }
                ]
              }

              ,
              {
                label: '规则管理',
                icon: 's-home',
                children: [
                  {
                    path: "/",
                    name: "智能报警模型",
                    label: '智能报警模型',
                    icon: 'setting',
                    url: 'Rulemanage/Rulemanage'
                  },
                ]
              },
              {
                label: '报警管理',
                icon: 'video-play',
                children: [
                  {
                    path: "/warn_msg",
                    name: "报警通知",
                    label: '报警通知',
                    icon: 'setting',
                    url: 'Warnmanage/Warnmsg'
                  },
                  {
                    path: "/warn_map",
                    name: "报警地图",
                    label: '报警地图',
                    icon: 'setting',
                    url: 'Warnmanage/Warnmap'
                  },
                  {
                    path: "/warn_log",
                    name: "报警日志",
                    label: '报警日志',
                    icon: 'setting',
                    url: 'Warnmanage/Warnlog'
                  },
                ]

              },
              {
                label: 'API管理',
                icon: 'location',
                children: [
                  {
                    path: "/apisetting",
                    name: "API配置",
                    label: 'API配置',
                    icon: 'setting',
                    url: 'APImanage/APIsetting'
                  },
                  {
                    path: "/apimaintain",
                    name: "API维护",
                    label: 'API维护',
                    icon: 'setting',
                    url: 'APImanage/APImaintain'
                  },
                  {
                    path: "/apipermission",
                    name: "权限管理",
                    label: '权限管理',
                    icon: 'setting',
                    url: 'APImanage/APIpermission'
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'wp' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/video',
                name: 'video',
                label: '视频管理页',
                icon: 'video-play',
                url: 'VideoManage/VideoManage'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
