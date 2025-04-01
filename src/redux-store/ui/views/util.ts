// ------------------------------------
// 🧱 Constants
// ------------------------------------
export const DEFAULT_WINDOW_ID = "DEFAULT";

// ------------------------------------
// 🧾 Types
// ------------------------------------
import { insertAt, Optional, toCamelCase } from "../../../util";

export type View = {
    label: string;
    id: string;
    window: string;
    active: boolean;
};

export type CreateViewType = Optional<View, "id" | "window"> & {
    after?: string;
    before?: string;
    order?: number;
    secondary?: boolean;
    focus?: boolean;
};

export type RootState = {
    activeView: string | null;
    targetView: string | null;
    views: Map<string, View>;
    order: {
        [windowId: string]: {
            default: string[];
            secondary: string[];
        };
    };
};

export type ViewsState = RootState;

// ------------------------------------
// 🔣 Defaults
// ------------------------------------
const viewSchema: Omit<View, "id" | "label"> = {
    window: DEFAULT_WINDOW_ID,
    active: false,
} as const;

// ------------------------------------
// 🔧 Utility Functions
// ------------------------------------
export function generateViewId(
    label: string,
    views: RootState["views"]
): string {
    const id = toCamelCase(String(label));
    let counter = 1;
    const tempId = (i: number) => id + String(i).padStart(2, "0");

    while (views.has(tempId(counter))) {
        counter++;
    }

    return tempId(counter);
}

export function insertViewId(
    order: string[],
    id: string,
    options: { order?: number; before?: string; after?: string }
): string[] {
    const newOrder = order.filter((el) => el !== id); // Remove if exists

    if (
        typeof options.order === "number" &&
        options.order >= 0 &&
        options.order <= newOrder.length
    ) {
        return insertAt(newOrder, options.order, id);
    } else if (options.before) {
        const index = newOrder.indexOf(options.before);
        return index !== -1 ? insertAt(newOrder, index, id) : [...newOrder, id];
    } else if (options.after) {
        const index = newOrder.indexOf(options.after);
        return index !== -1
            ? insertAt(newOrder, index + 1, id)
            : [...newOrder, id];
    }

    return [...newOrder, id];
}

export const sanitizeOrder = (
    accepted: RootState["views"],
    order: RootState["order"]
): RootState["order"] => {
    const cleanOrder: RootState["order"] = {
        [DEFAULT_WINDOW_ID]: { default: [], secondary: [] },
    };

    for (const window in order) {
        const defaultList = order[window].default.filter((id) =>
            accepted.has(id)
        );
        const secondaryList = order[window].secondary.filter((id) => accepted.has(id));

        if (
            window !== DEFAULT_WINDOW_ID &&
            defaultList.length === 0 &&
            secondaryList.length === 0
        ) {
            continue; // Remove empty window
        }

        cleanOrder[window] = {
            default: defaultList.length > 0 ? defaultList : secondaryList,
            secondary: defaultList.length > 0 ? secondaryList : [],
        };
    }

    return cleanOrder;
};

// ------------------------------------
// ⚙️ Core Logic
// ------------------------------------
export const internalAddView = (
    state: RootState,
    payload: CreateViewType
): void => {
    const { after, before, order, secondary, focus, ...createView } = payload;

    const view: Optional<View, "id"> = {
        ...viewSchema,
        ...createView,
    };

    if (!view.id) {
        view.id = generateViewId(view.label, state.views);
    }

    const completeView = view as View;
    state.views.set(completeView.id, completeView);

    const windowId = completeView.window;
    const section = secondary ? "secondary" : "default";

    if (!state.order[windowId]) {
        state.order[windowId] = { default: [], secondary: [] };
    }

    state.order[windowId][section] = insertViewId(
        state.order[windowId][section],
        completeView.id,
        { order, before, after }
    );

    if (state.activeView === null || focus) {
        state.activeView = completeView.id;
    }
};
