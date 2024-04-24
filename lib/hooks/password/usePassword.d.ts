export declare const useSendResetEmail: () => import("@tanstack/react-query/build/legacy/types").UseMutationResult<string, Error, string, unknown>;
export declare const useCheckTokenValidity: () => import("@tanstack/react-query/build/legacy/types").UseMutationResult<boolean, Error, string, unknown>;
export declare const useResetPassword: () => import("@tanstack/react-query/build/legacy/types").UseMutationResult<any, Error, {
    password: string;
    token: string;
    password_confirmation: string;
}, unknown>;
