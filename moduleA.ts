import { Container, Logger } from "@dpjayasekara/tscore";

//tslint:disable
export default class ModuleA {
    private container : Container;
    private logger : Logger;
    private config : object;

    constructor(container: any, logger: any, config: any) {
        this.container = container;
        this.logger = logger;
        this.config = config;
        this.init();
    }

    private init() {
        this.container.set('square', num => num ** 2);
    }

    public sayAboutA() {
        return this.config
    }
}
