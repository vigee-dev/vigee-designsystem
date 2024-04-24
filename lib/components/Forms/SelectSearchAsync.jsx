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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("../../components/ui/form");
var async_1 = __importDefault(require("react-select/async"));
var react_1 = __importDefault(require("react"));
// TODO Better way to handle isMulti, Option type etc ...
function SearchSelectAsync(_a) {
    var name = _a.name, label = _a.label, form = _a.form, _b = _a.placeholder, placeholder = _b === void 0 ? "Rechercher..." : _b, loadOptions = _a.loadOptions, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.isClearable, isClearable = _d === void 0 ? true : _d, preprocessOnChange = _a.preprocessOnChange, defaultOptions = _a.defaultOptions, isMulti = _a.isMulti, _e = _a.noOptionsMessage, noOptionsMessage = _e === void 0 ? "Aucun résultat" : _e, defaultValue = _a.defaultValue, onChange = _a.onChange, value = _a.value;
    return form && name ? (<form_1.FormField control={form === null || form === void 0 ? void 0 : form.control} name={name} render={function (_a) {
            var field = _a.field;
            return (<form_1.FormItem className="md:text-sm text-[16px]">
          {label && (<form_1.FormLabel className="font-black text-primary">{label}</form_1.FormLabel>)}
          <form_1.FormControl>
            {/* TODO Debounce loadoptions ? */}
            {/* TODO typeof isMulti ?*/}
            <async_1.default theme={function (theme) { return (__assign(__assign({}, theme), { colors: __assign(__assign({}, theme.colors), { primary: "#f3f4f6" }) })); }} styles={{
                    control: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { border: 0, backgroundColor: "#f3f4f6", borderRadius: "0.4rem", fontSize: "16px", borderColor: "#f3f4f6" })); },
                    option: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: "pointer", fontSize: "16px", backgroundColor: "#FFFFFF", ":hover": {
                            backgroundColor: "#EEEEEE",
                        }, border: 0 })); },
                    singleValue: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: "pointer", backgroundColor: "#FFF", padding: "0.2rem", boxShadow: "0 0 0 1px #EEE", fontSize: "16px", borderRadius: "0.4rem" })); },
                    multiValue: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: "pointer", backgroundColor: "#FFF", color: "#000", borderRadius: "0.4rem", fontSize: "16px" })); },
                    multiValueLabel: function (styles, _a) {
                        var data = _a.data;
                        return (__assign(__assign({}, styles), { color: "#111", fontSize: "16px" }));
                    },
                    multiValueRemove: function (styles, _a) {
                        var data = _a.data;
                        return (__assign(__assign({}, styles), { color: "#111", borderRadius: "0.4rem", ":hover": {
                                backgroundColor: "#DDD",
                                color: "#111",
                            } }));
                    },
                }} isClearable={isClearable} placeholder={placeholder} isDisabled={disabled} //TODO pass disabled from field.disabled ?
             onChange={function (e) {
                    if (preprocessOnChange) {
                        var value_1 = preprocessOnChange(e);
                        return field.onChange(value_1);
                    }
                    else
                        return field.onChange(e);
                }} onBlur={field.onBlur} defaultOptions={defaultOptions || []} defaultValue={defaultValue || field.value} noOptionsMessage={function () { return noOptionsMessage; }} loadOptions={loadOptions} ref={field.ref} isMulti={isMulti}/>
          </form_1.FormControl>
          <form_1.FormMessage />
        </form_1.FormItem>);
        }}/>) : (<form_1.FormItem>
      {label && (<form_1.FormLabel className="font-black text-primary">{label}</form_1.FormLabel>)}
      <form_1.FormControl>
        {/* TODO Debounce loadoptions ? */}
        {/* TODO typeof isMulti ?*/}
        <async_1.default theme={function (theme) { return (__assign(__assign({}, theme), { colors: __assign(__assign({}, theme.colors), { primary: "#f3f4f6" }) })); }} styles={{
            control: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { border: 0, backgroundColor: "#f3f4f6", borderRadius: "0.4rem", fontSize: "14px", borderColor: "#f3f4f6" })); },
            option: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: "pointer", fontSize: "14px", backgroundColor: "#FFFFFF", ":hover": {
                    backgroundColor: "#EEEEEE",
                }, border: 0 })); },
            singleValue: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: "pointer", backgroundColor: "#FFF", padding: "0.2rem", boxShadow: "0 0 0 1px #EEE", fontSize: "14px", borderRadius: "0.4rem" })); },
            multiValue: function (baseStyles, state) { return (__assign(__assign({}, baseStyles), { cursor: "pointer", backgroundColor: "#FFF", color: "#000", borderRadius: "0.4rem", fontSize: "16px" })); },
            multiValueLabel: function (styles, _a) {
                var data = _a.data;
                return (__assign(__assign({}, styles), { color: "#111" }));
            },
            multiValueRemove: function (styles, _a) {
                var data = _a.data;
                return (__assign(__assign({}, styles), { color: "#111", borderRadius: "0.4rem", ":hover": {
                        backgroundColor: "#DDD",
                        color: "#111",
                    } }));
            },
        }} isClearable={isClearable} placeholder={placeholder} isDisabled={disabled} //TODO pass disabled from field.disabled ?
     onChange={onChange} defaultOptions={defaultOptions || []} defaultValue={defaultValue} noOptionsMessage={function () { return noOptionsMessage; }} loadOptions={loadOptions} isMulti={isMulti} value={value}/>
      </form_1.FormControl>
      <form_1.FormMessage />
    </form_1.FormItem>);
}
exports.default = SearchSelectAsync;
