<template>
	<div>
		<PageLog>
			<template v-slot:slotName="data">
				<div>
					{{data.data}}
				</div>
			</template>
		</PageLog>
	</div>
</template>

<script setup lang="ts">
import PageLog from '@/views/page-log/page-log.vue';
</script>

<style scoped lang="scss">
</style>
