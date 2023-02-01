<template>
	<div class="errPage-container">
		<el-button icon="el-icon-arrow-left"
			class="pan-back-btn"
			@click="back">
			返回
		</el-button>
		<el-row>
			<el-col :span="12">
				<h2>你没有权限去该页面</h2>
				<ul class="list-unstyled">
					<li>
						<a href="#"
							@click.prevent="dialogVisible=true">点我看图</a>
					</li>
				</ul>
			</el-col>
			<el-col :span="12">
				<img :src="newErrGif"
					width="313"
					height="428"
					alt="Girl has dropped her ice cream.">
			</el-col>
		</el-row>
		<el-dialog v-model="dialogVisible"
			title="随便看">
			<img :src="ewizardClap"
				class="pan-img">
		</el-dialog>
	</div>
</template>

<script lang="ts" setup>
import errGif from '@/assets/img/401_images/401.gif';
import router from '@/router';
let newErrGif = errGif + '?' + +new Date();
let ewizardClap = 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646';
let dialogVisible = false;
const back = () => {
	router.go(-1);
};
</script>

<style lang="scss" scoped>
.errPage-container {
	width: 800px;
	max-width: 100%;
	margin: 100px auto;
	.pan-back-btn {
		background: #008489;
		color: #fff;
		border: none !important;
	}
	.pan-gif {
		margin: 0 auto;
		display: block;
	}
	.pan-img {
		display: block;
		margin: 0 auto;
		width: 100%;
	}
	.text-jumbo {
		font-size: 60px;
		font-weight: 700;
		color: #484848;
	}
	.list-unstyled {
		font-size: 14px;
		li {
			padding-bottom: 5px;
		}
		a {
			color: #008489;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
}
</style>
