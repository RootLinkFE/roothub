<template>
    <div>
        <div class="section">
            <h3>官方推荐物料</h3>
            <MyCard class="material-item" v-for="(item, index) in recommendMaterials" :key="index">
                <div class="left">
                    <FrameworkIcon :type="item.type"></FrameworkIcon>
                    <div class="info">
                        <div>{{item.alias}}</div>
                        <div class="desc">{{item.description || '暂无描述'}}</div>
                    </div>
                </div>
                <div class="right">
                    <iSwitch v-model="item.active" @on-change="changeHandler('recommendMaterials', index, item)"/>
                </div>
            </MyCard>
        </div>
        <div class="section">
            <h3 class="flex">
                <span>自定义物料</span>
                <Icon size="20" style="cursor: pointer;" type="ios-add-circle" @click="addMaterial" />
            </h3>
            <MyCard class="material-item" v-for="(item, index) in customMaterials" :key="index">
                <div class="left">
                    <FrameworkIcon :type="item.type"></FrameworkIcon>
                    <div class="info">
                        <div>{{item.alias}}</div>
                        <div class="desc">{{item.description || '暂无描述'}}</div>
                    </div>
                </div>
                <div class="right">
                    <Icon type="md-create" @click="editMaterial(index, item)"/>
                    <Icon type="md-trash" @click="delHandler(index)"/>
                    <iSwitch v-model="item.active" @on-change="changeHandler(index, item)"/>
                </div>
            </MyCard>
        </div>
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
                <FormItem>
                    <label slot="label">
                        描述
                    </label>
                    <Input v-model="form.description"></Input>
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
    name: 'MaterialsManage',
    data () {
        return {
            recommendMaterials: [],
            customMaterials: [],
            form: {
                type: '',
                name: '',
                alias: '',
                gitPath: '',
                description: '',
                active: true
            },
            formType: 'add', // 表单动作 add:新增 edit:编辑
            updateIndex: null,
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
            modal: false
        }
    },
    props: {
        type: String,
        editable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        changeHandler(type, index, update) {
            Api.patch(`/materials/${index}`, {
                type, update
            }).then(() => {
                this.$Notice.success({
                    title: '提示',
                    desc: '设置成功',
                    duration: 1
                });
            });
        },
        delHandler(index) {
            this.$Modal.confirm({
                title: '提示',
                content: '确定要删除吗？',
                onOk: () => {
                    Api.delete(`/materials/${index}`).then(() => {
                        this.getMaterials();
                        this.$Notice.success({
                            title: '提示',
                            desc: '删除成功',
                            duration: 1
                        });
                    });
                }
            });
        },
        getMaterials() {
            this.$store.dispatch('getMaterials').then((res) => {
                this.recommendMaterials = res.recommendMaterials;
                this.customMaterials = res.customMaterials;
            });
        },
        addMaterial() {
            this.updateIndex = null;
            this.formType = 'add';
            this.$refs.form.resetFields();
            this.form.description = '';
            this.form.active = true;
            this.modal = true;
        },
        editMaterial(index, form) {
            this.updateIndex = index;
            this.formType = 'edit';
            this.form = Object.assign({}, form);
            this.modal = true;
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const arr = this.form.gitPath.split('/');
                    this.form.name = arr[arr.length - 1].replace('.git', '');
                    if (this.formType === 'add') {
                        console.log(this.form);
                        Api.post('/materials/custom', this.form).then((res) => {
                            this.modal = false;
                            this.getMaterials();
                            this.$Notice.success({
                                title: '提示',
                                desc: '添加成功',
                                duration: 1
                            });
                        });
                    } else {
                        console.log(this.form);
                        Api.patch(`/materials/${this.updateIndex}`, {
                            update: this.form
                        }).then((res) => {
                            this.modal = false;
                            this.getMaterials();
                            this.$Notice.success({
                                title: '提示',
                                desc: '修改成功',
                                duration: 1
                            });
                        });
                    }
                }
            })
        }
    },
    mounted () {
        this.getMaterials();
    }
}
</script>

<style lang="less">
.section {
    margin-bottom: 40px;
}
h3 {
    margin-bottom: 10px;
}
.material-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    .left,
    .right {
        display: flex;
        align-items: center;
    }
    .info {
        .desc {
            font-size: 12px;
            color: #999;
            margin-top: 2px;
        }
    }
    .right {
        justify-content: flex-end;
        i {
            margin-right: 10px;
            cursor: pointer;
        }
    }
}
</style>
