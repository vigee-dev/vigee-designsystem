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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("../Buttons/Button");
var link_1 = __importDefault(require("next/link"));
var navigation_1 = require("next/navigation");
var HeroIcons = __importStar(require("@heroicons/react/24/outline"));
var HeroIconsSolid = __importStar(require("@heroicons/react/24/solid"));
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
function SectionHeading(_a) {
    var title = _a.title, subtitle = _a.subtitle, buttonTitle = _a.buttonTitle, buttonLink = _a.buttonLink, nav = _a.nav, route = _a.route;
    var pathName = (0, navigation_1.usePathname)();
    var _b = (0, react_1.useState)(null), hoveredIndex = _b[0], setHoveredIndex = _b[1];
    return (<>
      {title && <p className={"text-gray-700 text-3xl font-bold"}>{title}</p>}
      {subtitle && (<p className={"text-gray-400 text-md font-medium"}>{subtitle}</p>)}
      <div className="relative  mb-6 ">
        <div className="md:flex md:items-center md:justify-between">
          <div className="mt-3 flex md:absolute md:right-0 md:top-3 md:mt-0">
            {buttonTitle && buttonLink && (<link_1.default href={buttonLink ? buttonLink : ""}>
                <Button_1.Button>{buttonTitle}</Button_1.Button>
              </link_1.default>)}
          </div>
        </div>
        <div className="-ml-4 md:-ml-0 ">
          <div className="fixed md:hidden bottom-0 grow gap-y-5 overflow-y-auto  bg-white  shadow-xl z-40 border-t border-gray-200 pb-6 w-screen">
            <nav className="flex flex-1 flex-col ">
              <ul role="list" className="flex flex-1 flex-col gap-y-7 ">
                <li>
                  <ul role="list" className=" flex justify-center mx-auto  ">
                    {nav === null || nav === void 0 ? void 0 : nav.map(function (item) {
            var includesSlug = pathName
                .toLocaleLowerCase()
                .match(item.slug ? item.slug : "//");
            var IconComponent = HeroIcons[item.icon];
            var IconFillComponent = HeroIconsSolid[item.icon];
            return (<li key={item.name}>
                          {item.href && (<link_1.default href={item.href} className={classNames(includesSlug
                        ? "font-bold text-primary"
                        : "text-gray-500 hover:text-secondary  font-bold ", "group grid  p-3 text-[14px]  hover:font-bold transform transition-all duration-100 ease-in-out text-center ")}>
                              {!includesSlug ? (<IconComponent className={classNames(includesSlug
                            ? " text-primary   "
                            : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-10 w-10 shrink-0 mx-auto justify-center   p-[6px] ")} aria-hidden="true"/>) : (<IconFillComponent className={classNames(includesSlug
                            ? " text-primary   "
                            : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-10 w-10 shrink-0 mx-auto justify-center   p-[6px] ")} aria-hidden="true"/>)}
                              {item.name}
                            </link_1.default>)}
                        </li>);
        })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>

          <div className="hidden md:block ">
            <nav className="-mb-px flex space-x-4">
              {nav === null || nav === void 0 ? void 0 : nav.map(function (tab, index) {
            var includesSlug = pathName
                .toLocaleLowerCase()
                .match(tab.slug ? tab.slug : "//");
            var IconComponent = HeroIcons[tab.icon];
            var IconFillComponent = HeroIconsSolid[tab.icon];
            return (<link_1.default key={tab.name} onMouseEnter={function () { return setHoveredIndex(index); }} onMouseLeave={function () { return setHoveredIndex(null); }} href={"".concat(route, "/").concat(tab.slug)} className={classNames(includesSlug
                    ? "font-bold text-secondary"
                    : "text-gray-500 hover:text-secondary  font-bold ", "group   p-3 text-[14px]  hover:font-bold transform transition-all duration-100 ease-in-out text-center inline-flex gap-x-2 text-lg items-center")}>
                    {tab.icon && (includesSlug || hoveredIndex === index) ? (<IconFillComponent className={classNames(includesSlug
                        ? " text-secondary   "
                        : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-6 w-6 shrink-0 mx-auto justify-center    ")} aria-hidden="true"/>) : (tab.icon && (<IconComponent className={classNames(includesSlug
                        ? " text-secondary   "
                        : " hover:text-secondary  transform transition-all duration-300 ease-in-out ", "h-6 w-6 shrink-0 mx-auto justify-center   ")} aria-hidden="true"/>))}

                    {tab.color && (<svg className={"h-1.5 w-1.5 fill-".concat(tab.color)} viewBox="0 0 6 6" aria-hidden="true">
                        <circle className="animate-pulse" cx={3} cy={3} r={3}/>
                      </svg>)}
                    {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
                  </link_1.default>);
        })}
            </nav>
          </div>
        </div>
      </div>
    </>);
}
exports.default = SectionHeading;
