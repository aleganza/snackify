import { writable } from 'svelte/store';

export const authToken = writable<string | undefined>(undefined);
