//tslint:disable

import { Server, Configuration, Logger, Container, Constants } from '@dpjayasekara/tscore';

export default class Main {
    private container: Container;
    private logger: Logger;
    private config: Configuration;
    private serviceA;
    private serviceB;

    constructor(container: Container, logger: Logger, config: Configuration) {
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

    private requestLogger(req, res, next) {
        this.logger.info(res.locals.auth);
        // this.logger.info(req);
        next();
    }
}
