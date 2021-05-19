import {getRequest} from "./api"

/**
 * 菜单数据格式化
 */


export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        // 已经有数据，无需加载
        console.log("##########################");
        return;
    }

    getRequest("/system/config/menu").then((data) => {
        if (data) {

            let formatedRoutes = formatRoutes(data);
            
            router.addRoutes(formatedRoutes);

            store.commit('initRoutes', formatedRoutes);
        }
    })
}

export const formatRoutes = (routes) => {
    let formatedRoutes = [];
    routes.forEach(router => {
        // 解构赋值
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        
        // 第一层菜单，递归调用
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }


        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            
            component: (resolve) => {
                // 拼接 vue 文件完整地址
                /* require内部的地址必须是一个写死的字符串，否则会出bug */
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }
        }
        formatedRoutes.push(fmRouter);
    })

    return formatedRoutes;
}