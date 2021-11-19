<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs'
import DragAndDrop from 'editorjs-drag-drop'

onMounted(() => {
    const editor = new EditorJS({
        holder: 'editor',
        placeholder: `what's on your mind?`,
        onReady: () => {
            new DragAndDrop(editor)
        },
    })
})


</script>

<template>
    <div id="editor" />
</template>