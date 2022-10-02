<script lang="ts">
import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import loginIcone from "../assets/images/login.svg"
import senhaIcone from "../assets/images/senha.svg"
import { LoginServices } from '../services/LoginServices';
import router from '../router';
import Loading from "vue3-loading-overlay"

const loginService = new LoginServices();

export default defineComponent({
    setup() {
        return {
            loginIcone,
            senhaIcone,
            loginService
        }
    },
    data() {
        return {
            login: "",
            senha: "",
            loading: false,
            error: "",
            inputLoginFocus: false,
            inputSenhaFocus: false
        };
    },
    methods: {
        async efetuarLogin() {
            try {
        this.loading = true;
                if (!this.login || !this.login.trim() || !this.senha || !this.senha.trim() ) {
                    this.error = "Favor preencher o formulario";
                    return;
                }
                this.loading = true;
                await loginService.login({ login: this.login, senha: this.senha })
                router.push({ name: 'home' })
            }
            catch (e: any) {
                console.log(e)
                if(e?.response?.data?.erro){
                    this.error = e?.response?.data?.erro
                }
                else {
                    this.error = 'Nao foi possivel efetuar o login, tente novamente'
                }
            }
            finally {
                this.loading = false;
            }
        },
        setLogin(v: any) {
            this.login = v;
        },
        setSenha(v: any) {
            this.senha = v;
        }
    },
    computed: {
        buttonText() {
            return this.loading ? '... Carregando' : 'Login'
        }
    },
    components: { InputPublico, Loading }
})
</script>

<template>
  <Loading :active="loading" :can-cancel="false" color="#5E49FF" :is-full-page="true" />
    <div class="container-publico" v-if="!loading">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo">
        <form action="">
            <p v-if="error" class="error">{{error}}</p>
            <p v-if="$route.query.cadastroComSucesso" class="sucesso">Cadastro efetuado com sucesso, faça o login</p>
            <InputPublico :icone="loginIcone" :model-value="login" placeholder="Email" alt="Insira o login" tipo="text"
                @setInput="setLogin" />
            <InputPublico :icone="senhaIcone" :model-value="senha" placeholder="Senha" alt="Insira a senha"
                tipo="password" @setInput="setSenha" />
            <button 
                @click.enter.prevent="efetuarLogin"
                :disabled="loading"
            >{{ buttonText }}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <RouterLink :to="{name: 'cadastro'}" >Faça seu cadastro agora!</RouterLink>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss">

</style>