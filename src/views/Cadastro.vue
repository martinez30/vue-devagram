<script lang="ts">
import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import loginIcone from "../assets/images/login.svg"
import senhaIcone from "../assets/images/senha.svg"
import usuarioIcone from "../assets/images/usuario.svg"
import InputImagem from "../components/InputImagem.vue"
import avatarIcone from "../assets/images/avatar.svg"

export default defineComponent({
    setup() {
        return {
            loginIcone,
            senhaIcone,
            usuarioIcone,
            avatarIcone
        }
    },
    data() {
        return {
            nome: "",
            email: "",
            senha: "",
            confirmarSenha: "",
            loading: false,
            error: "",
            inputLoginFocus: false,
            inputSenhaFocus: false,
            imagem: null
        };
    },
    methods: {
        async cadastrar() {
            try {

            }
            catch (e: any) {
                console.log(e)
                if (e?.response?.data?.erro) {
                    this.error = e?.response?.data?.erro
                }
                else {
                    this.error = 'Nao foi possivel efetuar o cadastro, tente novamente'
                }
            }
            finally {
                this.loading = false;
            }
        },
        setNome(v: any) {
            this.nome = v;
        },
        setEmail(v: any) {
            this.email = v;
        },
        setSenha(v: any) {
            this.senha = v;
        },
        setConfirmacao(v: any) {
            this.confirmarSenha = v;
        },
        setImagem(v: any) {
            this.imagem = v;
        }
    },
    computed: {
        buttonText() {
            return this.loading ? '... Carregando' : 'Cadastrar'
        }
    },
    components: { InputPublico, InputImagem }
})
</script>
    
<template>
    <div :class="['container-publico', 'cadastro']">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo">
        <form action="">
            <InputImagem :imagem="imagem" alt="Foto do usuario" @setImagem="setImagem" />

            <p v-if="error" class="error">{{error}}</p>

            <InputPublico :icone="usuarioIcone" :model-value="nome" placeholder="Nome Completo"
                alt="Insira o nome completo" tipo="text" @setInput="setNome" />

            <InputPublico :icone="loginIcone" :model-value="email" placeholder="Email" alt="Insira o login" tipo="text"
                @setInput="setEmail" />

            <InputPublico :icone="senhaIcone" :model-value="senha" placeholder="Senha" alt="Insira a senha"
                tipo="password" @setInput="setSenha" />

            <InputPublico :icone="senhaIcone" :model-value="confirmarSenha" placeholder="Confirma Senha"
                alt="Insira a confirmacao de senha" tipo="password" @setInput="setConfirmacao" />

            <button @click.enter.prevent="cadastrar" :disabled="loading">{{ buttonText }}</button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <RouterLink :to="{ name: 'login' }">Faça seu login agora!</RouterLink>
            </div>
        </form>
    </div>
</template>
    
<style lang="scss" src="@/assets/styles/paginaPublica.scss">

</style>