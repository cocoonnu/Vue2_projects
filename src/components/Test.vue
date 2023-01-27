<template>
	<div>
		<h1>{{a}}</h1>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				a,
			}
		},
	}
</script>

<style scoped>

	.nav {
		width: 100px;
		height: 200px;
		background: red;
	}

    @keyframes wipe-in-down {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
    }

    .down {
        animation: 1s cubic-bezier(.25, 1, .30, 1) wipe-in-down both;
    }

    @keyframes wipe-out-up {
		from {
			clip-path: inset(0 0 0 0);
		}
		to {
			clip-path: inset(0 0 100% 0);
		}
    }

    .up {
        animation: 1s cubic-bezier(.25, 1, .30, 1) wipe-out-up both;
    }


</style>