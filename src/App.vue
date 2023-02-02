<template>
	<div>
		<!-- <TestTable></TestTable> -->
		<PageLog>
			<template v-slot:slotName="data">
				<div>
					{{data.data}}
				</div>
			</template>
		</PageLog>
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts">
import { WatchLoading } from '@/mixins/watch-loading';
import PageLog from '@/views/page-log/page-log.vue';
import TestTable from '@/views/test/table/index.vue';

// 监听loading的显示
WatchLoading();
</script>

<style scoped lang="scss">
// style
</style>
