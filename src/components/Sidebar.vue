<template>
    <div class="sidebar">
        <div class="logo"><Icon type="md-cube" />ShowBox</div>
        <Menu theme="dark" active-name="1" :open-names="['1']" width="180px">
            <MenuItem name="1" to="/home"><Icon type="md-home" />首页</MenuItem>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-filing" />物料市场
                </template>
                <MenuGroup title="Vue">
                    <MenuItem name="2-1" to="/blocks?type=vue">区块</MenuItem>
                </MenuGroup>
                <MenuGroup title="React">
                    <MenuItem name="2-3" to="/blocks">区块</MenuItem>
                </MenuGroup>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
export default {
    name: "Sidebar"
};
</script>

<style lang="less">
.ivu-menu-dark {
    background: #1d1e23!important;;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
    background: #101117!important;;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #fff!important;;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #fff!important;;
    background: transparent!important;;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #1d1e23!important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
    background: #333438!important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #101117;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-group-title {
    color: rgba(255,255,255,.5);
}
.sidebar {
    background: #1d1e23;
    box-shadow: 2px 0 6px rgba(0,21,41,.35);
    color: #fff;
    z-index: 11;
    width: 180px;
    .logo {
        font-size: 20px;
        padding: 0 24px;
        height: 63px;
        color: #f6ca9d;
        border-bottom: 1px solid #101117;
        text-align: center;
        line-height: 63px;
        i {
            font-size: 30px;
            margin-right: 10px;
        }
    }
}
</style>
