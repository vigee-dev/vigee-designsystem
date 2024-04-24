"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var zod_1 = require("zod");
var zod_2 = require("@hookform/resolvers/zod");
var react_hook_form_1 = require("react-hook-form");
var sonner_1 = require("sonner");
var usePassword_1 = require("../../hooks/password/usePassword");
function ResetPassword(_a) {
    var _this = this;
    var token = _a.token;
    var schema = zod_1.z
        .object({
        password: zod_1.z
            .string()
            .min(6, "Le mot de passe doit comporter au moins 6 caractères."),
        password_confirmation: zod_1.z.string(),
    })
        .refine(function (data) { return data.password === data.password_confirmation; }, {
        message: "Les mots de passe doivent correspondre.",
        path: ["password_confirmation"], // précisez le chemin de l'erreur
    });
    var _b = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(schema),
    }), register = _b.register, handleSubmit = _b.handleSubmit, errors = _b.formState.errors, reset = _b.reset;
    var mutation = (0, usePassword_1.useResetPassword)();
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mutation.mutateAsync(__assign(__assign({}, data), { token: token }))];
                case 1:
                    _a.sent();
                    sonner_1.toast.success("Mot de passe réinitialisé avec succès !");
                    reset();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    sonner_1.toast.error("Une erreur est survenue lors de la réinitialisation du mot de passe.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="w-full max-w-sm space-y-6 align-center my-auto justify-center mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="password" className="sr-only">
            Nouveau mot de passe
          </label>
          <input {...register("password")} id="password" type="password" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Nouveau mot de passe"/>
          {errors.password && (<span className="text-red-500">{errors.password.message}</span>)}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="sr-only">
            Confirmez le mot de passe
          </label>
          <input {...register("password_confirmation")} id="password_confirmation" type="password" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6" placeholder="Confirmez le mot de passe"/>
          {errors.password_confirmation && (<span className="text-red-500">
              {errors.password_confirmation.message}
            </span>)}
        </div>

        <div>
          <button type="submit" disabled={mutation.isPending} className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Réinitialiser mon mot de passe
          </button>
        </div>
      </form>
    </div>);
}
exports.default = ResetPassword;
