"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = require("events");
const collection_1 = __importDefault(require("collection"));
class CooldownManager extends events_1.EventEmitter {
    time;
    cache = new collection_1.default();
    constructor(time) {
        super();
        this.time = time;
    }
    set(id) {
        const timeout = setTimeout(() => {
            this.emit("stop", id);
        }, this.time);
        this.cache.set(id, {
            cooldownIn: Date.now(),
            timeout: timeout.unref(),
        });
        this.emit("start", id);
        return timeout;
    }
    clear(id) {
        if (this.cache.has(id)) {
            clearTimeout(this.cache.get(id)?.timeout);
            this.cache.delete(id);
            return true;
        }
        return false;
    }
    isInCooldown(id) {
        return this.cache.has(id);
    }
    timeToEnd(id) {
        return this.time - (Date.now() - this.cache.get(id)?.cooldownIn);
    }
    waitToEnd(id) {
        return new Promise((res) => setTimeout(res, this.timeToEnd(id)));
    }
}
module.exports = CooldownManager;
