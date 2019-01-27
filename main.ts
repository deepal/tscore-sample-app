//tslint:disable

import { Server, Logger, Container, Constants, ConfigLoader } from '@dpjayasekara/tscore';
import { IncomingMessage, OutgoingMessage } from 'http';

export default class Main {
    private container: Container;
    private logger: Logger;
    private config: ConfigLoader.IConfigObj;
    private serviceA;
    private serviceB;

    constructor(container: Container, logger: Logger, config: ConfigLoader.IConfigObj) {
        this.container = container;
        this.logger = logger;
        this.config = config;
        this.init = this.init.bind(this)
        this.requestLogger = this.requestLogger.bind(this)

        this.container.on(Constants.EVENT.APPLICATION_START, this.init);
        this.serviceA = this.container.module('a');
        this.serviceB = this.container.module('b');
    }

    private init() {
        const server = new Server();
        server
            .middleware(this.requestLogger)
            .routes([
                {
                    path: '/a',
                    handler: (req, res, next) => {
                        res.status(200).send({
                            fromA: this.serviceA.sayAboutA()
                        });
                    }
                }, 
                {
                    path: '/b',
                    handler: (req, res, next) => {
                        res.status(200).send({
                            fromA: this.serviceB.sayAboutB()
                        });
                    }
                },
                {
                    path: '/square/:number',
                    handler: (req, res, next) => {
                        res.status(200).send({
                            fromA: (<Function>this.container.get('square'))(+req.params.number)
                        });
                    }
                }
            ])
            .listen({ port: <number>this.config.port, host: <string>this.config.host })
            .on('listening', () => {
                this.logger.info(`application is listening on port ${this.config.host}:${this.config.port}`);
            })
    }

    private requestLogger(req: IncomingMessage, res: OutgoingMessage, next: Function) {
        this.logger.info(`${req.method} ${req.url}`);
        next();
    }
}
