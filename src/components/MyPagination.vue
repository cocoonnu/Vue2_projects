<template>
	<!-- <div class="pagination">
		<button :disabled="pageNo == 1" @click="changePage(pageNo - 1)">上一页</button>
		
        <button 
            v-if="startAndEnd.start > 1" 
            @click="changePage(1)"
            :class="{active: pageNo == 1}"
        >
            1
        </button>
		
        <button v-if="startAndEnd.start > 2">···</button>

		<button 
            v-for="(item,index) in parseInt(startAndEnd.end)" 
            v-if="item >= startAndEnd.start"
            :key="index"
            @click="changePage(item)"
            :class="{active: item == pageNo}"
        >
            {{item}}
        </button>

		<button v-if="startAndEnd.end < totalPage - 1">···</button>
		
        <button 
            v-if="startAndEnd.end < totalPage" 
            @click="changePage(totalPage)"
            :class="{active: totalPage == pageNo}"
        >
            {{totalPage}}
        </button>

		<button :disabled="pageNo == totalPage" @click="changePage(pageNo + 1)">下一页</button>

		<button style="margin-left: 30px">共 {{total}} 条</button>
	</div> -->

    <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePage"
    >
    </el-pagination>

</template>

<script>
export default {
	name: "MyPagination",

    props: ["pageNo", "pageSize", "total", "continues"],

    computed: {
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },

        // 获取起始结束连续页
        startAndEnd() {
            // 连续页数、当前页数、总页数
            const { continues, pageNo, totalPage } = this;
            let start = 0, end = 0;

            if(continues > totalPage) {
                start = 1;
                end = totalPage;

                return {start, end}
            }

            start = pageNo - parseInt(continues / 2);
            end = pageNo + parseInt(continues / 2);
            
            if(start < 1) {
                start = 1;
                end = continues;
            }

            if(end > totalPage) {
                end = totalPage;
                start = totalPage - continues + 1;
            }
            return {start, end}          
        },
    },

    methods: {
        // 切换页面
        changePage(page) {
            this.$bus.$emit('getPageNo',page);
        },

    }

};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    margin: 20px 0;    
}
</style>
