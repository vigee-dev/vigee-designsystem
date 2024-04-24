"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var image_1 = __importDefault(require("next/image"));
var navigation_1 = require("next/navigation");
var link_1 = __importDefault(require("next/link"));
var lucide_react_1 = require("lucide-react");
var VariableLogo_1 = __importDefault(require("../Logos/VariableLogo"));
var badge_1 = require("../ui/badge");
var Select_1 = require("../Select/Select");
var utils_1 = require("../../lib/utils");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
var Sidebar = function (_a) {
    var navigation = _a.navigation, children = _a.children, noLogo = _a.noLogo, _b = _a.text, text = _b === void 0 ? "black" : _b, logo = _a.logo, _c = _a.menu, menu = _c === void 0 ? false : _c, logoSmall = _a.logoSmall, title = _a.title, width = _a.width, height = _a.height, withSelect = _a.withSelect, selectOptions = _a.selectOptions, onChangeSelect = _a.onChangeSelect, classNameSelect = _a.classNameSelect, selectPlaceHolder = _a.selectPlaceHolder, defaultValueSelect = _a.defaultValueSelect, className = _a.className;
    var _d = (0, react_1.useState)(true), sidebarOpen = _d[0], setSidebarOpen = _d[1];
    var _e = (0, react_1.useState)(false), hoverMenu = _e[0], setHoverMenu = _e[1];
    var router = (0, navigation_1.usePathname)();
    var _f = (0, react_1.useState)(null), hoveredIndex = _f[0], setHoveredIndex = _f[1];
    var options = [
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
    ];
    return (<>
      <div className={"hidden md:flex fixed inset-y-0 lg:flex ".concat(sidebarOpen ? "w-56 " : "w-16  ", " flex-col h-screen transition-all ease-in-out duration-300")} onMouseEnter={function () { return setHoverMenu(true); }} onMouseLeave={function () { return setHoverMenu(false); }}>
        <div className={(0, utils_1.cn)("".concat("flex px-3", " grow flex-col gap-y-5 overflow-y-auto  shadow-md transform transition-all duration-300 ease-in-out bg-white"), className)}>
          <div className="flex h-16 shrink-0 items-center justify-between pt-4 w-full ">
            <div className={"justify-between mx-auto flex w-full px-1"}>
              <link_1.default href={"/"}>
                {sidebarOpen && !noLogo ? (logo ? (<image_1.default src={logo} alt="Vigee" width={width ? width : 100} height={height ? height : 60}/>) : (<VariableLogo_1.default title="Vigee"/>)) : !hoverMenu && !noLogo ? (logoSmall && (<image_1.default src={logoSmall} alt="Vigee" width={30} height={30}/>)) : (title &&
            sidebarOpen && (<p className="text-primary text-xl font-bold">{title}</p>))}
              </link_1.default>
              {hoverMenu && !sidebarOpen && (<lucide_react_1.ChevronRightIcon onClick={function () { return setSidebarOpen(true); }} className="w-12 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"/>)}

              {hoverMenu && sidebarOpen && (<div className="flex shrink-0 items-center justify-left  cursor-pointer text-gray-400 hover:text-gray-800 pt-1 transform transition-all duration-300 ease-in-out">
                  <lucide_react_1.ChevronLeftIcon onClick={function () { return setSidebarOpen(false); }} className="text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer p-1"/>
                </div>)}
            </div>
          </div>

          <nav className="flex flex-1 flex-col  ">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                {withSelect &&
            selectOptions &&
            onChangeSelect &&
            selectOptions.length > 0 &&
            sidebarOpen && (<div className="flex w-full py-2 ">
                      <Select_1.Select options={selectOptions} onChange={function (e) {
                if (e === undefined)
                    return;
                onChangeSelect(e);
            }} placeholder={selectPlaceHolder} className={classNameSelect} defaultValue={defaultValueSelect !== null && defaultValueSelect !== void 0 ? defaultValueSelect : selectOptions[0].value}/>
                    </div>)}

                <ul role="list" className="-mx-2 space-y-0 items-center">
                  {navigation.map(function (item, index) {
            // Fonction pour déterminer la classe de base
            var baseClass = item.highlight
                ? "group flex gap-x-2 rounded-md p-[3px] text-primary  leading-6 transform transition-all bg-white border border-gray-200  duration-100 ease-in-out items-center mx-1 my-1  shadow-sm hover:scale-105 ".concat("text-md", " ")
                : "group flex gap-x-2 rounded-md p-[3px] leading-6 transform transition-all duration-100 ease-in-out items-center mx-1 my-1  ".concat("text-md");
            // Fonction pour déterminer la classe de texte et de fond
            var textAndBgClass = router.includes(item.slug)
                ? "text-md  p-2  ".concat(text === "white"
                    ? "text-gray-100 text-white bg-white/10"
                    : "text-gray-600 text-primary bg-black/5")
                : "p-2 ".concat(text === "white"
                    ? "text-gray-100 hover:text-white hover:bg-white/10"
                    : "text-gray-600 hover:text-primary hover:bg-black/5");
            return (<div key={index} onMouseEnter={function () { return setHoveredIndex(index); }} onMouseLeave={function () { return setHoveredIndex(null); }}>
                        <li key={item.name}>
                          <link_1.default prefetch href={item.href} className={"".concat(baseClass, " ").concat(textAndBgClass)}>
                            <div className="flex justify-between w-full pr-2">
                              <div className="flex items-center gap-x-2">
                                {router.includes(item.slug) ||
                    hoveredIndex === index ||
                    item.highlight ? (<div className={classNames("".concat(text === "white"
                        ? "text-secondary group-hover:text-secondary"
                        : "text-primary group-hover:text-primary", "   group-hover:scale-105  transform transition-all duration-300 ease-in-out "), "h-".concat("8", " w-").concat("8", " shrink-0  my-auto ml-1 rounded-full p-[4px]"))} aria-hidden="true">
                                    {item.iconFill ? item.iconFill : item.icon}
                                  </div>) : (<div className={classNames("".concat(text === "white"
                        ? "text-gray-500 group-hover:text-gray-500"
                        : "text-gray-600 group-hover:text-gray-600", " group-hover:scale-105  transform transition-all duration-300 ease-in-out "), "h-".concat("8", " w-").concat("8", " shrink-0  my-auto ml-1  p-[5px] "))} aria-hidden="true">
                                    {item.icon}
                                  </div>)}
                                {sidebarOpen && item.name}
                              </div>
                              {(item === null || item === void 0 ? void 0 : item.notifications) && (<div className="flex items-center">
                                  <badge_1.Badge className="bg-primary text-white opacity-90 p-1 w-[20px] h-[20px] items-center flex justify-center hover:text-white">
                                    {item === null || item === void 0 ? void 0 : item.notifications}
                                  </badge_1.Badge>
                                </div>)}
                            </div>
                          </link_1.default>
                        </li>
                      </div>);
        })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <main className={"".concat(sidebarOpen ? "lg:pl-56" : "lg:pl-16", " pt-2 md:py-2 bg-gray-50  h-full min-h-screen ")}>
        <div className=" md:py-6 pb-24 ">
          {!sidebarOpen && (<div className="flex shrink-0 items-center justify-start md:justify-start " onClick={function () { return setSidebarOpen(true); }}>
              {menu && (<p className=" mb-2 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-gray-800 font-bold p-2 rounded-lg transform transition-all duration-300 ease-in-out cursor-pointer ">
                  Menu
                </p>)}
            </div>)}
          {children}
        </div>
      </main>
    </>);
};
exports.default = Sidebar;
