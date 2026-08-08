import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import fs from "node:fs"
import os from "node:os"
import path from 'path';

/**
 * Recursively builds a tree node for shadcn-svelte DataTable with subrows.
 * Each row has a unique `id`, a `name`, `type`, `size`, `modified`, and
 * optional `subRows` array (only on folders) for the expandable tree.
 */
function buildTree(dirPath, depth = 0, maxDepth = 3) {
    let entries;
    try {
        entries = fs.readdirSync(dirPath, { withFileTypes: true });
    } catch {
        return [];
    }

    // Folders first, then files, both alphabetical
    entries.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });

    return entries
        .filter(e => !e.name.startsWith('.')) // skip hidden files
        .map(entry => {
            const fullPath = path.join(dirPath, entry.name);
            const isDir = entry.isDirectory();

            let stat = null;
            try { stat = fs.statSync(fullPath); } catch { /* skip unreadable */ }

            const node = {
                id: fullPath,
                name: entry.name,
                type: isDir ? 'folder' : path.extname(entry.name) || 'file',
                size: stat && !isDir ? formatBytes(stat.size) : null,
                modified: stat ? stat.mtime.toISOString().split('T')[0] : null,
            };

            if (isDir) {
                node.subRows = depth < maxDepth
                    ? buildTree(fullPath, depth + 1, maxDepth)
                    : [];
            }

            return node;
        });
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export const GET: RequestHandler = async () => {
    const tree = buildTree(path.resolve(os.homedir(), "Harrison Labs"));
    return json(tree);
}


