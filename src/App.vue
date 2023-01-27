<template>

    <div>
        <Header></Header>
        <router-view></router-view>
        <Footer v-show="!$route.meta.closeFooter"></Footer>        
        <!-- <Test/> -->
    </div>

</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import Test from '@/components/Test.vue'
    

    export default {
        name: 'App',

        components: {
            Header,
            Footer,
            Test,
        },

        methods: {
            
        },

        mounted() {
            // console.log(this.$route);
            // 更新 vuex/home 里的 navList （如果本地存储有这不用发请求）
            if(JSON.parse(localStorage.getItem('navList'))) {
                this.$store.state.home.navList = JSON.parse(localStorage.getItem('navList'));
            } else {                
                this.$store.dispatch('home/updataNavList');
            }

        }
    }
</script>

<style>
</style>
