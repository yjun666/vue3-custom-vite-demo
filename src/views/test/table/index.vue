<template>
	<div>
		<Table :config="config"
			:columns="columns"
			:rowData="rowData"
			:pagination="pagination"
			:spanMethod="spanMethod"
			@rowClickEvent="rowClickEvent"
			@headerClickEvent="headerClickEvent"
			@clickEventNameClick="clickEventNameClick"
			@handleSizeChange="handleSizeChange"
			@handleCurrentChange="handleCurrentChange"
			@emitCheckedList="getTableCheckedList">
			<template v-slot:slot_empty>
				<!-- 没有数据时展示的默认内容 -->
				<div>当前暂无数据!!!</div>
			</template>
			<template v-slot:slot_custom_header="scope">
				<!-- 碍于table 组件 header 中slot写法限制 === slot_custom_header 只能在table组件中写死， 只能在这一个插槽中使用v-if的方式开发自定义header -->
				<!-- 自定义header -->
				<div v-if="scope.col.prop === 'name'"
					style="color: red">自定义header value={{ scope.data.column.label }}</div>
				<div v-else-if="scope.col.prop === 'shop'"
					style="color: red">自定义header value={{ scope.data.column.label }}</div>
			</template>
			<template v-slot:slot_custom_column="scope">
				<!-- 自定义column 类型 -->
				<div style="font-weight: bolder">
					自定义 <span style="color: orange">整列column插槽</span>
					value={{ scope.data.row[scope.data.column.property] }}
				</div>
			</template>
			<template v-slot:slot_name="scope">
				<!-- 单独自定义 某一个单元格的 类型------自定义标志了name字段的单元格 -->
				<div style="font-weight: bolder">
					自定义 <span style="color: orange">name 单元格插槽</span>
					value={{ scope.data.row[scope.data.column.property] }}
				</div>
			</template>
			<template v-slot:slot_address="scope">
				<!-- 单独自定义 某一个单元格的 类型------自定义标志了address字段的单元格 -->
				<div style="font-weight: bolder">
					自定义 <span style="color: orange">address 单元格插槽</span>
					value={{ scope.data.row[scope.data.column.property] }}
				</div>
			</template>
			<template v-slot:slot_custom_operator="scope">
				<!-- 自定义操作列 -->
				<div style="font-weight: bolder">
					<el-button size="small"
						type="primary"
						@click="edit(scope)">编辑</el-button>
					<el-button size="small"
						type="primary"
						@click="deleteData(scope)"> 删除 </el-button>
					<!-- <el-button type="primary" v-if="scope.data.$index%2===0" @click="deleteData(scope)"
              >删除</el-button> -->
				</div>
			</template>
		</Table>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef, inject } from 'vue';
import Table from '@/components/table/index.vue';
export default defineComponent({
	name: 'TestTable',
	inject: ['$utils'],
	data() {
		return {
			columns: [
				{
					fixed: false,
					prop: 'name',
					label: '姓名',
					// width: "150",
					// minWidth: "400",
					resizable: false,
					slot_header: 'slot_custom_header', // 自定义的header的slot
					slot_column: 'slot_custom_column', // 自定义的column的slot
					type: '' // 默认是空， 使用slot模式， 如果没有定义slot， 使用header 和 column 内的默认展示
				},
				{
					fixed: false,
					prop: 'phone',
					label: '电话',
					// width: "80",
					// minWidth: "60",
					resizable: false,
					slot_header: '', // 默认default， 及不匹配任何slot
					slot_column: '', // // 默认default， 及不匹配任何slot
					type: '',
					align: 'center', // 文本的对其方式
					clickEventName: 'clickEventNameClick' // 单元格默认点击事件
				},
				{
					fixed: false,
					prop: 'address',
					label: '地址',
					// width: "",
					// minWidth: "",
					resizable: false,
					slot_header: '',
					slot_column: '',
					type: '',
					align: 'center' // 文本的对其方式
				},
				{
					fixed: false,
					prop: 'desc',
					label: '描述',
					// width: "",
					// minWidth: "",
					resizable: false,
					slot_header: '',
					slot_column: '',
					type: '',
					align: 'center' // 文本的对其方式
				},
				{
					fixed: false,
					prop: 'shop',
					label: '店铺',
					// width: "",
					// minWidth: "",
					resizable: false,
					slot_header: 'slot_custom_header',
					slot_column: '',
					type: '',
					align: 'center' // 文本的对其方式
				},
				{
					fixed: false,
					prop: 'date',
					label: '日期',
					// width: "",
					// minWidth: "",
					resizable: false,
					slot_header: '',
					slot_column: '',
					type: '',
					align: 'center' // 文本的对其方式
				},
				{
					fixed: false,
					prop: 'operator',
					label: '操作',
					width: '250',
					minWidth: '150',
					resizable: false,
					slot_header: '',
					slot_column: 'slot_custom_operator',
					type: '',
					align: 'center' // 文本的对其方式
				},
				{
					fixed: 'right',
					prop: 'moreHeader',
					label: '多级表头',
					width: '300',
					minWidth: '',
					resizable: false,
					slot_header: '',
					slot_column: '',
					type: '',
					align: 'center', // 文本的对其方式
					children: [
						{
							fixed: false,
							prop: 'name',
							label: '名字',
							width: '100',
							minWidth: '',
							resizable: false,
							slot_header: 'slot_custom_header',
							slot_column: '',
							type: '',
							align: 'center' // 文本的对其方式
						},
						{
							fixed: false,
							prop: 'date',
							label: '地址',
							width: '200',
							minWidth: '',
							resizable: false,
							slot_header: '',
							slot_column: '',
							type: '',
							align: 'center', // 文本的对其方式
							children: [
								{
									fixed: false,
									prop: 'shop',
									label: '省份',
									width: '100',
									minWidth: '',
									resizable: false,
									slot_header: 'slot_custom_header',
									slot_column: '',
									type: '',
									align: 'center' // 文本的对其方式
								},
								{
									fixed: false,
									prop: 'address',
									label: '邮编',
									width: '100',
									minWidth: '',
									resizable: false,
									slot_header: '',
									slot_column: '',
									type: '',
									align: 'center' // 文本的对其方式
								}
							]
						}
					]
				}
			],
			config: {
				tableLoading: false,
				indexColumn: {
					isShowIndex: true
				},
				checkboxColumn: {
					isShowCheckbox: true
				},
				key: 'customId', // 表格行的唯一标识字段 自定义id === customId
				tableType: 'multiHeader', // 表格类型 1. val===common 普通表格 2. val===multiHeader 多级表头表格
				// tableType: 'common', // 表格类型 1. val===common 普通表格 2. val===multiHeader 多级表头表格
				children: 'children' // 多级表格时的需要设置子集的list字段
			},
			rowData: [
				{
					name: 'uhjuh', // 展示所用字段
					phone: 12, // 展示所用字段
					address: 34, // 展示所用字段
					shop: 56, // 展示所用字段
					desc: 78, // 展示所用字段
					date: '2021-09-09', // 展示所用字段

					slot_name_name: 'slot_name', // 只单独定义某一个单元格， 自定义第一条数据的 name 的slot, 以slot_name 为前缀
					slot_name_address: 'slot_address', // 只单独定义某一个单元格， 自定义第一条数据的 address 的slot 以slot_name 为前缀
					class_column_phone: 'class_phone_val', // phone 字段列的默认展示时的自定义每一个单元格的class名称， 以class_column 为前缀
					class_column_shop: 'class_shop_val', // name 字段列的默认展示时的自定义每一个单元格的class名称, 以class_column 为前缀

					disabled: false, // 是否禁用多选框的选中
					checked: true // 是否选中
				},
				{
					name: 'uhjuh',
					phone: 12,
					address: 34,
					shop: 56,
					desc: 78,
					date: '2021-09-09',

					disabled: false, // 是否禁用多选框的选中
					checked: false // 是否选中
				},
				{
					name: 'uhju12h',
					phone: 12,
					address: 34,
					shop: 56,
					desc: 78,
					date: '2021-09-09',

					disabled: false, // 是否禁用多选框的选中
					checked: true // 是否选中
				},
				{
					name: 'uhjuh',
					phone: 12,
					address: 34,
					shop: 56,
					desc: 78,
					date: '2021-09-09',

					slot_name_name: 'slot_name', // 只单独定义某一个单元格， 自定义第一条数据的 name 的slot, 以slot_name 为前缀
					slot_name_address: 'slot_address', // 只单独定义某一个单元格， 自定义第一条数据的 address 的slot 以slot_name 为前缀
					class_column_phone: 'class_phone_val676asdf', // phone 字段列的默认展示时的自定义每一个单元格的class名称， 以class_column 为前缀
					class_column_shop: 'class_shop_valijmoosjsj', // name 字段列的默认展示时的自定义每一个单元格的class名称, 以class_column 为前缀

					disabled: true, // 是否禁用多选框的选中
					checked: false // 是否选中
				}
			],
			// 合并单元格方法
			spanMethod: ({ row, column, rowIndex, columnIndex }: any) => {
				if (rowIndex % 2 === 0) {
					if (columnIndex === 3) {
						return [1, 2];
					} else if (columnIndex === 4) {
						return [0, 0];
					}
				}
				if (columnIndex === 5 && rowIndex === 1) {
					return {
						rowspan: 2,
						colspan: 2
					};
				} else if ((columnIndex === 6 && rowIndex === 1) || (columnIndex === 6 && rowIndex === 2) || (columnIndex === 5 && rowIndex === 2)) {
					return {
						rowspan: 0,
						colspan: 0
					};
				} else {
					return {
						rowspan: 1,
						colspan: 1
					};
				}
			},
			checkedItemList: [],
			pagination: {
				pageNum: 1,
				pageSize: 10,
				total: 100,
				pageSizes: [10, 20, 30, 50, 80, 100]
			},
			$utils: {} as any
		};
	},
	components: {
		Table
	},
	mounted() {
		console.log(this.$utils);
		this.getDemoTableData();
	},
	methods: {
		async getDemoTableData() {
			try {
				this.config.tableLoading = true;
				// let res = await getDemoTableList({
				// 	pageNum: this.pagination.pageNum,
				// 	pageSize: this.pagination.pageSize
				// });
				// res.data.map(x => {
				// 	x.disabled = !!x.status;
				// 	x.checked = !x.status;
				// 	// console.log(x.checked);
				// });
				setTimeout(() => {
					this.rowData = this.rowData.map((x: any) => {
						x.customId = this.$utils.getRandom(15, 'id_');
						return x;
					});
					this.config.tableLoading = false;
				}, 1000);
			} catch (error) {
				setTimeout(() => {
					this.config.tableLoading = false;
				}, 1000);
				console.log(error);
			}
		},
		/**
		 * 分页每页的数据条数变化
		 */
		handleSizeChange(val: any) {
			console.log('分页每页的数据条数变化', val);
			this.pagination.pageSize = val;
			this.getDemoTableData();
		},
		/**
		 * 分页页数变化
		 */
		handleCurrentChange(val: any) {
			console.log('分页页数变化', val);
			this.pagination.pageNum = val;
			this.getDemoTableData();
		},
		/**
		 * 监听表格中默认类型的点击事件
		 */
		clickEventNameClick(item: any) {
			console.log(item);
		},
		/**
		 * 监听表格中表格整行的事件, 对于合并了单元格的列不生效
		 */
		rowClickEvent(item: any) {
			console.log(item);
		},
		/**
		 * 监听表格中heder的点击事件
		 */
		headerClickEvent(item: any) {
			console.log(item);
		},
		/**
		 * 获取表格子组件的多选列表
		 */
		getTableCheckedList(data: any) {
			this.checkedItemList = data;
		},
		/**
		 * 编辑事件
		 */
		edit(scope: any) {
			console.log('edit', scope);
		},
		/**
		 * 删除数据
		 */
		deleteData(scope: any) {
			console.log('deleteData', scope);
		}
	},
	setup(props, context) {
		return { props, context };
	}
});
</script>
<style lang="scss" scoped>
.table-wraper {
	// border: 1px solid #000;
	// width: 900px;
	height: 400px;
}
.class_phone_val {
	color: rgb(20, 240, 104);
}
</style>