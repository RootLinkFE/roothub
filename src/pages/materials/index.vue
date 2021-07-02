<template>
    <div class="materials">
        <DashboardHeader title="物料">
            <div class="h-right">
                <Select v-model="materialsName" style="width:200px">
                    <Option v-for="item in materials" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div>
                    <Button type="primary" @click="sync">同步物料</Button>
                </div>
            </div>
        </DashboardHeader>
        <PageWrap>
            <router-view></router-view>
        </PageWrap>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'Materials',
    data () {
        return {
            materialsName: '',
            materials: []
        };
    },
    methods: {
        sync () {
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', '同步中')
                    ])
                }
            });
            Api.get('/materials/sync').then(() => {
                this.$Spin.hide();
                this.$Notice.success({
                    title: '提示',
                    desc: '同步成功',
                    duration: 1,
                    onClose () {
                        window.location.reload();
                    }
                });
            });
        }
    },
    watch: {
        materialsName: function(val) {
            this.$router.replace({
                name: 'blocks',
                query: {
                    materialsName: val
                }
            });
        },
        $route: function(val) {
            this.$router.replace({
                name: 'blocks',
                query: {
                    materialsName: this.materialsName
                }
            })
        }
    },
    mounted () {
        this.$store.dispatch('getMaterials').then(res => {
            let arr = []
            const materials = [].concat(res.recommendMaterials, res.customMaterials);
            materials.forEach((item) => {
                if (item.active) {
                    arr.push({
                        label: item.alias,
                        value: item.name
                    });
                }
            });
            this.materials = arr;
            this.materialsName = arr[0].value;
        });
    }
}
</script>

<style lang="less" scoped>
.el-row {
    margin-bottom: 24px;
}
.h-right {
    display: flex;
    margin-left: 40px;
    justify-content: space-between;
}
</style>
