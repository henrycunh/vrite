<template>
    <div 
        :class="['note-tab', { '--is-active': active }]"
        @click="handleClick"
    >
        <note-title 
            :active="active" 
            v-model="currentNote" 
            @update:model-value="updateNoteTitle"
            class="title"
        />
        <div class="close" @click="closeTab">
            <close-icon class="icon" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useNoteStore } from '../store/notes';
import CloseIcon from '~icons/carbon/close'

const props = defineProps<{ 
    noteId: string,
    active?: boolean 
}>()
const { notes } = toRefs(useNoteStore())
const { updateNote, closeNote } = useNoteStore()
const currentNote = ref('')
const router = useRouter()

onMounted(() => {
    notes.value.forEach(note => {
        if (note.id === props.noteId) {
            currentNote.value = note.title
        }
    })
})

watch(notes, () => {
    notes.value.forEach(note => {
        if (note.id === props.noteId) {
            currentNote.value = note.title
        }
    })
})

function handleClick () {
    if (!props.active) {
        router.push(`/notes/${props.noteId}`)
    }
}

function updateNoteTitle (title: string) {
    updateNote(props.noteId, { title })
}

function closeTab() {
    closeNote(props.noteId)
    router.push('/notes')
}
</script>

<style lang="scss" scoped>
.note-tab {
    margin-top: 8px;
    padding: 0.25em 1em;
    padding-top: .75em;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    background: transparent;
    cursor: pointer;
    & > .title {
        position: relative;
        bottom: 5px;
    }

    &.--is-active {
        background: $background;
        cursor: default;
        & > .close {
            color: $primary;
        }
    }

    & > .close {
        margin-left: 16px;
        cursor: pointer;
        position: relative;
        bottom: 5px;
        width: 1em;
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 200ms ease-in-out;
        border-radius: 4px;
        color: $background;
        &:hover {
            background: darken($background, 5%);
        }
    }
}
</style>