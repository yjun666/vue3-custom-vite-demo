<template>
	<div class="common-table-wraper"
		:class="tableConfig.tableWraperClassName"
		:id="tableWraperId">
		<el-table :data="tableRowData"
			:class="['custom-common-table',{ 'is-show-pagination': tableConfig.isShowPagination||(tableConfig.hideOnSinglePage&&!tableRowData.length), 'table-full-area': tableConfig.isTableFullArea }]"
			stripe
			:size="tableConfig.tableSize"
			:border="tableConfig.isShowTableBorderColumn"
			:row-key="(row) => row[tableConfig.key]"
			@row-click="rowClick"
			@row-dblclick="rowDblClick"
			@header-click="headerClick"
			:span-method="tableSpanMethod"
			:row-class-name="tableRowClassName"
			:cell-class-name="tableCellClassName"
			:highlight-current-row="tableConfig.highlightCurrentRow"
			:show-header="tableConfig.isShowHeader"
			@selection-change="handleCheckboxChange"
			v-loading="tableConfig.tableLoading"
			:element-loading-text="tableConfig.loadingText"
			element-loading-spinner="el-icon-loading"
			:height="tableConfig.tableHeight"
			:default-expand-all="tableConfig.expandColumn.defaultExpandAll"
			:expand-row-keys="expandRowKeys"
			@expand-change="expandChange"
			:ref="tableConfig.tableRef"
			style="width: 100%">
			<el-table-column v-if="tableConfig.expandColumn.isShowExpand"
				type="expand"
				:fixed="tableConfig.expandColumn.fixed"
				:label="tableConfig.expandColumn.label"
				:header-align="tableConfig.expandColumn.headerAlign"
				:align="tableConfig.expandColumn.align"
				:width="tableConfig.expandColumn.width"
				:resizable="tableConfig.expandColumn.resizable||false"
				:min-width="tableConfig.expandColumn.minWidth||'60'">
				<template v-slot="scope">
					<slot name="slot_expand"
						:data="scope">
						<div>暂无数据</div>
					</slot>
				</template>
			</el-table-column>
			<el-table-column v-if="tableConfig.checkboxColumn.isShowCheckbox"
				type="selection"
				:fixed="tableConfig.checkboxColumn.fixed"
				:label="tableConfig.checkboxColumn.label"
				:header-align="tableConfig.checkboxColumn.headerAlign"
				:align="tableConfig.checkboxColumn.align"
				:width="tableConfig.checkboxColumn.width"
				:resizable="tableConfig.checkboxColumn.resizable||false"
				:min-width="tableConfig.checkboxColumn.minWidth||'60'"
				:reserve-selection="true"
				:selectable="(row,index)=>!row.disabled">
			</el-table-column>
			<el-table-column v-if="tableConfig.indexColumn.isShowIndex"
				type="index"
				:fixed="tableConfig.indexColumn.fixed"
				:label="tableConfig.indexColumn.label"
				:header-align="tableConfig.indexColumn.headerAlign"
				:align="tableConfig.indexColumn.align"
				:width="tableConfig.indexColumn.width"
				:resizable="tableConfig.indexColumn.resizable||false"
				:min-width="tableConfig.indexColumn.minWidth||'60'">
				<template v-slot="scope">
					<slot name="slot_index"
						:data="scope">
						<div class="order">
							{{scope.$index}}
						</div>
					</slot>
				</template>
			</el-table-column>
			<template v-slot:empty>
				<slot name="slot_empty">
					<div>暂无数据</div>
				</slot>
			</template>
			<template v-if="tableConfig.tableType==='common'">
				<!-- 普通类型的表格---仅进行了循环遍历， 无法实现多级表头 -->
				<template v-for="(item, index) of tableColumns">
					<!-- 默认使用slot渲染， 无slot时使用默认展示数据 -->
					<el-table-column :key="index"
						:fixed="item.fixed || false"
						:prop="item.prop || ''"
						:label="item.label || ''"
						:width="item.width || '-'"
						:minWidth="item.minWidth || computeMinWidth(item.label)"
						:resizable="item.resizable || false"
						:show-overflow-tooltip="item.isShowOverflowTooltip || false"
						:align="item.align || 'left'"
						v-if="!item.type">
						<template v-slot:header="scope">
							<slot :name="item.slot_header"
								:data="scope"
								:col="item">
								<div class="class_header_default"
									:class="['class_header_' + scope.column.property]">
									{{ scope.column.label }}
								</div>
							</slot>
						</template>
						<template v-slot="scope">
							<slot v-if="scope.row['slot_name_' + item.prop]"
								:name="scope.row['slot_name_' + item.prop]"
								:data="scope"
								:col="item">
								<!-- 单独配置单元格slot -->
								<div>请配置正确的插槽 6</div>
							</slot>
							<slot v-else-if="item.slot_column"
								:name="item.slot_column"
								:data="scope"
								:col="item">
								<!-- 配置整列的slot -->
								<div>请配置正确的插槽 7</div>
							</slot>
							<!-- v-else-if="item.htmlRender" === 注释不能写在里边， 会报错， 使用html渲染， 如果有事件 在点击事件内部进行阻止事件传播 不允许同时触发rowClick事件 -->
							<div v-else-if="item.htmlRender"
								class="class_column_default"
								:class="['class_column_' + scope.column.property, scope.row['class_column_' + scope.column.property]]"
								@click="customCellClickEvent($event, item, scope)"
								v-html="item.htmlRender(scope)">
							</div>
							<div v-else
								class="class_column_default"
								:class="['class_column_' + scope.column.property, scope.row['class_column_' + scope.column.property]]"
								@click="customCellClickEvent($event,item, scope)">
								<!-- 默认展示 如果有事件 在点击事件内部进行阻止事件传播 不允许同时触发rowClick事件 -->
								{{ $utils.supplement(scope.row[scope.column.property]) }}
							</div>
						</template>
					</el-table-column>
				</template>
			</template>
			<template v-if="tableConfig.tableType === 'multiHeader'">
				<!-- 多级表头表格类型---可只使用多级表头类型表格， header的slot存在缺陷， header的slot名称只能写死，然后在外部代码中做条件判断渲染 -->
				<Column v-for="(cItem,k) in tableColumns"
					:key="k"
					:col="cItem"
					:children="tableConfig.children||'children'">
					<template v-slot:slot_custom_header="scope">
						<slot :name="scope.col.slot_header"
							:data="scope.data"
							:col="scope.col">
							<div>请配置正确的插槽 1</div>
						</slot>
					</template>
					<template v-slot="scope">
						<slot v-if="scope.data.row['slot_name_' + scope.col.prop]"
							:name="scope.data.row['slot_name_' + scope.col.prop]"
							:data="scope.data">
							<!-- 单独配置单元格slot -->
							<div>请配置正确的插槽 2</div>
						</slot>
						<slot v-else-if="scope.col.slot_column"
							:name="scope.col.slot_column"
							:data="scope.data">
							<!-- 配置整列的slot -->
							<div>请配置正确的插槽 3</div>
						</slot>
						<!-- v-else-if="item.htmlRender" === 注释不能写在里边， 会报错， 使用html渲染， 如果有事件 在点击事件内部进行阻止事件传播 不允许同时触发rowClick事件 -->
						<div v-else-if="scope.col.htmlRender"
							class="class_column_default"
							:class="['class_column_' + scope.col.prop, scope.data.row['class_column_' + scope.col.prop]]"
							@click="customCellClickEvent($event, scope.col, scope.data)"
							v-html="scope.col.htmlRender(scope.data)">
						</div>
						<div v-else
							class="class_column_default"
							:class="['class_column_' + scope.col.prop, scope.data.row['class_column_' + scope.col.prop]]"
							@click="customCellClickEvent($event, scope.col, scope.data)">
							<!-- 默认展示 如果有事件 在点击事件内部进行阻止事件传播 不允许同时触发rowClick事件 -->
							{{ $utils.supplement(scope.data.row[scope.col.prop]) }}
						</div>
					</template>
				</Column>
			</template>
		</el-table>
		<!--分页-->
		<el-config-provider v-if="tableConfig.isShowPagination"
			:locale="$ELEMENT.locale">
			<el-pagination class="table-pagination"
				:id="paginationId"
				background
				:hide-on-single-page="tableConfig.hideOnSinglePage"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				v-model:current-page="tablePagination.pageNum"
				:page-sizes="tablePagination.pageSizes"
				:page-size="tablePagination.pageSize"
				:layout="tablePagination.layout"
				:total="tablePagination.total">
			</el-pagination>
		</el-config-provider>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import {
	TableCustomMixin, // 表格的自定义部分 相关
	TableConfigMixin, // 表格配置相关
	PaginationMixin, // 分页相关
	TableDataMixin, // 表格row和column的赋值抽离
	CheckboxMixin, // checkbox 多选框相关
	TableCommonMixin, // 表格公共部分相关
	TableIndexColumnMixin
} from './table';
import Column from './column.vue';
const Table = defineComponent({
	name: 'Table',
	mixins: [TableCommonMixin, TableDataMixin, TableConfigMixin, PaginationMixin, CheckboxMixin, TableCustomMixin, TableIndexColumnMixin],
	components: {
		Column
	},
	setup(props, context) {
		return { props, context };
	}
});
export default Table;
</script>
<style lang="scss" scoped>
.common-table-wraper {
	width: 100%;
	height: 100%;
	@include flex() {
		flex-direction: column;
	}
}
::v-deep.el-table {
	width: 100%;
	flex: none;
	max-height: 100%; // 默认最大高度100%
	&.is-show-pagination {
		// 如果存在分页需要减去分页高度
		max-height: calc(100% - $table-pagination-height); // 表格随着数据增加可增加高度至撑满内容区域, 数据不够在分页下边显示空白
	}
	&.table-full-area {
		max-height: none; // 如果是撑满设置 不需要最大高度
		flex: 1; // 表格无论数据多少,分页始终显示在内容区域最底部
		.el-table__body-wrapper {
			// 设置一下默认高度， 动态设置表格后会被style样式覆盖
			height: 1000px; // 解决每次切换页面时横向滚动条闪动bug， 如果不加会先出现在表格下边然后跳到最下边
			max-height: 100%;
		}
	}
}

.table-pagination {
	width: 100%;
	height: $table-pagination-height;
	@include flex(center, center);
}
</style>