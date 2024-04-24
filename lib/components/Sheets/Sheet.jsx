"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = require("../ui/button");
var sheet_1 = require("../ui/sheet");
var lucide_react_1 = require("lucide-react");
function SheetTriggered(_a) {
    var title = _a.title, description = _a.description, children = _a.children;
    return (<div className="fixed bottom-4 right-4">
      <sheet_1.Sheet>
        <sheet_1.SheetTrigger asChild className="bg-black text-white">
          <button_1.Button className="rounded-full" variant="outline">
            <lucide_react_1.PlusIcon className="h-6 w-6"/>
          </button_1.Button>
        </sheet_1.SheetTrigger>
        <sheet_1.SheetContent side="right">
          <sheet_1.SheetHeader>
            <sheet_1.SheetTitle>{title}</sheet_1.SheetTitle>
            <sheet_1.SheetDescription>{description}</sheet_1.SheetDescription>
          </sheet_1.SheetHeader>
          <div className="grid gap-4 py-4">{children}</div>
        </sheet_1.SheetContent>
      </sheet_1.Sheet>
    </div>);
}
exports.default = SheetTriggered;
