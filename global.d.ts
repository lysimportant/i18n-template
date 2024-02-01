import {IntlMessageFormat} from "intl-messageformat";

type ZhMessage = import("@/messages/zh.json")
type EnMessage = import("@/messages/en.json")
type RuMessage = import("@/messages/ru.json")

declare interface IntlMessageFormat extends ZhMessage, EnMessage, RuMessage {}
