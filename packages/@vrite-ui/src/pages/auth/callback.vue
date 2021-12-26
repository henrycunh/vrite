<template>
    <div class="login-callback">
        Logging in...
    </div>
</template>

<script lang="ts" setup>
import { useGithubOAuth2 } from '../../composables/auth/service';

const route = useRoute()
const router = useRouter()
const { getToken, getUserInfo } = useGithubOAuth2()

onMounted(async () => {
    // Checks if the user is logging in
    if (route.query.code) {
        // Gets token
        const { code, state } = route.query as { code: string, state: string }
        await getToken(code, state)
        await getUserInfo()
        router.push('/')
    }
})
</script>

<style lang="scss" scoped>
.login-callback {
    margin-top: 240px;
    text-align: center;
    color: #aaa;
    font-size: 2em;
}
</style>