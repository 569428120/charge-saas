// 菜单
const systems = [
    {
        "id": "system2",
        "name": "收费系统",
        "desc": "",
        "path": "/charge-project",
        "icon": "tabs",
    }
];

//菜单
const subMenus = [

    {
        "id": "subMenu1",
        "parentId": "system2",
        "name": "收费管理",
        "icon": "user",
        "menus": [
            {
                "id": "menu1",
                "name": "收费项目",
                "icon": "tabs",
                "path": "/charge-project"
            },
            {
                "id": "menu2",
                "name": "收费详情",
                "icon": "tabs",
                "path": "/charge-details"
            },
            {
                "id": "menu3",
                "name": "人员详情",
                "icon": "tabs",
                "path": "/charge-personnel"
            }
        ]
    },
    {
        "id": "subMenu2",
        "parentId": "system2",
        "name": "财务管理",
        "icon": "laptop",
        "menus": [
            {
                "id": "menu4",
                "name": "财务报表",
                "icon": "tabs",
                "path": "/financial-statement"
            }
        ]
    }
];


export function routeMap() {
    const map = new Map();
    subMenus.forEach(item => {
        const menus = item.menus;
        if (menus && menus.length > 0) {
            menus.forEach(menu => {
                map.set(menu.path, {
                    ...menu,
                    menuId: item.id,
                    systemId: item.parentId
                })
            })
        }
    });
    map.set("/home", {
        "id": "menu0",
        "name": "首页",
        "icon": "home",
        "path": "/home",
        "menuId": null,
        "systemId": "system2"
    });
    return map;
}


export function getSystems() {
    return systems
}

export function getSubMenus() {
    return subMenus
}