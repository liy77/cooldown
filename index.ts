import { EventEmitter } from "events";
import Collection from "collection";

declare interface CooldownManager {
  on(eventName: "stop", listener: (id?: string) => any): this;
  once(eventName: "stop", listener: (id?: string) => any): this;

  on(eventName: "start", listener: (id?: string) => any): this;
  once(eventName: "start", listener: (id?: string) => any): this;
}
class CooldownManager extends EventEmitter {
  cache: Collection<
    string,
    {
      cooldownIn: number;
      timeout: NodeJS.Timeout;
    }
  > = new Collection();
  constructor(public time: number) {
    super();
  }

  set(id: string) {
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

  clear(id: string) {
    if (this.cache.has(id)) {
      clearTimeout(this.cache.get(id)?.timeout!);
      this.cache.delete(id);
      return true;
    }

    return false;
  }

  isInCooldown(id: string) {
    return this.cache.has(id);
  }

  timeToEnd(id: string) {
    return this.time - (Date.now() - this.cache.get(id)?.cooldownIn!);
  }

  waitToEnd(id: string) {
    return new Promise((res) => setTimeout(res, this.timeToEnd(id)));
  }
}

export = CooldownManager;
