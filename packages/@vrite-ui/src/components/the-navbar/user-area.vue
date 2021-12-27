<template>
    <div class="user-area" v-if="user">
        <img :src="user.avatar_url" class="avatar" @click="openContainer" />
        <div class="container" ref="container" v-if="isContainerOpen">
            <div class="name">
                @{{ user.name }}
            </div>
            <div class="logout" @click="handleLogoutClick">
                <logout-icon class="icon" />
                Logout
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuth } from '../../composables/auth'
import LogoutIcon from '~icons/carbon/logout'
import { onClickOutside } from '@vueuse/core'

const { user, logout } = useAuth()

const isContainerOpen = ref(false)
const container = ref()

const openContainer = () => {
    isContainerOpen.value = true
}

const handleLogoutClick = () => {
    logout()
}

onClickOutside(container, () => {
    isContainerOpen.value = false
})
</script>

<style lang="scss" scoped>
.user-area {
    display: flex;
    align-items: center;

    & > .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        z-index: 1;
        transition: 200ms ease;
        &:hover {
            transform: scale(1.1);
        }
        &:active {
            transform: scale(1);
        }
    }

    & > .container {
        position: absolute;
        padding-top: 48px;
        padding-right: 48px;
        top: -48px;
        background: $background;
        right: 32px;
        color: #444;
        & > .name {
            padding: 1em;
            font-weight: bold;
            color: #444;
        }
        & > .logout {
            padding: 1em;
            cursor: pointer;
            display: flex;
            align-items: center;
            & > .icon {
                margin-right: .2em;
            }
        }
    }
}   
</style>