<script lang="ts">
	import WindowPane from "$lib/components/WindowPane.svelte";
	import { columns } from "$lib/windows/file-explorer/columns";
	import DataTable from "$lib/windows/file-explorer/DataTable.svelte";
	import { onMount } from "svelte";
	import "@xterm/xterm/css/xterm.css";
	import { Terminal } from "@xterm/xterm";

	let activeId = $state<number | undefined>();
	let windows = $state([
		{
			x: 0,
			y: 0,
			w: "1/2",
			id: 0,
			active: true,
		},
		{
			x: 1,
			y: 0,
			w: "1/2",
			id: 1,
			active: false,
		},
	]);

	const updateActive = (winId: number) => {
		windows = windows.map((win) =>
			win.id === winId ? { ...win, active: true } : win,
		);
	};

	const term = new Terminal({ convertEol: true });
	let files = $state(null);
	onMount(() => {
		// const res = await fetch("/api/files");
		// files = await res.json();
		// const interop = "Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ";
		// term.open(document.getElementById("terminal")!);
		// term.write(interop);
		// term.onData((data) => {
		// 	term.write(data);
		// });
		// term.onKey(({ key }) => {
		// 	switch (key) {
		// 		case "\r":
		// 			console.log(term.rows);
		// 			term.write("\r\n" + interop);
		// 			term.refresh(0, term.cols);
		// 	}
		// });
		// window.alertHello("Hello from +page");
		// console.log("Alert hello afters");
		const windows = document.getElementsByTagName("iframe");
		for (let win of windows) {
			// @ts-ignore no idea
			win.contentWindow.api = {
				alertHello: (msg: string) => window.alertHello(msg),
				buildMenu: (menu: any) => console.log(menu),
			};
		}
	});
</script>

<div class="w-full h-full flex bg-card/30">
	<WindowPane
		data-active={0 === activeId ? "" : undefined}
		{updateActive}
		win={{ name: "Mol*" }}
	>
		<iframe
			title="Molstar"
			class="iframe w-full h-full"
			src="/viewer/index.html"
			style="border:0;"
			loading="lazy"
		></iframe>
	</WindowPane>

	<WindowPane {updateActive} win={{ name: "Window" }}>
		<iframe
			title="Vite Test"
			class="iframe w-full h-full"
			src="/vitetest/index.html"
			style="border:0;"
			loading="lazy"
		></iframe>
	</WindowPane>
	<!-- {#each windows as win, i (win.id)}
		<WindowPane
			onmouseenter={() => (activeId = win.id)}
			onmouseleave={(e) => {
				if (!e.currentTarget.containes(e.relatedTarget)) {
					activeId = undefined;
				}
			}}
			data-active={win.id === activeId ? "" : undefined}
			{updateActive}
			{win}
		>
			{#if i == 0}
				{JSON.stringify(files, null, 2)}
			{:else if files}
				<DataTable {columns} data={files} />
			{/if}
		</WindowPane>
	{/each} -->
</div>
