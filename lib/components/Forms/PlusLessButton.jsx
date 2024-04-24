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
exports.PlusLessButton = void 0;
var React = __importStar(require("react"));
var react_icons_1 = require("@radix-ui/react-icons");
var button_1 = require("../../components/ui/button");
var form_1 = require("../../components/ui/form");
// TODO rethink the way this component handle changes
// TODO add onChange prop to handleChange withouth RHF
function PlusLessButton(_a) {
    var title = _a.title, unit = _a.unit, _b = _a.interval, interval = _b === void 0 ? 0.5 : _b, _c = _a.min, min = _c === void 0 ? 0.5 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.start, start = _e === void 0 ? 1 : _e, form = _a.form, name = _a.name, onChange = _a.onChange;
    var _f = React.useState((form === null || form === void 0 ? void 0 : form.getValues(name)) ? form.getValues(name) : start), goal = _f[0], setGoal = _f[1];
    function onClick(adjustment) {
        var newValue = Math.max(min, Math.min(max, goal + adjustment));
        onChange && onChange(newValue);
        setGoal(newValue);
    }
    React.useEffect(function () {
        form === null || form === void 0 ? void 0 : form.setValue(name, goal, {
            shouldValidate: true,
        });
    }, [form, name, start, goal]);
    return (<form_1.FormField control={form === null || form === void 0 ? void 0 : form.control} name={name} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className="mx-auto w-full max-w-sm">
          {title && (<form_1.FormLabel className="font-black text-primary">{title}</form_1.FormLabel>)}
          <div className=" pb-0">
            <div className="flex items-center justify-center space-x-2">
              <button_1.Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={function () { return onClick(-interval); }} disabled={goal <= min}>
                <react_icons_1.MinusIcon className="h-4 w-4"/>
                <span className="sr-only">Diminuer</span>
              </button_1.Button>

              <div className="flex-1 text-center">
                <div className="text-3xl font-bold tracking-tighter text-primary">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  {unit}
                </div>
              </div>

              <button_1.Button type="button" variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={function () { return onClick(interval); }} disabled={goal >= max}>
                <react_icons_1.PlusIcon className="h-4 w-4"/>
                <span className="sr-only">Increase</span>
              </button_1.Button>
            </div>
          </div>
        </form_1.FormItem>);
        }}/>);
}
exports.PlusLessButton = PlusLessButton;
