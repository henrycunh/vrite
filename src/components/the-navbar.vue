<script lang="ts" setup>
import CreateIcon from '~icons/carbon/add'
import AllNotesIcon from '~icons/carbon/list'

import { useNoteStore } from '../store/notes'

const router = useRouter()
const route = useRoute()

const currentId = computed(() => route.params.id)
const { currentNote, openNotes } = toRefs(useNoteStore())

const handleLogoClick = () => {
    router.push('/')
}
</script>

<template>
    <div class="the-navbar">
        <div class="logo" @click="handleLogoClick" />
        <div class="tabs">
            <div :class="['tab', 'list', { '--is-active': route.path === '/notes' }]">
                <router-link class="link" to="/notes">
                    <all-notes-icon class="icon" /> my notes
                </router-link>
            </div>
            <note-tab 
                v-for="noteId in openNotes"
                :key="noteId"
                :note-id="noteId"
                :active="noteId === currentId"
                class="tab"
            />
        </div>
        <router-link class="new" to="/notes/new">
            <create-icon class="icon" />
        </router-link>

        <!-- <div class="save-note" v-if="currentNote.title">
            <save-icon class="icon" />
        </div> -->
        <!-- <div class="item-list">
            <router-link class="item" to="/notes">
                My Notes
            </router-link>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
.the-navbar {
    background: #333;
    display: flex;
    align-items: center;
    color: $primary;
    .logo {
        border-radius: 4px;
        border: 2px solid $background;
        width: 16px;
        height: 16px;
        transition: 400ms ease;
        cursor: pointer;
        margin: 0 1em;
        &:hover {
            border-color: lighten($background, 10%);
            transform: rotate(45deg);
        }
        &:active {
            border-color: darken($background, 10%);
            transform: rotate(60deg) scale(.9);
        }
    }
    & > .tabs {
        display: flex;
        & > .tab.list {
            margin-top: 8px;
            padding: 0.25em 1em;
            padding-top: .75em;
            border-radius: 4px 4px 0 0;
            display: flex;
            align-items: center;
            cursor: pointer;
            color: $background;
            font-family: Inconsolata, monospace;
            font-weight: bold;
            transition: 200ms ease-in-out;

            &.--is-active {
                background: $background;
                color: $primary;
                cursor: default;
                & > .link {
                    color: $primary;
                }
            }

            & > .link {
                color: $background;
                text-decoration: none;
                font-size: 1.25em;
                position: relative;
                bottom: 7px;
                display: flex;
                align-items: center;

                & > .icon {
                    margin-right: 8px;
                    font-size: .75em;
                    position: relative;
                    top: 1px;
                }
            }
        }
    }
    & > .new {
        margin-left: 1em;
        color: $background;
        position: relative;
        top: 4px;
        transition: 200ms ease-in-out;
        & > .icon {
            font-size: 1.5em;
        }
        &:hover {
            transform: scale(1.1);
        }
        &:active {
            transform: scale(1.05);
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