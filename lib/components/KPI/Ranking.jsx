"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ranking = void 0;
var avatar_1 = require("../ui/avatar");
var Typography_1 = require("../Typography/Typography");
var PikaIcons_1 = require("../../icons/PikaIcons");
function Ranking(_a) {
    var title = _a.title, subtitle = _a.subtitle, data = _a.data, icon = _a.icon;
    return (<div className="space-y-8 ">
      <div className="flex flex-col">
        <Typography_1.TypographyH3 className="text-primary font-bold">{title}</Typography_1.TypographyH3>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {data === null || data === void 0 ? void 0 : data.map(function (item, index) { return (<div className="flex items-center" key={index}>
            <avatar_1.Avatar className="h-9 w-9">
              <avatar_1.AvatarImage src="/avatars/01.png" alt="Avatar"/>
              <avatar_1.AvatarFallback>
                {icon ? icon : <PikaIcons_1.PiUserCircleDuoStroke />}
              </avatar_1.AvatarFallback>
            </avatar_1.Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
            </div>

            <div className="flex flex-col gap-1 ml-auto font-medium text-sm">
              <div className=" text-primary ">
                {item.amount.toLocaleString("fr-FR").replace(/\s/g, " ")}{" "}
                {item.currency}
              </div>
              {item.amount2 && (<div className="text-secondary ">
                  {item.amount2.toLocaleString("fr-FR").replace(/\s/g, " ")}{" "}
                  {item.currency}
                </div>)}
            </div>
          </div>); })}
      </div>
    </div>);
}
exports.Ranking = Ranking;
