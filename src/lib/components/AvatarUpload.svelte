<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { createEventDispatcher } from 'svelte';
	import { Label } from 'flowbite-svelte';

	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<input type="hidden" name="avatarUrl" value={url} />

<div class="flex items-center justify-center h-40 border border-gray-200 rounded">
	<div>
		{#if avatarUrl}
			<img src={avatarUrl} alt={avatarUrl ? 'Avatar' : 'No image'} class="h-32 w-32" />
		{/if}

		<Label for="upload-input" class="text-center cursor-pointer">
			{uploading ? 'Uploading ...' : 'Upload your avatar'}
		</Label>
		<input
			style="visibility: hidden; position:absolute;"
			type="file"
			id="upload-input"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>
