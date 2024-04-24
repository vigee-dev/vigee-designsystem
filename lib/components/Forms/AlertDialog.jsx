"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = exports.useAlertContext = void 0;
var react_1 = __importDefault(require("react"));
var alert_dialog_1 = require("../../components/ui/alert-dialog");
var Button_1 = require("../Buttons/Button");
var AlertContext = react_1.default.createContext(undefined);
function useAlertContext() {
    var context = react_1.default.useContext(AlertContext);
    if (context === undefined) {
        throw new Error("useAlertContext doit être utilisé à l'intérieur d'un useAlertContext.Provider");
    }
    return context;
}
exports.useAlertContext = useAlertContext;
function AlertDialog(_a) {
    var btnQuestion = _a.btnQuestion, btnSubAlert = _a.btnSubAlert, _b = _a.colorBtn, colorBtn = _b === void 0 ? "outline" : _b, onClick = _a.onClick, onCancel = _a.onCancel, trigger = _a.trigger, isPending = _a.isPending, isOpen = _a.isOpen;
    var _c = react_1.default.useState(false), open = _c[0], setOpen = _c[1];
    var contextValue = {
        open: open,
        setOpen: setOpen,
    };
    return (<alert_dialog_1.AlertDialog open={isOpen}>
      <alert_dialog_1.AlertDialogTrigger asChild>{trigger}</alert_dialog_1.AlertDialogTrigger>
      <alert_dialog_1.AlertDialogContent className="z-[1000]">
        <alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogTitle>{btnQuestion}</alert_dialog_1.AlertDialogTitle>
          {btnSubAlert && (<alert_dialog_1.AlertDialogDescription>{btnSubAlert}</alert_dialog_1.AlertDialogDescription>)}
        </alert_dialog_1.AlertDialogHeader>
        <alert_dialog_1.AlertDialogFooter>
          <alert_dialog_1.AlertDialogCancel onClick={onCancel}>Annuler</alert_dialog_1.AlertDialogCancel>
          {!isPending ? (<alert_dialog_1.AlertDialogAction onClick={onClick} className="text-white bg-red-500" disabled={isPending}>
              Confirmer
            </alert_dialog_1.AlertDialogAction>) : (<Button_1.Button onClick={onClick} variant={colorBtn} pending>
              Confirmer
            </Button_1.Button>)}
        </alert_dialog_1.AlertDialogFooter>
      </alert_dialog_1.AlertDialogContent>
    </alert_dialog_1.AlertDialog>);
}
exports.AlertDialog = AlertDialog;
