/**
 * Creates a no-op storage implementation that conforms to the Web Storage API
 * but doesn't persist any data.
 * @returns An object implementing the Storage interface with no-op methods
 */
export const createNoopStorage = () => {
    // Check if we're in a non-browser environment (e.g., server-side)
    if (typeof window === 'undefined') {
        // Intercept console.warn to suppress specific redux-persist warnings
        // that occur during server-side rendering
        if (typeof console.warn === 'function') {
            // Store the original console.warn implementation
            const originalWarn = console.warn;

            // Override console.warn to filter specific messages
            console.warn = (...args) => {
                const msg = args[0];

                // Suppress the redux-persist sync storage warning
                // as it is expected behavior during SSR
                if (
                    typeof msg === 'string' &&
                    msg.includes('redux-persist failed to create sync storage')
                ) {
                    return; // Suppress this specific warning
                }

                // Forward all other warnings to the original console.warn
                originalWarn(...args);
            };
        }
    }

    // Return a storage-like object that implements the basic Storage interface
    // but doesn't actually persist any data
    return {
        /**
         * Simulates getting an item from storage
         */
        getItem: (): Promise<null> => Promise.resolve(null),

        /**
         * Simulates setting an item in storage
         */
        setItem: (): Promise<void> => Promise.resolve(),

        /**
         * Simulates removing an item from storage
         */
        removeItem: () => Promise.resolve(),
    };
};
