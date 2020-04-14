<template>
    <div class="sidebar">
        <div class="logo"><Icon type="md-cube" />ShowBox</div>
        <Menu ref="menu" theme="dark" :active-name="activeName" :open-names="openNames" width="180px">
            <MenuItem name="home" to="/home"><Icon type="md-home" />
                首页
            </MenuItem>
            <Submenu name="materials">
                <template slot="title">
                    <Icon type="ios-filing" />物料市场
                </template>
                <MenuItem v-for="(item, key) in materials" :key="key"
                :name="item.name" :to="`/materials/${item.name}`">
                    {{item.alias}}
                </MenuItem>
            </Submenu>
            <MenuItem name="setting" to="/setting"><Icon type="md-settings" />
                设置
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: "Sidebar",
    data () {
        return {
            openNames: [],
            materials: []
        };
    },
    computed: {
        activeName: function() {
            return this.$store.state.activeName;
        }
    },
    watch: {
        $route(v1, v0) {
            console.log(v1);
            this.openNames = ['blocks'].indexOf(v1.name) > -1 ? ['materials'] : [];
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
            })
            let activeName = v1.name;
            if (v1.query.type) {
                activeName = `${activeName}-${v1.query.type}`;
            }
            this.$store.commit('setActiveName', activeName);
        }
    },
    mounted () {
        Api.get('/materials').then(res => {
            console.log(res);
            this.materials = res;
        });
    }
};
</script>

<style lang="less">
.ivu-menu-vertical {
    .ivu-menu-item {
        padding: 14px 0 14px 24px;
        display: flex;
        align-items: center;
        a {
            display: inline-block;
            flex: 1;
        }
    }
    .ivu-menu-submenu-title {
        padding: 14px 0 14px 24px;
    }
}
.ivu-menu-dark {
    background: #1d1e23!important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
    background: #101117!important;
    border-left: 3px solid #b78755;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    color: #fff!important;
    border-left: 3px solid #b78755;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    color: #fff!important;;
    background: transparent!important;
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
        color: @color;
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
