<template>
    <button :class="classList" @click="handleButtonClick">
        <slot />
    </button>
</template>

<script lang="ts" setup>
interface ButtonProps {
    secondary?: boolean
    outline?: boolean
}
const emit = defineEmits(['click'])
const props = defineProps<ButtonProps>()

const classList = computed(() => [{
    '--is-secondary': props.secondary,
    '--is-outline': props.outline,
}] )

const handleButtonClick = () => {
    emit('click')
}
</script>

<style lang="scss" scoped>
button {
    @include button-style;
}
</style>
