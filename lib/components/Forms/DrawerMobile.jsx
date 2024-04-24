"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawerMobile = exports.useDrawerContext = void 0;
var React = __importStar(require("react"));
var button_1 = require("../ui/button");
var media_query_1 = require("@react-hook/media-query");
var drawer_1 = require("../ui/drawer");
var dialog_1 = require("../ui/dialog");
var scroll_area_1 = require("../ui/scroll-area");
var DrawerContext = React.createContext(undefined);
function useDrawerContext() {
    var context = React.useContext(DrawerContext);
    if (context === undefined) {
        throw new Error("useDrawerContext doit être utilisé à l'intérieur d'un DrawerContext.Provider");
    }
    return context;
}
exports.useDrawerContext = useDrawerContext;
function DrawerMobile(_a) {
    var children = _a.children, title = _a.title, description = _a.description, trigger = _a.trigger, icon = _a.icon, cancelButton = _a.cancelButton, _b = _a.size, size = _b === void 0 ? "sm" : _b;
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var contextValue = { open: open, setOpen: setOpen };
    var isDesktop = (0, media_query_1.useMediaQuery)("(min-width: 768px)");
    if (isDesktop) {
        return (<DrawerContext.Provider value={contextValue}>
        <dialog_1.Dialog open={open} onOpenChange={setOpen}>
          <dialog_1.DialogTrigger onClick={function (e) { return e.stopPropagation(); }} asChild>
            {trigger}
          </dialog_1.DialogTrigger>
          <scroll_area_1.ScrollArea className="max-h-[80vh] ">
            <dialog_1.DialogContent onClick={function (e) { return e.stopPropagation(); }} className={"max-w-[425px] ".concat(size === "sm"
                ? "md:max-w-[425px]"
                : size === "md"
                    ? "md:max-w-[650px]"
                    : "md:max-w-[1080px]", " ")}>
              <dialog_1.DialogHeader>
                <div className="flex items-center gap-x-4 p-4 py-2">
                  {icon}
                  <div className="flex flex-col">
                    <dialog_1.DialogTitle className="text-primary">{title}</dialog_1.DialogTitle>
                    <dialog_1.DialogDescription>{description}</dialog_1.DialogDescription>
                  </div>
                </div>
              </dialog_1.DialogHeader>

              <div className="p-4">{children}</div>
            </dialog_1.DialogContent>
          </scroll_area_1.ScrollArea>
        </dialog_1.Dialog>
      </DrawerContext.Provider>);
    }
    return (<DrawerContext.Provider value={contextValue}>
      <drawer_1.Drawer open={open} onOpenChange={setOpen}>
        <drawer_1.DrawerTrigger onClick={function (e) { return e.stopPropagation(); }} asChild>
          {trigger}
        </drawer_1.DrawerTrigger>
        <drawer_1.DrawerContent onClick={function (e) { return e.stopPropagation(); }}>
          <div className="text-[16px] ">
            <scroll_area_1.ScrollArea className="max-h-[80vh] pb-8 z-50">
              <drawer_1.DrawerHeader className="text-left">
                {title && (<drawer_1.DrawerTitle className="font-bold text-primary">
                    {title}
                  </drawer_1.DrawerTitle>)}
                {description && (<drawer_1.DrawerDescription>{description}</drawer_1.DrawerDescription>)}
              </drawer_1.DrawerHeader>

              <div className="p-4">{children}</div>
            </scroll_area_1.ScrollArea>

            {cancelButton && (<drawer_1.DrawerFooter>
                <drawer_1.DrawerClose asChild>
                  <button_1.Button type="button" variant="outline">
                    Annuler
                  </button_1.Button>
                </drawer_1.DrawerClose>
              </drawer_1.DrawerFooter>)}
          </div>
        </drawer_1.DrawerContent>
      </drawer_1.Drawer>
    </DrawerContext.Provider>);
}
exports.DrawerMobile = DrawerMobile;
