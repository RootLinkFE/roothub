<template>
    <div class="materials">
        <DashboardHeader title="物料">
            <div class="h-right">
                <Select v-model="materialsName" style="width:200px">
                    <Option v-for="item in materials" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div>
                    <Button type="primary" @click="sync">同步物料</Button>
                    <Button type="default" @click="modal = true" class="ml20">自定义物料</Button>
                </div>
            </div>
        </DashboardHeader>
        <PageWrap>
            <router-view></router-view>
        </PageWrap>
        <Modal
        v-model="modal"
            title="自定义物料">
            <Form :model="form" ref="form" label-position="top" :rules="ruleValidate">
                <FormItem prop="type">
                    <label slot="label">
                        物料类型
                    </label>
                    <RadioGroup v-model="form.type">
                        <Radio label="React">React</Radio>
                        <Radio label="Vue">Vue</Radio>
                        <Radio label="Angular">Angular</Radio>
                        <Radio label="Bootstrap">Bootstrap</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="alias">
                    <label slot="label">
                        物料名称
                    </label>
                    <Input v-model="form.alias"></Input>
                </FormItem>
                <FormItem prop="gitPath">
                    <label slot="label">
                        物料地址
                    </label>
                    <Input v-model="form.gitPath" placeholder="ssh地址，例如git@git.souche-inc.com:loan/xxx.git"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button><a href="http://f2e.souche.com/projects/loan/magic-park/docs/guide/custom_material.html" target="_blank">查看帮助</a></Button>
                <Button @click="modal = false">取消</Button>
                <Button type="primary" @click="submit">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Api from '@/api';

export default {
    name: 'Materials',
    data () {
        return {
            materialsName: '',
            form: {
                type: '',
                name: '',
                alias: '',
                gitPath: ''
            },
            ruleValidate: {
                type: [
                    { required: true, message: '请选择物料类型' }
                ],
                alias: [
                    { required: true, message: '请填写物料名称' }
                ],
                gitPath: [
                    { required: true, message: '请填写物料地址' }
                ]
            },
            modal: true
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
        },
        submit () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const arr = this.form.gitPath.split('/');
                    this.form.name = arr[arr.length - 1].replace('.git', '');
                    console.log(this.form);
                    Api.post('/materials/custom', this.form).then((res) => {
                        console.log(res);
                        this.modal = false;
                        this.$store.dispatch('getMaterials');
                        this.$Notice.success({
                            title: '提示',
                            desc: '添加成功',
                            duration: 1
                        });
                    });
                }
            })
        }
    },
    computed: {
        materials () {
            let arr = [];
            this.$store.state.materials.customMaterials.forEach((item) => {
                if (item.active) {
                    arr.push({
                        label: item.alias,
                        value: item.name
                    });
                }
            });
            this.$store.state.materials.recommendMaterials.forEach((item) => {
                if (item.active) {
                    arr.push({
                        label: item.alias,
                        value: item.name
                    });
                }
            });
            return arr;
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
        }
    },
    mounted () {
        this.$store.dispatch('getMaterials').then(res => {
            this.materialsName = res.recommendMaterials[0].name;
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
