<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="(floor,index) in floorList" :key="index" :floor="floor" />
        <Brand/>
    </div>
</template>

<script>
    import ListContainer from './ListContainer'
    import Recommend from './Recommend'
    import Rank from './Rank'
    import Like from './Like'
    import Floor from './Floor'
    import Brand from './Brand'
    import {mapState} from 'vuex'

    export default {
        name: 'Home',

        components: {
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },

        computed: {
            ...mapState('home',['floorList']),
        },

        mounted() {
            // 获取 floor 数据
            this.$store.dispatch('home/updataFloorList');
        }

    }
</script>

<style>

</style>