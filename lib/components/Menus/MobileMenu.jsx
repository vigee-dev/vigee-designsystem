"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var link_1 = __importDefault(require("next/link"));
var navigation_1 = require("next/navigation");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
function MobileMenu(_a) {
    var nav = _a.nav;
    var pathName = (0, navigation_1.usePathname)();
    var _b = (0, react_2.useState)(null), hoveredIndex = _b[0], setHoveredIndex = _b[1];
    return (<div className="fixed md:hidden bottom-0 grow gap-y-5 overflow-y-auto  bg-white  shadow-xl z-40 border-t border-gray-200 pb-6 w-screen">
      <nav className="flex flex-1 flex-col ">
        <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
          <li>
            <ul role="list" className=" flex justify-center mx-auto  ">
              {nav === null || nav === void 0 ? void 0 : nav.map(function (item) {
            var includesSlug = pathName
                .toLocaleLowerCase()
                .match(item.slug ? item.slug : "//");
            return (<li key={item.name}>
                    {item.href && (<link_1.default href={item.href} className={classNames(includesSlug
                        ? " text-primary"
                        : "text-gray-500 hover:text-primary   ", "group grid  py-1 px-3 text-[11px]  hover: transform transition-all duration-100 ease-in-out text-center font-medium")}>
                        {!includesSlug ? (<div className={classNames(includesSlug
                            ? " text-primary   "
                            : " hover:text-primary  transform transition-all duration-300 ease-in-out ", "h-8 w-8 shrink-0 mx-auto justify-center   p-[5px] ")} aria-hidden="true">
                            {" "}
                            {item.icon}
                          </div>) : (<div className={classNames(includesSlug
                            ? " text-primary   "
                            : " hover:text-primary  transform transition-all duration-300 ease-in-out ", "h-8 w-8 shrink-0 mx-auto justify-center   p-[5px] ")} aria-hidden="true">
                            {item.iconFill}
                          </div>)}
                        {item.name}
                      </link_1.default>)}
                  </li>);
        })}
            </ul>
          </li>
        </ul>
      </nav>
    </div>);
}
exports.default = MobileMenu;
