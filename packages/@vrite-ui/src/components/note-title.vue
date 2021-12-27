<template>
    <input 
        type="text" 
        :class="['current-note-title', { '--is-active': active }]" 
        :style="{ width: widthInCh }"
        :value="modelValue"
        @input="handleInput" 
        :disabled="!active"
    >
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: string, active?: boolean }>()
const emit = defineEmits(['update:modelValue'])

function handleInput (event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const widthInCh = computed(() => 
    `${props.modelValue.length}ch`
)
</script>

<style lang="scss" scoped>
.current-note-title {
    border: 0;
    outline: none;
    font-size: 1.25em;
    font-weight: 600;
    padding: 0;
    margin: 0;
    color: $background;
    border-bottom: 2px solid #eee;
    border-color: transparent;
    transition: border-color 200ms ease-in-out;
    background: transparent;
    font-family: Inconsolata, monospace;
    cursor: pointer;

    &.--is-active {
        border-color: #eee;
        color: $primary;
        cursor: default;
        &:focus {
            border-color: #aaa;
        }
    }

    &:focus {
        border-bottom-color: #aaa;
    }
}
</style>