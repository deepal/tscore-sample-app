import { Container, Logger } from "@dpjayasekara/tscore";

//tslint:disable
export default class ModuleB {
    private container : Container;
    private logger : Logger;
    private config : object;

    constructor(container: any, logger: any, config: any) {
        this.container = container;
        this.logger = logger;
        this.config = config;
    }

    public sayAboutB() {
        return this.config;
    }
}
