<template>
    <div class="sidebar">
        <a href="/#/home" class="logo"><img src="~@/assets/logo.png"/>Pandora</a>
        <Menu ref="menu" theme="dark" :active-name="activeName" :open-names="openNames" width="180px">
            <MenuItem name="home" to="/home"><Icon type="md-home" />
                我的项目
            </MenuItem>
            <Submenu name="materials">
                <template slot="title">
                    <Icon type="ios-filing" />物料市场
                </template>
                <MenuItem v-for="(item, key) in materials" :key="key"
                :name="item.name" :to="`/materials/${item.name}/blocks`">
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
            let activeName = '';
            const materials = this.materials.map((item) => {
                return item.name;
            });
            if (v1.name === 'blocks' || v1.name === 'components') {
                this.openNames = materials.indexOf(v1.params.materialsName) > -1 ? ['materials'] : [];
                activeName = v1.params.materialsName;
            } else {
                activeName = v1.name;
            }
            this.$store.commit('setActiveName', activeName);
            this.$nextTick(() => {
                this.$refs.menu.updateOpened();
            });
        }
    },
    mounted () {
        Api.get('/materials').then(res => {
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
        display: flex;
        align-items: center;
        img {
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }
    }
}
</style>
