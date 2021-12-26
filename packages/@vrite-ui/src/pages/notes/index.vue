<template>
    <main>
        <div class="note-list" v-if="hasNotes">
            <h1>my notes</h1>
            <div 
                v-for="note in notes"
                :key="note.id"
                class="note"
            >
                <note-icon class="icon" />
                <div class="title">
                    <router-link class="link" :to="`/notes/${note.id}`">
                        {{ note.title }}
                    </router-link>
                </div>
                <div class="delete" @click="removeNote(note.id)">
                    <delete-icon class="icon" />
                </div>
            </div>
        </div>
        <div v-else class="no-notes">
            you don't have any notes yet.
            <div class="create">
                <router-link class="link" to="/notes/new">
                    <create-icon class="icon" />
                    <span>create a note</span>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import NoteIcon from '~icons/carbon/notebook'
import DeleteIcon from '~icons/carbon/delete'
import CreateIcon from '~icons/carbon/add'

import { useNoteStore } from '../../store/notes';

const { notes } = toRefs(useNoteStore())
const { removeNote } = useNoteStore()
const hasNotes = computed(() => Boolean(notes.value.length))
</script>

<style lang="scss" scoped>
main {
    max-width: 600px;
    margin: 0 auto;
    .no-notes {
        display: flex;
        flex-direction: column;
        padding: 4em 0;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        color: #aaa;
        font-size: 1.5em;
        .create {
            display: flex;
            margin-top: 1em;
            .link {
                display: flex;
                align-items: center;
                @include link;
            }
        }
    }
    .note-list {
        padding: 2em 1.5em;
        .note {
            display: flex;
            font-size: 1.25em;
            margin-bottom: 1em;
            & > .title > .link {
                @include link;
            }
            & > .icon {
                color: #aaa;
                margin-right: 8px;
            }
            & > .delete {
                margin-left: auto;
                color: #aaa;
                cursor: pointer;
                transition: 200ms ease-in-out;
                &:hover {
                    opacity: .6;
                }
                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
}    
</style>

<route lang="yaml">
meta:
    layout: default
    auth: true
</route>