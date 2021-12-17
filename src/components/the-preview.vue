<template>
    <div v-html="content" class="the-preview" />
</template>

<script lang="ts" setup>
defineProps<{ content: string }>()
</script>

<style lang="scss">
.the-preview {
    blockquote {
        margin-left: 0;
        padding-left: 1em;
        border-left: 2px solid #aaa;
    }
    ul {
        padding-left: 1em;
    }
    code {
        padding: .2em .5em;
        background: #e1e1e1;
        border-radius: 2px;
        border-bottom: 1px solid #aaa;

    }

}
</style>