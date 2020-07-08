import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("./theme/Login.vue");
const NotFound = () => import("./theme/NotFound.vue");
const Home = () => import("./components/HomePage.vue");
const SignUp = () => import("./components/sign-up/SignUpPage.vue");
const CurrencyList = () => import("./components/catalogs/currencies/CurrencyList.vue");
const RateList = () => import("./components/catalogs/currencies/RateList.vue");

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    linkActiveClass: "is-active",
    routes: [
        { path: "/login", component: Login },
        { path: '/home', component: Home },
        { path: '/signup', component: SignUp },
        { path: '/currencies', component: CurrencyList },
        { path: '/rates/:id', name: 'rates', component: RateList },
        { path: "/", redirect: '/home' },
        { path: "*", component: NotFound }
    ]
});

export default router;
