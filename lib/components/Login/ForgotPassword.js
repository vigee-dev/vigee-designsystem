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
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../Buttons/Button";
import { toast } from "sonner";
import { TypographyH1 } from "../Typography/Typography";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useSendResetEmail } from "../../hooks/password/usePassword";
export default function ForgotPassword(_a) {
    var _this = this;
    var logo = _a.logo;
    var router = useRouter();
    // Schéma de validation zod
    var schema = z.object({
        email: z.string().email("L'adresse email est invalide."),
    });
    var form = useForm({
        resolver: zodResolver(schema),
    });
    var email = form.watch("email");
    var mutation = useSendResetEmail();
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mutation.mutateAsync(data.email)];
                case 1:
                    _a.sent();
                    toast.success("un email de réinitialisation de mot de passe a été envoyé");
                    router.push("/login");
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    toast.error("Aucun compte n'est associé à cette adresse email.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "w-full max-w-xl space-y-6 align-center my-auto justify-start mx-auto py-40 md:px-8 md:p-24 md:py-4 min-h-screen md:min-h-fit md:max-w-[480px]", children: [_jsx(Image, { width: 100, height: 100, className: " ml-4 md:ml-4 absolute md:relative top-12 md:top-0", src: logo, alt: "Vigee - Make IT Simple" }), _jsxs("div", { className: "flex flex-col justify-start mx-auto md:shadow-sm  md:border border-gray-100 rounded-xl px-4 md:p-8  md:bg-white", children: [_jsx("div", { children: _jsx(TypographyH1, { className: "text-primary pb-4", children: "R\u00E9initialiser mon mot de passe" }) }), _jsx(Form, __assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "email", render: function (_a) {
                                            var field = _a.field;
                                            return (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, __assign({ placeholder: "ex : test@email.com" }, field, { className: "text-[16px] md:text-sm" })) }), _jsx(FormMessage, {})] }));
                                        } }), _jsxs(Link, { href: "/login", className: "font-base hover:font-bold text-sm hover:text-primary flex gap-x-2 text-gray-400 transform hover:scale-105 transition duration-300 ease-in-out", children: [_jsx(ArrowLongLeftIcon, { width: 20 }), "Retour \u00E0 la connexion"] }), _jsx("div", { className: "flex flex-col items-center ", children: _jsx("div", { className: "absolute md:relative bottom-12 md:bottom-0 w-full px-4 md:px-0 items-center gap-2 ", children: _jsx(Button, { pending: form.formState.isSubmitting, disabled: !email, type: "submit", className: "w-full h-12 text-md font-bold ", children: "R\u00E9initialiser mon mot de passe" }) }) })] }) }))] })] }) }));
}
