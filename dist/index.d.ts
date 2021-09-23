/// <reference types="node" />
import { EventEmitter } from "events";
import Collection from "collection";
declare interface CooldownManager {
    on(eventName: "stop", listener: (id?: string) => any): this;
    once(eventName: "stop", listener: (id?: string) => any): this;
    on(eventName: "start", listener: (id?: string) => any): this;
    once(eventName: "start", listener: (id?: string) => any): this;
}
/**
 * @example
 * const CooldownManager = require("cooldown")
 *
 * const cm = new CooldownManager(50000)
 *
 * cm.set("someId")
 *
 * cm.waitToEnd("someId").then(() => {
 *   console.log("Ended.")
 * })
 */
declare class CooldownManager extends EventEmitter {
    time: number;
    cache: Collection<string, {
        cooldownIn: number;
        timeout: NodeJS.Timeout;
    }>;
    constructor(time: number);
    set(id: string): NodeJS.Timeout;
    clear(id: string): boolean;
    isInCooldown(id: string): boolean;
    timeToEnd(id: string): number;
    waitToEnd(id: string): Promise<unknown>;
}
export = CooldownManager;
//# sourceMappingURL=index.d.ts.map