# dialog-drag指令
1. 使用position: absolute; 实现定位
2. 水平居中方式使用left: calc((100% - 设置的弹窗宽度)/2) 的方式居中， 垂直居中使用top:50%;transform:translateY(-50%) 实现
3. 取消margin的所有样式均用top,left,right,bottom 取代
4. 计算边界值比较清晰
5. 可以通过dragHand 设置class名称控制可以拖拽哪些部位， 可以设置 .el-dialog || .el-dialog__header， 当前仅支持这两个拖拽，如果需要添加其他的拖拽hand， 需要调整指令中的 dialogHeaderElL，dialogHeaderElT 参数

#### 第一种方式： 普通设置， 仅水平居中
```
1. 不使用垂直居中，仅通过top值设置顶部距离， 需要设置
<el-dialog class="unusualInfo-dialog"
        v-dialogdrag="{dialogTop: '15%', dragHand: '.el-dialog', dialogLeft: 'calc((100% - 1000px)/2)'}"
        :title="'展示标题'"
        :visible.sync="midVisible">
</el-dialog>


```

#### 第二种方式： 弹窗 水平垂直居中
```
1. 使用垂直居中， 需要设置isMiddle: true属性, top: 50%,
<el-dialog class="unusualInfo-dialog"
        v-dialogdrag="{isMiddle:true, dialogTop: '50%', dialogLeft: 'calc((100% - 1000px)/2)'}"
        :title="'展示标题'"
        :visible.sync="midVisible">
</el-dialog>

2. 如果本身存在transform属性， 需要设置style 对指令中的transform：translateY(-50%) 进行覆盖， 
如果本身没有transform属性则不需要设置style， 如果需要针对.el-dialog 设置其它行内样式 也可以通过style进行设置
<el-dialog class="unusualInfo-dialog"
        v-dialogdrag="{isMiddle:true, style:{transform:'rotate(90deg) translateY(-50%)'}, dialogTop: '50%', dialogLeft: 'calc((100% - 1000px)/2)'}"
        :title="'展示标题'"
        :visible.sync="midVisible">
</el-dialog>
```


# drag 指令
使用方式和dialog-drag 相同， 但需要自己定义html元素层级和必须的classname

```
1. 仿照el-dialog 拖拽生成的html文本
2. .test-draggable-parent 为可以拖拽的弹窗的活动范围
3. .test-draggable-wraper 添加v-drag的指令的元素
4. .draggable 相当于 el.dialog 可以移动的弹框, draggable内部的dom是显示的内容
5. .drag-hand 相当于 el-dialog__header 允许拖拽的框 可以设置到 .draggable上 或者.draggable内部的dom元素；

<div v-if="midVisible5"
        class="test-draggable-parent">
        <div class="test-draggable-wraper"
        v-drag="{dialogTop: '15%', dialogLeft: 'calc((100% - 500px)/2)'}"
        style="z-index: 2001;">
        <div class="draggable box-wraper">
                <div class="drag-hand">
                        <span class="el-dialog__title">显示dialog测试拖拽指令5</span>
                        <el-button type="button"
                                @click="close">
                                <i class="el-icon-close"></i>
                        </el-button>
                </div>
                <div class="desc">
                        展示内容
                </div>
        </div>
        </div>
</div>
```