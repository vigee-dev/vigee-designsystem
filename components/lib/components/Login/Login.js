"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Copyright from "./Copyright";
import * as z from "zod";
import { Button } from "../Buttons/Button";
import { toast } from "sonner";
import { TypographyH1 } from "../Typography/Typography";
import { signIn } from "next-auth/react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { Input } from "../ui/input";
export default function Login(_a) {
    var _this = this;
    var logo = _a.logo, clientName = _a.clientName, variant = _a.variant, _b = _a.callbackUrl, callbackUrl = _b === void 0 ? "/" : _b, _c = _a.noCopyright, noCopyright = _c === void 0 ? false : _c, _d = _a.imageWidth, imageWidth = _d === void 0 ? 90 : _d, _e = _a.imageHeight, imageHeight = _e === void 0 ? 90 : _e;
    var router = useRouter();
    // Schéma de validation zod
    var schema = z.object({
        email: z.string().email("L'adresse email est invalide."),
        password: z.string().min(8, {
            message: "Le mot de passe doit contenir au moins 8 caractères.",
        }),
    });
    var form = useForm({
        resolver: zodResolver(schema),
    });
    var email = form.watch("email");
    var password = form.watch("password");
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, signIn("credentials", {
                        redirect: false,
                        callbackUrl: callbackUrl,
                        email: data.email,
                        password: data.password,
                    })];
                case 1:
                    result = _a.sent();
                    if (result) {
                        if (result.ok) {
                            toast.success("Vous êtes connecté.");
                            router.push(callbackUrl);
                        }
                        else {
                            toast.error("Mot de passe ou identifiant incorrect");
                        }
                    }
                    else {
                        toast("Une erreur est survenue, veuillez réesayer ultérieurement.");
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 md:px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit md:max-w-[480px]", children: [_jsx(Image, { width: imageWidth, height: imageHeight, className: " ml-4 md:ml-4 absolute md:relative top-12 md:top-0", src: logo, alt: "Vigee - Make IT Simple" }), _jsxs("div", { className: "flex flex-col justify-start mx-auto md:shadow-sm  md:border border-gray-100 rounded-xl px-4 md:p-8  md:bg-white dark:bg-slate-800", children: [_jsx("div", { children: _jsx(TypographyH1, { className: "text-primary py-2 pt-0", children: "Connexion" }) }), _jsx(Form, __assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4 py-4", id: "form", children: [_jsx(FormField, { control: form.control, name: "email", render: function (_a) {
                                            var field = _a.field;
                                            return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, __assign({ placeholder: "" }, field, { className: "text-[16px] md:text-sm bg-input" })) }), _jsx(FormMessage, {})] }));
                                        } }), _jsx(FormField, { control: form.control, name: "password", render: function (_a) {
                                            var field = _a.field;
                                            return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Mot de passe" }), _jsx(FormControl, { children: _jsx(Input, __assign({ placeholder: "" }, field, { type: "password", className: "text-[16px] md:text-sm bg-input" })) }), _jsx(FormMessage, {})] }));
                                        } }), _jsx("div", { className: "flex flex-col md:items-center ", children: _jsx(Link, { href: "/forgot-password", className: "font-base  hover:font-bold text-sm hover:text-primary flex gap-x-2 text-gray-500 transform hover:scale-105 transition duration-300 ease-in-out pb-2", children: "Mot de passe oubli\u00E9 ?" }) }), _jsx("div", { className: "flex flex-col items-center ", children: _jsx("div", { className: "absolute md:relative bottom-12 md:bottom-0 w-full px-4 md:px-0 items-center gap-2 ", children: _jsx(Button, { pending: form.formState.isSubmitting, disabled: !email || !password, type: "submit", variant: variant ? variant : "default", className: "w-full h-12 text-md font-bold", children: "Connexion" }) }) })] }) }))] }), !noCopyright && (_jsx("div", { className: "hidden absolute md:flex items-center py-2", children: _jsx(Copyright, { clientName: clientName }) }))] }) }));
}
