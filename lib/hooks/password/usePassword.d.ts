import { UseMutationResult } from "@tanstack/react-query";
export declare const useSendResetEmail: () => UseMutationResult<string, Error, string, unknown>;
export declare const useCheckTokenValidity: () => UseMutationResult<boolean, Error, string, unknown>;
export declare const useResetPassword: () => UseMutationResult<any, Error, {
    password: string;
    token: string;
    password_confirmation: string;
}, unknown>;
