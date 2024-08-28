"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const node_child_process_1 = require("node:child_process");
const app_1 = require("../src/app");
const supertest_1 = __importDefault(require("supertest"));
(0, vitest_1.describe)('transactions routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
        // ready() => will only be executed when fastify complete to loading my app an its plugins
        // if i dont this, my app won't be ready in time before the test to be executed.
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
        // close() -> will drop my app from memory.
    });
    (0, vitest_1.beforeEach)(() => {
        (0, node_child_process_1.execSync)('npm run knex migrate:rollback --all');
        (0, node_child_process_1.execSync)('npm run knex migrate:latest');
    });
    (0, vitest_1.it)('It should allows users to create a new transaction', async () => {
        const response = await (0, supertest_1.default)(app_1.app.server).post('/transactions').send({
            title: 'new transaction',
            amount: 1000,
            type: 'credit',
        });
        (0, vitest_1.expect)(response.statusCode).toEqual(201);
    });
    (0, vitest_1.it)('It should be able to list all transactions that have been created', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'new transaction',
            amount: 1000,
            type: 'credit',
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(listTransactionsResponse.body.transactions).toEqual([
            vitest_1.expect.objectContaining({
                title: 'new transaction',
                amount: 1000,
            }),
        ]);
    });
    (0, vitest_1.it)('It should be able to get an specific transaction after create one', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'new transaction',
            amount: 2000,
            type: 'credit',
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        const listTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200);
        const transactionId = listTransactionResponse.body.transactions[0].id;
        const getTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', cookies)
            .expect(200);
        (0, vitest_1.expect)(getTransactionResponse.body.transaction).toEqual(vitest_1.expect.objectContaining({
            title: 'new transaction',
            amount: 2000,
        }));
    });
    (0, vitest_1.it)('It should be able to get the summary of a user', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'new transaction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransactionResponse.get('Set-Cookie');
        await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .set('Cookie', cookies)
            .send({
            title: 'debit transaction',
            amount: 1000,
            type: 'debit',
        });
        const summaryResponse = await (0, supertest_1.default)(app_1.app.server)
            .get('/transactions/summary')
            .set('Cookie', cookies);
        (0, vitest_1.expect)(summaryResponse.body.summary.amount).toEqual(4000);
    });
});
