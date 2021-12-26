<template>
    <div class="login">
        <base-button @click="login" outline class="button">
            <login-icon class="icon" />
            Login
        </base-button>
    </div>
</template>

<script lang="ts" setup>
import LoginIcon from '~icons/carbon/login'
import { useAuth } from '../composables/auth'
import BaseButton from '../components/base/button.vue';

const { login, isLogged } = useAuth()
const router = useRouter()

onMounted(() => {
    if (isLogged.value) {
        router.push('/')
    }
})
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 500px;
    width: 100%;
    & > .button {
        font-size: 3em;
        &>.icon {
            margin-right: .25em;
        }
    }
}    
</style>