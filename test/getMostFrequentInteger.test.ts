import { describe, expect, test, beforeEach } from "@jest/globals";
import { Context, HttpRequest, HttpResponseSimple } from "@azure/functions";
import httpTrigger from '../GetMostFrequentInteger/index';
import {singleIntegerResponse, multipleIntegerResponse, allIntegersResponse} from './utils'

describe("Get Most Frequent Integer Tests", () => {
    let context: Context;
    let request: HttpRequest;

    beforeEach(() => {
        context = { log: () => {} } as unknown as Context;
        request = { log: () => {} } as unknown as HttpRequest;
    });

    test('only one integer with highest number of occurrences', async () => {
        request.body = { integers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0] }
        const response: HttpResponseSimple = await httpTrigger(context, request)
        expect(response.body).toEqual(singleIntegerResponse)
    })

    test('multiple integers with highest number of occurrences', async () => {
        request.body = { integers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2] }
        const response: HttpResponseSimple = await httpTrigger(context, request)
        expect(response.body).toEqual(multipleIntegerResponse)
    })

    test('all integers have the same number of occurrences', async () => {
        request.body = { integers: [0, 1, 2, 3, 0, 1, 2, 3] }
        const response: HttpResponseSimple = await httpTrigger(context, request)
        expect(response.body).toEqual(allIntegersResponse)
    })

    test('integers not provided in body of request', async () => {
        request.body = { }
        const response: HttpResponseSimple = await httpTrigger(context, request)
        expect(response.body).toMatch("Please provide an array of integers")
    })
})