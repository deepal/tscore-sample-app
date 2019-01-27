//tslint:disable

import {Launcher} from '@dpjayasekara/tscore'

const launcher = new Launcher();

launcher
    .onBaseDir(__dirname)
    .withConfig('./config.json')
    .withLoggerConfig({
        name: 'myapp',
        level: 'debug'
    })
    .module({ name: 'a', path: './moduleA.ts'})
    .module({ name: 'b', path: './moduleB.ts'})
    .module({ name: 'server', path: './main.ts'})
    .start();
