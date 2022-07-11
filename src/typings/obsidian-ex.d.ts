import type { DataviewApi } from "api/plugin-api";
import "obsidian";

declare module "obsidian" {
    interface MetadataCache {
        trigger(...args: Parameters<MetadataCache["on"]>): void;
        trigger(name: string, ...data: any[]): void;
    }

    interface App {
        appId?: string;
        plugins: {
            enabledPlugins: Set<string>;
            plugins: {
                dataview?: {
                    api: DataviewApi;
                };
                "obsidian-second-brain"?: {
                    taskFromLine: (checked: boolean, line: string, vault: Vault) => any
                };
                "obsidian-party"?: {
                    taskEffect: (target: HTMLElement) => void
                }
            };
        };
    }

    interface Workspace {
        /** Sent to rendered dataview components to tell them to possibly refresh */
        on(name: "dataview:refresh-views", callback: () => void, ctx?: any): EventRef;
    }
}

declare global {
    interface Window {
        DataviewAPI?: DataviewApi;
    }
}
