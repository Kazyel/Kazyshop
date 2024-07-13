/**
 * Request variables types for Hono.
 */
export type Variables = {
    user: { name: string; password: string };
};

export type UserContext = {
    id: string;
    name: string;
    email: string;
};
