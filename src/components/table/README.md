#### 表格组件使用注意说明
```
demo-table.vue 基本涵盖了本组件的所有功能， 本次表格组件的设计封装主要以slot的形式进行写入
绝大部分js代码在./table.js中，进行了模块划分
排序和筛选功能没有实现， 一般筛选都是填写表单进行接口筛选，排序都是后端定义默认字段排序

1. 本组件可进行表格数据展示、自定义表格header、自定义表格column、通过slot写法可自定义事件样式展示等

2. 合并单元格 方法需要通过父组件通过props传值的方式传给表格组件一个spanMethod方法进行单元格合并

3. slot_empty slot 作为无数据时的自定义展示

4. config、columns、rowData数据参数说明在./table.js 中有进行说明

5. 表格设置多级表头时需要设置config.tableType=multiHeader, config.children=children两个字段使用递归组件的形式展示多级表头， 如果没有多级表头设置config.tableType=common采用普通的表格展示形式， 可仅使用多级表头表格进行渲染， 但存在无法自定义多个slot_header名称的缺陷， 可在外部做条件判断, 可全局搜索slot_custom_header看例子

6. rowData 数据中可通过条件判断设置 slot_name_+'col.prop' 设置单个单元格的slot单独设置单元格的展示操作; 通过class_column_+'col.prop' 设置单个单元格的class名称设置单个单元格style样式

7. rowData 中的disabled控制多选框的禁用状态; checked控制多选框的选中状态

8. 表格左侧或者右侧固定必须给固定列设置宽度

9. 添加了 htmlRender 方法进行v-html插入html模板进行渲染， 可渲染column列, 可渲染一些简单的逻辑操作, 复杂的html内容仍需使用slot插槽进行渲染

10. 
``` 