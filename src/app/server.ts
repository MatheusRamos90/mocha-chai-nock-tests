import * as http from 'http';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {Server} from '@overnightjs/core';
import {UsersController} from './controller/users.controller';

dotenv.config();

export class ServerApp extends Server {
    private server?: http.Server;

    constructor(private port = process.env['PORT']) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization');
            next();
        });
    }

    private setupControllers(): void {
        const usersController = new UsersController();
        super.addControllers([usersController]);
    }

    public async close(): Promise<void> {
        if (this.server) {
            await new Promise((resolve, reject) => {
                this.server?.close((err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(true);
                });
            });
        }
    }

    public start(): void {
        this.server = this.app.listen(this.port, () => {
            console.log(`Server listening on port: ${this.port || 3000}`);
        });
    }
}
