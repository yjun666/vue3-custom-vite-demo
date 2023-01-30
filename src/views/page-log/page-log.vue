<template>
	<!-- 页面打印及调试 -->
	<div>
		<slot :data="slotItem"
			name="slotName"></slot>
		<div>$utils.supplement()==== {{ $utils.supplement("") }}</div>
		<div>$utils.uuid()==== {{ uuid() }}</div>
		<div>VITE_CUSTOM_TEST==={{ VITE_CUSTOM_TEST(1, 2) }}</div>
		<div>NODE_ENV==={{ NODE_ENV }}</div>
		<div>
			formatDate(new Date(), "y-M-d h:m:s t")==={{formatDate(new Date(), "y-M-d h:m:s t")}}
		</div>
	</div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, computed, ref, inject } from 'vue';
const instance: any = getCurrentInstance();
const { uuid, formatDate } = instance.appContext.config.globalProperties.$utils;
console.log('import.meta.env.VITE_CUSTOM_TEST===' + import.meta.env.VITE_CUSTOM_TEST);
console.log('import.meta.env.MODE===' + import.meta.env.MODE);
console.log('instance.appContext.config.globalProperties.$utils.uuid()===' + uuid());
console.log('instance.appContext.config.globalProperties.$utils.formatDate()===' + formatDate(new Date(), 'y-M-d h:m:s t'));
let VITE_CUSTOM_TEST = computed(() => {
	return (a, b) => {
		console.log(a, b);
		return import.meta.env.VITE_CUSTOM_TEST;
	};
});
let NODE_ENV = computed(() => {
	return import.meta.env.MODE;
});
let slotItem = ref(0);
setInterval(() => {
	slotItem.value = slotItem.value + 1;
}, 1000);
</script>
<style lang="scss" scoped>
</style>