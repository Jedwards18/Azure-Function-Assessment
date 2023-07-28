
import { AzureFunction, Context, HttpRequest, HttpResponseSimple } from "@azure/functions"
import { IHttpResponse } from "./IHttpResponse";
import { DataPersister, PostgresDatabase } from "../db";

const db = new DataPersister(new PostgresDatabase());

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<HttpResponseSimple> {
    db.connect()

    const integers: number[] = req.body?.integers;

    if (!integers || integers.length < 1) {
        return {
            statusCode: 400,
            body: "Please provide an array of integers"
        }
    };

    const integerAndNumberOfOccurrence: Record<number, number> = {};

    integers.forEach((integer: number) => {
        if (!integerAndNumberOfOccurrence[integer]) integerAndNumberOfOccurrence[integer] = 1;
        else integerAndNumberOfOccurrence[integer]++;
    })

    const highestFrequencyOfOccurrence = Object.values(integerAndNumberOfOccurrence).sort((a,b) => {return b-a})[0]

    const response = extractMostFrequentInteger(integerAndNumberOfOccurrence, highestFrequencyOfOccurrence)

    return {
        body: response
    };

};

function extractMostFrequentInteger(integersWithOccurrence: Record<number, number>, targetOccurrence: number): IHttpResponse[] {
    const res: IHttpResponse[] = [];

    for (let k in integersWithOccurrence) {

        if (integersWithOccurrence[k] === targetOccurrence) {
            res.push({
                mostFrequentInteger: parseInt(k),
                numberOfOccurrences: targetOccurrence
            })
        }
    }

    return res
}

export default httpTrigger;