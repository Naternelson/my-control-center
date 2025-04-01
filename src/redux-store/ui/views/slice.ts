//src\redux-store\ui\views\slice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
    CreateViewType,
    DEFAULT_WINDOW_ID,
    insertViewId,
    internalAddView,
    RootState,
    sanitizeOrder,
} from "./util";

const initialState: RootState = {
    activeView: null,
    targetView: null,
    views: new Map(),
    order: {
        [DEFAULT_WINDOW_ID]: {
            default: [],
            secondary: [],
        },
    },
};

export const viewsSlice = createSlice({
    name: "views",
    initialState,
    reducers: {
        addView: (state, action: PayloadAction<CreateViewType>) => {
            internalAddView(state, action.payload);
        },
        addViewAndFocus: (state, action: PayloadAction<CreateViewType>) => {
            internalAddView(state, { ...action.payload, focus: true });
        },
        setViews: (
            state,
            action: PayloadAction<{
                views: RootState["views"];
                order: RootState["order"];
            }>
        ) => {
            const { views, order } = action.payload;
            state.views = views;
            state.order = sanitizeOrder(state.views, {
                [DEFAULT_WINDOW_ID]: {
                    default: [],
                    secondary: [],
                },
                ...order,
            });
        },
        clearsecondary: (
            state,
            action: PayloadAction<{
                windowId: string;
                /** Clear the Default Group instead of secondary */
                def?: boolean;
            }>
        ) => {
            const { windowId, def } = action.payload;
            if (state.order[windowId]) {
                let oldIds: string[];
                if (def) {
                    oldIds = [...state.order[windowId].default];
                    state.order[windowId].default = state.order[windowId].secondary;
                    state.order[windowId].secondary = [];
                    return;
                }
                oldIds = [...state.order[windowId].secondary];
                state.order[windowId].secondary = state.order[windowId].default;
                state.order[windowId].default = [];
                for (const id of oldIds) {
                    state.views.delete(id);
                }
            }
        },
        clearWindow: (state, action: PayloadAction<string>) => {
            // Clear those Ids from views
            if (state.order[action.payload]) {
                const window = state.order[action.payload];
                const oldIds: string[] = [...window.default, ...window.secondary];
                for (const id of oldIds) {
                    state.views.delete(id);
                }
            }
            delete state.order[action.payload];
        },
        removeView: (state, action: PayloadAction<string>) => {
            const deadId = action.payload;
            const view = state.views.get(deadId);
            state.views.delete(deadId);

            if (!view) return; // can't resolve window or section

            const windowId = view.window;
            const orderSection = state.order[windowId];

            const findReplacement = (list: string[]): string | null => {
                const index = list.indexOf(deadId);
                if (index > 0) return list[index - 1];
                if (index === 0 && list.length > 1) return list[1];
                return null;
            };

            let newActive: string | null = null;

            if (state.activeView === deadId && orderSection) {
                const section = orderSection.default.includes(deadId)
                    ? "default"
                    : "secondary";
                const primary = findReplacement(orderSection[section]);

                if (primary) newActive = primary;
                else {
                    const fallbackSection =
                        section === "default" ? "secondary" : "default";
                    const fallback = orderSection[fallbackSection][0];
                    if (fallback) newActive = fallback;
                }
                state.activeView = newActive;
            }
            state.order = sanitizeOrder(state.views, state.order);
        },
        focusView: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.views.has(id)) {
                state.activeView = id;
            }
        },
        targetView: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            if (state.views.has(id)) {
                state.targetView = id;
            }
        },
        removeTargetView: (state) => {
            state.targetView = null;
        },
        moveView: (
            state,
            action: PayloadAction<{
                id: string;
                before?: string;
                after?: string;
                order?: number;
                window?: string;
                secondary?: boolean;
            }>
        ) => {
            const { id, before, after, order, window, secondary } = action.payload;
            const view = state.views.get(id);
            if (!view) return;

            const currentWindow = view.window;
            const currentSection = state.order[currentWindow]?.default.includes(
                id
            )
                ? "default"
                : "secondary";

            const newWindow = window ?? currentWindow;
            const newSection = secondary ? "secondary" : "default";

            // Remove from current location
            if (state.order[currentWindow]) {
                state.order[currentWindow][currentSection] = state.order[
                    currentWindow
                ][currentSection].filter((v) => v !== id);
            }

            // Insert into new location
            if (!state.order[newWindow]) {
                state.order[newWindow] = { default: [], secondary: [] };
            }

            state.order[newWindow][newSection] = insertViewId(
                state.order[newWindow][newSection],
                id,
                { order, before, after }
            );

            // Update the view's window if it moved
            if (newWindow !== currentWindow) {
                view.window = newWindow;
                state.views.set(id, view);
            }

            // Clean up old window if empty and not DEFAULT
            const old = state.order[currentWindow];
            if (
                old.default.length === 0 &&
                old.secondary.length === 0 &&
                currentWindow !== DEFAULT_WINDOW_ID
            ) {
                delete state.order[currentWindow];
            }
        },
    },
});

export const {
    addView,
    addViewAndFocus,
    setViews,
    clearsecondary,
    clearWindow,
    removeView,
    focusView,
    targetView,
    removeTargetView,
    moveView,
} = viewsSlice.actions;
