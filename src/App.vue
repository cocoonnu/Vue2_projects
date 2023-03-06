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
    

    export default {
        name: 'App',

        components: {
            Header,
            Footer,
        },

        methods: {
            
        },

        mounted() {
            // 获取 navList
            let navList = JSON.parse(localStorage.getItem('navList'));
            if(navList) {
                this.$store.state.home.navList = navList;
            } else {                
                this.$store.dispatch('home/updataNavList');
            }

            // 获取用户信息
            this.$store.dispatch('user/getUserInfo');

        }
    }
</script>

<style>
</style>
