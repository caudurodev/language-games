import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
    res.status(200).send(`Hello ${req.query.name}!`)
    console.log('hi mom')
}


// https://duedswskqyetkvnfqvsm.functions.eu-central-1.nhost.run/v1/test



