<script lang="ts" setup>
const router = useRouter()

const handleLogoClick = () => {
    router.push('/')
}
</script>

<template>
    <div class="the-navbar">
        <div class="logo" @click="handleLogoClick" />

        <div class="item-list">
            <router-link class="item" to="/notes">
                My Notes
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.the-navbar {
    padding: 12px 24px;
    display: flex;
    color: $primary;
    .logo {
        border-radius: 4px;
        border: 4px solid $primary;
        width: 24px;
        height: 24px;
        transition: 400ms ease;
        cursor: pointer;
        &:hover {
            border-color: lighten($primary, 10%);
            transform: rotate(45deg);
        }
        &:active {
            border-color: darken($primary, 10%);
            transform: rotate(60deg) scale(.9);
        }
    }
    .item-list {
        margin-left: auto;
        display: flex;
        align-items: center;
        .item {
            margin-left: 12px;
            text-decoration: none;
            color: $primary;
            font-weight: bold;
            transition: 200ms ease;
            &:hover {
                border-color: lighten($primary, 10%);
            }
            &:active {
                border-color: darken($primary, 10%);
            }
        }
    }
}
</style>