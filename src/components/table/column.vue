<template>
	<el-table-column :fixed="col.fixed || false"
		:prop="col.prop || ''"
		:label="col.label || ''"
		:width="col.width || '-'"
		:minWidth="col.minWidth || computeMinWidth(col.label)"
		:resizable="col.resizable || false"
		:show-overflow-tooltip="col.isShowOverflowTooltip || false"
		:align="col.align || 'left'">
		<template v-slot:header="scope">
			<slot :name="col.slot_header"
				:data="scope"
				:col="col">
				<div class="class_header_default"
					:class="['class_header_' + col.prop]">
					{{ col.label }}
				</div>
			</slot>
		</template>
		<template v-slot="scope">
			<slot :data="scope"
				:col="col">
				请配置正确的插槽 8</slot>
			<template v-if="col[children]&&col[children].length">
				<Column v-for="(item,k) in col[children]"
					:key="k"
					:col="item">
					<template v-slot:slot_custom_header="scope">
						<slot :name="scope.col.slot_header"
							:data="scope.data"
							:col="scope.col">
							<div>请配置正确的插槽 4</div>
						</slot>
					</template>
					<template v-slot="scope">
						<slot :data="scope.data"
							:col="scope.col">请配置正确的插槽 5</slot>
					</template>
				</Column>
			</template>
		</template>
	</el-table-column>
</template>
<script lang="ts">
import { TableIndexColumnMixin } from './table';
import { defineComponent } from 'vue';
const Column = defineComponent({
	props: {
		col: {
			type: Object,
			required: true
		},
		children: {
			// child 字段， 子列保存所在数据的字段名称， 是children、list或者是别的， 是什么这里就传什么
			type: String,
			required: false,
			default: 'children'
		}
	},
	mixins: [TableIndexColumnMixin],
	data() {
		return {};
	}
});
export default Column;
</script>
