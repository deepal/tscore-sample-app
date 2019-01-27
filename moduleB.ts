//tslint:disable
export default class ModuleB {
    private container : any;
    private logger : any;
    private config : any;

    constructor(container: any, logger: any, config: any) {
        this.container = container;
        this.logger = logger;
        this.config = config;
    }

    public sayAboutB() {
        return `Hi, I'm from moduleB`;
    }
}
